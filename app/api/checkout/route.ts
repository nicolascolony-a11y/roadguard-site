import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY" },
        { status: 500 }
      );
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeSecretKey);

    const { cart } = await request.json();

    const cartTotal = cart.reduce((total: number, item: any) => {
      return total + Number(item.price.replace("$", "")) * item.quantity;
    }, 0);

    const line_items = cart.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.model,
        },
        unit_amount: Math.round(Number(item.price.replace("$", "")) * 100),
      },
      quantity: item.quantity,
    }));

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://roadguard-site.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options:
        cartTotal >= 100
          ? [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: {
                    amount: 0,
                    currency: "usd",
                  },
                  display_name: "Free Shipping",
                  delivery_estimate: {
                    minimum: { unit: "business_day", value: 3 },
                    maximum: { unit: "business_day", value: 7 },
                  },
                },
              },
            ]
          : [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: {
                    amount: 599,
                    currency: "usd",
                  },
                  display_name: "Standard Shipping",
                  delivery_estimate: {
                    minimum: { unit: "business_day", value: 3 },
                    maximum: { unit: "business_day", value: 7 },
                  },
                },
              },
            ],
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}