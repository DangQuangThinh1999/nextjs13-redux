"use server";

import { cookies } from "next/headers";

async function createToken(token: string) {
  cookies().set("access_token", token);
}
export async function deleteToken() {
  cookies().delete("access_token");
  console.log(getToken(), "getToken");
}
export async function getToken() {
  return cookies().get("access_token")?.value;
}
