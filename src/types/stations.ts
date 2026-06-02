// Types for the station pages system

export interface ProseBlock {
  type: 'prose'
  text: string
  lead?: boolean
}

export interface PillarItem {
  label: string
  note: string
}

export interface PillarsBlock {
  type: 'pillars'
  items: PillarItem[]
}

export interface ChipGroup {
  label: string
  items: string[]
}

export interface ChipsBlock {
  type: 'chips'
  groups: ChipGroup[]
}

export interface TimelineItem {
  title: string
  text: string
}

export interface TimelineBlock {
  type: 'timeline'
  items: TimelineItem[]
}

export interface ProjectItem {
  title: string
  text: string
  tags: string[]
}

export interface ProjectsBlock {
  type: 'projects'
  items: ProjectItem[]
}

export interface GalleryItem {
  label: string
  caption: string
}

export interface GalleryBlock {
  type: 'gallery'
  items: GalleryItem[]
}

export interface ScriptureVerse {
  text: string
  who?: string
  ref: string
}

export interface ScriptureBlock {
  type: 'scripture'
  verses: ScriptureVerse[]
}

export interface LinkItem {
  label: string
  handle: string
  href: string
}

export interface LinksBlock {
  type: 'links'
  heading: string
  items: LinkItem[]
}

export interface BenedictionBlock {
  type: 'benediction'
  text: string
}

export interface ManifestoBlock {
  type: 'manifesto'
  text: string
}

export type Block =
  | ProseBlock
  | PillarsBlock
  | ChipsBlock
  | TimelineBlock
  | ProjectsBlock
  | GalleryBlock
  | ScriptureBlock
  | LinksBlock
  | BenedictionBlock
  | ManifestoBlock

export interface StationMapCoords {
  x: number
  y: number
}

export interface Station {
  id: string
  index: number
  name: string
  kicker: string
  title: string
  role?: string
  tagline: string
  map: StationMapCoords
  blocks: Block[]
}
