import { NextResponse } from "next/server";

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

    const line_items = cart.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.model,
        },
        unit_amount: Math.round(
          Number(item.price.replace("$", "")) * 100
        ),
      },
      quantity: item.quantity,
    }));

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://roadguard-site.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/cancel`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}