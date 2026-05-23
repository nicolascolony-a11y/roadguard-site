import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050814] px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-blue-300 hover:text-white">
          ← Back to RoadGuard
        </Link>

        <h1 className="mt-8 text-5xl font-black">Privacy Policy</h1>

        <p className="mt-6 text-blue-100/70">
          RoadGuard respects your privacy. This policy explains how we collect,
          use, and protect information when you visit our website or place an
          order.
        </p>

        <div className="mt-10 space-y-8 text-blue-100/70">
          <section>
            <h2 className="text-2xl font-black text-white">Information We Collect</h2>
            <p className="mt-3">
              We may collect your name, email address, shipping address, billing
              details, phone number, order information, and website usage data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">How We Use Information</h2>
            <p className="mt-3">
              We use your information to process orders, ship products, provide
              customer support, improve our website, prevent fraud, and send
              order-related updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Payments</h2>
            <p className="mt-3">
              Payments are processed securely through Stripe. RoadGuard does not
              store full credit card numbers on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Sharing Information</h2>
            <p className="mt-3">
              We may share necessary information with payment processors,
              shipping carriers, and service providers needed to complete your
              order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Contact</h2>
            <p className="mt-3">
              For privacy questions, contact us at support@roadguard.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}