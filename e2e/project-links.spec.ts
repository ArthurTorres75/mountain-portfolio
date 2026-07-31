import { test, expect } from '@playwright/test'
import { stationById } from '../src/data/stations'
import type { ProjectsBlock } from '../src/types/stations'

/**
 * Featured project links — Cave of Challenges.
 *
 * Asserts href/target/rel attributes rather than clicking through to
 * external sites (GitHub Pages, Upwork, third-party Vercel deploys) — keeps
 * the suite fast and independent of third-party uptime.
 */

const PROJECTS_STATION_ID = 'cave-of-challenges'

function getProjectsBlock(): ProjectsBlock {
  const station = stationById(PROJECTS_STATION_ID)
  if (!station) throw new Error(`Station not found: ${PROJECTS_STATION_ID}`)

  const block = station.blocks.find((b): b is ProjectsBlock => b.type === 'projects')
  if (!block) throw new Error('Expected a projects block on the projects station')

  return block
}

const { items: projects } = getProjectsBlock()

test.describe('Featured project cards (Cave of Challenges)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/station/${PROJECTS_STATION_ID}`)
  })

  for (const project of projects) {
    test(`renders "${project.title}" with correct external link attributes`, async ({ page }) => {
      await expect(page.getByRole('heading', { level: 3, name: project.title })).toBeVisible()

      if (!project.href) return

      const link = page.getByRole('link', { name: `View project: ${project.title}` })
      await expect(link).toHaveAttribute('href', project.href)
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  }
})
