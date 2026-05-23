"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  Star,
  PlayCircle,
  X,
  Trash2,
} from "lucide-react";

const products = [
  {
    slug: "rg-5x-360-vision",
    model: "RG-5X 360° Vision Dash Cam",
    price: "$40.00",
    compareAt: "$79.99",
    image: "/dashcam-5camera-card.png",
    images: ["/dashcam-5camera-card.png", "/dashcam-5camera.png"],
    video: "",
    description:
      "Complete 360-style multi-angle dash cam protection with front, rear, left, right, and inside recording support.",
  },

  {
    slug: "rg-x2-4k-smart-vision",
    model: "RG-X2 4K Smart Vision",
    price: "$60.00",
    compareAt: "$119.99",
    image: "/dashcam-60.png",
    images: ["/dashcam-60.png", "/rgx2-1.png", "/rgx2-2.png"],
    video: "",
    description:
      "Premium 4K dash cam with sleek low-profile installation and crystal-clear road recording.",
  },

  {
    slug: "rg-m1-mirror-view",
    model: "RG-M1 Mirror View Dash Cam",
    price: "$75.00",
    compareAt: "$129.99",
    image: "/dashcam-mirror.png",
    images: ["/dashcam-mirror.png", "/rgm1-1.png", "/rgm1-2.png"],
    video: "",
    description:
      "Mirror-style dash cam with rear camera support and wide-angle recording.",
  },

  {
    slug: "rg-r1-radar-dash-recorder",
    model: "RG-R1 Radar Dash Recorder",
    price: "$80.00",
    compareAt: "$149.99",
    image: "/radar-1.png",
    images: ["/radar-1.png", "/radar-2.png"],
    video: "/radar-video.mp4",
    description:
      "Radar-style dash recorder with speed monitoring and built-in display.",
  },
];

type Product = (typeof products)[number];

type CartItem = {
  slug: string;
  model: string;
  price: string;
  image: string;
  quantity: number;
};

function priceToNumber(price: string) {
  return Number(price.replace("$", ""));
}

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = products.find((item) => item.slug === slug);

  const [mediaIndex, setMediaIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("roadguard-cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("roadguard-cart", JSON.stringify(cart));
  }, [cart]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050814] text-white">
        Product not found
      </div>
    );
  }

  const mediaItems = product.video
    ? [...product.images, product.video]
    : product.images;

  const currentMedia = mediaItems[mediaIndex];
  const isVideo = currentMedia.endsWith(".mp4");

  const nextMedia = () => {
    setMediaIndex((prev) =>
      prev === mediaItems.length - 1 ? 0 : prev + 1
    );
  };

  const previousMedia = () => {
    setMediaIndex((prev) =>
      prev === 0 ? mediaItems.length - 1 : prev - 1
    );
  };

  const addToCart = (item: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.slug === item.slug
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.slug === item.slug
            ? {
                ...cartItem,
                quantity: cartItem.quantity + quantity,
              }
            : cartItem
        );
      }

      return [
        ...currentCart,
        {
          slug: item.slug,
          model: item.model,
          price: item.price,
          image: item.image,
          quantity,
        },
      ];
    });
  };

  const checkout = async () => {
    try {
      setIsCheckingOut(true);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
      alert("Checkout failed.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce((total, item) => {
    return total + priceToNumber(item.price) * item.quantity;
  }, 0);

  const productTotal = priceToNumber(product.price) * quantity;

  return (
    <div className="min-h-screen bg-[#050814] text-white">

      {lightboxOpen && !isVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-6">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-6 top-6"
          >
            <X />
          </button>

          <img
            src={currentMedia}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}

      <div className="sticky top-0 z-40 border-b border-blue-500/20 bg-[#050814]/90 px-6 py-5 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <Link href="/" className="text-2xl font-black">
            ROADGUARD
          </Link>

          <div className="relative">

            <button className="relative flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-white/5">
              <ShoppingCart className="h-5 w-5" />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-black">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>

      </div>

      <main className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-12 lg:grid-cols-2">

          <section>

            <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-[#08111f]">

              {isVideo ? (
                <video
                  src={currentMedia}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-[520px] w-full object-cover"
                />
              ) : (
                <img
                  src={currentMedia}
                  alt={product.model}
                  onClick={() => setLightboxOpen(true)}
                  className="h-[520px] w-full cursor-zoom-in object-cover"
                />
              )}

              <button
                onClick={previousMedia}
                className="absolute left-4 top-1/2"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={nextMedia}
                className="absolute right-4 top-1/2"
              >
                <ChevronRight />
              </button>

            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto">

              {mediaItems.map((item, index) => (
                <button
                  key={item}
                  onClick={() => setMediaIndex(index)}
                >
                  {item.endsWith(".mp4") ? (
                    <div className="flex h-24 w-24 items-center justify-center bg-black">
                      <PlayCircle />
                    </div>
                  ) : (
                    <img
                      src={item}
                      alt=""
                      className="h-24 w-24 object-cover"
                    />
                  )}
                </button>
              ))}

            </div>

          </section>

          <section>

            <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-center">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-green-300">
                FREE SHIPPING ON ORDERS OVER $100
              </p>
            </div>

            <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-300">
              ROADGUARD
            </p>

            <h1 className="mt-3 text-5xl font-black">
              {product.model}
            </h1>

            <div className="mt-4 flex gap-1 text-blue-300">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-5 w-5 fill-blue-300"
                />
              ))}
            </div>

            <p className="mt-5 text-lg leading-8 text-blue-100/70">
              {product.description}
            </p>

            <div className="mt-8 flex items-end gap-3">

              <span className="text-5xl font-black text-blue-300">
                {product.price}
              </span>

              <span className="pb-2 text-xl text-blue-100/35 line-through">
                {product.compareAt}
              </span>

            </div>

            <div className="mt-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
              <p className="text-sm font-bold text-yellow-200">
                Promo codes available at checkout.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-blue-500/20 bg-white/5 p-4">
                <ShieldCheck className="mb-2 h-6 w-6 text-blue-300" />

                <p className="font-black">
                  24H Protection
                </p>

                <p className="mt-1 text-sm text-blue-100/60">
                  Smart continuous recording support.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-white/5 p-4">
                <Truck className="mb-2 h-6 w-6 text-blue-300" />

                <p className="font-black">
                  Fast Shipping
                </p>

                <p className="mt-1 text-sm text-blue-100/60">
                  Ships within 3–7 business days.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-white/5 p-4">
                <RotateCcw className="mb-2 h-6 w-6 text-blue-300" />

                <p className="font-black">
                  14-Day Returns
                </p>

                <p className="mt-1 text-sm text-blue-100/60">
                  Hassle-free returns.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-white/5 p-4">
                <Lock className="mb-2 h-6 w-6 text-blue-300" />

                <p className="font-black">
                  Secure Checkout
                </p>

                <p className="mt-1 text-sm text-blue-100/60">
                  Stripe encrypted payment system.
                </p>
              </div>

            </div>

            <div className="mt-8 flex items-center gap-3">

              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-11 w-11 border border-blue-500/35"
              >
                -
              </button>

              <span className="w-10 text-center text-xl font-bold">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="h-11 w-11 border border-blue-500/35"
              >
                +
              </button>

              <span className="ml-auto text-lg font-bold text-blue-200">
                Total: ${productTotal.toFixed(2)}
              </span>

            </div>

            <div className="mt-8 flex flex-col gap-4">

              <Button
                onClick={() => addToCart(product)}
                className="h-14 rounded-none bg-blue-600 text-base font-black hover:bg-blue-500"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                ADD TO CART
              </Button>

              <Button
                onClick={checkout}
                disabled={isCheckingOut}
                className="h-14 rounded-none border border-blue-500/30 bg-transparent text-white hover:bg-white/10"
              >
                {isCheckingOut ? "LOADING..." : "BUY NOW"}
              </Button>

            </div>

            <div className="mt-12 rounded-3xl border border-blue-500/20 bg-white/5 p-6">

              <h3 className="text-2xl font-black">
                Customer Reviews
              </h3>

              <div className="mt-6 space-y-5">

                <div className="rounded-2xl border border-blue-500/10 bg-[#08111f] p-4">
                  <p className="font-black">
                    ★★★★★ — Michael R.
                  </p>

                  <p className="mt-2 text-blue-100/70">
                    Super clean setup and premium quality.
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-500/10 bg-[#08111f] p-4">
                  <p className="font-black">
                    ★★★★★ — David L.
                  </p>

                  <p className="mt-2 text-blue-100/70">
                    Amazing night vision and very easy install.
                  </p>
                </div>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}