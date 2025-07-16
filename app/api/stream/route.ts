import Redis from "ioredis";
import { channelName } from "@/app/_utils/constants/redisPublishChannel";

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
