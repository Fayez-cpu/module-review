"use server";

import { signIn } from "@/auth";

export async function requestMagicLink(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return;
  }

  await signIn("email", {
    email,
    redirectTo: "/onboarding",
  });
}
