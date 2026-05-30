import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { STATION_IDS, stationById } from '@/data/stations'
import StationPageClient from './StationPageClient'

export const dynamicParams = false

interface PageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return STATION_IDS.map((id) => ({ id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const station = stationById(id)
  if (!station) return {}

  const title = `${station.name} | Arthur Torres`
  const url = `https://mountain-portfolio.vercel.app/station/${id}`

  return {
    title,
    description: station.tagline,
    openGraph: {
      title,
      description: station.tagline,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
    },
    alternates: {
      canonical: `/station/${id}`,
    },
  }
}

export default async function StationPage({ params }: PageProps) {
  const { id } = await params
  const station = stationById(id)

  if (!station) notFound()

  return <StationPageClient station={station} />
}
