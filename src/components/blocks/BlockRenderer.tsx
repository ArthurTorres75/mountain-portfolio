import type { Block } from '@/types/stations'
import Prose from './Prose'
import Pillars from './Pillars'
import Chips from './Chips'
import Timeline from './Timeline'
import Projects from './Projects'
import Gallery from './Gallery'
import Scripture from './Scripture'
import Links from './Links'
import Benediction from './Benediction'
import Manifesto from './Manifesto'

interface BlockRendererProps {
  block: Block
  index: number
}

export default function BlockRenderer({ block, index }: BlockRendererProps) {
  switch (block.type) {
    case 'prose':
      return <Prose key={index} text={block.text} lead={block.lead} />
    case 'pillars':
      return <Pillars key={index} items={block.items} />
    case 'chips':
      return <Chips key={index} groups={block.groups} />
    case 'timeline':
      return <Timeline key={index} items={block.items} />
    case 'projects':
      return <Projects key={index} items={block.items} />
    case 'gallery':
      return <Gallery key={index} items={block.items} />
    case 'scripture':
      return <Scripture key={index} verses={block.verses} />
    case 'links':
      return <Links key={index} heading={block.heading} items={block.items} />
    case 'benediction':
      return <Benediction key={index} text={block.text} />
    case 'manifesto':
      return <Manifesto key={index} text={block.text} />
    default:
      return null
  }
}
