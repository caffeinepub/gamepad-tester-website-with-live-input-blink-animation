# Specification

## Summary
**Goal:** Fix deployment by replacing placeholder AdSense/Clarity IDs in `frontend/index.html` and updating the page title/description metadata to the required production values.

**Planned changes:**
- Update `frontend/index.html` to use the exact Google AdSense script URL/client: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6270014025121224`, removing any placeholder `ca-pub-XXXXXXXXXXXXXXXX` text and ensuring the script loads asynchronously with safe failure behavior.
- Update `frontend/index.html` to use the exact Microsoft Clarity project ID `nv7n4ru8tf`, removing any placeholder `CLARITY_PROJECT_ID` text and ensuring it loads asynchronously without blocking initial render.
- Update `frontend/index.html` metadata to the exact required `<title>` and meta description, removing any outdated/previous title/description text.
- Remove/update any remaining placeholder replacement comments/guidance in `frontend/index.html` related to AdSense/Clarity IDs so the file reflects finalized production values.

**User-visible outcome:** The app deploys successfully with the correct production AdSense and Clarity integrations and shows the updated page title and meta description in the browser/SEO previews.
