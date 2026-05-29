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
import FarLakeViewpoint from "./FarLakeViewpoint";
import EastLakeViewpoint from "./EastLakeViewpoint";
import TownExtras from "./TownExtras";

export default function MountainTerrain({ isDay = true }: { isDay?: boolean }) {
  return (
    <group>
      <TerrainGround />
      <TerrainMountains />
      <TerrainFlora />
      <TerrainStructures isDay={isDay} />
      <TownExtras isDay={isDay} />
      <TerrainBridges />
      <FarLakeViewpoint />
      <EastLakeViewpoint isDay={isDay} />
      <CaveOfProjects />
      <DogPark isDay={isDay} />
    </group>
  );
}
