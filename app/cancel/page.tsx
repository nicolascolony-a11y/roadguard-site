import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 text-black">
      <div className="w-full max-w-xl rounded-3xl border border-black/10 bg-white p-10 shadow-2xl">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-black text-4xl font-black">
            ×
          </div>
        </div>

        <h1 className="mt-8 text-center text-5xl font-black">
          Checkout Failed
        </h1>

        <p className="mt-5 text-center text-lg text-black/70">
          Your payment could not be completed or was canceled.
        </p>

        <p className="mt-2 text-center text-black/50">
          Please return to the store and try again.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="flex h-14 items-center justify-center bg-black text-sm font-black tracking-wide text-white transition hover:bg-black/80"
          >
            RETURN TO STORE
          </Link>
        </div>
      </div>
    </div>
  );
}