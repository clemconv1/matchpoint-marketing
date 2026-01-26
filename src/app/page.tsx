"use client";

import { useState } from "react";

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

// Replace this with your actual Google Survey link
const SURVEY_LINK = "https://forms.google.com/your-survey-link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<"athlete" | "brand" | "agent">("athlete");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
    <div className="min-h-screen bg-[#0c0c0c]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c0c]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00ff87] flex items-center justify-center" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)' }}>
                <span className="text-black font-black text-lg">M</span>
              </div>
              <span className="font-bold text-xl tracking-tight">MATCHPOINT</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="nav-link text-sm text-gray-400 hover:text-white transition">Features</a>
              <a href="#platform" className="nav-link text-sm text-gray-400 hover:text-white transition">Platform</a>
              <a href="#how-it-works" className="nav-link text-sm text-gray-400 hover:text-white transition">How it Works</a>
            </div>
            <a
              href={SURVEY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-5 py-2 text-sm"
            >
              Take Survey
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff87]/10 border border-[#00ff87]/30 mb-8">
              <span className="w-2 h-2 bg-[#00ff87] animate-pulse" />
              <span className="text-sm text-[#00ff87] font-medium uppercase tracking-wider">Launching Soon</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
              FIND YOUR PERFECT<br />
              <span className="text-[#00ff87]">ATHLETE-BRAND</span><br />
              MATCH
            </h1>

            <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
              MatchPoint connects rising athletes with brand partnerships.
              Our AI predicts athletic potential and matches athletes with brands
              looking for their next ambassador.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#signup"
                className="btn-primary px-8 py-4 text-base inline-flex items-center justify-center"
              >
                Get Early Access
                <ArrowIcon />
              </a>
              <a
                href={SURVEY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-8 py-4 text-base text-center"
              >
                Help Shape the Product
              </a>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute top-1/2 right-0 w-1/3 h-[2px] bg-gradient-to-l from-[#00ff87] to-transparent opacity-30 hidden lg:block" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-[#111] striped-bg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[#00ff87] font-bold uppercase tracking-wider mb-3">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              POWERED BY DATA
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="athletic-card p-8">
              <div className="icon-box mb-6">
                <ChartIcon />
              </div>
              <h3 className="text-xl font-bold mb-3">Athlete Performance Index</h3>
              <p className="text-gray-400 leading-relaxed">
                ML/AI technology matches Brands with Athletes at all career stages for mutually beneficial sponsorship opportunities.
              </p>
            </div>

            <div className="athletic-card athletic-card-orange p-8">
              <div className="icon-box icon-box-orange mb-6">
                <NetworkIcon />
              </div>
              <h3 className="text-xl font-bold mb-3">Extensive Network</h3>
              <p className="text-gray-400 leading-relaxed">
                Pool of Brands & Agencies seeking Brand Ambassadors across multiple maturity journeys for short-medium-long term partnerships.
              </p>
            </div>

            <div className="athletic-card athletic-card-blue p-8">
              <div className="icon-box icon-box-blue mb-6">
                <PlatformIcon />
              </div>
              <h3 className="text-xl font-bold mb-3">All-in-One Platform</h3>
              <p className="text-gray-400 leading-relaxed">
                Seamless experience from discovery to signing agreements, driving efficiency & transparency for all stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platform" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[#ff6b35] font-bold uppercase tracking-wider mb-3">Built For Everyone</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              THREE EXPERIENCES
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Brands */}
            <div className="bg-[#1a1a1a] p-8 border-t-4 border-[#ff6b35]">
              <div className="w-14 h-14 bg-[#ff6b35]/20 flex items-center justify-center mb-6 text-[#ff6b35]">
                <BrandIcon />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Brands</h3>
              <p className="text-gray-400 mb-6">
                Find athletes that match your target audience and campaign goals.
              </p>
              <ul className="space-y-3">
                {["AI athlete recommendations", "Filter by sport & demographics", "Campaign dashboard", "ROI tracking"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Athletes */}
            <div className="bg-[#1a1a1a] p-8 border-t-4 border-[#00ff87]">
              <div className="w-14 h-14 bg-[#00ff87]/20 flex items-center justify-center mb-6 text-[#00ff87]">
                <AthleteIcon />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Athletes</h3>
              <p className="text-gray-400 mb-6">
                Let brands come to you while you focus on training and competing.
              </p>
              <ul className="space-y-3">
                {["Brands find you first", "More time for training", "Get discovered early", "Track partnerships"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Agents */}
            <div className="bg-[#1a1a1a] p-8 border-t-4 border-[#00d4ff]">
              <div className="w-14 h-14 bg-[#00d4ff]/20 flex items-center justify-center mb-6 text-[#00d4ff]">
                <AgentIcon />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Agents</h3>
              <p className="text-gray-400 mb-6">
                Manage your roster and maximize partnership revenue.
              </p>
              <ul className="space-y-3">
                {["Portfolio management", "Campaign analytics", "Bulk opportunities", "Revenue tracking"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[#00d4ff] font-bold uppercase tracking-wider mb-3">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              HOW IT WORKS
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Connect", desc: "Athletes link their socials and sports data. Brands define their goals." },
              { step: "02", title: "Analyze", desc: "Our AI predicts performance trajectory and analyzes audience fit." },
              { step: "03", title: "Match", desc: "Brands get curated recommendations. Athletes receive opportunities." },
              { step: "04", title: "Perform", desc: "Focus on what matters while we track campaign performance." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="step-number mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Survey CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1a1a1a] p-12 md:p-16 border-l-4 border-[#00ff87] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff87]/5 blur-3xl" />
            <div className="relative">
              <p className="text-[#00ff87] font-bold uppercase tracking-wider mb-3">Shape The Future</p>
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                HELP US BUILD WHAT YOU NEED
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl">
                We're designing MatchPoint with input from athletes, brands, and agents.
                Your feedback shapes what we build.
              </p>
              <a
                href={SURVEY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4 text-base inline-flex items-center"
              >
                Take the Survey
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section id="signup" className="py-24 px-4 bg-[#111]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#00ff87] font-bold uppercase tracking-wider mb-3">Join The Waitlist</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              GET EARLY ACCESS
            </h2>
            <p className="text-gray-400 text-lg">
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
                    userType === type ? "active text-white" : "text-gray-500"
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
                className="flex-1 px-6 py-4 bg-[#1a1a1a] border-2 border-[#333] focus:border-[#00ff87] focus:outline-none transition text-white placeholder-gray-500"
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
              <p className={`text-sm text-center ${status === "success" ? "text-[#00ff87]" : "text-red-500"}`}>
                {message}
              </p>
            )}
          </form>

          <p className="text-gray-600 text-sm mt-6 text-center">
            No spam. Only MatchPoint updates.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#00ff87] flex items-center justify-center" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)' }}>
                <span className="text-black font-black text-sm">M</span>
              </div>
              <span className="font-bold tracking-tight">MATCHPOINT</span>
            </div>

            <div className="flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-500 hover:text-white transition">Features</a>
              <a href="#platform" className="text-sm text-gray-500 hover:text-white transition">Platform</a>
              <a href="#how-it-works" className="text-sm text-gray-500 hover:text-white transition">How it Works</a>
            </div>

            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} MatchPoint
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
