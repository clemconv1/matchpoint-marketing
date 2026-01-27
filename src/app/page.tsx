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
  <svg className="w-5 h-5 check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

  // Interpolate between colors based on scroll progress
  const getNavBackground = () => {
    const colors = [
      { r: 250, g: 248, b: 255 }, // #faf8ff
      { r: 245, g: 243, b: 255 }, // #f5f3ff
      { r: 237, g: 233, b: 254 }, // #ede9fe
      { r: 228, g: 224, b: 251 }, // #e4e0fb
      { r: 221, g: 214, b: 254 }, // #ddd6fe
      { r: 212, g: 200, b: 245 }, // #d4c8f5
      { r: 196, g: 181, b: 253 }, // #c4b5fd
    ];

    const index = scrollProgress * (colors.length - 1);
    const lower = Math.floor(index);
    const upper = Math.min(lower + 1, colors.length - 1);
    const t = index - lower;

    const r = Math.round(colors[lower].r + (colors[upper].r - colors[lower].r) * t);
    const g = Math.round(colors[lower].g + (colors[upper].g - colors[lower].g) * t);
    const b = Math.round(colors[lower].b + (colors[upper].b - colors[lower].b) * t);

    return `rgba(${r}, ${g}, ${b}, 0.9)`;
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300"
        style={{ backgroundColor: getNavBackground() }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-bold text-xl tracking-tight text-[#1a1a2e]">MATCHPOINT</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="nav-link text-sm text-gray-600 hover:text-[#7c3aed] transition">Features</a>
              <a href="#platform" className="nav-link text-sm text-gray-600 hover:text-[#7c3aed] transition">Platform</a>
              <a href="#how-it-works" className="nav-link text-sm text-gray-600 hover:text-[#7c3aed] transition">How it Works</a>
            </div>
            <button
              onClick={() => setShowPoll(true)}
              className="btn-primary px-5 py-2 text-sm"
            >
              Take Survey
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 relative bg-gradient-to-b from-[#faf8ff] to-[#f5f3ff]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-[#7c3aed] rounded-full animate-pulse" />
              <span className="text-sm text-[#7c3aed] font-medium uppercase tracking-wider">Launching Soon</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-[#1a1a2e]">
              FIND YOUR<br />
              <span className="text-[#7c3aed]">PERFECT MATCH</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
              We connect emerging <span className="text-[#7c3aed] font-bold">Athletes</span> with <span className="text-[#9333ea] font-bold">Brands</span> looking for authentic ambassadors.
              <br />
              <span className="text-[#1a1a2e] font-bold">MatchPoint</span> identifies future stars early and builds partnerships that elevate both sides.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#signup"
                className="btn-primary px-8 py-4 text-base inline-flex items-center justify-center"
              >
                Get Early Access
                <ArrowIcon />
              </a>
              <button
                onClick={() => setShowPoll(true)}
                className="btn-outline px-8 py-4 text-base text-center"
              >
                Help Shape the Product
              </button>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute top-1/2 right-0 w-1/3 h-[2px] bg-gradient-to-l from-[#7c3aed] to-transparent opacity-30 hidden lg:block" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-gradient-to-b from-[#f5f3ff] to-[#ede9fe]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[#7c3aed] font-bold uppercase tracking-wider mb-3">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1a1a2e]">
              POWERED BY DATA
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="athletic-card p-8">
              <div className="icon-box mb-6">
                <ChartIcon />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">Athlete Performance Index</h3>
              <p className="text-gray-600 leading-relaxed">
                We identify rising <span className="text-[#7c3aed] font-semibold">Athletes</span> before they break out, giving <span className="text-[#9333ea] font-semibold">Brands</span> early access to tomorrow's champions.
              </p>
            </div>

            <div className="athletic-card athletic-card-orange p-8">
              <div className="icon-box icon-box-orange mb-6">
                <NetworkIcon />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">Extensive Network</h3>
              <p className="text-gray-600 leading-relaxed">
                We're building a network of <span className="text-[#9333ea] font-semibold">Brands</span> and <span className="text-[#7c3aed] font-semibold">Agents</span> ready to partner with <span className="text-[#7c3aed] font-semibold">Athletes</span> at every stage of their career.
              </p>
            </div>

            <div className="athletic-card athletic-card-cyan p-8">
              <div className="icon-box icon-box-cyan mb-6">
                <PlatformIcon />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">All-in-One Platform</h3>
              <p className="text-gray-600 leading-relaxed">
                We accompany <span className="text-[#7c3aed] font-semibold">Athletes</span>, <span className="text-[#9333ea] font-semibold">Brands</span>, and <span className="text-[#7c3aed] font-semibold">Agents</span> from discovery to signing, with full transparency every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platform" className="py-24 px-4 bg-gradient-to-b from-[#ede9fe] to-[#e4e0fb]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[#f97316] font-bold uppercase tracking-wider mb-3">Built For Everyone</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1a1a2e]">
              THREE EXPERIENCES
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Brands */}
            <div className="platform-card platform-card-orange p-8">
              <div className="w-14 h-14 bg-[#f97316]/10 flex items-center justify-center mb-6 text-[#f97316]">
                <BrandIcon />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">For Brands</h3>
              <p className="text-gray-600 mb-6">
                Find <span className="text-[#7c3aed] font-semibold">Athletes</span> that match your target audience and campaign goals.
              </p>
              <ul className="space-y-3">
                {["Smart athlete recommendations", "Filter by sport & demographics", "Campaign dashboard", "ROI tracking"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Athletes */}
            <div className="platform-card p-8">
              <div className="w-14 h-14 bg-[#7c3aed]/10 flex items-center justify-center mb-6 text-[#7c3aed]">
                <AthleteIcon />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">For Athletes</h3>
              <p className="text-gray-600 mb-6">
                Let <span className="text-[#7c3aed] font-semibold">Brands</span> come to you while you focus on training and competing.
              </p>
              <ul className="space-y-3">
                {["Brands find you first", "More time for training", "Get discovered early", "Track partnerships"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Agents */}
            <div className="platform-card platform-card-cyan p-8">
              <div className="w-14 h-14 bg-[#06b6d4]/10 flex items-center justify-center mb-6 text-[#06b6d4]">
                <AgentIcon />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">For Agents</h3>
              <p className="text-gray-600 mb-6">
                Manage your <span className="text-[#7c3aed] font-semibold">Athletes</span> and maximize partnership revenue with <span className="text-[#7c3aed] font-semibold">Brands</span>.
              </p>
              <ul className="space-y-3">
                {["Portfolio management", "Campaign analytics", "Bulk opportunities", "Revenue tracking"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-gradient-to-b from-[#e4e0fb] to-[#ddd6fe]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[#06b6d4] font-bold uppercase tracking-wider mb-3">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1a1a2e]">
              HOW IT WORKS
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Connect", desc: "Athletes link their socials and sports data. Brands define their goals." },
              { step: "02", title: "Analyze", desc: "We predict performance trajectory and analyze audience fit." },
              { step: "03", title: "Match", desc: "Brands get curated recommendations. Athletes receive opportunities." },
              { step: "04", title: "Perform", desc: "Focus on what matters while we track campaign performance." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="step-number mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2 text-[#1a1a2e]">{item.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Survey CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#ddd6fe] to-[#d4c8f5]">
        <div className="max-w-4xl mx-auto">
          <div className="cta-section p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative">
              <p className="text-white/80 font-bold uppercase tracking-wider mb-3">Shape The Future</p>
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-white">
                HELP US BUILD WHAT YOU NEED
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl">
                We're designing MatchPoint with input from athletes, brands, and agents.
                Your feedback shapes what we build.
              </p>
              <button
                onClick={() => setShowPoll(true)}
                className="inline-flex items-center px-8 py-4 bg-white text-[#7c3aed] font-bold uppercase tracking-wider text-base hover:bg-gray-100 transition"
              >
                Take the Survey
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section id="signup" className="py-24 px-4 bg-gradient-to-b from-[#d4c8f5] to-[#c4b5fd]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#7c3aed] font-bold uppercase tracking-wider mb-3">Join The Waitlist</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-[#1a1a2e]">
              GET EARLY ACCESS
            </h2>
            <p className="text-gray-600 text-lg">
              Be among the first to try MatchPoint when we launch.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              {(["athlete", "brand", "agent"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setUserType(type)}
                  className={`type-selector px-6 py-3 uppercase font-bold text-sm tracking-wider transition ${
                    userType === type ? "active text-[#7c3aed]" : "text-gray-500"
                  }`}
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
                className="flex-1 px-6 py-4 bg-white/90 border-2 border-purple-200 focus:border-[#7c3aed] focus:outline-none transition text-[#1a1a2e] placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
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

          <p className="text-gray-500 text-sm mt-6 text-center">
            No spam. Only MatchPoint updates.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#c4b5fd]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Logo className="w-8 h-8" />
              <span className="font-bold tracking-tight text-[#1a1a2e]">MATCHPOINT</span>
            </div>

            <div className="flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-500 hover:text-[#7c3aed] transition">Features</a>
              <a href="#platform" className="text-sm text-gray-500 hover:text-[#7c3aed] transition">Platform</a>
              <a href="#how-it-works" className="text-sm text-gray-500 hover:text-[#7c3aed] transition">How it Works</a>
            </div>

            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} MatchPoint
            </p>
          </div>
        </div>
      </footer>

      {/* Poll Modal */}
      {showPoll && <Poll onClose={() => setShowPoll(false)} />}
    </div>
  );
}
