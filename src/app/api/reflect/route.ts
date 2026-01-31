import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { reflection, teachingTitle, teachingSummary } = await request.json();

    if (!reflection || typeof reflection !== "string") {
      return NextResponse.json({ error: "Missing reflection." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY." }, { status: 500 });
    }

    const system =
      "You are a gentle, non-judgmental reflection coach. Provide brief, kind guidance. Do not diagnose. Keep output concise.";

    const user = `Teaching title: ${teachingTitle || "(unknown)"}\nTeaching summary: ${teachingSummary || "(unknown)"}\nUser reflection: ${reflection}\n\nReturn JSON only with keys: summary (1-2 sentences), questions (array of 2-3 short questions).`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          { role: "system", content: [{ type: "input_text", text: system }] },
          { role: "user", content: [{ type: "input_text", text: user }] },
        ],
        text: { format: { type: "json_object" } },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: errText }, { status: 500 });
    }

    const data = await response.json();
    const text =
      data?.output_text ||
      data?.output?.[0]?.content?.[0]?.text ||
      "{\"summary\":\"\",\"questions\":[]}";

    let parsed: { summary?: string; questions?: string[] } = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { summary: text, questions: [] };
    }

    return NextResponse.json({
      summary: parsed.summary || "",
      questions: parsed.questions || [],
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to generate reflection help." }, { status: 500 });
  }
}
