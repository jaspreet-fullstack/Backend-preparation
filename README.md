# JavaScript & Runtime Environment

## What is JavaScript?
- A **programming language** used to add dynamic behavior to webpages/apps.
- Makes pages **interactive** (unlike static HTML/CSS).

## Why Runtime Environment?
- JS is just a **language** — it **cannot run on its own**.
- Needs an **engine + tools** (Runtime Environment) to execute code.
- Runtime gives JS **power** to talk to webpages, read files, etc.

## Types of Runtime

### 1. Browser (Chrome, Firefox...)
- Provides: `document`, `window`, `fetch`, `alert`
- ❌ No file system access (security)

### 2. Node.js (local system)
- Provides: `fs`, server tools
- ❌ No `document`/`window`
- ✅ Can read/write local files

## Diagram

JavaScript (the language/rules)
        ↓ needs a place to run
        ↓
   ┌─────────────┴─────────────┐
   ↓                           ↓
Browser Runtime          Node.js Runtime
(gives DOM, alert,        (gives file system,
 fetch, window)            server tools, etc.)