"use client";

import { useState } from "react";

interface PollProps {
  onClose: () => void;
}

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const CURRENT_ROLES = [
  { id: "professional", label: "Professional", description: "I earn a living from my respective sport" },
  { id: "youth_academy", label: "Youth Academy", description: "I currently play for a youth team of a professional organisation" },
  { id: "semi_professional", label: "Semi-Professional", description: "I get paid part-time for matches in my respective sport" },
  { id: "sports_influence", label: "Sports Influence", description: "I have a social following >5k & post sport related content regularly" },
  { id: "aspiring_athlete", label: "Aspiring Athlete", description: "Ambition to reach a professional level consistently" },
  { id: "ex_professional", label: "Ex-Professional", description: "I am retired after competing for several years at a professional level" },
  { id: "agent", label: "Agent / Representative", description: "Representative of an Athlete" },
];

const BRAND_INQUIRIES_OPTIONS = ["0", "1-3", "3-6", "6+"];
const HOURS_PER_WEEK_OPTIONS = ["0 hours per week", "1-5 hours per week", "5-10 hours per week", "10-20 hours per week", ">20 hours per week"];
const FRUSTRATING_STAGES = [
  { id: "discovery", label: "Discovery & Prospecting", description: "Waiting for inbound messages or actively pitching" },
  { id: "contracting", label: "Contracting", description: "Agreeing on deliverables & terms" },
  { id: "negotiation", label: "Negotiation", description: "Aligning on compensation, whether financial or non-financial" },
  { id: "briefing", label: "Briefing & Content Creation", description: "Understanding & agreeing the creative briefs/requirements" },
  { id: "activation", label: "Activation", description: "Going live with the content" },
  { id: "measurement", label: "Measurement & Reporting", description: "Sending/analysing performance of campaigns/social posts" },
  { id: "nothing", label: "Nothing felt frustrating", description: "" },
  { id: "other", label: "Other", description: "" },
];

const BRANDS_REACHED_OUT_OPTIONS = ["0", "1-5", "5-10", ">10"];
const PRIMARY_GOALS = [
  { id: "income", label: "Extra Income" },
  { id: "products", label: "Getting free products/equipment" },
  { id: "profile", label: "Increasing my public profile/social status" },
  { id: "other", label: "Other" },
];

const STOPPED_MESSAGING_REASONS = [
  { id: "confidence", label: "Lack of confidence" },
  { id: "no_clue", label: "No clue what type of brands to reach out to" },
  { id: "contact_info", label: "Lack of contact info" },
  { id: "other", label: "Other" },
];

export default function Poll({ onClose }: PollProps) {
  const [step, setStep] = useState<Step>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Section 1 state
  const [currentRole, setCurrentRole] = useState<string[]>([]);

  // Section 2 state
  const [hasPartneredWithBrand, setHasPartneredWithBrand] = useState<boolean | null>(null);

  // Section 3 state (for those who have partnered)
  const [totalBrandsPartnered, setTotalBrandsPartnered] = useState("");
  const [partnershipsLongerThan6Months, setPartnershipsLongerThan6Months] = useState("");
  const [brandInquiriesPerMonth, setBrandInquiriesPerMonth] = useState("");
  const [hoursPerWeekOnBusiness, setHoursPerWeekOnBusiness] = useState("");
  const [requiresPerformanceReport, setRequiresPerformanceReport] = useState<boolean | null>(null);
  const [mostFrustratingStages, setMostFrustratingStages] = useState<string[]>([]);
  const [mostFrustratingStageOther, setMostFrustratingStageOther] = useState("");
  const [reasonSaidNoToBrand, setReasonSaidNoToBrand] = useState("");

  // Section 4 state (for those who haven't partnered)
  const [hasRefusedBrandOffer, setHasRefusedBrandOffer] = useState<boolean | null>(null);
  const [reasonRefusedOffer, setReasonRefusedOffer] = useState("");
  const [brandsReachedOutTo, setBrandsReachedOutTo] = useState("");
  const [reasonBrandsHaventReachedOut, setReasonBrandsHaventReachedOut] = useState("");
  const [primaryGoalForPartnerships, setPrimaryGoalForPartnerships] = useState("");
  const [primaryGoalOther, setPrimaryGoalOther] = useState("");
  const [hasMediaKit, setHasMediaKit] = useState<boolean | null>(null);
  const [thoughtStoppedFromMessaging, setThoughtStoppedFromMessaging] = useState("");
  const [thoughtStoppedFromMessagingOther, setThoughtStoppedFromMessagingOther] = useState("");

  // Section 5 state
  const [willingToJoinOnboardingCall, setWillingToJoinOnboardingCall] = useState<boolean | null>(null);

  const toggleRole = (roleId: string) => {
    setCurrentRole(prev =>
      prev.includes(roleId)
        ? prev.filter(r => r !== roleId)
        : [...prev, roleId]
    );
  };

  const toggleFrustratingStage = (stageId: string) => {
    setMostFrustratingStages(prev =>
      prev.includes(stageId)
        ? prev.filter(s => s !== stageId)
        : [...prev, stageId]
    );
  };

  const canProceedFromStep = (currentStep: Step): boolean => {
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return currentRole.length > 0;
      case 2:
        return hasPartneredWithBrand !== null;
      case 3:
        return (
          totalBrandsPartnered.trim() !== "" &&
          partnershipsLongerThan6Months.trim() !== "" &&
          brandInquiriesPerMonth !== "" &&
          hoursPerWeekOnBusiness !== "" &&
          requiresPerformanceReport !== null &&
          mostFrustratingStages.length > 0 &&
          (!mostFrustratingStages.includes("other") || mostFrustratingStageOther.trim() !== "") &&
          reasonSaidNoToBrand.trim() !== ""
        );
      case 4:
        return (
          hasRefusedBrandOffer !== null &&
          (hasRefusedBrandOffer === false || reasonRefusedOffer.trim() !== "") &&
          brandsReachedOutTo !== "" &&
          reasonBrandsHaventReachedOut.trim() !== "" &&
          primaryGoalForPartnerships !== "" &&
          (primaryGoalForPartnerships !== "other" || primaryGoalOther.trim() !== "") &&
          hasMediaKit !== null &&
          thoughtStoppedFromMessaging !== "" &&
          (thoughtStoppedFromMessaging !== "other" || thoughtStoppedFromMessagingOther.trim() !== "")
        );
      case 5:
        return willingToJoinOnboardingCall !== null;
      default:
        return false;
    }
  };

  const getNextStep = (): Step | null => {
    switch (step) {
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return hasPartneredWithBrand ? 3 : 4;
      case 3:
        return 5;
      case 4:
        return 5;
      case 5:
        return null;
      default:
        return null;
    }
  };

  const getPrevStep = (): Step | null => {
    switch (step) {
      case 0:
        return null;
      case 1:
        return 0;
      case 2:
        return 1;
      case 3:
        return 2;
      case 4:
        return 2;
      case 5:
        return hasPartneredWithBrand ? 3 : 4;
      default:
        return null;
    }
  };

  const handleNext = () => {
    const nextStep = getNextStep();
    if (nextStep) {
      setStep(nextStep);
    }
  };

  const handleBack = () => {
    const prevStep = getPrevStep();
    if (prevStep) {
      setStep(prevStep);
    }
  };

  const handleSubmit = async () => {
    if (!canProceedFromStep(5)) return;

    setIsSubmitting(true);
    setSubmitError("");

    const payload: Record<string, unknown> = {
      currentRole,
      hasPartneredWithBrand,
      willingToJoinOnboardingCall,
    };

    if (hasPartneredWithBrand) {
      payload.section3 = {
        totalBrandsPartnered,
        partnershipsLongerThan6Months,
        brandInquiriesPerMonth,
        hoursPerWeekOnBusiness,
        requiresPerformanceReport,
        mostFrustratingStages,
        mostFrustratingStageOther: mostFrustratingStages.includes("other") ? mostFrustratingStageOther : undefined,
        reasonSaidNoToBrand,
      };
    } else {
      payload.section4 = {
        hasRefusedBrandOffer,
        reasonRefusedOffer: hasRefusedBrandOffer ? reasonRefusedOffer : undefined,
        brandsReachedOutTo,
        reasonBrandsHaventReachedOut,
        primaryGoalForPartnerships,
        primaryGoalOther: primaryGoalForPartnerships === "other" ? primaryGoalOther : undefined,
        hasMediaKit,
        thoughtStoppedFromMessaging,
        thoughtStoppedFromMessagingOther: thoughtStoppedFromMessaging === "other" ? thoughtStoppedFromMessagingOther : undefined,
      };
    }

    try {
      const res = await fetch("/api/poll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitSuccess(true);
      } else {
        const data = await res.json();
        setSubmitError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = (): string => {
    switch (step) {
      case 0:
        return "Welcome";
      case 1:
        return "Current Level / Role";
      case 2:
        return "Your Brand Experience";
      case 3:
        return "Athletes signed/partnered with a brand";
      case 4:
        return "Aspiring Athlete";
      case 5:
        return "Join the Inner Circle";
      default:
        return "";
    }
  };

  const getTotalSteps = (): number => {
    // 5 visible steps: intro, role, brand experience, section 3 or 4, final
    return 5;
  };

  const getVisualStep = (): number => {
    if (step <= 2) return step + 1; // 0->1, 1->2, 2->3
    if (step === 3 || step === 4) return 4;
    return 5;
  };

  if (submitSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-lg w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your feedback is incredibly valuable to us. We'll use your insights to build a better MatchPoint.
          </p>
          <button
            onClick={onClose}
            className="btn-primary px-8 py-3"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-[#7c3aed] font-medium uppercase tracking-wider mb-1">
                Step {getVisualStep()} of {getTotalSteps()}
              </p>
              <h2 className="text-xl font-bold text-[#1a1a2e]">{getStepTitle()}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7c3aed] transition-all duration-300"
              style={{ width: `${(getVisualStep() / getTotalSteps()) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 0 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-[#7c3aed]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#7c3aed]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4">Help Shape MatchPoint</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                This survey takes about <span className="font-semibold text-[#7c3aed]">5 minutes</span> to complete.
                Your answers will help us build a better platform for athletes and brands.
              </p>
              <div className="bg-[#f5f3ff] rounded-lg p-4 max-w-sm mx-auto">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-[#1a1a2e]">What to expect:</span>
                </p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1 text-left">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full" />
                    Questions about your current role
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full" />
                    Your brand partnership experience
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full" />
                    Opportunity to join our beta program
                  </li>
                </ul>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <p className="text-gray-600 mb-4">Select all that apply:</p>
              {CURRENT_ROLES.map((role) => (
                <label
                  key={role.id}
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                    currentRole.includes(role.id)
                      ? "border-[#7c3aed] bg-[#7c3aed]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={currentRole.includes(role.id)}
                    onChange={() => toggleRole(role.id)}
                    className="mt-1 w-5 h-5 text-[#7c3aed] border-gray-300 rounded focus:ring-[#7c3aed]"
                  />
                  <div>
                    <span className="font-medium text-[#1a1a2e]">{role.label}</span>
                    {role.description && (
                      <p className="text-sm text-gray-500 mt-0.5">{role.description}</p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">Have you signed/partnered with a Brand in the last 24 months?</p>
              <div className="space-y-3">
                {[
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ].map((option) => (
                  <label
                    key={String(option.value)}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                      hasPartneredWithBrand === option.value
                        ? "border-[#7c3aed] bg-[#7c3aed]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="hasPartnered"
                      checked={hasPartneredWithBrand === option.value}
                      onChange={() => setHasPartneredWithBrand(option.value)}
                      className="w-5 h-5 text-[#7c3aed] border-gray-300 focus:ring-[#7c3aed]"
                    />
                    <span className="font-medium text-[#1a1a2e]">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              {/* Total brands partnered */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  How many brands have you partnered with throughout your career to date? <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={totalBrandsPartnered}
                  onChange={(e) => setTotalBrandsPartnered(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7c3aed] focus:outline-none transition"
                  placeholder="Enter a number"
                />
              </div>

              {/* Partnerships longer than 6 months */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  How many of these partnerships are longer than 6 months? <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={partnershipsLongerThan6Months}
                  onChange={(e) => setPartnershipsLongerThan6Months(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7c3aed] focus:outline-none transition"
                  placeholder="Enter a number"
                />
              </div>

              {/* Brand inquiries per month */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  On average, how many Brand inquiries (DMs or emails) do you receive per month? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {BRAND_INQUIRIES_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition ${
                        brandInquiriesPerMonth === option
                          ? "border-[#7c3aed] bg-[#7c3aed]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="brandInquiries"
                        checked={brandInquiriesPerMonth === option}
                        onChange={() => setBrandInquiriesPerMonth(option)}
                        className="w-4 h-4 text-[#7c3aed] border-gray-300 focus:ring-[#7c3aed]"
                      />
                      <span className="text-[#1a1a2e]">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Hours per week on business */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  In an average week, how many hours do you spend on business tasks (negotiating, replying to brands, reviewing contracts, creating reporting decks)? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {HOURS_PER_WEEK_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition ${
                        hoursPerWeekOnBusiness === option
                          ? "border-[#7c3aed] bg-[#7c3aed]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="hoursPerWeek"
                        checked={hoursPerWeekOnBusiness === option}
                        onChange={() => setHoursPerWeekOnBusiness(option)}
                        className="w-4 h-4 text-[#7c3aed] border-gray-300 focus:ring-[#7c3aed]"
                      />
                      <span className="text-[#1a1a2e]">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Performance report required */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  Do your current brand partners require a post-campaign performance report (e.g., screenshots of views/engagement)? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  {[
                    { value: true, label: "Yes" },
                    { value: false, label: "No" },
                  ].map((option) => (
                    <label
                      key={String(option.value)}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition flex-1 ${
                        requiresPerformanceReport === option.value
                          ? "border-[#7c3aed] bg-[#7c3aed]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="performanceReport"
                        checked={requiresPerformanceReport === option.value}
                        onChange={() => setRequiresPerformanceReport(option.value)}
                        className="w-4 h-4 text-[#7c3aed] border-gray-300 focus:ring-[#7c3aed]"
                      />
                      <span className="text-[#1a1a2e]">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Most frustrating stage */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  In a previous partnership that took &apos;too much work&apos; to get across the finish line, at what stage did it feel most frustrating? <span className="text-red-500">*</span>
                  <span className="block text-gray-500 font-normal mt-1">Select all that apply</span>
                </label>
                <div className="space-y-2">
                  {FRUSTRATING_STAGES.map((stage) => (
                    <label
                      key={stage.id}
                      className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition ${
                        mostFrustratingStages.includes(stage.id)
                          ? "border-[#7c3aed] bg-[#7c3aed]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={mostFrustratingStages.includes(stage.id)}
                        onChange={() => toggleFrustratingStage(stage.id)}
                        className="mt-0.5 w-4 h-4 text-[#7c3aed] border-gray-300 rounded focus:ring-[#7c3aed]"
                      />
                      <div>
                        <span className="text-[#1a1a2e]">{stage.label}</span>
                        {stage.description && (
                          <p className="text-sm text-gray-500">{stage.description}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                {mostFrustratingStages.includes("other") && (
                  <input
                    type="text"
                    value={mostFrustratingStageOther}
                    onChange={(e) => setMostFrustratingStageOther(e.target.value)}
                    className="mt-3 w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7c3aed] focus:outline-none transition"
                    placeholder="Please specify..."
                  />
                )}
              </div>

              {/* Reason said no to brand */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  Think of the last time you said &apos;No&apos; to a brand that was offering you money. What was the specific red flag or missing piece of information that made you turn them down? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reasonSaidNoToBrand}
                  onChange={(e) => setReasonSaidNoToBrand(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7c3aed] focus:outline-none transition resize-none"
                  rows={4}
                  placeholder="Your answer..."
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              {/* Has refused brand offer */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  Have you ever refused a Brand offer before? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  {[
                    { value: true, label: "Yes" },
                    { value: false, label: "No" },
                  ].map((option) => (
                    <label
                      key={String(option.value)}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition flex-1 ${
                        hasRefusedBrandOffer === option.value
                          ? "border-[#7c3aed] bg-[#7c3aed]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="refusedOffer"
                        checked={hasRefusedBrandOffer === option.value}
                        onChange={() => setHasRefusedBrandOffer(option.value)}
                        className="w-4 h-4 text-[#7c3aed] border-gray-300 focus:ring-[#7c3aed]"
                      />
                      <span className="text-[#1a1a2e]">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reason refused offer (conditional) */}
              {hasRefusedBrandOffer === true && (
                <div>
                  <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                    If you answered &quot;Yes&quot; to the previous question, please explain why you refused the offer from the Brands <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={reasonRefusedOffer}
                    onChange={(e) => setReasonRefusedOffer(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7c3aed] focus:outline-none transition resize-none"
                    rows={4}
                    placeholder="Your answer..."
                  />
                </div>
              )}

              {/* Brands reached out to */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  In the last 6 months, how many brands have you personally reached out to or tagged in hopes of a partnership? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {BRANDS_REACHED_OUT_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition ${
                        brandsReachedOutTo === option
                          ? "border-[#7c3aed] bg-[#7c3aed]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="brandsReached"
                        checked={brandsReachedOutTo === option}
                        onChange={() => setBrandsReachedOutTo(option)}
                        className="w-4 h-4 text-[#7c3aed] border-gray-300 focus:ring-[#7c3aed]"
                      />
                      <span className="text-[#1a1a2e]">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reason brands haven't reached out */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  What do you believe is the #1 reason Brands haven&apos;t reached out to you yet? <span className="text-red-500">*</span>
                  <span className="block text-gray-500 font-normal mt-1">
                    (Ex. Brands do not know how to contact me, not enough followers, my content is not good enough, ...)
                  </span>
                </label>
                <textarea
                  value={reasonBrandsHaventReachedOut}
                  onChange={(e) => setReasonBrandsHaventReachedOut(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7c3aed] focus:outline-none transition resize-none"
                  rows={4}
                  placeholder="Your answer..."
                />
              </div>

              {/* Primary goal */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  What would be your primary goal for seeking brand partnerships? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {PRIMARY_GOALS.map((goal) => (
                    <label
                      key={goal.id}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition ${
                        primaryGoalForPartnerships === goal.id
                          ? "border-[#7c3aed] bg-[#7c3aed]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="primaryGoal"
                        checked={primaryGoalForPartnerships === goal.id}
                        onChange={() => setPrimaryGoalForPartnerships(goal.id)}
                        className="w-4 h-4 text-[#7c3aed] border-gray-300 focus:ring-[#7c3aed]"
                      />
                      <span className="text-[#1a1a2e]">{goal.label}</span>
                    </label>
                  ))}
                </div>
                {primaryGoalForPartnerships === "other" && (
                  <input
                    type="text"
                    value={primaryGoalOther}
                    onChange={(e) => setPrimaryGoalOther(e.target.value)}
                    className="mt-3 w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7c3aed] focus:outline-none transition"
                    placeholder="Please specify..."
                  />
                )}
              </div>

              {/* Has media kit */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  Do you currently have a &apos;Media Kit&apos; or a document that shows your stats to brands? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  {[
                    { value: true, label: "Yes" },
                    { value: false, label: "No" },
                  ].map((option) => (
                    <label
                      key={String(option.value)}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition flex-1 ${
                        hasMediaKit === option.value
                          ? "border-[#7c3aed] bg-[#7c3aed]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="hasMediaKit"
                        checked={hasMediaKit === option.value}
                        onChange={() => setHasMediaKit(option.value)}
                        className="w-4 h-4 text-[#7c3aed] border-gray-300 focus:ring-[#7c3aed]"
                      />
                      <span className="text-[#1a1a2e]">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Thought stopped from messaging */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  Think about the last time you thought about messaging a brand you love. What was the exact thought that stopped you from hitting &apos;send&apos;? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {STOPPED_MESSAGING_REASONS.map((reason) => (
                    <label
                      key={reason.id}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition ${
                        thoughtStoppedFromMessaging === reason.id
                          ? "border-[#7c3aed] bg-[#7c3aed]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="stoppedMessaging"
                        checked={thoughtStoppedFromMessaging === reason.id}
                        onChange={() => setThoughtStoppedFromMessaging(reason.id)}
                        className="w-4 h-4 text-[#7c3aed] border-gray-300 focus:ring-[#7c3aed]"
                      />
                      <span className="text-[#1a1a2e]">{reason.label}</span>
                    </label>
                  ))}
                </div>
                {thoughtStoppedFromMessaging === "other" && (
                  <input
                    type="text"
                    value={thoughtStoppedFromMessagingOther}
                    onChange={(e) => setThoughtStoppedFromMessagingOther(e.target.value)}
                    className="mt-3 w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7c3aed] focus:outline-none transition"
                    placeholder="Please specify..."
                  />
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <p className="text-gray-600">
                We are launching a private Beta in the coming weeks to help a small group of athletes/agents automate their brand discovery.
              </p>
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  Are you willing to join a 10-minute &apos;On-boarding call&apos; to set up your profile & give us feedback on the first version? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: true, label: "Yes, I'm in. Let's talk" },
                    { value: false, label: "No, just keep me on the email list for now" },
                  ].map((option) => (
                    <label
                      key={String(option.value)}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                        willingToJoinOnboardingCall === option.value
                          ? "border-[#7c3aed] bg-[#7c3aed]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="onboardingCall"
                        checked={willingToJoinOnboardingCall === option.value}
                        onChange={() => setWillingToJoinOnboardingCall(option.value)}
                        className="w-5 h-5 text-[#7c3aed] border-gray-300 focus:ring-[#7c3aed]"
                      />
                      <span className="font-medium text-[#1a1a2e]">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between">
          {getPrevStep() ? (
            <button
              onClick={handleBack}
              className="px-6 py-3 text-gray-600 hover:text-[#1a1a2e] font-medium transition"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {submitError && (
            <p className="text-red-500 text-sm self-center">{submitError}</p>
          )}

          {step === 5 ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceedFromStep(step) || isSubmitting}
              className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceedFromStep(step)}
              className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 0 ? "Get Started" : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
