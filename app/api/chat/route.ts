import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { detail: "OPENAI_API_KEY not configured" },
      { status: 500 }
    );
  }
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const body = await req.json().catch(() => null);
  if (!body?.message) {
    return NextResponse.json({ detail: "message field required" }, { status: 400 });
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are a supportive mental coach." },
        { role: "user", content: body.message },
      ],
    });
    return NextResponse.json({ reply: response.choices[0].message.content });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { detail: `Error calling OpenAI API: ${msg}` },
      { status: 500 }
    );
  }
}
