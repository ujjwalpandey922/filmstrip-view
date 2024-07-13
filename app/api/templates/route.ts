import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "templates.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(fileContent); // Parse the JSON content
    return NextResponse.json(jsonData, { status: 200 }); // Send the parsed JSON data
  } catch (error) {
    return NextResponse.json(
      { message: "Error Uploading Image" },
      { status: 400 }
    );
  }
}
