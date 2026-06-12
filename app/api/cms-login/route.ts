import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cmsUsername = process.env.CMS_USERNAME;
  const cmsPassword = process.env.CMS_PASSWORD;

  if (!cmsUsername || !cmsPassword) {
    return NextResponse.json({ message: "Credential CMS belum dikonfigurasi." }, { status: 500 });
  }

  try {
    const body = (await request.json()) as { username?: string; password?: string };
    const isValid = body.username === cmsUsername && body.password === cmsPassword;

    if (!isValid) {
      return NextResponse.json({ message: "Username atau password salah." }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "Request login tidak valid." }, { status: 400 });
  }
}
