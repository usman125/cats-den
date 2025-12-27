import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

/**
 * Preview mode entry point for DatoCMS
 * 
 * Configure this URL in DatoCMS:
 * Settings → Build triggers → Preview URL:
 * https://your-domain.com/api/preview?secret=YOUR_SECRET&slug={slug}&model={model}
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const model = searchParams.get("model");

  // Validate the secret token
  if (secret !== process.env.DATOCMS_PREVIEW_SECRET) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  // Validate required parameters
  if (!slug) {
    return new Response("Missing slug parameter", { status: 400 });
  }

  // Enable Draft Mode
  const draft = await draftMode();
  draft.enable();

  // Determine redirect path based on model type
  let redirectPath = "/";
  
  switch (model) {
    case "kitten":
      redirectPath = `/kitten/${slug}`;
      break;
    case "breed":
      redirectPath = `/breeds/${slug}`;
      break;
    case "blog_post":
      redirectPath = `/blog/${slug}`;
      break;
    case "page":
      // Map slugs to content pages
      const pageRoutes: Record<string, string> = {
        about: "/about",
        contact: "/contact",
        shipping: "/shipping",
        "health-guarantee": "/health-guarantee",
      };
      redirectPath = pageRoutes[slug] || `/${slug}`;
      break;
    default:
      redirectPath = `/${slug}`;
  }

  // Redirect to the content page
  redirect(redirectPath);
}






