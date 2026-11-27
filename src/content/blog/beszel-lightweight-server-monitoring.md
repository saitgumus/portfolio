---
title: "Beszel: Lightweight Server Monitoring Without the Stack"
description: A practical look at Beszel—hub, agents, Docker metrics, and alerts—when you want visibility without running Prometheus and Grafana.
pubDate: 2026-11-27
tags: [monitoring, docker, self-hosted, ops]
draft: false
---

Most monitoring setups start with good intentions and end as a second full-time job.

You open a ticket for “just a dashboard.” Weeks later you have exporters, scrapers, retention policies, alert rules nobody owns, and a Grafana board that looks impressive until something actually breaks. The stack works. The cost is attention.

**Beszel** takes the opposite bet: a small hub, a thin agent on each machine, and enough history and alerts to answer the questions you ask every day—without becoming the thing you have to monitor next.

## What Beszel Is

Beszel is a lightweight, self-hosted server monitoring platform. It ships with a friendly web UI, historical graphs, Docker (and Podman) container stats, configurable alerts, multi-user support, OAuth/OIDC, and automatic backups.

You do not assemble a metrics pipeline. You run two roles:

- **Hub** — the dashboard and control plane (built on PocketBase). One place to view systems, history, and alerts.
- **Agent** — a process on each host you care about. It collects metrics and talks to the hub.

That split is the whole architecture. Everything else is product detail on top of it.

## What You Can See

Out of the box, agents report the metrics that matter for day-to-day ops:

- CPU, memory (including swap / ZFS ARC where relevant), disk usage and I/O
- Network usage on the host and per container
- Load average, temperatures, fan speed, battery
- GPU usage and power draw (NVIDIA, AMD, Intel)
- Docker / Podman container status and resource history
- S.M.A.R.T. disk health (and related signals like mdraid / eMMC wear when available)
- ZFS pool health, capacity, scrub status, and per-dataset usage
- Network monitors from the agent: ICMP, TCP, HTTP, and DNS latency and loss

The point is not “every metric that exists.” It is “enough signal that you notice problems before users do,” with history so you can tell a spike from a trend.

## Why It Feels Different From the Heavy Stack

Prometheus + Grafana (or Netdata at full power) is excellent when you need deep cardinality, custom exporters, and long-term analysis across many services. The price is setup time, ongoing care, and cognitive load.

Beszel optimizes for a different job:

1. **Fast to stand up** — Docker Compose or a single binary; little manual wiring.
2. **Low footprint** — built to stay out of the way of the workloads it watches.
3. **Opinionated UI** — systems, graphs, containers, alerts in one place instead of a blank canvas of panels.
4. **Alerts that ship** — notify on the metrics you already collect, through the channels you already use.
5. **Ops extras without another product** — backups to disk or S3-compatible storage, multi-user tenancy, API access, OAuth.

If your question is “is this VPS, this homelab box, or this app host healthy?”, Beszel is often enough. If your question is “why did p99 latency on this one service climb for twelve minutes last Tuesday under a custom label set?”, you still want a full metrics stack.

## A Minimal Mental Model

Treat the hub as the control room and each agent as a local sensor.

1. Deploy the hub once (Docker is the common path; port `8090` by default).
2. Set `APP_URL` to the URL you will actually use to open the UI.
3. In the hub, add a system and copy the agent token / key.
4. Run the agent on the target host (binary or container), pointing it at the hub.
5. Watch metrics appear; wire alerts for disk, memory, offline agents, and whatever else you refuse to discover the hard way.

For local Docker Compose setups where hub and agent share a socket, the docs walk through using a Unix socket path as the host when registering the system—small detail, big time-saver if you follow the official compose example.

## When I Would Choose It

- Homelab or small fleet where Grafana would be overkill
- Side projects and staging boxes that still deserve a heartbeat
- Teams that want Docker-aware visibility without owning exporters
- Situations where “self-hosted and simple” beats “enterprise and complete”

When I would not: large multi-tenant observability with heavy custom instrumentation, SLO burn-rate math across dozens of services, or anything that already lives happily inside a managed APM.

## Short Summary

Beszel is monitoring as a product, not as a kit. Hub for the dashboard, agents for the hosts, history and alerts included, Docker stats and disk health in the same place.

You trade depth for speed and calm. For many servers—and most side projects—that trade is the feature.

If you have been postponing “real monitoring” because the stack felt heavier than the app, Beszel is worth an evening: install the hub, drop an agent on one machine, and see whether the quiet dashboard is enough.
