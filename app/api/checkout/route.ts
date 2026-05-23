import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const { cart } = await request.json();

    const lineItems = cart.map((item: any) => {
      const priceNumber = Number(item.price.replace("$", ""));

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.model,
            images: [`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}${item.image}`],
          },
          unit_amount: Math.round(priceNumber * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      { error: "Something went wrong creating checkout." },
      { status: 500 }
    );
  }
}