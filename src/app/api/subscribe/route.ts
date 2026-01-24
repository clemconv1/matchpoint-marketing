import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Subscriber {
  email: string;
  userType: "athlete" | "brand" | "agent";
  subscribedAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json");

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

async function getSubscribers(): Promise<Subscriber[]> {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

async function saveSubscribers(subscribers: Subscriber[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, userType } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate user type
    const validTypes = ["athlete", "brand", "agent"];
    if (!userType || !validTypes.includes(userType)) {
      return NextResponse.json(
        { error: "Invalid user type" },
        { status: 400 }
      );
    }

    // Get existing subscribers
    const subscribers = await getSubscribers();

    // Check if email already exists
    if (subscribers.some((sub) => sub.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 409 }
      );
    }

    // Add new subscriber
    const newSubscriber: Subscriber = {
      email: email.toLowerCase(),
      userType,
      subscribedAt: new Date().toISOString(),
    };

    subscribers.push(newSubscriber);
    await saveSubscribers(subscribers);

    return NextResponse.json(
      { message: "Successfully subscribed!", subscriber: newSubscriber },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = await getSubscribers();
    return NextResponse.json({
      total: subscribers.length,
      byType: {
        athlete: subscribers.filter(s => s.userType === "athlete").length,
        brand: subscribers.filter(s => s.userType === "brand").length,
        agent: subscribers.filter(s => s.userType === "agent").length,
      }
    });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
