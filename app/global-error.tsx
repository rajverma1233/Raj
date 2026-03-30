'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
          <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
          <p className="text-gray-400 mb-8">An unexpected error occurred.</p>
          <button 
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
