import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, service } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Dispatch email notification to miradon367@gmail.com
    await sendContactEmail({
      name,
      email,
      subject: subject || (service ? `Service Request: ${service}` : `Inquiry from ${name}`),
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received! Mira David don (Miradon) will respond within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
