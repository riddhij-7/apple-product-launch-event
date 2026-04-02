import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, handle, reach, niche } = body;

    // Basic validation
    if (!name || !email || !handle) {
      return NextResponse.json(
        { error: "Name, email, and handle are required." },
        { status: 400 }
      );
    }

    const client = await connectDB();
    if (!client) {
      return NextResponse.json(
        { error: "Database connection failed." },
        { status: 500 }
      );
    }

    const db =
      typeof (client as any).db === "function"
        ? (client as any).db()
        : ((client as any).db ?? client as any);

    await (db as any).collection("influencer_applications").insertOne({
      name,
      email,
      handle,
      reach,
      niche,
      status: "pending",       
      submittedAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[influencer-apply]", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}