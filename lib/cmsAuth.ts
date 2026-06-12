import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const cmsAuthCookie = "m-akbar-zidane-cms-auth";

function getAuthSecret() {
  return process.env.CMS_PASSWORD || "m-akbar-zidane-cms";
}

export function createCmsSessionValue(username: string) {
  const signature = createHmac("sha256", getAuthSecret()).update(username).digest("hex");
  return `${username}.${signature}`;
}

export function isCmsSessionValid() {
  const value = cookies().get(cmsAuthCookie)?.value;
  if (!value) return false;

  const [username, signature] = value.split(".");
  if (!username || !signature) return false;

  const expected = createCmsSessionValue(username);
  const actualBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(actualBuffer, expectedBuffer);
}
