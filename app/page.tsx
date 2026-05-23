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

const brand = {
  name: "ROADGUARD",
  tagline: "Premium dash cams for everyday drivers",
};

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
      "Modern low-profile 4K dash cam with premium styling, discreet installation, and enhanced road visibility.",
    badge: "4K Clarity",
    image: "/dashcam-60.png",
  },
  {
    model: "RG-M1 Mirror View Dash Cam",
    headline: "Mirror View. Smart Protection.",
    subline:
      "1080P mirror-style dash cam with rear camera support, motion detection, G-sensor, and wide-angle recording.",
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
    tags: "4K · Low-Profile · Premium Build",
    badge: "Sharpest View",
  },
  {
    slug: "rg-m1-mirror-view",
    model: "RG-M1 Mirror View Dash Cam",
    price: "$75.00",
    compareAt: "$129.99",
    image: "/dashcam-mirror.png",
    tags: "1080P · Mirror Display · Rear Camera",
    badge: "Driver Favorite",
  },
  {
    slug: "rg-r1-radar-dash-recorder",
    model: "RG-R1 Radar Dash Recorder",
    price: "$80.00",
    compareAt: "$149.99",
    image: "/radar-1.png",
    tags: "Radar Alert · Dash Recorder · Speed Monitor",
    badge: "Smart Alert",
  },
];

const features = [
  {
    icon: Camera,
    title: "Multi-Angle Recording",
    text: "Front, cabin, rear, and multi-camera options help capture what happens around your vehicle.",
  },
  {
    icon: Wifi,
    title: "WiFi App Viewing",
    text: "Access clips from your phone without constantly removing the SD card.",
  },
  {
    icon: Moon,
    title: "Night Support",
    text: "Better visibility for night driving, parking lots, and low-light streets.",
  },
  {
    icon: ShieldCheck,
    title: "Parking Protection",
    text: "Extra peace of mind for parked cars, hit-and-runs, and unexpected incidents.",
  },
];

const trustStats = [
  { value: "10K+", label: "drivers protected" },
  { value: "4.9★", label: "average rating" },
  { value: "24H", label: "monitoring options" },
  { value: "USA", label: "fast shipping" },
];

const reasons = [
  {
    icon: ShieldAlert,
    title: "Accident Proof",
    text: "Capture the moments that matter when stories do not match.",
  },
  {
    icon: CircleDollarSign,
    title: "Insurance Support",
    text: "Clear video can help support claims, reports, and disputes.",
  },
  {
    icon: MapPinned,
    title: "Parking Safety",
    text: "Monitor your vehicle while parked outside, at work, or overnight.",
  },
  {
    icon: Smartphone,
    title: "Easy Clip Access",
    text: "WiFi viewing makes it easier to save and share important footage.",
  },
];

const reviews = [
  {
    name: "Marcus T.",
    text: "Clean design and easy setup. The multi-camera view is exactly what I wanted.",
  },
  {
    name: "Daniel R.",
    text: "Looks premium without the premium price. Great for daily driving.",
  },
  {
    name: "Kevin S.",
    text: "The parking protection is what sold me. Bought another one for my wife.",
  },
];

const smoothTransition = { duration: 0.55, ease: "easeOut" as const };

export default function DashcamLandingPage() {
  const [slide, setSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [navScrolled, setNavScrolled] = useState(false);

  const { scrollYProgress } = useScroll();

  const heroImageScale = useTransform(scrollYProgress, [0, 0.35], [1.04, 1.16]);
  const heroImageY = useTransform(scrollYProgress, [0, 0.35], [0, 55]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, {
    stiffness: 90,
    damping: 24,
    mass: 0.2,
  });
  const smoothMouseY = useSpring(mouseY, {
    stiffness: 90,
    damping: 24,
    mass: 0.2,
  });

  const current = heroSlides[slide];
  const total = useMemo(() => `$${(40 * quantity).toFixed(2)}`, [quantity]);

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

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

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
    <div className="relative min-h-screen overflow-hidden bg-[#050814] text-white selection:bg-blue-500/40">
      <motion.div
        style={{ x: smoothMouseX, y: smoothMouseY }}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl lg:block"
      />

      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-[999] h-1 w-full origin-left bg-gradient-to-r from-blue-500 via-cyan-300 to-blue-600 shadow-[0_0_22px_rgba(59,130,246,0.9)]"
      />

      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-all duration-300 ${
          navScrolled
            ? "border-blue-300/25 bg-[#050814]/75 shadow-[0_18px_70px_rgba(37,99,235,0.12)]"
            : "border-blue-500/20 bg-[#050814]/85"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-8">
            <a href="#top" className="group">
              <p className="text-2xl font-black tracking-tight text-white transition group-hover:text-blue-200">
                {brand.name}
              </p>
              <p className="text-xs text-blue-200/60">{brand.tagline}</p>
            </a>

            <nav className="hidden items-center gap-6 text-sm font-semibold text-blue-100/70 md:flex">
              <a href="#products" className="transition hover:text-white">
                Products
              </a>
              <a href="#features" className="transition hover:text-white">
                Features
              </a>
              <a href="#why" className="transition hover:text-white">
                Why RoadGuard
              </a>
              <a href="#reviews" className="transition hover:text-white">
                Reviews
              </a>
            </nav>
          </div>

          <Button
            asChild
            className="rounded-none bg-blue-600 px-5 font-bold text-white shadow-[0_0_30px_rgba(37,99,235,0.35)] hover:bg-blue-500 sm:px-6"
          >
            <a href="#products">SHOP NOW</a>
          </Button>
        </div>
      </header>

      <section
        id="top"
        className="relative min-h-[670px] overflow-hidden border-b border-blue-500/20 bg-[#050814] sm:min-h-[720px]"
      >
        <div className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(rgba(59,130,246,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-50" />

        <motion.div
          animate={{
            x: [0, 28, -18, 0],
            y: [0, -18, 20, 0],
            opacity: [0.25, 0.48, 0.32, 0.25],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute right-20 top-20 z-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -25, 18, 0],
            y: [0, 20, -15, 0],
            opacity: [0.18, 0.38, 0.25, 0.18],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-10 left-1/2 z-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
        />

        <motion.img
          key={`${current.model}-background`}
          src={current.image}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1 }}
          style={{ scale: heroImageScale, y: heroImageY }}
          transition={smoothTransition}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <motion.div
          animate={{ x: ["-120%", "120%"] }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 2.2,
          }}
          className="pointer-events-none absolute inset-y-0 z-[4] w-1/3 bg-gradient-to-r from-transparent via-blue-300/12 to-transparent blur-sm"
        />

        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#050814] via-[#071225]/78 to-[#050814]/15" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#050814]/60 via-transparent to-[#050814]/95" />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_70%_35%,rgba(37,99,235,0.28),transparent_38%)]" />

        <div className="relative z-10 mx-auto grid min-h-[620px] max-w-7xl items-center px-4 py-16 sm:min-h-[680px] sm:px-6">
          <motion.div
            key={`${current.model}-text`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smoothTransition}
            className="max-w-xl text-white"
          >
            <div className="inline-flex items-center gap-2 border border-blue-300/25 bg-blue-500/10 px-3 py-2 text-xs font-black uppercase tracking-[0.25em] text-blue-200 shadow-[0_0_35px_rgba(37,99,235,0.18)] backdrop-blur">
              <Zap className="h-4 w-4" />
              {current.badge}
            </div>

            <h1 className="mt-5 text-[2.75rem] font-black leading-[0.95] tracking-tight text-white drop-shadow-[0_10px_40px_rgba(37,99,235,0.18)] sm:text-6xl md:text-7xl">
              {current.headline}
            </h1>

            <div className="mt-8 h-1 w-16 bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.9)]" />

            <p className="mt-7 text-xl font-black text-blue-100">
              {current.model}
            </p>

            <p className="mt-3 max-w-lg text-base leading-7 text-blue-100/70">
              {current.subline}
            </p>

            <div className="mt-8 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
              {trustStats.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-blue-500/20 bg-white/5 p-3 backdrop-blur"
                >
                  <p className="text-lg font-black text-blue-200">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-blue-100/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                className="rounded-none bg-blue-600 px-10 py-6 text-base font-black text-white shadow-[0_0_40px_rgba(37,99,235,0.45)] hover:bg-blue-500"
              >
                <a href="#products">SHOP DASH CAMS</a>
              </Button>

              <a
                href="#why"
                className="text-sm font-bold text-blue-100/70 transition hover:text-white"
              >
                See why drivers buy →
              </a>
            </div>
          </motion.div>
        </div>

        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#08111f]/80 text-white shadow-[0_0_25px_rgba(37,99,235,0.18)] backdrop-blur transition hover:bg-blue-600 active:scale-95 sm:left-4 sm:h-12 sm:w-12"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#08111f]/80 text-white shadow-[0_0_25px_rgba(37,99,235,0.18)] backdrop-blur transition hover:bg-blue-600 active:scale-95 sm:right-4 sm:h-12 sm:w-12"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </section>

      <section id="products" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-300">
              Featured lineup
            </p>
            <h2 className="mt-2 text-4xl font-black text-white">
              Trending Dash Cams
            </h2>
          </div>

          <p className="max-w-md text-blue-100/55">
            Smooth horizontal browsing with premium dark automotive styling.
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-6">
          {products.map((item) => (
            <div key={item.slug} className="min-w-[280px] max-w-[280px]">
              <Card className="group relative overflow-hidden rounded-2xl border-blue-500/20 bg-white/5 shadow-[0_0_30px_rgba(37,99,235,0.08)] backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-[0_0_55px_rgba(37,99,235,0.26)]">
                <div className="relative flex h-[320px] items-center justify-center overflow-hidden bg-[#08111f]">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-blue-600 px-3 py-1 text-xs font-black uppercase text-white shadow-[0_0_18px_rgba(37,99,235,0.65)]">
                    {item.badge}
                  </span>

                  <img
                    src={item.image}
                    alt={item.model}
                    className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <CardContent className="relative p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                    RoadGuard
                  </p>
                  <h3 className="mt-1 min-h-12 text-lg font-black text-white">
                    {item.model}
                  </h3>
                  <p className="mt-2 text-sm text-blue-100/55">
                    {item.tags}
                  </p>

                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-2xl font-black text-blue-300">
                      {item.price}
                    </span>
                    <span className="pb-1 text-sm text-neutral-400 line-through">
                      {item.compareAt}
                    </span>
                  </div>

                  <Button
                    asChild
                    className="mt-4 w-full rounded-none bg-blue-600 font-black text-white hover:bg-blue-500"
                  >
                    <a href={`/product/${item.slug}`}>VIEW ITEM</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="border-y border-blue-500/20 bg-[#071225] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black text-white">
              Built for real-world driving
            </h2>
            <p className="mt-3 text-blue-100/55">
              Clear features customers understand fast.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="h-full rounded-2xl border-blue-500/20 bg-white/5 shadow-[0_0_30px_rgba(37,99,235,0.08)] backdrop-blur"
                >
                  <CardContent className="p-6">
                    <Icon className="mb-5 h-8 w-8 text-blue-300" />
                    <h3 className="text-lg font-black text-white">
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

      <section id="why" className="relative overflow-hidden bg-[#050814] px-4 py-20 sm:px-6">
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
              Why drivers buy RoadGuard
            </p>
            <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
              Protection you can actually show.
            </h2>
            <p className="mt-4 text-blue-100/60">
              A dash cam is not just another car accessory. It is proof,
              protection, and peace of mind every time the car moves or parks.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <Card
                  key={reason.title}
                  className="h-full rounded-2xl border-blue-500/20 bg-white/5 shadow-[0_0_30px_rgba(37,99,235,0.08)] backdrop-blur"
                >
                  <CardContent className="p-6">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-200 shadow-[0_0_24px_rgba(37,99,235,0.18)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-black text-white">
                      {reason.title}
                    </h3>
                    <p className="mt-3 text-sm text-blue-100/55">
                      {reason.text}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="demo" className="bg-[#050814] px-4 py-20 text-white sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
              Simple setup
            </p>
            <h2 className="mt-3 text-4xl font-black text-white">
              Plug in. Mount it. Start driving.
            </h2>
            <p className="mt-4 text-blue-100/60">
              The site should make installation feel easy and make the value
              obvious: protection, proof, and peace of mind.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Mount to windshield",
                "Connect power cable",
                "Insert memory card",
                "Drive with confidence",
              ].map((step) => (
                <div
                  key={step}
                  className="flex items-center gap-3 border border-blue-500/20 bg-white/5 p-4"
                >
                  <CheckCircle2 className="h-5 w-5 text-blue-300" />
                  <span className="font-semibold text-white">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="rounded-2xl border-blue-500/20 bg-white/5 text-white shadow-[0_0_45px_rgba(37,99,235,0.18)] backdrop-blur">
            <CardContent className="p-8">
              <Car className="mb-6 h-12 w-12 text-blue-300" />
              <h3 className="text-3xl font-black text-white">
                Great for multiple audiences
              </h3>
              <p className="mt-4 text-blue-100/60">
                Market this to commuters, parents, rideshare drivers, truck
                drivers, delivery drivers, and anyone who parks outside.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {[
                  "Accident proof",
                  "Parking safety",
                  "Road trip footage",
                  "Insurance support",
                ].map((item) => (
                  <div
                    key={item}
                    className="border border-blue-500/20 bg-[#08111f] p-4 text-blue-100/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="buy" className="bg-[#071225] px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-blue-300">
              Launch offer
            </p>
            <h2 className="text-4xl font-black text-white md:text-5xl">
              Get protected before your next drive.
            </h2>
            <p className="mt-4 text-blue-100/60">
              Built for shoppers who want affordable protection without making
              their car look messy or outdated.
            </p>

            <div className="mt-6 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-3">
              {["Fast ship", "Easy returns", "Secure checkout"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 border border-blue-500/20 bg-white/5 p-3 text-sm font-bold text-blue-100/70"
                >
                  <BadgeCheck className="h-4 w-4 text-blue-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Card className="rounded-2xl border-blue-500/20 bg-white/5 text-white shadow-[0_0_45px_rgba(37,99,235,0.18)] backdrop-blur">
            <CardContent className="p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
                Launch price
              </p>
              <h3 className="mt-2 text-3xl font-black text-white">
                RG-5X 360° Vision Dash Cam
              </h3>

              <div className="mt-5 flex flex-wrap items-end gap-3">
                <span className="text-5xl font-black text-blue-300">
                  $40.00
                </span>
                <span className="pb-2 text-xl text-blue-100/35 line-through">
                  $79.99
                </span>
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-black uppercase text-white shadow-[0_0_18px_rgba(37,99,235,0.65)]">
                  Best Deal
                </span>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-11 w-11 border border-blue-500/35 bg-[#08111f] text-xl font-black text-white transition hover:bg-blue-600"
                >
                  -
                </button>

                <span className="w-10 text-center text-xl font-bold text-white">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-11 w-11 border border-blue-500/35 bg-[#08111f] text-xl font-black text-white transition hover:bg-blue-600"
                >
                  +
                </button>

                <span className="ml-auto text-lg font-bold text-white">
                  Total: {total}
                </span>
              </div>

              <Button
                asChild
                className="mt-6 w-full rounded-none bg-blue-600 py-6 text-base font-black text-white shadow-[0_0_35px_rgba(37,99,235,0.35)] hover:bg-blue-500"
              >
                <a href="#products">
                  <ShoppingCart className="mr-2 h-5 w-5" /> SHOP PRODUCTS
                </a>
              </Button>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-blue-100/55">
                <span>
                  <Truck className="mx-auto mb-1 h-4 w-4" />
                  Fast ship
                </span>
                <span>
                  <RotateCcw className="mx-auto mb-1 h-4 w-4" />
                  Returns
                </span>
                <span>
                  <Lock className="mx-auto mb-1 h-4 w-4" />
                  Secure
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black text-white">
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
              className="rounded-2xl border-blue-500/20 bg-white/5 shadow-[0_0_30px_rgba(37,99,235,0.08)] backdrop-blur"
            >
              <CardContent className="p-7">
                <p className="text-blue-100/70">“{review.text}”</p>
                <p className="mt-5 font-black text-white">{review.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-blue-500/20 bg-[#050814] px-6 py-10 text-center text-sm text-blue-100/45">
        <p>{brand.name} · Smart dash cam protection</p>
      </footer>
    </div>
  );
}