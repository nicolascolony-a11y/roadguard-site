import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050814] px-6 text-white">
      <div className="max-w-xl text-center">
        <XCircle className="mx-auto mb-6 h-20 w-20 text-blue-300" />
        <h1 className="text-5xl font-black">Checkout Canceled</h1>
        <p className="mt-4 text-blue-100/70">
          No payment was taken. You can return to the shop and finish your order anytime.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block bg-blue-600 px-8 py-4 font-black hover:bg-blue-500"
        >
          RETURN TO SHOP
        </Link>
      </div>
    </div>
  );
}