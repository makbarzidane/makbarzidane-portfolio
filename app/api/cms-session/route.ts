import { NextResponse } from "next/server";
import { isCmsSessionValid } from "@/lib/cmsAuth";

export async function GET() {
  return NextResponse.json({ ok: isCmsSessionValid() });
}
