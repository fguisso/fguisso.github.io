# Tianji Website Analytics

## 1. Overview
- Tianji is an open-source suite (analytics + monitor + status), privacy-first (no cookies by default) with a lightweight tracker (< 2 KB).
- Picked for this Astro static blog because it is self-hosted, avoids extra backend, and keeps data footprint minimal.

## 2. How the integration works
- Local integration in `src/integrations/tianji.ts` injects the Tianji script into every page via `injectScript("page", ...)`.
- Options:
  - `trackerUrl`: full URL to `tracker.js` (e.g., `https://tc.guisso.dev/tracker.js`).
  - `websiteId`: value for `data-website-id`.
  - `domains?`: mapped to `data-domains` (limits tracking to these hosts). Includes `localhost`/`127.0.0.1` so local preview emits events.
  - `enabled?` (default `true`): disable without removing code.
  - `disableInDev?` (default `true`): skip during `astro dev`. Currently set to `false` to capture local runs.

## 3. How to enable/disable
- File: `astro.config.mjs`.
- Import and usage:

```js
import tianjiIntegration from "./src/integrations/tianji";

export default defineConfig({
  integrations: [
    tianjiIntegration({
      trackerUrl: "https://tc.guisso.dev/tracker.js",
      websiteId: "cmii1ghp20egvjpnvi3fc0asv",
      domains: ["guisso.dev", "www.guisso.dev", "localhost", "127.0.0.1"],
      disableInDev: false,
    }),
  ],
});
```

- To mute tracking in specific environments, set `enabled: false` or revert `disableInDev` to `true`.

## 4. Using `data-tianji-event` in practice
- Basic syntax:

```html
<button data-tianji-event="submit-login-form">Login</button>
```

- With extra payload:

```html
<button
  data-tianji-event="share_post"
  data-tianji-event-slug="hello-world"
  data-tianji-event-platform="twitter">
  Share
</button>
```

- Once the global script is configured, just add these attributes in any HTML/Astro; no custom JS helpers are required.

## 5. Privacy and performance
- Tracker is small (< 2 KB), `async` + `defer`, non-blocking.
- No cookies by default (honors the Tianji self-hosted config).
- Works well for static hosting (GitHub Pages/CDN) without backend dependencies.

## 6. Event naming used in the site (no properties, only event name)
- Home/projects: `click_project_{slug}_{locale}` (slug from project title).
- About bio (PT): `download_bio_photo_pt`, `copy_bio_text_pt`.
- About bio (EN): `download_bio_photo_en`, `copy_bio_text_en`.
- Talks page (PT):
  - Repo CTA: `click_talk_repo_{talk-slug}`
  - Resources: `click_talk_resource_{talk-slug}_{article|video|slides}`
  - Slidev link: `outbound_link_pt`
- Social marquee: `outbound_link_{platform}_{locale}` (e.g., `outbound_link_github_pt`).
- E2E tests stub the tracker by default. Set `PLAYWRIGHT_TIANJI_LIVE=1` for the live pageview test.

Notes:
- Tianji properties (extra data) are temporarily ignored; we rely on event names only. If properties become available, we can reintroduce `data-tianji-event-*`.
