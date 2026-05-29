"use client";

import { MeshBasicMaterial } from "three";
import { Cloud, Clouds } from "@react-three/drei";

// Mid-altitude cloud bank separates the ground world from the sky.
// Summit clouds surround the peak — reward for climbing high.
export default function CloudLayer() {
  return (
    <group>
      {/* Dense mid-altitude band — Y ≈ 8-11 */}
      <Clouds material={MeshBasicMaterial} texture="/textures/cloud.png">
        <Cloud position={[-6, 9, -10]}  seed={1} segments={22} bounds={[14, 2, 7]}  volume={7}   color="#d8e8f4" opacity={0.55} fade={30} />
        <Cloud position={[8, 10, -18]}  seed={2} segments={18} bounds={[11, 2, 5]}  volume={6}   color="#cfe0ee" opacity={0.50} fade={28} />
        <Cloud position={[0, 9.5, -28]} seed={3} segments={20} bounds={[16, 2, 6]}  volume={8}   color="#d4e4f0" opacity={0.58} fade={32} />
        <Cloud position={[-14, 9, -20]} seed={4} segments={15} bounds={[10, 1.5, 5]} volume={5}  color="#dce8f4" opacity={0.48} fade={25} />
        <Cloud position={[14, 8.5, -8]} seed={5} segments={14} bounds={[9, 1.5, 5]}  volume={5}  color="#d8e8f4" opacity={0.45} fade={24} />

        {/* Summit clouds — surround the peak area */}
        <Cloud position={[-4, 13, -34]} seed={6}  segments={12} bounds={[8, 2, 4]}  volume={4.5} color="#eef4fa" opacity={0.40} fade={20} />
        <Cloud position={[5, 14, -36]}  seed={7}  segments={10} bounds={[7, 1.5, 3]} volume={4}  color="#f0f5fa" opacity={0.38} fade={18} />
        <Cloud position={[0, 12, -30]}  seed={8}  segments={14} bounds={[10, 2, 5]} volume={5}   color="#e8f0f8" opacity={0.42} fade={22} />

        {/* Hero spawn clouds — player starts above these */}
        <Cloud position={[-8, 11, 4]}   seed={9}  segments={16} bounds={[12, 2, 5]} volume={6}   color="#dce8f4" opacity={0.50} fade={28} />
        <Cloud position={[10, 10, 6]}   seed={10} segments={14} bounds={[10, 2, 4]} volume={5}   color="#d8e4f0" opacity={0.46} fade={26} />
      </Clouds>
    </group>
  );
}
