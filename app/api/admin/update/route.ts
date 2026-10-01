import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const { type, data } = await req.json();

    const allowedTypes = [
      "profile",
      "projects",
      "services",
      "testimonials",
      "metrics",
      "tools",
    ];

    if (!type || !allowedTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid content type: ${type}` },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", `${type}.json`);
    const formattedJson = JSON.stringify(data, null, 2);

    await fs.writeFile(filePath, formattedJson, "utf8");

    return NextResponse.json({
      success: true,
      message: `${type.toUpperCase()} content saved successfully to disk.`,
    });
  } catch (error) {
    console.error("Error writing to data file:", error);
    return NextResponse.json(
      { error: "Failed to persist changes to content file." },
      { status: 500 }
    );
  }
}
