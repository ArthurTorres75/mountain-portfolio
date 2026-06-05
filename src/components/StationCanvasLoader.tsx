'use client'

import dynamic from 'next/dynamic'

const StationCanvas = dynamic(() => import('@/components/StationCanvas'), {
  ssr: false,
})

export default function StationCanvasLoader() {
  return <StationCanvas />
}
