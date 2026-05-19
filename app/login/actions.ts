"use server"

import { signIn } from "@/auth"

export async function requestMagicLink(formData: FormData) {


  // Construct university email

    

    await signIn("resend", {
    formData,
    redirectTo: "/onboarding",
  })
}