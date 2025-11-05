import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-Demand Revalidation API Route
 *
 * This endpoint is called by WordPress webhooks when content is updated.
 * It revalidates only the affected pages, not the entire cache.
 *
 * Security: Requires REVALIDATION_TOKEN environment variable
 *
 * WordPress webhook payload example:
 * {
 *   "token": "your-secret-token",
 *   "action": "update_post",
 *   "postSlug": "10-fashion-tips",
 *   "categorySlug": "fashion",
 *   "tags": ["style", "tips"]
 * }
 */

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { token, action, postSlug, categorySlug, tags } = body;

    // Verify token for security
    const revalidationToken = process.env.REVALIDATION_TOKEN;

    if (!revalidationToken) {
      console.error('[Revalidate] REVALIDATION_TOKEN not set in environment variables');
      return NextResponse.json(
        { error: 'Revalidation not configured. Please set REVALIDATION_TOKEN in .env' },
        { status: 500 }
      );
    }

    if (token !== revalidationToken) {
      console.error('[Revalidate] Invalid token received');
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Track revalidated paths for logging
    const revalidatedPaths: string[] = [];

    // Always revalidate homepage (shows latest posts)
    revalidatePath('/');
    revalidatedPaths.push('/');

    // Revalidate based on action type
    switch (action) {
      case 'update_post':
      case 'publish_post':
      case 'delete_post':
        // Revalidate the specific post page
        if (postSlug && categorySlug) {
          const postPath = `/${categorySlug}/${postSlug}`;
          revalidatePath(postPath);
          revalidatedPaths.push(postPath);
        }

        // Revalidate category page
        if (categorySlug) {
          const categoryPath = `/category/${categorySlug}`;
          revalidatePath(categoryPath);
          revalidatedPaths.push(categoryPath);
        }

        // Revalidate tag pages
        if (tags && Array.isArray(tags)) {
          for (const tag of tags) {
            const tagPath = `/tag/${tag}`;
            revalidatePath(tagPath);
            revalidatedPaths.push(tagPath);
          }
        }
        break;

      case 'update_category':
        // Revalidate category page and all posts in it
        if (categorySlug) {
          const categoryPath = `/category/${categorySlug}`;
          revalidatePath(categoryPath);
          revalidatedPaths.push(categoryPath);
        }
        break;

      case 'update_tag':
        // Revalidate tag page
        if (tags && Array.isArray(tags)) {
          for (const tag of tags) {
            const tagPath = `/tag/${tag}`;
            revalidatePath(tagPath);
            revalidatedPaths.push(tagPath);
          }
        }
        break;

      case 'revalidate_all':
        // Emergency option to revalidate everything
        // Use sparingly - better to revalidate specific paths
        revalidatePath('/', 'layout');
        revalidatedPaths.push('/* (all)');
        break;

      default:
        console.warn(`[Revalidate] Unknown action: ${action}`);
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }

    console.log(`[Revalidate] ✅ Successfully revalidated paths:`, revalidatedPaths);

    return NextResponse.json({
      success: true,
      revalidated: revalidatedPaths,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[Revalidate] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to revalidate',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Also support GET for simple testing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  const revalidationToken = process.env.REVALIDATION_TOKEN;

  if (!revalidationToken) {
    return NextResponse.json(
      { error: 'Revalidation not configured' },
      { status: 500 }
    );
  }

  if (token !== revalidationToken) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }

  // Simple test: revalidate homepage
  revalidatePath('/');

  return NextResponse.json({
    success: true,
    message: 'Test revalidation successful - homepage revalidated',
    timestamp: new Date().toISOString(),
  });
}
