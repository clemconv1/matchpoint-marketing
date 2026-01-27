import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Poll response data structure
interface PollResponse {
  id: string;
  submittedAt: string;

  // Section 1: Current Level/Role (multiple selection)
  currentRole: string[];

  // Section 2: Brand Experience
  hasPartneredWithBrand: boolean;

  // Section 3: Athletes who have partnered (conditional)
  section3?: {
    totalBrandsPartnered: string;
    partnershipsLongerThan6Months: string;
    brandInquiriesPerMonth: string;
    hoursPerWeekOnBusiness: string;
    requiresPerformanceReport: boolean;
    mostFrustratingStages: string[];
    mostFrustratingStageOther?: string;
    reasonSaidNoToBrand: string;
  };

  // Section 4: Aspiring Athletes (conditional)
  section4?: {
    hasRefusedBrandOffer: boolean;
    reasonRefusedOffer?: string;
    brandsReachedOutTo: string;
    reasonBrandsHaventReachedOut: string;
    primaryGoalForPartnerships: string;
    primaryGoalOther?: string;
    hasMediaKit: boolean;
    thoughtStoppedFromMessaging: string;
    thoughtStoppedFromMessagingOther?: string;
  };

  // Section 5: Join Inner Circle
  willingToJoinOnboardingCall: boolean;
}

const DATA_FILE = path.join(process.cwd(), "data", "poll-responses.json");

async function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }

  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

async function getResponses(): Promise<PollResponse[]> {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

async function saveResponses(responses: PollResponse[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(responses, null, 2));
}

function generateId(): string {
  return `poll_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.currentRole || !Array.isArray(body.currentRole) || body.currentRole.length === 0) {
      return NextResponse.json(
        { error: "Current role is required" },
        { status: 400 }
      );
    }

    if (typeof body.hasPartneredWithBrand !== "boolean") {
      return NextResponse.json(
        { error: "Brand partnership status is required" },
        { status: 400 }
      );
    }

    if (typeof body.willingToJoinOnboardingCall !== "boolean") {
      return NextResponse.json(
        { error: "Onboarding call preference is required" },
        { status: 400 }
      );
    }

    // Build the response object
    const newResponse: PollResponse = {
      id: generateId(),
      submittedAt: new Date().toISOString(),
      currentRole: body.currentRole,
      hasPartneredWithBrand: body.hasPartneredWithBrand,
      willingToJoinOnboardingCall: body.willingToJoinOnboardingCall,
    };

    // Add section 3 data if they have partnered with brands
    if (body.hasPartneredWithBrand && body.section3) {
      newResponse.section3 = {
        totalBrandsPartnered: body.section3.totalBrandsPartnered || "",
        partnershipsLongerThan6Months: body.section3.partnershipsLongerThan6Months || "",
        brandInquiriesPerMonth: body.section3.brandInquiriesPerMonth || "",
        hoursPerWeekOnBusiness: body.section3.hoursPerWeekOnBusiness || "",
        requiresPerformanceReport: body.section3.requiresPerformanceReport || false,
        mostFrustratingStages: body.section3.mostFrustratingStages || [],
        mostFrustratingStageOther: body.section3.mostFrustratingStageOther,
        reasonSaidNoToBrand: body.section3.reasonSaidNoToBrand || "",
      };
    }

    // Add section 4 data if they haven't partnered with brands
    if (!body.hasPartneredWithBrand && body.section4) {
      newResponse.section4 = {
        hasRefusedBrandOffer: body.section4.hasRefusedBrandOffer || false,
        reasonRefusedOffer: body.section4.reasonRefusedOffer,
        brandsReachedOutTo: body.section4.brandsReachedOutTo || "",
        reasonBrandsHaventReachedOut: body.section4.reasonBrandsHaventReachedOut || "",
        primaryGoalForPartnerships: body.section4.primaryGoalForPartnerships || "",
        primaryGoalOther: body.section4.primaryGoalOther,
        hasMediaKit: body.section4.hasMediaKit || false,
        thoughtStoppedFromMessaging: body.section4.thoughtStoppedFromMessaging || "",
        thoughtStoppedFromMessagingOther: body.section4.thoughtStoppedFromMessagingOther,
      };
    }

    // Save to file
    const responses = await getResponses();
    responses.push(newResponse);
    await saveResponses(responses);

    return NextResponse.json(
      { message: "Poll response submitted successfully!", id: newResponse.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Poll submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const responses = await getResponses();

    // Return aggregated stats
    const stats = {
      total: responses.length,
      byRole: {} as Record<string, number>,
      hasPartnered: responses.filter(r => r.hasPartneredWithBrand).length,
      hasNotPartnered: responses.filter(r => !r.hasPartneredWithBrand).length,
      willingToOnboard: responses.filter(r => r.willingToJoinOnboardingCall).length,
    };

    // Count roles
    responses.forEach(r => {
      r.currentRole.forEach(role => {
        stats.byRole[role] = (stats.byRole[role] || 0) + 1;
      });
    });

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching poll responses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
