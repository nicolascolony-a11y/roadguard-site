import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      throw new Error("Missing Stripe Secret Key");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-04-30.basil",
    });

    const body = await request.json();
    const cart = body.cart;

    const line_items = cart.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.model,
          images: [
            `${process.env.NEXT_PUBLIC_SITE_URL}${item.image}`,
          ],
        },
        unit_amount: Math.round(
          Number(item.price.replace("$", "")) * 100
        ),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Error:", error);

    return NextResponse.json(
      { error: "Checkout failed." },
      { status: 500 }
    );
  }
}