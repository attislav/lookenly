<?php
/**
 * Plugin Name: Next.js On-Demand Revalidation
 * Plugin URI: https://github.com/your-repo
 * Description: Automatically triggers Next.js cache revalidation when WordPress content is updated. Auto-generated for Lookenly.
 * Version: 1.0.0
 * Author: Site Generator
 * Author URI: https://lookenly.com
 * License: MIT
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Configuration
define('NEXTJS_REVALIDATE_URL', 'https://lookenly.com/api/revalidate');
define('NEXTJS_REVALIDATE_TOKEN', '8qdckYqS08klwujak7MzD6j3wYKIXMUirTVeGaUHyZ4=');

/**
 * Send revalidation request to Next.js
 *
 * @param string $action The action type (update_post, publish_post, delete_post)
 * @param int $post_id The WordPress post ID
 */
function nextjs_trigger_revalidation($action, $post_id) {
    $post = get_post($post_id);

    // Only handle published posts (not drafts, pages, etc.)
    if (!$post || $post->post_type !== 'post' || $post->post_status !== 'publish') {
        return;
    }

    // Get post data
    $post_slug = $post->post_name;
    $categories = get_the_category($post_id);
    $category_slug = !empty($categories) ? $categories[0]->slug : '';

    // Get tags
    $tags = get_the_tags($post_id);
    $tag_slugs = [];
    if ($tags) {
        foreach ($tags as $tag) {
            $tag_slugs[] = $tag->slug;
        }
    }

    // Prepare webhook payload
    $payload = [
        'token' => NEXTJS_REVALIDATE_TOKEN,
        'action' => $action,
        'postSlug' => $post_slug,
        'categorySlug' => $category_slug,
        'tags' => $tag_slugs,
    ];

    // Send webhook (non-blocking)
    $response = wp_remote_post(NEXTJS_REVALIDATE_URL, [
        'headers' => ['Content-Type' => 'application/json'],
        'body' => json_encode($payload),
        'timeout' => 15,
        'blocking' => false,
    ]);

    // Log for debugging
    if (is_wp_error($response)) {
        error_log("[Next.js Revalidation] Error for {$post_slug}: " . $response->get_error_message());
    } else {
        error_log("[Next.js Revalidation] Triggered for: {$post_slug} (action: {$action})");
    }
}

// Hook into WordPress post events
add_action('save_post', function($post_id) {
    // Prevent auto-save and revisions
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (wp_is_post_revision($post_id)) {
        return;
    }

    nextjs_trigger_revalidation('update_post', $post_id);
}, 10, 1);

add_action('publish_post', function($post_id) {
    nextjs_trigger_revalidation('publish_post', $post_id);
}, 10, 1);

add_action('delete_post', function($post_id) {
    nextjs_trigger_revalidation('delete_post', $post_id);
}, 10, 1);
