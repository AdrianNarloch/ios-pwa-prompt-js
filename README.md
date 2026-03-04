## iOS PWA “Add to Home Screen” JS Popup (Native-like)

A lightweight, framework-agnostic component that shows a native-like install hint for iOS Safari to help users add your Progressive Web App (PWA) to their Home Screen.

On many platforms, PWAs can rely on an install prompt event (or browser UI) to guide users through installation. On iOS, that experience is different: users typically must use Safari’s Share menu and then tap “Add to Home Screen”—and many never discover it. This project solves that gap by presenting a clear, visually familiar prompt that explains how to install.

![](./assets/iOS-preview.gif)

---

### What problem does this solve?

If you ship a PWA, installation matters:
- Higher retention: users are more likely to return when your app is on their Home Screen.
- More “app-like” experience: home screen launch, standalone mode, and a dedicated icon.
- Less confusion on iOS: iOS doesn’t always provide a prominent install CTA, and the steps are not obvious.

This component provides a discoverable, friendly, iOS-focused prompt to guide users through the Add to Home Screen flow.

---

### Key features

- Framework-agnostic: works with Vanilla JS and can be embedded into Vue / React / Angular apps.
- Customizable behavior: you can decide when to show it (first visit, after user action, only on certain pages, etc.).
- Minimal footprint: no heavy dependencies; it’s meant to be dropped into an existing site/app.
- Theme-aware styling: plain CSS with CSS3 custom properties and automatic dark mode support.
- Native-like UX: designed to look familiar to iOS users and reduce friction.
- Light & dark mode support: Supports both color schemes out of the box:

---

### Quick start (run the demo locally)

git clone https://github.com/narloch-eu/ios-pwa-prompt-js.git
cd ios-pwa-prompt-js
npm install
npm run start

This will tart a local server.

---

### Development scripts

- Start local server:
npm run start

---

### Requirements 

To be installable as a PWA, your site should generally have:
- a valid manifest (with icons, name, etc.)
- a registered service worker (for offline/caching behavior)
- HTTPS in production (required by most PWA capabilities)

This component focuses on the iOS install guidance UX, not on generating your PWA setup.

---

### Authors

- Adrian Narloch (https://narloch.dev/)
- Piotr Grobelak (https://github.com/PiotrGrobelak)

---

### License

MIT (https://opensource.org/licenses/MIT)
