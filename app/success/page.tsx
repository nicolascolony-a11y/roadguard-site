import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050814] px-6 text-white">
      <div className="max-w-xl text-center">
        <CheckCircle2 className="mx-auto mb-6 h-20 w-20 text-blue-300" />
        <h1 className="text-5xl font-black">Payment Successful</h1>
        <p className="mt-4 text-blue-100/70">
          Thank you for your RoadGuard order. You’ll receive your payment confirmation by email.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block bg-blue-600 px-8 py-4 font-black hover:bg-blue-500"
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}