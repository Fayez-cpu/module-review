"use server"

import { signIn } from "@/auth"

export async function requestMagicLink(formData: FormData) {
  const studentId = String(formData.get("email") ?? "").trim()
  console.log(formData)
  // Validate it's a number
  if (!/^\d+$/.test(studentId)) {
    throw new Error("Student ID must be numeric")
  }

  // Construct university email
  const email = `${studentId}@unimail.derby.ac.uk`
  formData.set("email", email)

    await signIn("resend", {
    formData,
    redirectTo: "/onboarding",
  })
}