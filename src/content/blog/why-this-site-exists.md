---
title: Why this site exists
description: A short note on shipping a personal site you actually update.
pubDate: 2026-04-01
tags: [meta, writing]
draft: false
---

This portfolio is intentionally boring infrastructure-wise: Markdown in Git, Astro for HTML, Cloudflare Pages for hosting. That friction profile makes it easy to publish small posts alongside project updates.

When you add a new file under `src/content/blog/`, set `draft: true` until you are ready to ship. Drafts are hidden from production builds but still available in local development.
