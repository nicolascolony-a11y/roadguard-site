"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  Wifi,
  Moon,
  Camera,
  Car,
  CheckCircle2,
  Zap,
  BadgeCheck,
  Smartphone,
  CircleDollarSign,
  ShieldAlert,
  MapPinned,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const heroSlides = [
  {
    model: "RG-5X 360° Vision Dash Cam",
    headline: "5 Cameras. Complete Coverage.",
    subline:
      "Front, rear, left, right, and inside recording with WiFi app support and 24H monitoring.",
    badge: "Best Deal",
    image: "/dashcam-5camera.png",
  },
  {
    model: "RG-X2 4K Smart Vision",
    headline: "Sharper Vision. Smarter Driving.",
    subline:
      "Modern low-profile 4K dash cam with premium styling and enhanced visibility.",
    badge: "4K Clarity",
    image: "/dashcam-60.png",
  },
  {
    model: "RG-M1 Mirror View Dash Cam",
    headline: "Mirror View. Smart Protection.",
    subline:
      "Mirror-style dash cam with motion detection and rear camera support.",
    badge: "Mirror Display",
    image: "/dashcam-mirror.png",
  },
];

const products = [
  {
    slug: "rg-5x-360-vision",
    model: "RG-5X 360° Vision Dash Cam",
    price: "$40.00",
    compareAt: "$79.99",
    image: "/dashcam-5camera-card.png",
    tags: "5 Cameras · WiFi · 24H Monitor",
    badge: "Best Deal",
  },
  {
    slug: "rg-x2-4k-smart-vision",
    model: "RG-X2 4K Smart Vision",
    price: "$60.00",
    compareAt: "$119.99",
    image: "/dashcam-60.png",
    tags: "4K · Premium Build",
    badge: "Sharpest View",
  },
  {
    slug: "rg-m1-mirror-view",
    model: "RG-M1 Mirror View Dash Cam",
    price: "$75.00",
    compareAt: "$129.99",
    image: "/dashcam-mirror.png",
    tags: "Mirror Display · Rear Camera",
    badge: "Driver Favorite",
  },
  {
    slug: "rg-r1-radar-dash-recorder",
    model: "RG-R1 Radar Dash Recorder",
    price: "$80.00",
    compareAt: "$149.99",
    image: "/radar-1.png",
    tags: "Radar Alert · Speed Monitor",
    badge: "Smart Alert",
  },
];

const features = [
  {
    icon: Camera,
    title: "Multi-Angle Recording",
    text: "Capture what happens around your vehicle.",
  },
  {
    icon: Wifi,
    title: "WiFi Viewing",
    text: "Access footage directly from your phone.",
  },
  {
    icon: Moon,
    title: "Night Support",
    text: "Enhanced low-light recording quality.",
  },
  {
    icon: ShieldCheck,
    title: "Parking Protection",
    text: "Protection while your vehicle is parked.",
  },
];

const reviews = [
  {
    name: "Marcus T.",
    text: "Super clean setup and surprisingly premium quality.",
  },
  {
    name: "Daniel R.",
    text: "Excellent quality and easy installation.",
  },
  {
    name: "Kevin S.",
    text: "Bought another one for my wife’s car.",
  },
];

export default function DashcamLandingPage() {
  const [slide, setSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [navScrolled, setNavScrolled] = useState(false);

  const { scrollYProgress } = useScroll();

  const heroImageScale = useTransform(scrollYProgress, [0, 0.35], [1.04, 1.12]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 90,
    damping: 24,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 90,
    damping: 24,
  });

  const current = heroSlides[slide];

  const total = useMemo(
    () => `$${(40 * quantity).toFixed(2)}`,
    [quantity]
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 18);

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const nextSlide = () =>
    setSlide((prev) => (prev + 1) % heroSlides.length);

  const previousSlide = () =>
    setSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050814] text-white">

      <motion.div
        style={{ x: smoothMouseX, y: smoothMouseY }}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl lg:block"
      />

      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-[999] h-1 w-full origin-left bg-gradient-to-r from-blue-500 via-cyan-300 to-blue-600"
      />

      {/* HEADER */}

      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-all duration-300 ${
          navScrolled
            ? "border-blue-300/25 bg-[#050814]/75"
            : "border-blue-500/20 bg-[#050814]/85"
        }`}
      >

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">

          <div className="flex items-center gap-4">

            <a href="#top" className="flex items-center gap-3">

              <img
                src="/roadguard-logo.png"
                alt="RoadGuard"
                className="h-10 w-auto"
              />

              <div>

                <p className="text-2xl font-black tracking-tight text-white">
                  RoadGuard
                </p>

                <p className="text-xs text-blue-200/60">
                  Premium dash cams for everyday drivers
                </p>

              </div>

            </a>

          </div>

          <div className="flex items-center gap-4">

            <a
              href="sms:+17262032252"
              className="hidden items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-black text-green-300 transition hover:bg-green-500 hover:text-white md:flex"
            >
              TEXT SUPPORT
            </a>

            <Button
              asChild
              className="rounded-none bg-blue-600 px-5 font-bold text-white hover:bg-blue-500"
            >
              <a href="#products">SHOP NOW</a>
            </Button>

          </div>

        </div>

      </header>

      {/* HERO */}

      <section
        id="top"
        className="relative min-h-[700px] overflow-hidden border-b border-blue-500/20"
      >

        <motion.img
          key={current.model}
          src={current.image}
          alt=""
          style={{ scale: heroImageScale }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#050814] via-[#071225]/70 to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-[700px] max-w-7xl items-center px-6">

          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 border border-blue-300/25 bg-blue-500/10 px-3 py-2 text-xs font-black uppercase tracking-[0.25em] text-blue-200">
              <Zap className="h-4 w-4" />
              {current.badge}
            </div>

            <h1 className="mt-6 text-6xl font-black leading-[0.95] tracking-tight">
              {current.headline}
            </h1>

            <p className="mt-6 text-xl font-black text-blue-100">
              {current.model}
            </p>

            <p className="mt-3 max-w-lg text-base leading-7 text-blue-100/70">
              {current.subline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Button
                asChild
                className="rounded-none bg-blue-600 px-10 py-6 text-base font-black hover:bg-blue-500"
              >
                <a href="#products">SHOP DASH CAMS</a>
              </Button>

              <a
                href="#reviews"
                className="flex items-center text-sm font-bold text-blue-100/70 transition hover:text-white"
              >
                See reviews →
              </a>

            </div>

          </div>

        </div>

        <button
          onClick={previousSlide}
          className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#08111f]/80 hover:bg-blue-600"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#08111f]/80 hover:bg-blue-600"
        >
          <ChevronRight />
        </button>

      </section>

      {/* PRODUCTS */}

      <section id="products" className="mx-auto max-w-7xl px-6 py-20">

        <div className="mb-10 text-center">

          <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-300">
            Featured Lineup
          </p>

          <h2 className="mt-3 text-5xl font-black">
            Trending Dash Cams
          </h2>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {products.map((item) => (

            <Card
              key={item.slug}
              className="overflow-hidden rounded-2xl border border-blue-500/20 bg-white/5 transition hover:-translate-y-2 hover:border-blue-400"
            >

              <div className="relative h-[320px] overflow-hidden bg-[#08111f]">

                <img
                  src={item.image}
                  alt={item.model}
                  className="h-full w-full object-cover"
                />

              </div>

              <CardContent className="p-5">

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  RoadGuard
                </p>

                <h3 className="mt-2 text-xl font-black">
                  {item.model}
                </h3>

                <p className="mt-2 text-sm text-blue-100/55">
                  {item.tags}
                </p>

                <div className="mt-4 flex items-end gap-2">

                  <span className="text-3xl font-black text-blue-300">
                    {item.price}
                  </span>

                  <span className="pb-1 text-sm text-neutral-400 line-through">
                    {item.compareAt}
                  </span>

                </div>

                <Button
                  asChild
                  className="mt-5 w-full rounded-none bg-blue-600 font-black hover:bg-blue-500"
                >
                  <a href={`/product/${item.slug}`}>
                    VIEW ITEM
                  </a>
                </Button>

              </CardContent>

            </Card>

          ))}

        </div>

      </section>

      {/* FEATURES */}

      <section className="border-y border-blue-500/20 bg-[#071225] px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center">

            <h2 className="text-4xl font-black">
              Built for real-world driving
            </h2>

          </div>

          <div className="grid gap-5 md:grid-cols-4">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (

                <Card
                  key={feature.title}
                  className="rounded-2xl border border-blue-500/20 bg-white/5"
                >

                  <CardContent className="p-6">

                    <Icon className="mb-5 h-8 w-8 text-blue-300" />

                    <h3 className="text-lg font-black">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm text-blue-100/55">
                      {feature.text}
                    </p>

                  </CardContent>

                </Card>

              );
            })}

          </div>

        </div>

      </section>

      {/* REVIEWS */}

      <section
        id="reviews"
        className="mx-auto max-w-7xl px-6 py-20"
      >

        <div className="mb-12 text-center">

          <h2 className="text-4xl font-black">
            Drivers love the peace of mind
          </h2>

          <div className="mt-3 flex justify-center gap-1 text-blue-300">

            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-blue-300" />
            ))}

          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-3">

          {reviews.map((review) => (

            <Card
              key={review.name}
              className="rounded-2xl border border-blue-500/20 bg-white/5"
            >

              <CardContent className="p-7">

                <p className="text-blue-100/70">
                  “{review.text}”
                </p>

                <p className="mt-5 font-black">
                  {review.name}
                </p>

              </CardContent>

            </Card>

          ))}

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-blue-500/20 bg-[#050814] px-6 py-10 text-center text-sm text-blue-100/45">

        <div className="flex flex-col items-center justify-center gap-4">

          <img
            src="/roadguard-logo.png"
            alt="RoadGuard"
            className="h-10 w-auto"
          />

          <p>
            RoadGuard · Smart dash cam protection
          </p>

        </div>

      </footer>

    </div>
  );
}