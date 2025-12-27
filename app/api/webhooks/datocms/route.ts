import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * DatoCMS Webhook handler for cache revalidation
 * 
 * Configure in DatoCMS:
 * Settings → Webhooks → Add new webhook
 * URL: https://your-domain.com/api/webhooks/datocms
 * Headers: { "x-webhook-secret": "YOUR_SECRET" }
 * Triggers: On record create/update/delete for all content models
 */
export async function POST(request: NextRequest) {
  // Verify webhook secret
  const secret = request.headers.get("x-webhook-secret");
  
  if (secret !== process.env.DATOCMS_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Extract event data
    const { event_type, entity_type, entity } = body;
    
    console.log(`DatoCMS webhook: ${event_type} on ${entity_type}`);

    // Revalidate based on content type
    switch (entity_type) {
      case "item":
        // Content record was changed
        const modelApiKey = entity?.relationships?.item_type?.data?.id;
        
        switch (modelApiKey) {
          case "kitten":
            revalidatePath("/kittens");
            revalidatePath("/");
            if (entity?.attributes?.slug) {
              revalidatePath(`/kitten/${entity.attributes.slug}`);
            }
            break;
            
          case "breed":
            revalidatePath("/breeds");
            revalidatePath("/");
            if (entity?.attributes?.slug) {
              revalidatePath(`/breeds/${entity.attributes.slug}`);
            }
            break;
            
          case "blog_post":
            revalidatePath("/blog");
            if (entity?.attributes?.slug) {
              revalidatePath(`/blog/${entity.attributes.slug}`);
            }
            break;
            
          case "page":
            if (entity?.attributes?.slug) {
              revalidatePath(`/${entity.attributes.slug}`);
            }
            break;
            
          case "testimonial":
            revalidatePath("/");
            break;
            
          default:
            // Revalidate everything for unknown content types
            revalidatePath("/");
        }
        break;
        
      case "upload":
        // Media asset was changed - revalidate everything
        revalidatePath("/");
        break;
        
      default:
        // Other events (publish, unpublish, etc.)
        revalidatePath("/");
    }

    return NextResponse.json({ 
      success: true, 
      revalidated: true,
      message: `Processed ${event_type} for ${entity_type}` 
    });
    
  } catch (error) {
    console.error("DatoCMS webhook error:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
