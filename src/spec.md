# Specification

## Summary
**Goal:** Remove the “Start Gamepad Testing” call-to-action button from the SEO/marketing content block and update the related instructional text accordingly.

**Planned changes:**
- Remove the visible “Start Gamepad Testing” CTA button from `frontend/src/components/gamepad/TesterSeoContentBlock.tsx`.
- Delete any now-unused imports and helper logic that only supported the removed button (e.g., Button import and scroll handler), ensuring the file compiles cleanly.
- Update the “How to Use the Online Gamepad Tester” section to remove or rewrite the step that references clicking the removed button, keeping the rest of the SEO content intact and in English.

**User-visible outcome:** The SEO content block no longer shows a “Start Gamepad Testing” button, and the “How to Use” instructions no longer mention clicking a button that isn’t present.
