"use client";

import { dummyMessages } from "../utils/DummyMessages";

interface MessagesUIProps {}

function MessagesUI({}: MessagesUIProps) {
  return (
    <div className="w-full rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold text-[var(--color-foreground)]">
        Messages
      </h2>

      <div className="space-y-4">
        {dummyMessages.map((msg) => (
          <div
            key={msg.id}
            className="flex flex-col rounded-lg border border-[var(--color-border)] p-4 transition hover:shadow md:flex-row md:items-center md:justify-between"
          >
            <div className="flex-1">
              <p className="text-base font-semibold text-[var(--color-foreground)]">
                {msg.name}
              </p>
              <p className="text-sm text-[var(--color-muted-foreground)]">
                {msg.email}
              </p>
              <p className="mt-2 text-sm text-[var(--color-foreground)]">
                {msg.content}
              </p>
            </div>
            {/* <div className="mt-4 md:mt-0 md:ml-6">
              <button className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm text-[var(--color-primary-foreground)] hover:opacity-90">
                Reply
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessagesUI;
