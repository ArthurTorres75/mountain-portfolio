// Shared traffic registry — lets moving cars yield to pedestrians.
// StreetNPCs write each pedestrian's live world position here every frame;
// StreetCars read it to brake when a person is on/near their path ahead.

export interface PedSlot {
  x: number;
  z: number;
  active: boolean;
}

// Fixed slots keyed by NPC index. Cars only consider `active` slots.
export const pedestrians: PedSlot[] = [];

export function ensurePedSlot(index: number): PedSlot {
  if (!pedestrians[index]) pedestrians[index] = { x: 0, z: 0, active: false };
  return pedestrians[index];
}
