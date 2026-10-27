# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: publish-flow.spec.js >> publish flow — mobile >> a registered user can log in and publish a post
- Location: e2e\publish-flow.spec.js:13:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Write' })

```

# Test source

```ts
  1  | ﻿import { test, expect, devices } from "@playwright/test";
  2  | 
  3  | const viewports = [
  4  |   { name: "mobile", viewport: devices["iPhone 13"].viewport },
  5  |   { name: "tablet", viewport: devices["iPad Mini"].viewport },
  6  |   { name: "desktop", viewport: { width: 1280, height: 800 } },
  7  | ];
  8  | 
  9  | for (const viewport of viewports) {
  10 |   test.describe(`publish flow — ${viewport.name}`, () => {
  11 |     test.use({ viewport: viewport.viewport });
  12 | 
  13 |     test("a registered user can log in and publish a post", async ({ page, request }) => {
  14 |       const runId = Date.now();
  15 |       const email = `e2e-${viewport.name}-${runId}@example.com`;
  16 |       const title = `Hello from ${viewport.name} (${runId})`;
  17 | 
  18 |       const registerRes = await request.post("http://localhost:4000/api/auth/register", {
  19 |         data: { email, displayName: "E2E Tester", password: "correcthorse" },
  20 |       });
  21 |       expect(registerRes.ok()).toBe(true);
  22 | 
  23 |       await page.goto("http://localhost:5173/login");
  24 |       await page.getByLabel("Email").fill(email);
  25 |       await page.getByLabel("Password").fill("correcthorse");
  26 |       await page.getByRole("button", { name: "Log In" }).click();
  27 |       await expect(page).toHaveURL("http://localhost:5173/");
  28 | 
> 29 |       await page.getByRole("link", { name: "Write" }).click();
     |                                                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  30 |       await page.getByLabel("Title").fill(title);
  31 |       await page.getByLabel("Body").fill("Published end to end.");
  32 |       await page.getByRole("button", { name: "Publish" }).click();
  33 | 
  34 |       await expect(page).toHaveURL("http://localhost:5173/");
  35 |       await expect(page.getByRole("heading", { name: title })).toBeVisible();
  36 |     });
  37 |   });
  38 | }
  39 | 
```