import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error no types declaration
import pdfParse from "pdf-parse/lib/pdf-parse";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("files") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!file.name.endsWith(".pdf")) {
    return NextResponse.json({ error: "File is not a PDF" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File is too large" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buf = Buffer.from(arrayBuffer);

  try {
    const data = await pdfParse(buf, { max: 2 });
    return NextResponse.json(
      {
        fileContent: data.text.replace(/\n/g, " ").replace(/\t/g, " "),
        fileName: file.name,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
