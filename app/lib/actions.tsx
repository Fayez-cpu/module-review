"use server";

import { z } from "zod";

const submitReviewSchema = z.object({
  courseSlug: z.string().trim().min(1),
  moduleSlug: z.string().trim().min(1),
  teachingRating: z.coerce.number().int().min(1).max(5),
  assessmentRating: z.coerce.number().int().min(1).max(5),
  contentRating: z.coerce.number().int().min(1).max(5),
  supportRating: z.coerce.number().int().min(1).max(5),
  feedback: z.string().trim().min(10).max(2000),
});

export type SubmitReviewResult = {
  ok: boolean;
  message: string;
};

export async function submitReview(formData: FormData): Promise<SubmitReviewResult> {
  const parsed = submitReviewSchema.safeParse({
    courseSlug: formData.get("courseSlug"),
    moduleSlug: formData.get("moduleSlug"),
    teachingRating: formData.get("teachingRating"),
    assessmentRating: formData.get("assessmentRating"),
    contentRating: formData.get("contentRating"),
    supportRating: formData.get("supportRating"),
    feedback: formData.get("feedback"),
  });

  if (!parsed.success) {
    return { ok: false, message: "Please provide valid review details." };
  }

  const { courseSlug, moduleSlug, teachingRating, assessmentRating, contentRating, supportRating } =
    parsed.data;

  const overallRating =
    (teachingRating + assessmentRating + contentRating + supportRating) / 4;

  console.log("Review payload ready for DB:", {
    courseSlug,
    moduleSlug,
    teachingRating,
    assessmentRating,
    contentRating,
    supportRating,
    overallRating,
    feedback: parsed.data.feedback,
  });

  return { ok: true, message: "Review submitted successfully." };
}
    
