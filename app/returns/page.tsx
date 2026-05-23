import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#050814] px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-blue-300 hover:text-white">
          ← Back to RoadGuard
        </Link>

        <h1 className="mt-8 text-5xl font-black">
          Returns & Refund Policy
        </h1>

        <p className="mt-6 text-blue-100/70">
          At RoadGuard, customer satisfaction is important to us. Please review
          our return and refund guidelines below.
        </p>

        <div className="mt-10 space-y-8 text-blue-100/70">

          <section>
            <h2 className="text-2xl font-black text-white">
              Return Eligibility
            </h2>

            <p className="mt-3">
              Returns are accepted within 14 days of delivery for unused items
              in original condition and packaging.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Non-Returnable Items
            </h2>

            <p className="mt-3">
              Used, damaged, modified, or improperly installed products may not
              qualify for a refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Refund Processing
            </h2>

            <p className="mt-3">
              Approved refunds are processed back to the original payment method
              within 5–10 business days after inspection.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Shipping Costs
            </h2>

            <p className="mt-3">
              Original shipping fees are non-refundable unless the item arrived
              defective or incorrect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Contact Support
            </h2>

            <p className="mt-3">
              For return requests or questions, contact us at
              support@roadguard.com.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}