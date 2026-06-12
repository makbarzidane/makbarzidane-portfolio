import { NextResponse } from "next/server";
import { cmsAuthCookie } from "@/lib/cmsAuth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cmsAuthCookie, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/"
  });

  return response;
}
