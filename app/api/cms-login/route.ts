import { NextResponse } from "next/server";
import { cmsAuthCookie, createCmsSessionValue } from "@/lib/cmsAuth";

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

    const response = NextResponse.json({ ok: true });
    response.cookies.set(cmsAuthCookie, createCmsSessionValue(body.username || cmsUsername), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/"
    });

    return response;
  } catch {
    return NextResponse.json({ message: "Request login tidak valid." }, { status: 400 });
  }
}
