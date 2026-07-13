import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Bot honeypot
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ ok: false, error: "invalid_name" }, { status: 400 });
  }
  if (!isEmail(email) || email.length > 120) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (message.length < 10 || message.length > 2000) {
    return NextResponse.json({ ok: false, error: "invalid_message" }, { status: 400 });
  }

  // Demo inbox — swap for email provider / Formspree / Resend later
  console.info("[contact]", {
    name,
    email,
    message,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
