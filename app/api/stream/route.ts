import Redis from "ioredis";
import { channelName } from "@/app/_features/notifications/utils/redisPublishChannel";

export const dynamic = "force-dynamic";

export async function GET() {
  const redisSubscriber = new Redis(
    process.env.UPSTASH_REDIS_URL_TCP as string,
    { tls: {} },
  );

  let closed = false;
  let controllerRef: ReadableStreamDefaultController<Uint8Array> | null = null;

  const encoder = new TextEncoder();

  const messageHandler = (channel: string, message: string) => {
    if (closed) return;

    try {
      if (controllerRef) {
        controllerRef.enqueue(encoder.encode(`data: ${message}\n\n`));
      }
    } catch (error) {
      console.error("Cannot enqueue, stream already closed:", error);
    }
  };

  let keepAliveId: NodeJS.Timeout;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      controllerRef = controller;

      await redisSubscriber.subscribe(channelName);
      redisSubscriber.on("message", messageHandler);

      // send keep-alive every 10s
      keepAliveId = setInterval(() => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`: keep-alive\n\n`));
        } catch (err) {
          console.error("Keep-alive enqueue failed:", err);
        }
      }, 10_000);
    },

    async cancel(reason) {
      console.log("✅ SSE stream canceled:", reason);

      closed = true;

      clearInterval(keepAliveId);
      redisSubscriber.off("message", messageHandler);
      await redisSubscriber.unsubscribe(channelName);
      await redisSubscriber.quit();

      controllerRef = null;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

//// Documentation :

/*
# Server → Client live notifications (step-by-step explanation)

Below is a clear, copy-ready explanation of the code you posted (server SSE endpoint using Redis pub/sub + minimal client consumer). Use this in your documentation.

---

## Summary (one sentence)

This code creates a Server-Sent Events (SSE) endpoint that subscribes to a Redis pub/sub channel and streams incoming messages to connected browsers; the client opens an `EventSource` to `/api/stream`, receives each message, shows a toast, and prepends the notification to an array.

---

## Server side (the `GET` handler)

### Top-level pieces

* `import Redis from "ioredis";` — ioredis is used to connect to Redis and subscribe to a channel.
* `export const dynamic = "force-dynamic";` — (Next.js App Router) instructs Next to treat this route as dynamic (no static caching).
* The `GET` function returns a `Response` that streams SSE data to the client.

### Important variables

* `redisSubscriber = new Redis(process.env.UPSTASH_REDIS_URL_TCP, { tls: {} })`
  Creates a Redis TCP client (configured for TLS here). This client subscribes to a pub/sub channel to receive messages.
* `closed = false` — flag used to stop enqueueing after the stream is closed.
* `controllerRef` — holds the `ReadableStream` controller so the Redis callback can push bytes into the stream.
* `encoder = new TextEncoder()` — used to convert strings into `Uint8Array` bytes required by the ReadableStream.

### Message handler

```ts
const messageHandler = (channel: string, message: string) => {
  if (closed) return;
  if (controllerRef) controllerRef.enqueue(encoder.encode(`data: ${message}\n\n`));
};
```

* When Redis emits `message` for our subscribed channel, this function formats it as an SSE `data:` line and enqueues it into the HTTP response stream.
* Format `data: <payload>\n\n` is the SSE protocol for a single event (two newlines end the event).

### Keep-alive ping

* `setInterval(() => controller.enqueue(encoder.encode(': keep-alive\n\n')), 10_000)`
  Sends a comment line `: keep-alive` every 10 seconds. This prevents idle connection timeouts (some proxies drop long-idle HTTP connections). The colon `:` makes it a comment per SSE spec — ignored by EventSource but keeps the connection alive.

### ReadableStream lifecycle

The stream is a `ReadableStream<Uint8Array>` with two lifecycle hooks:

* `start(controller)`:

  * Stores `controller` to `controllerRef`.
  * `await redisSubscriber.subscribe(channelName)` — subscribes the client to the Pub/Sub channel.
  * `redisSubscriber.on("message", messageHandler)` — registers the message handler.
  * Starts the keep-alive interval.

* `cancel(reason)`:

  * Triggered when the client disconnects (e.g., `EventSource.close()` or network drop).
  * Sets `closed = true`, clears keep-alive interval, removes Redis listener, unsubscribes, and `quit()` the Redis client to free resources.

This ensures **clean teardown** when a browser disconnects.

### Final Response

```ts
return new Response(stream, {
  headers: {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  },
});
```

* `Content-Type: text/event-stream` tells browsers this is SSE.
* `Cache-Control: no-cache` prevents caches from storing the stream.
* `Connection: keep-alive` indicates a long-running connection.

---

## Client side (React `useEffect` with `EventSource`)

```ts
useEffect(() => {
  const evtSource = new EventSource("/api/stream");
  evtSource.onmessage = (event) => {
    if (!event.data) return;
    const data = JSON.parse(event.data);
    showSuccessToast(data.message, { icon: "📢" });
    setNotifications((prev) => [data, ...prev]);
  };
  return () => evtSource.close();
}, [setNotifications]);
```

Step-by-step:

1. `new EventSource("/api/stream")` — opens an SSE connection to the server endpoint.
2. `evtSource.onmessage` — receives messages formatted as `data: <payload>` (the browser places the `<payload>` into `event.data`).
3. `JSON.parse(event.data)` — convert JSON string to object (publisher should send serialized JSON).
4. `showSuccessToast(...)` and `setNotifications(...)` — UX behavior: notify the user and add the notification to the list.
5. Cleanup: `evtSource.close()` on unmount to close the connection and trigger server `cancel()`.

---

## End-to-end flow

1. Some part of your system publishes to Redis: `redisPublisher.publish(channelName, JSON.stringify(payload))`.
2. Redis delivers that message to all subscribers (this `GET` endpoint is one).
3. The server receives the message via `messageHandler` and enqueues an SSE `data:` packet into the `ReadableStream`.
4. The client’s `EventSource` gets the message, `onmessage` fires, and your UI updates.

---

## Protocol / format notes

* **SSE message**: each event is composed of `data: <line>\n` lines followed by a blank line `\n`. Usually you send one `data:` line with a JSON payload, then `\n\n`.
* **Comments**: lines starting with `:` are comments, used here for keep-alive pings.
* **Reconnection**: `EventSource` automatically reconnects if the connection drops (browser retry behavior). Server can send `retry: <ms>` to suggest reconnection interval.

---

## Safety, reliability & operational notes

### Connection cleanup & memory leaks

* Always remove Redis listeners and `quit()` the Redis client in `cancel` to avoid leaked sockets.
* Using `closed` prevents enqueuing to a closed stream.

### Keep-alive

* Important behind proxies/load-balancers (prevents them from closing idle connections). The `: keep-alive\n\n` comment is cheap and safe.

### Serverless environments

* Some serverless platforms (e.g., AWS Lambda) are not ideal for long-lived TCP connections. If using serverless, prefer:

  * A dedicated long-running server (e.g., edge worker or Node process), or
  * Upstash serverless REST pub/sub for event delivery, or
  * A WebSocket service for heavy two-way needs.

### Redis client strategy

* Recreating a new Redis TCP connection per request can be expensive at scale (connection churn). Use connection pooling or reuse long-lived subscribers where runtime allows (global reuse in Node).
* In serverless, Upstash has an HTTP-based pub/sub that is more serverless-friendly.

### Authentication & Authorization

* SSE endpoint is just an HTTP endpoint. Protect it using cookies/headers/session checks if notifications are per-user. Otherwise anyone can open the stream.
* If notifications must be per-user, you’ll subscribe to a user-specific channel and authorize the request before subscribing.

### Message format & parsing

* Publisher should `JSON.stringify` the payload. The server streams the same string; the browser calls `JSON.parse`.
* Consider including an `event` or `id` field if you want named events or resume behavior:

  ```
  id: 123
  event: notification
  data: {"message":"hi"}

  ```

---

## Improvements & suggestions

* Use SSE `id:` to enable clients to resume (server can store last delivered `id` to re-send missed messages).
* Add `event:` lines for typed events and use `addEventListener('notification', handler)` on client.
* Add server-side rate-limiting/validation for incoming Redis messages if they originate from untrusted sources.
* Consider batching messages or applying backpressure strategies if you could receive bursts.

---

## Example publisher (pseudo)

Server code that sends a notification to the same `channelName`:

```ts
const redisPublisher = new Redis(process.env.UPSTASH_REDIS_URL_TCP, { tls:{} });
const payload = { message: "New comment on your post", postId: "abc123" };
await redisPublisher.publish(channelName, JSON.stringify(payload));
```

Clients subscribed to `/api/stream` will receive it as `event.data === '{"message":"New comment...","postId":"abc123"}'`.

---

## Closing note

This pattern (Redis pub/sub → SSE → EventSource) is a simple, low-overhead way to stream one-way real-time notifications to browsers. It is well-suited for notification feeds, live logs, or server events where bidirectional communication (WebSockets) is not needed.

If you want, I can convert this explanation into a markdown file with inline code comments for direct inclusion in your repo docs.


*/
