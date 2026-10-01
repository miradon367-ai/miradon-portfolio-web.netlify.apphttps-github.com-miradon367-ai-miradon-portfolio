import { NextResponse } from "next/server";
import { sendAppointmentEmail } from "@/lib/email";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, date, time, service, notes } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: "Name, email, date, and time are required." },
        { status: 400 }
      );
    }

    // 1. Dispatch automated email notification to miradon367@gmail.com
    await sendAppointmentEmail({
      name,
      email,
      date,
      time,
      service: service || "Consultation",
      notes: notes || "No additional notes provided.",
    });

    // 2. Persist appointment to data/appointments.json
    try {
      const filePath = path.join(process.cwd(), "data", "appointments.json");
      let appointments = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        appointments = fileContent ? JSON.parse(fileContent) : [];
      }
      appointments.unshift({
        id: `apt-${Date.now()}`,
        name,
        email,
        date,
        time,
        service: service || "Consultation",
        notes: notes || "",
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2), "utf-8");
    } catch (saveError) {
      console.warn("Could not save to appointments.json (e.g. read-only filesystem):", saveError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Appointment successfully booked! Notification has been dispatched to miradon367@gmail.com.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing appointment booking:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "appointments.json");
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return NextResponse.json({ appointments: data }, { status: 200 });
    }
    return NextResponse.json({ appointments: [] }, { status: 200 });
  } catch {
    return NextResponse.json({ appointments: [] }, { status: 200 });
  }
}
