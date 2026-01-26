"use client";

import { useState } from "react";

// Icons as simple SVG components
const AthleteIcon = () => (
  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BrandIcon = () => (
  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const AgentIcon = () => (
  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SocialIcon = () => (
  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const AIIcon = () => (
  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl">MatchPoint<span className="text-primary">AI</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition">Features</a>
              <a href="#platform" className="text-sm text-gray-400 hover:text-white transition">Platform</a>
              <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition">How it Works</a>
              <a href="#signup" className="text-sm text-gray-400 hover:text-white transition">Get Early Access</a>
            </div>
            <a
              href={SURVEY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-light transition text-sm font-medium"
            >
              Take Survey
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-gray-400">Launching Soon</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Find Your Perfect{" "}
              <span className="gradient-text">Athlete-Brand Match</span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              MatchPoint AI connects rising athletes with brand partnerships so they can
              focus on what matters — training and competing. Our AI predicts athletic potential
              and matches athletes with brands looking for their next ambassador, making
              sponsorship deals happen faster for everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#signup"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition font-semibold text-lg inline-flex items-center justify-center"
              >
                Get Early Access
                <ArrowRightIcon />
              </a>
              <a
                href={SURVEY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/5 transition font-semibold text-lg"
              >
                Help Shape the Product
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powered by <span className="gradient-text">Data & AI</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Smart matching that benefits everyone — athletes get discovered faster,
              brands find authentic partners, and agents scale their operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary">
                <ChartIcon />
              </div>
              <div className="text-xl font-bold mb-2">Athlete Performance Index</div>
              <div className="text-gray-400 text-sm">ML/AI technology matches Brands with Athletes at all career stages for mutually beneficial sponsorship opportunities.</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mx-auto mb-4 text-secondary">
                <SocialIcon />
              </div>
              <div className="text-xl font-bold mb-2">Extensive Network</div>
              <div className="text-gray-400 text-sm">Pool of Brands & Agencies seeking Brand Ambassadors across multiple maturity journeys for short-medium-long term partnerships.</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mx-auto mb-4 text-accent">
                <AIIcon />
              </div>
              <div className="text-xl font-bold mb-2">All-in-One Platform</div>
              <div className="text-gray-400 text-sm">Seamless experience from discovery to signing agreements, driving efficiency & transparency for all stakeholders.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section - Three User Types */}
      <section id="platform" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Three Tailored <span className="gradient-text">Experiences</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Purpose-built dashboards for brands, athletes, and agents - each with the tools they need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Brands Card */}
            <div className="gradient-border rounded-2xl p-8 card-hover bg-background">
              <div className="w-16 h-16 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary mb-6">
                <BrandIcon />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Brands</h3>
              <p className="text-gray-400 mb-6">
                Find athletes that match your target audience and campaign goals with AI-powered recommendations.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-gray-300">AI athlete recommendations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-gray-300">Filter by sport, reach, demographics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-gray-300">Campaign performance dashboard</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-gray-300">ROI tracking & analytics</span>
                </li>
              </ul>
            </div>

            {/* Athletes Card */}
            <div className="gradient-border rounded-2xl p-8 card-hover bg-background">
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                <AthleteIcon />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Athletes</h3>
              <p className="text-gray-400 mb-6">
                Stop chasing sponsorships. Let brands come to you while you focus on training and competing.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-gray-300">Brands find you, not the other way around</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-gray-300">More time for training, less admin</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-gray-300">Get discovered earlier in your career</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-gray-300">Track all your partnerships in one place</span>
                </li>
              </ul>
            </div>

            {/* Agents Card */}
            <div className="gradient-border rounded-2xl p-8 card-hover bg-background">
              <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center text-accent mb-6">
                <AgentIcon />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Agents</h3>
              <p className="text-gray-400 mb-6">
                Manage your roster of athletes, track all their campaigns, and maximize partnership revenue.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-gray-300">Multi-athlete portfolio view</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-gray-300">Aggregated campaign analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-gray-300">Bulk opportunity management</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-gray-300">Revenue & commission tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How <span className="gradient-text">MatchPoint AI</span> Works
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From profile creation to campaign analytics - a seamless partnership journey.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Connect & Profile", desc: "Athletes link their socials and sports data. Brands define their target audience and campaign goals." },
              { step: "02", title: "AI Analysis", desc: "Our model predicts athletic performance trajectory and analyzes audience fit to identify rising stars." },
              { step: "03", title: "Smart Matching", desc: "Brands get AI-curated athlete recommendations. Athletes receive relevant opportunities automatically." },
              { step: "04", title: "Focus on What Matters", desc: "Athletes train while partnerships happen. Brands and athletes track campaign performance in real-time." },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Survey CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border rounded-2xl p-12 text-center glow bg-background">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm text-primary-light">Help shape the product</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Help Us Build What You Need
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              We're designing MatchPoint AI with input from athletes, brands, and agents.
              Your feedback will directly shape the features we build first.
            </p>
            <a
              href={SURVEY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition font-semibold text-lg"
            >
              Take the Survey
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section id="signup" className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get <span className="gradient-text">Early Access</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Be among the first to try MatchPoint AI. Join our waitlist and we'll reach out when we're ready to onboard early users.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {(["athlete", "brand", "agent"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setUserType(type)}
                  className={`px-6 py-3 rounded-xl border transition capitalize ${
                    userType === type
                      ? "border-primary bg-primary/20 text-white"
                      : "border-white/20 text-gray-400 hover:border-white/40"
                  }`}
                >
                  I'm a {type}
                </button>
              ))}
            </div>

            {/* Email Input */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Joining..." : "Join Waitlist"}
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <p className={`text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                {message}
              </p>
            )}
          </form>

          <p className="text-gray-500 text-sm mt-6">
            No spam, ever. We'll only email you about MatchPoint AI updates.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl">MatchPoint<span className="text-primary">AI</span></span>
            </div>

            <div className="flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition">Features</a>
              <a href="#platform" className="text-sm text-gray-400 hover:text-white transition">Platform</a>
              <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition">How it Works</a>
              <a href={SURVEY_LINK} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition">Survey</a>
            </div>

            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} MatchPoint AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
