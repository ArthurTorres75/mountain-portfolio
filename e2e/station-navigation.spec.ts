import { test, expect } from '@playwright/test'
import { STATIONS } from '../src/data/stations'

/**
 * Navigation between stations.
 *
 * Scope note: the interactive 3D world at "/" (WorldExplorer) only opens the
 * "Enter station?" prompt after WASD movement brings the player into
 * proximity of a location — a flow driven by R3F/WebGL scene state, not a
 * reliable or meaningful headless-browser interaction. The station content
 * itself lives at "/station/[id]" (see src/app/station/[id]) and is plain
 * DOM/React with no canvas dependency, so it is the target of this suite.
 */

test.describe('Station routing', () => {
  for (const station of STATIONS) {
    test(`GET /station/${station.id} renders "${station.name}"`, async ({ page }) => {
      await page.goto(`/station/${station.id}`)
      await expect(page.getByRole('heading', { level: 1, name: station.title })).toBeVisible()
    })
  }

  test('unknown station id returns a 404', async ({ page }) => {
    const response = await page.goto('/station/does-not-exist')
    expect(response?.status()).toBe(404)
  })
})

test.describe('Previous / Next station navigation', () => {
  test('cycles through every station in order and wraps around', async ({ page }) => {
    await page.goto(`/station/${STATIONS[0].id}`)

    for (let i = 0; i < STATIONS.length; i++) {
      const next = STATIONS[(i + 1) % STATIONS.length]
      await expect(page).toHaveURL(new RegExp(`/station/${STATIONS[i].id}$`))
      await page.getByRole('button', { name: /^Next/ }).click()
      await expect(page).toHaveURL(new RegExp(`/station/${next.id}$`))
    }
  })

  test('Previous button moves back one station', async ({ page }) => {
    await page.goto(`/station/${STATIONS[1].id}`)
    await page.getByRole('button', { name: /Previous/ }).click()
    await expect(page).toHaveURL(new RegExp(`/station/${STATIONS[0].id}$`))
  })
})

test.describe('Header navigation (desktop)', () => {
  test('"Back to world" returns to the landing page', async ({ page }) => {
    await page.goto(`/station/${STATIONS[0].id}`)
    await page.getByRole('button', { name: 'Back to world map' }).click()
    await expect(page).toHaveURL(/\/$/)
  })
})

test.describe('Mobile station menu', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('hamburger menu opens the station drawer and navigates on selection', async ({ page }) => {
    const target = STATIONS[2]
    await page.goto(`/station/${STATIONS[0].id}`)

    await page.getByRole('button', { name: 'Open navigation menu' }).click()
    await expect(page.getByRole('dialog', { name: 'Station navigation' })).toBeVisible()

    await page.getByRole('button', { name: target.name, exact: false }).click()
    await expect(page).toHaveURL(new RegExp(`/station/${target.id}$`))
  })
})
