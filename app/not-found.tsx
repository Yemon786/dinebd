import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-[65vh] flex flex-col items-center justify-center px-4 text-center bg-white"
    >
      <p className="text-9xl font-bold text-orange-500 leading-none mb-4">404</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
      <p className="text-gray-500 mb-10 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="bg-[#ED7319] hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          Back to Home
        </Link>
        <Link
          href="/contact-us"
          className="border-2 border-[#ED7319] text-[#ED7319] hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold transition"
        >
          Contact Support
        </Link>
      </div>
    </main>
  );
}
