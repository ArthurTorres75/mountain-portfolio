import type React from 'react'

import BaseTownDiorama from './BaseTown'
import WorkshopCabinDiorama from './WorkshopCabin'
import ClimbingRoadDiorama from './ClimbingRoad'
import CaveOfChallengesDiorama from './CaveOfChallenges'
import DogParkDiorama from './DogPark'
import HiddenSanctuaryDiorama from './HiddenSanctuary'
import SummitViewpointDiorama from './SummitViewpoint'

export {
  BaseTownDiorama,
  WorkshopCabinDiorama,
  ClimbingRoadDiorama,
  CaveOfChallengesDiorama,
  DogParkDiorama,
  HiddenSanctuaryDiorama,
  SummitViewpointDiorama,
}

export const DIORAMA_MAP: Record<string, React.ComponentType> = {
  'base-town': BaseTownDiorama,
  'workshop-cabin': WorkshopCabinDiorama,
  'climbing-road': ClimbingRoadDiorama,
  'cave-of-challenges': CaveOfChallengesDiorama,
  'dog-park': DogParkDiorama,
  'hidden-sanctuary': HiddenSanctuaryDiorama,
  'summit-viewpoint': SummitViewpointDiorama,
}
