"use client";

import { useState, useEffect } from "react";
import Poll from "./components/Poll";

// Logo component - three interlocking hexagon chain links (athletes, brands, agents)
const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left hexagon - full continuous shape */}
    <path d="M3 12L8 6H16L21 12V20L16 26H8L3 20V12Z" stroke="#7c3aed" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>

    {/* Center hexagon - raised to show athlete rising */}
    <path d="M17 6L22 0H30L35 6V14L30 20H22L17 14V6Z" stroke="#9333ea" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>

    {/* Right hexagon - full continuous shape */}
    <path d="M31 12L36 6H44L49 12V20L44 26H36L31 20V12Z" stroke="#a78bfa" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>

    {/* Weave effect - left over center */}
    <path d="M17 6V14" stroke="#7c3aed" strokeWidth="3" fill="none"/>

    {/* Weave effect - right over center */}
    <path d="M35 6V14" stroke="#a78bfa" strokeWidth="3" fill="none"/>
  </svg>
);

// Icons as simple SVG components
const AthleteIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BrandIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const AgentIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const NetworkIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const PlatformIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 shrink-0 check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

export default function Home() {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<"athlete" | "brand" | "agent">("athlete");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showPoll, setShowPoll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      // React faster: complete color transition within first 40% of page
      const progress = Math.min(scrollTop / (docHeight * 0.4), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Nav: warm cream to slightly saturated warm as you scroll
  const getNavBackground = () => {
    const start = { r: 250, g: 249, b: 247 }; // --surface-warm
    const end = { r: 245, g: 243, b: 239 };   // --surface-cream
    const t = scrollProgress;

    const r = Math.round(start.r + (end.r - start.r) * t);
    const g = Math.round(start.g + (end.g - start.g) * t);
    const b = Math.round(start.b + (end.b - start.b) * t);

    return `rgba(${r}, ${g}, ${b}, 0.92)`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userType }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list! We'll be in touch soon.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--surface-warm)" }}>
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-all duration-500"
        style={{
          backgroundColor: getNavBackground(),
          borderBottom: scrollProgress > 0.05 ? "1px solid var(--border-subtle)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="font-semibold text-lg tracking-tight" style={{ color: "var(--ink)" }}>MatchPoint</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="nav-link text-sm" style={{ color: "var(--ink-muted)" }}>Features</a>
              <a href="#platform" className="nav-link text-sm" style={{ color: "var(--ink-muted)" }}>Platform</a>
              <a href="#how-it-works" className="nav-link text-sm" style={{ color: "var(--ink-muted)" }}>How it Works</a>
              <a href="#contact" className="nav-link text-sm" style={{ color: "var(--ink-muted)" }}>Contact</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#signup"
                className="btn-primary px-5 py-2 text-sm inline-flex items-center justify-center"
              >
                Get Early Access
              </a>
              <button
                onClick={() => setShowPoll(true)}
                className="px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:opacity-90"
                style={{ background: "white", color: "var(--ink)", border: "1px solid var(--border-subtle)" }}
              >
                Help Shape The Product
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 md:pt-44 pb-28 md:pb-36 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            {/* Main content — occupies 8 cols on left */}
            <div className="md:col-span-7 lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-10" style={{ background: "var(--primary-wash)", border: "1px solid rgba(124, 58, 237, 0.12)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--primary)" }} />
                <span className="text-xs font-medium tracking-wide" style={{ color: "var(--primary)" }}>Launching Soon</span>
              </div>

              <h1 className="mb-6 leading-[1.05] tracking-tight" style={{ fontSize: "clamp(2.75rem, 6vw, 4.5rem)", color: "var(--ink)" }}>
                <span className="font-light">Find your</span><br />
                <span className="font-bold" style={{ color: "var(--primary)" }}>perfect match</span>
              </h1>

              <p className="text-lg md:text-xl mb-12 max-w-xl leading-relaxed" style={{ color: "var(--ink-secondary)" }}>
                We connect emerging <span style={{ color: "var(--primary)", fontWeight: 600 }}>Athletes</span> with <span style={{ color: "var(--primary-dark)", fontWeight: 600 }}>Brands</span> looking for authentic ambassadors.
                <br />
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>MatchPoint</span> identifies future stars early and builds partnerships that elevate both sides.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#signup"
                  className="btn-primary px-8 py-3.5 text-sm inline-flex items-center justify-center"
                >
                  Get Early Access
                  <ArrowIcon />
                </a>
                <button
                  onClick={() => setShowPoll(true)}
                  className="btn-outline px-8 py-3.5 text-sm text-center"
                >
                  Help Shape the Product
                </button>
              </div>
            </div>

            {/* Right side — three stakeholders with connecting lines to center */}
            <div className="hidden md:flex md:col-span-5 lg:col-span-5 justify-center items-center">
              <div className="relative w-[360px] h-[360px] lg:w-[420px] lg:h-[420px]">
                {/* SVG connecting lines from each node to center */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 420" fill="none">
                  {/* Lines to center (210, 210) */}
                  <line x1="210" y1="48" x2="210" y2="210" stroke="var(--border-subtle)" strokeWidth="1.5" />
                  <line x1="62" y1="320" x2="210" y2="210" stroke="var(--border-subtle)" strokeWidth="1.5" />
                  <line x1="358" y1="320" x2="210" y2="210" stroke="var(--border-subtle)" strokeWidth="1.5" />
                  {/* Outer triangle connecting the three */}
                  <line x1="210" y1="48" x2="62" y2="320" stroke="var(--border-subtle)" strokeWidth="1" strokeOpacity="0.35" />
                  <line x1="62" y1="320" x2="358" y2="320" stroke="var(--border-subtle)" strokeWidth="1" strokeOpacity="0.35" />
                  <line x1="358" y1="320" x2="210" y2="48" stroke="var(--border-subtle)" strokeWidth="1" strokeOpacity="0.35" />

                  {/* Animated dot — Athlete to center (back and forth) */}
                  <circle r="3.5" fill="var(--primary)" opacity="0.6">
                    <animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" path="M210,48 L210,210" />
                  </circle>

                  {/* Animated dot — Brand to center (back and forth) */}
                  <circle r="3.5" fill="var(--secondary)" opacity="0.6">
                    <animateMotion dur="3s" repeatCount="indefinite" begin="0.5s" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" path="M62,320 L210,210" />
                  </circle>

                  {/* Animated dot — Agent to center (back and forth) */}
                  <circle r="3.5" fill="var(--accent)" opacity="0.6">
                    <animateMotion dur="3s" repeatCount="indefinite" begin="1s" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" path="M358,320 L210,210" />
                  </circle>
                </svg>

                {/* Center — logo mark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div
                    className="w-22 h-22 rounded-full flex items-center justify-center"
                    style={{
                      width: "88px",
                      height: "88px",
                      background: "var(--primary)",
                      boxShadow: "0 0 0 8px var(--primary-wash), 0 12px 32px rgba(124, 58, 237, 0.3)",
                    }}
                  >
                    <Logo className="w-11 h-11 brightness-[10]" />
                  </div>
                </div>

                {/* Athlete — top center */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-10 flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-300 hover:scale-105"
                    style={{
                      background: "white",
                      color: "var(--primary)",
                      boxShadow: "0 6px 24px rgba(124, 58, 237, 0.12), 0 2px 4px rgba(15, 13, 21, 0.06)",
                    }}
                  >
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <span className="mt-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary)" }}>Athletes</span>
                </div>

                {/* Brand — bottom left */}
                <div className="absolute -left-2 bottom-2 z-10 flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-300 hover:scale-105"
                    style={{
                      background: "white",
                      color: "var(--secondary)",
                      boxShadow: "0 6px 24px rgba(232, 108, 46, 0.12), 0 2px 4px rgba(15, 13, 21, 0.06)",
                    }}
                  >
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <span className="mt-3 text-sm font-semibold tracking-wide" style={{ color: "var(--secondary)" }}>Brands</span>
                </div>

                {/* Agent — bottom right */}
                <div className="absolute -right-2 bottom-2 z-10 flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-300 hover:scale-105"
                    style={{
                      background: "white",
                      color: "var(--accent)",
                      boxShadow: "0 6px 24px rgba(14, 165, 199, 0.12), 0 2px 4px rgba(15, 13, 21, 0.06)",
                    }}
                  >
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <span className="mt-3 text-sm font-semibold tracking-wide" style={{ color: "var(--accent)" }}>Agents</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 px-6" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-16">
            <p className="text-sm font-medium tracking-wide mb-3" style={{ color: "var(--primary)" }}>What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4" style={{ color: "var(--ink)" }}>
              Calculated alignment,<br />Seemless execution
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--ink-muted)" }}>
              We&apos;re designing MatchPoints to solve the problems Athletes, Agencies and Brands face on a daily basis. Your feedback helps us solve for your challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="athletic-card p-8">
              <div className="icon-box mb-6">
                <ChartIcon />
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--ink)" }}>Matchpoints Index</h3>
              <p className="leading-relaxed text-[15px]" style={{ color: "var(--ink-muted)" }}>
                We leverage our proprietary algorithms to bridge <span style={{ color: "var(--primary)", fontWeight: 500 }}>Athlete</span> trajectory with <span style={{ color: "var(--primary-dark)", fontWeight: 500 }}>Brand</span> DNA to engineer partnerships destined for impact.
              </p>
            </div>

            <div className="athletic-card athletic-card-orange p-8">
              <div className="icon-box icon-box-orange mb-6">
                <NetworkIcon />
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--ink)" }}>Extensive Network</h3>
              <p className="leading-relaxed text-[15px]" style={{ color: "var(--ink-muted)" }}>
                A global network connecting <span style={{ color: "var(--primary-dark)", fontWeight: 500 }}>Brands</span> to a range of <span style={{ color: "var(--primary)", fontWeight: 500 }}>Athletes</span> and <span style={{ color: "var(--primary)", fontWeight: 500 }}>Agents</span> at every stage of their career.
              </p>
            </div>

            <div className="athletic-card athletic-card-cyan p-8">
              <div className="icon-box icon-box-cyan mb-6">
                <PlatformIcon />
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--ink)" }}>All-in-One Platform</h3>
              <p className="leading-relaxed text-[15px]" style={{ color: "var(--ink-muted)" }}>
                Our all-in-one solution that simplifies the entire partnership lifecycle — from intelligent matching and seamless contracting to real-time campaign measurement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platform" className="py-24 md:py-32 px-6" style={{ background: "var(--surface-warm)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-16">
            <p className="text-sm font-medium tracking-wide mb-3" style={{ color: "var(--secondary)" }}>Our Strategic Edge</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight" style={{ color: "var(--ink)" }}>
              One Platform,<br />Three Optimized Workflows
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Brands */}
            <div className="platform-card p-8">
              <div className="w-12 h-12 flex items-center justify-center mb-6 rounded-xl" style={{ background: "#fef3eb", color: "var(--secondary)" }}>
                <BrandIcon />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--ink)" }}>For Brands</h3>
              <p className="mb-6 text-[15px]" style={{ color: "var(--ink-muted)" }}>
                Discover, connect and manage <span style={{ color: "var(--primary)", fontWeight: 500 }}>Athlete</span> partnerships that match your target audience and campaign goals.
              </p>
              <ul className="space-y-3">
                {["Tailored athlete recommendations", "Frictionless contractual processes", "Simplified financial transactions", "Real-time campaign tracking"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-sm" style={{ color: "var(--ink-secondary)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Athletes */}
            <div className="platform-card p-8">
              <div className="w-12 h-12 flex items-center justify-center mb-6 rounded-xl" style={{ background: "var(--primary-wash)", color: "var(--primary)" }}>
                <AthleteIcon />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--ink)" }}>For Athletes</h3>
              <p className="mb-6 text-[15px]" style={{ color: "var(--ink-muted)" }}>
                Scale your career with elite partnerships, legal certainty, and financial clarity.
              </p>
              <ul className="space-y-3">
                {["Maximise NIL Value as a known or emerging athlete", "Access vetted network of professional representation", "Legal and contractual certainty and clarity", "Transparent transactions and simplified management"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-sm" style={{ color: "var(--ink-secondary)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Agents */}
            <div className="platform-card p-8">
              <div className="w-12 h-12 flex items-center justify-center mb-6 rounded-xl" style={{ background: "#ecfbfe", color: "var(--accent)" }}>
                <AgentIcon />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--ink)" }}>For Agents</h3>
              <p className="mb-6 text-[15px]" style={{ color: "var(--ink-muted)" }}>
                Scale growth through intelligent networking and automated portfolio management.
              </p>
              <ul className="space-y-3">
                {["Unlock a brand and player network at scale", "Player performance intelligence to drive growth opportunities", "Effortless portfolio management and unified communication", "Automated administrative tasks and payment transparency"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-sm" style={{ color: "var(--ink-secondary)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 md:py-32 px-6" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-20">
            <p className="text-sm font-medium tracking-wide mb-3" style={{ color: "var(--accent)" }}>The Game Plan</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight" style={{ color: "var(--ink)" }}>
              How it works
            </h2>
          </div>

          <div className="hidden md:grid md:gap-0" style={{ gridTemplateColumns: "1fr 40px 1fr 40px 1fr 40px 1fr", gridTemplateRows: "auto auto auto" }}>
            {[
              { step: "01", title: "Profile Creation and Verification", desc: "Tell us who you are and what your non-negotiables are." },
              { step: "02", title: "Analyze", desc: "We bridge athlete trajectory with brand DNA based on specific Brand objectives and targeting." },
              { step: "03", title: "Connect", desc: "Initiate partnerships through curated recommendations and streamlined agreements." },
              { step: "04", title: "Execute and Measure", desc: "Focus on what matters, while we track and measure your campaign performances." },
            ].flatMap((item, i) => {
              const col = i * 2 + 1;
              const connectorCol = i * 2 + 2;
              return [
                <div key={`num-${item.step}`} className="step-card flex justify-center pb-5" style={{ gridColumn: col, gridRow: 1 }}>
                  <div className="step-number">{item.step}</div>
                </div>,
                <h3 key={`title-${item.step}`} className="step-card text-lg font-semibold text-center pb-2 px-2" style={{ color: "var(--ink)", gridColumn: col, gridRow: 2 }}>{item.title}</h3>,
                <p key={`desc-${item.step}`} className="step-card text-[15px] leading-relaxed text-center px-2" style={{ color: "var(--ink-muted)", gridColumn: col, gridRow: 3 }}>{item.desc}</p>,
                ...(i < 3 ? [<div key={`line-${i}`} className="flex items-center step-connector-line" style={{ gridColumn: connectorCol, gridRow: 1 }} />] : []),
              ];
            })}
          </div>
          {/* Mobile layout */}
          <div className="flex flex-col gap-10 md:hidden">
            {[
              { step: "01", title: "Profile Creation and Verification", desc: "Tell us who you are and what your non-negotiables are." },
              { step: "02", title: "Analyze", desc: "We bridge athlete trajectory with brand DNA based on specific Brand objectives and targeting." },
              { step: "03", title: "Connect", desc: "Initiate partnerships through curated recommendations and streamlined agreements." },
              { step: "04", title: "Execute and Measure", desc: "Focus on what matters, while we track and measure your campaign performances." },
            ].map((item) => (
              <div key={item.step} className="step-card flex flex-col items-center text-center">
                <div className="step-number mb-5">{item.step}</div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--ink)" }}>{item.title}</h3>
                <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Survey CTA */}
      <section className="py-16 md:py-20 px-6" style={{ background: "var(--surface-warm)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="cta-section p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-[0.06]" style={{ background: "var(--primary-light)", filter: "blur(80px)" }} />
            <div className="relative">
              <p className="text-sm font-medium tracking-wide mb-4" style={{ color: "var(--primary-light)" }}>Shape The Future</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight text-white leading-snug">
                Help us build what you need
              </h2>
              <p className="text-base mb-10 max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                We&#39;re designing MatchPoint with input from athletes, brands, and agents.
                Your feedback shapes what we build.
              </p>
              <button
                onClick={() => setShowPoll(true)}
                className="inline-flex items-center px-7 py-3.5 text-sm font-medium rounded-full transition-all duration-300 hover:opacity-90"
                style={{ background: "white", color: "var(--ink)" }}
              >
                Take the Survey
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section id="signup" className="py-24 md:py-32 px-6" style={{ background: "var(--surface-cream)" }}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-medium tracking-wide mb-3" style={{ color: "var(--primary)" }}>Join The Waitlist</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ color: "var(--ink)" }}>
              Get early access
            </h2>
            <p className="text-base" style={{ color: "var(--ink-muted)" }}>
              Be among the first to try MatchPoint when we launch.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User Type Selection */}
            <div className="flex justify-center gap-2">
              {(["athlete", "brand", "agent"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setUserType(type)}
                  className={`type-selector px-5 py-2.5 text-sm transition ${
                    userType === type ? "active" : ""
                  }`}
                  style={{ color: userType === type ? undefined : "var(--ink-muted)" }}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Email Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-3.5 bg-white border rounded-full text-[15px] focus:outline-none transition"
                style={{
                  borderColor: "var(--border-subtle)",
                  color: "var(--ink)",
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
                onBlur={(e) => e.currentTarget.style.borderColor = "var(--border-subtle)"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary px-7 py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Joining..." : "Join"}
              </button>
            </div>

            {message && (
              <p className={`text-sm text-center ${status === "success" ? "text-[#7c3aed]" : "text-red-500"}`}>
                {message}
              </p>
            )}
          </form>

          <p className="text-xs mt-5 text-center" style={{ color: "var(--ink-muted)" }}>
            No spam. Only MatchPoint updates.
          </p>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="py-24 md:py-32 px-6" style={{ background: "white" }}>
        <div className="max-w-lg mx-auto text-center">
          <p className="text-sm font-medium tracking-wide mb-3" style={{ color: "var(--primary)" }}>Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ color: "var(--ink)" }}>
            Contact Us
          </h2>
          <p className="text-base mb-8" style={{ color: "var(--ink-muted)" }}>
            Have questions or want to learn more? We&apos;d love to hear from you.
          </p>
          <a
            href="mailto:info@matchpoints.io"
            className="btn-primary px-8 py-3.5 text-sm inline-flex items-center justify-center gap-2"
          >
            info@matchpoints.io
            <ArrowIcon />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <Logo className="w-8 h-8" />
              <span className="font-semibold text-sm tracking-tight" style={{ color: "var(--ink)" }}>MatchPoint</span>
            </div>

            <div className="flex items-center gap-8">
              <a href="#features" className="text-sm transition" style={{ color: "var(--ink-muted)" }}>Features</a>
              <a href="#platform" className="text-sm transition" style={{ color: "var(--ink-muted)" }}>Platform</a>
              <a href="#how-it-works" className="text-sm transition" style={{ color: "var(--ink-muted)" }}>How it Works</a>
              <a href="#contact" className="text-sm transition" style={{ color: "var(--ink-muted)" }}>Contact</a>
            </div>

            <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
              &copy; {new Date().getFullYear()} MatchPoint
            </p>
          </div>
        </div>
      </footer>

      {/* Poll Modal */}
      {showPoll && <Poll onClose={() => setShowPoll(false)} />}
    </div>
  );
}
