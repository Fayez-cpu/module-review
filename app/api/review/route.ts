import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "Use the server action submitReview in app/lib/actions.tsx for review submission.",
    },
    { status: 410 },
  );
}
