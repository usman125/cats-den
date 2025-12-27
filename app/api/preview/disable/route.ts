import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

/**
 * Disable preview/draft mode
 * Useful for exiting preview mode after content review
 */
export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();
  
  // Get the redirect URL from query params, or default to home
  const redirectUrl = request.nextUrl.searchParams.get("redirect") || "/";
  
  redirect(redirectUrl);
}






