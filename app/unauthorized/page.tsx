import Link from "next/link";

interface PageProps {}

function Page({}: PageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-5xl font-extrabold text-red-600">403</h1>
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">
          Access Denied
        </h2>
        <p className="mb-6 text-gray-600">
          Sorry, you do not have permission to access this page.
        </p>
        <Link
          href="/"
          className="inline-block rounded bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}

export default Page;
