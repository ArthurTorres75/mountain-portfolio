"use client";

// Orchestrator — composes terrain sub-modules.
// Each sub-module stays under 300 lines and owns a single concern.
import TerrainGround from "./TerrainGround";
import TerrainMountains from "./TerrainMountains";
import TerrainFlora from "./TerrainFlora";
import TerrainStructures from "./TerrainStructures";
import TerrainBridges from "./TerrainBridges";
import CaveOfProjects from "./CaveOfProjects";
import DogPark from "./DogPark";

export default function MountainTerrain() {
  return (
    <group>
      <TerrainGround />
      <TerrainMountains />
      <TerrainFlora />
      <TerrainStructures />
      <TerrainBridges />
      <CaveOfProjects />
      <DogPark />
    </group>
  );
}
