import { defineConfig, devices } from '@playwright/test'

const PORT = 3000
const baseURL = `http://localhost:${PORT}`

/**
 * E2E tests exercise DOM/UI state (routes, headings, form fields, link
 * attributes) rather than 3D canvas pixel content. The interactive R3F
 * world at "/" requires WASD movement + proximity detection to reach any
 * station, which is not a reliable headless-browser flow. The actual
 * station content ("/station/[id]") is plain DOM/React — no WebGL
 * dependency — so it is the target for this suite. See AGENTS.md
 * "Mobile Strategy" and "Three.js Module Rules".
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm run build && pnpm run start',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
