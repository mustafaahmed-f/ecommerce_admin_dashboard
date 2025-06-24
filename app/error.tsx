"use client";

import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold text-red-600">
        Something went wrong!
      </h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="bg-accent-500 text-primary-800 inline-block cursor-pointer px-6 py-3 text-lg hover:underline"
        onClick={reset}
      >
        Try again
      </button>
      <button
        className="bg-accent-500 text-primary-800 inline-block cursor-pointer px-6 py-3 text-lg hover:underline"
        onClick={() => router.back()}
      >
        Return back
      </button>
    </section>
  );
}
