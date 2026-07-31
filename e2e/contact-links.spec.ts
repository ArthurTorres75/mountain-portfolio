import { test, expect } from '@playwright/test'
import { stationById } from '../src/data/stations'
import type { LinksBlock } from '../src/types/stations'

/**
 * Contact — Summit Viewpoint.
 *
 * Scope note: there is no contact form in this codebase (no form fields, no
 * server action, no API route — `src/features/contact/index.ts` is an empty
 * stub). The "contact" surface is the Summit Viewpoint station's "links"
 * block: a grid of external links (Upwork, GitHub, LinkedIn, mailto). This
 * suite covers that actual implementation. See the final report for the
 * blocking gap this leaves open (no form to validate/submit).
 */

const CONTACT_STATION_ID = 'summit-viewpoint'

function getLinksBlock(): LinksBlock {
  const station = stationById(CONTACT_STATION_ID)
  if (!station) throw new Error(`Station not found: ${CONTACT_STATION_ID}`)

  const block = station.blocks.find((b): b is LinksBlock => b.type === 'links')
  if (!block) throw new Error('Expected a links block on the contact station')

  return block
}

const linksBlock = getLinksBlock()

test.describe('Contact links (Summit Viewpoint)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/station/${CONTACT_STATION_ID}`)
  })

  test('renders the contact heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: linksBlock.heading })).toBeVisible()
  })

  for (const item of linksBlock.items) {
    test(`"${item.label}" link points to the correct external destination`, async ({ page }) => {
      const link = page.getByRole('link', { name: `${item.label}: ${item.handle}` })

      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('href', item.href)
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  }
})
