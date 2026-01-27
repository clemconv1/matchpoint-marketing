import { NextRequest, NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

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

// Google Sheets column headers
const SHEET_HEADERS = [
  "ID",
  "Submitted At",
  "Current Role",
  "Has Partnered With Brand",
  // Section 3 fields
  "Total Brands Partnered",
  "Partnerships > 6 Months",
  "Brand Inquiries Per Month",
  "Hours Per Week On Business",
  "Requires Performance Report",
  "Most Frustrating Stages",
  "Most Frustrating Stage (Other)",
  "Reason Said No To Brand",
  // Section 4 fields
  "Has Refused Brand Offer",
  "Reason Refused Offer",
  "Brands Reached Out To",
  "Reason Brands Haven't Reached Out",
  "Primary Goal For Partnerships",
  "Primary Goal (Other)",
  "Has Media Kit",
  "Thought Stopped From Messaging",
  "Thought Stopped (Other)",
  // Section 5
  "Willing To Join Onboarding Call",
];

function generateId(): string {
  return `poll_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

async function getGoogleSheet() {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!sheetId || !email || !privateKey) {
    console.warn("Google Sheets credentials not configured");
    return null;
  }

  const auth = new JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(sheetId, auth);
  await doc.loadInfo();

  return doc;
}

async function appendToGoogleSheet(response: PollResponse) {
  try {
    const doc = await getGoogleSheet();
    if (!doc) return;

    // Get or create the first sheet
    let sheet = doc.sheetsByIndex[0];

    // Check if headers exist, if not add them
    await sheet.loadHeaderRow().catch(async () => {
      await sheet.setHeaderRow(SHEET_HEADERS);
    });

    // Prepare row data
    const rowData = {
      "ID": response.id,
      "Submitted At": response.submittedAt,
      "Current Role": response.currentRole.join(", "),
      "Has Partnered With Brand": response.hasPartneredWithBrand ? "Yes" : "No",
      // Section 3 fields
      "Total Brands Partnered": response.section3?.totalBrandsPartnered || "",
      "Partnerships > 6 Months": response.section3?.partnershipsLongerThan6Months || "",
      "Brand Inquiries Per Month": response.section3?.brandInquiriesPerMonth || "",
      "Hours Per Week On Business": response.section3?.hoursPerWeekOnBusiness || "",
      "Requires Performance Report": response.section3 ? (response.section3.requiresPerformanceReport ? "Yes" : "No") : "",
      "Most Frustrating Stages": response.section3?.mostFrustratingStages?.join(", ") || "",
      "Most Frustrating Stage (Other)": response.section3?.mostFrustratingStageOther || "",
      "Reason Said No To Brand": response.section3?.reasonSaidNoToBrand || "",
      // Section 4 fields
      "Has Refused Brand Offer": response.section4 ? (response.section4.hasRefusedBrandOffer ? "Yes" : "No") : "",
      "Reason Refused Offer": response.section4?.reasonRefusedOffer || "",
      "Brands Reached Out To": response.section4?.brandsReachedOutTo || "",
      "Reason Brands Haven't Reached Out": response.section4?.reasonBrandsHaventReachedOut || "",
      "Primary Goal For Partnerships": response.section4?.primaryGoalForPartnerships || "",
      "Primary Goal (Other)": response.section4?.primaryGoalOther || "",
      "Has Media Kit": response.section4 ? (response.section4.hasMediaKit ? "Yes" : "No") : "",
      "Thought Stopped From Messaging": response.section4?.thoughtStoppedFromMessaging || "",
      "Thought Stopped (Other)": response.section4?.thoughtStoppedFromMessagingOther || "",
      // Section 5
      "Willing To Join Onboarding Call": response.willingToJoinOnboardingCall ? "Yes" : "No",
    };

    await sheet.addRow(rowData);
    console.log("Successfully added row to Google Sheet");
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    // Don't throw - we still want to return success to the user
  }
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

    // Push to Google Sheets
    await appendToGoogleSheet(newResponse);

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
    const doc = await getGoogleSheet();

    if (!doc) {
      return NextResponse.json(
        { error: "Google Sheets not configured" },
        { status: 503 }
      );
    }

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    // Return aggregated stats
    const stats = {
      total: rows.length,
      byRole: {} as Record<string, number>,
      hasPartnered: 0,
      hasNotPartnered: 0,
      willingToOnboard: 0,
    };

    rows.forEach(row => {
      // Count partnership status
      if (row.get("Has Partnered With Brand") === "Yes") {
        stats.hasPartnered++;
      } else {
        stats.hasNotPartnered++;
      }

      // Count onboarding willingness
      if (row.get("Willing To Join Onboarding Call") === "Yes") {
        stats.willingToOnboard++;
      }

      // Count roles
      const roles = row.get("Current Role")?.split(", ") || [];
      roles.forEach((role: string) => {
        if (role) {
          stats.byRole[role] = (stats.byRole[role] || 0) + 1;
        }
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
