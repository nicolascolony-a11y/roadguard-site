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
    tags: "5 Cameras · WiFi · 24H Monitor",
    badge: "Best Deal",
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
    tags: "4K · Low-Profile · Premium Build",
    badge: "Sharpest View",
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
    tags: "1080P · Mirror Display · Rear Camera",
    badge: "Driver Favorite",
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
    tags: "Radar Alert · Dash Recorder · Speed Monitor",
    badge: "Smart Alert",
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
        <div className="text-center">
          <h1 className="text-5xl font-black">Product not found</h1>

          <Link href="/" className="mt-6 inline-block text-blue-300">
            ← Go back home
          </Link>
        </div>
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

  const removeFromCart = (slug: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.slug !== slug)
    );
  };

  const updateCartQuantity = (slug: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.slug === slug ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const checkout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

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
      } else {
        alert("Checkout failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Checkout error.");
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-6 backdrop-blur">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 hover:bg-white/20"
          >
            <X />
          </button>

          <button
            onClick={previousMedia}
            className="absolute left-6 rounded-full bg-white/10 p-4 hover:bg-white/20"
          >
            <ChevronLeft />
          </button>

          <img
            src={currentMedia}
            alt=""
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
          />

          <button
            onClick={nextMedia}
            className="absolute right-6 rounded-full bg-white/10 p-4 hover:bg-white/20"
          >
            <ChevronRight />
          </button>
        </div>
      )}

      <div className="sticky top-0 z-40 border-b border-blue-500/20 bg-[#050814]/90 px-6 py-5 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight">
            ROADGUARD
          </Link>

          <div className="group relative">
            <button className="relative flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-white/5 hover:bg-blue-600">
              <ShoppingCart className="h-5 w-5" />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-black">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="invisible absolute right-0 top-14 w-[360px] rounded-2xl border border-blue-500/20 bg-[#071225] p-5 opacity-0 shadow-[0_0_45px_rgba(37,99,235,0.25)] backdrop-blur transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <h3 className="text-lg font-black">Your Cart</h3>

              {cart.length === 0 ? (
                <p className="mt-4 text-sm text-blue-100/50">
                  Your cart is empty.
                </p>
              ) : (
                <>
                  <div className="mt-4 max-h-[320px] space-y-4 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.slug}
                        className="flex gap-3 border-b border-blue-500/10 pb-4"
                      >
                        <img
                          src={item.image}
                          alt={item.model}
                          className="h-16 w-16 rounded-xl object-cover"
                        />

                        <div className="flex-1">
                          <p className="text-sm font-black leading-tight">
                            {item.model}
                          </p>

                          <p className="mt-1 text-sm text-blue-300">
                            {item.price}
                          </p>

                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.slug,
                                  item.quantity - 1
                                )
                              }
                              className="h-7 w-7 border border-blue-500/30 bg-white/5 font-black hover:bg-blue-600"
                            >
                              -
                            </button>

                            <span className="w-6 text-center text-sm font-bold">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.slug,
                                  item.quantity + 1
                                )
                              }
                              className="h-7 w-7 border border-blue-500/30 bg-white/5 font-black hover:bg-blue-600"
                            >
                              +
                            </button>

                            <button
                              onClick={() => removeFromCart(item.slug)}
                              className="ml-auto text-blue-100/50 hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-sm font-black text-blue-200">
                          $
                          {(
                            priceToNumber(item.price) * item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-blue-500/20 pt-4">
                    <span className="font-bold text-blue-100/70">
                      Total
                    </span>

                    <span className="text-xl font-black text-blue-300">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    onClick={checkout}
                    disabled={isCheckingOut}
                    className="mt-4 h-12 w-full rounded-none bg-blue-600 font-black hover:bg-blue-500"
                  >
                    {isCheckingOut ? "LOADING..." : "CHECKOUT"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-2">

          <section>
            <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-[#08111f] shadow-[0_0_45px_rgba(37,99,235,0.18)]">

              {isVideo ? (
                <video
                  src={currentMedia}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-[520px] w-full bg-black object-cover"
                />
              ) : (
                <img
                  src={currentMedia}
                  alt={product.model}
                  onClick={() => setLightboxOpen(true)}
                  className="h-[520px] w-full cursor-zoom-in object-cover"
                />
              )}

              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={previousMedia}
                    className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#050814]/80 hover:bg-blue-600"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={nextMedia}
                    className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#050814]/80 hover:bg-blue-600"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {mediaItems.map((item, index) => (
                <button
                  key={item}
                  onClick={() => setMediaIndex(index)}
                  className={`overflow-hidden rounded-xl border ${
                    mediaIndex === index
                      ? "border-blue-300 shadow-[0_0_20px_rgba(96,165,250,0.45)]"
                      : "border-blue-500/20"
                  }`}
                >
                  {item.endsWith(".mp4") ? (
                    <div className="flex h-24 w-24 flex-col items-center justify-center bg-black text-xs font-black text-white">
                      <PlayCircle className="mb-1 h-5 w-5 text-blue-300" />
                      VIDEO
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

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-11 w-11 border border-blue-500/35 bg-[#08111f] text-xl font-black hover:bg-blue-600"
              >
                -
              </button>

              <span className="w-10 text-center text-xl font-bold">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="h-11 w-11 border border-blue-500/35 bg-[#08111f] text-xl font-black hover:bg-blue-600"
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
                className="h-14 rounded-none border border-blue-500/30 bg-transparent text-white hover:bg-white/10"
              >
                BUY NOW
              </Button>
            </div>
          </section>
        </div>

        <section className="mt-16 rounded-3xl border border-blue-500/20 bg-white/5 p-6 text-blue-100/70">
          <h2 className="text-2xl font-black text-white">
            Shipping, Returns & Support
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div>
              <p className="font-black text-blue-300">Shipping</p>

              <p className="mt-2 text-sm">
                Orders typically ship within 3–7 business days after payment confirmation.
              </p>
            </div>

            <div>
              <p className="font-black text-blue-300">Returns</p>

              <p className="mt-2 text-sm">
                14-day returns accepted on unused items in original condition.
              </p>
            </div>

            <div>
              <p className="font-black text-blue-300">Support</p>

              <p className="mt-2 text-sm">
                Questions? Contact us at support@roadguard.com
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}