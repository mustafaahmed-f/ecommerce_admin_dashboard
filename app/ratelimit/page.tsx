"use client";

import { useRouter } from "next/navigation";

interface PageProps {}

function Page({}: PageProps) {
  const router = useRouter();
  return (
    <div className="flex h-full w-full items-center justify-center bg-white px-4">
      <div className="max-w-md rounded-xl border border-red-400 bg-red-100 p-8 text-center shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-red-700">
          ⚠ Rate Limit Reached
        </h1>
        <p className="text-lg text-red-600">
          You have exceeded the request limit. Please try again later.
        </p>
        <button
          className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          onClick={() => router.back()}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default Page;
