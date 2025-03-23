import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-9xl font-extrabold text-gray-700">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="mt-6 text-base text-gray-600">
            Sorry, we could not find the page you are looking for.
          </p>
          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
