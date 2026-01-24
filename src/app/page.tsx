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
              <span className="text-sm text-gray-400">Coming Soon</span>
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

          {/* Hero visual - Core Value Props */}
          <div className="mt-20 relative">
            <div className="gradient-border rounded-2xl p-8 glow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary">
                    <AIIcon />
                  </div>
                  <div className="text-xl font-bold mb-2">AI Recommender</div>
                  <div className="text-gray-400 text-sm">Smart matching based on brand values, audience fit, and campaign goals</div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mx-auto mb-4 text-secondary">
                    <SocialIcon />
                  </div>
                  <div className="text-xl font-bold mb-2">Social Integration</div>
                  <div className="text-gray-400 text-sm">Direct connection to athlete socials for real reach and engagement data</div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mx-auto mb-4 text-accent">
                    <ChartIcon />
                  </div>
                  <div className="text-xl font-bold mb-2">Performance Prediction</div>
                  <div className="text-gray-400 text-sm">AI model that predicts athlete future performances to spot rising stars early</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Athlete Value Prop */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border rounded-2xl p-8 md:p-12 bg-background">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Built for Athletes Who Want to <span className="gradient-text">Focus on Winning</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Finding sponsorships shouldn't be a full-time job. MatchPoint AI handles the
                  business side so you can dedicate your energy to training, competing, and
                  building your athletic career.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Save Hours Every Week</div>
                    <div className="text-gray-400 text-sm">No more cold emails or pitching. Brands come to you.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Get Discovered Early</div>
                    <div className="text-gray-400 text-sm">Our AI spots your potential before you break out.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Accelerate Your Career</div>
                    <div className="text-gray-400 text-sm">Earlier partnerships mean faster growth and more resources.</div>
                  </div>
                </div>
              </div>
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

          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Recommender */}
            <div className="gradient-border rounded-2xl p-8 bg-background">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <AIIcon />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Intelligent Matching Engine</h3>
                  <p className="text-gray-400 mb-4">
                    Our AI analyzes brand requirements, athlete profiles, audience demographics,
                    and historical performance to recommend the most suitable partnerships.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300">
                      <CheckIcon />
                      Brand alignment scoring
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <CheckIcon />
                      Audience overlap analysis
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <CheckIcon />
                      Campaign type matching (short/long term)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Social Integration */}
            <div className="gradient-border rounded-2xl p-8 bg-background">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary flex-shrink-0">
                  <SocialIcon />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Social Media Integration</h3>
                  <p className="text-gray-400 mb-4">
                    Connect athlete social accounts to pull real engagement metrics,
                    follower demographics, and content performance data.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300">
                      <CheckIcon />
                      Instagram, TikTok, X, YouTube
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <CheckIcon />
                      Real-time reach & engagement
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <CheckIcon />
                      Audience demographics breakdown
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Performance Model */}
            <div className="gradient-border rounded-2xl p-8 bg-background">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                  <ChartIcon />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Athletic Performance Prediction</h3>
                  <p className="text-gray-400 mb-4">
                    Our AI model predicts athlete future performances, helping brands
                    identify rising stars before they break out — and giving athletes
                    access to partnerships earlier in their career.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300">
                      <CheckIcon />
                      Future performance forecasting
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <CheckIcon />
                      Rising star identification
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <CheckIcon />
                      Career trajectory analysis
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Analytics Dashboard */}
            <div className="gradient-border rounded-2xl p-8 bg-background">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 flex-shrink-0">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Campaign Analytics Dashboard</h3>
                  <p className="text-gray-400 mb-4">
                    Track campaign performance in real-time with comprehensive marketing
                    metrics for both brands and athletes.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300">
                      <CheckIcon />
                      Impressions, reach, engagement
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <CheckIcon />
                      Conversion tracking
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <CheckIcon />
                      Comparative campaign analysis
                    </li>
                  </ul>
                </div>
              </div>
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
