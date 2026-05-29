"use client";

import { MeshBasicMaterial } from "three";
import { Cloud, Clouds } from "@react-three/drei";

// Mid-altitude cloud bank separates the ground world from the sky.
// Summit clouds surround the peak — reward for climbing high.
export default function CloudLayer() {
  return (
    <group>
      {/* Dense mid-altitude band — Y ≈ 8-11 */}
      <Clouds material={MeshBasicMaterial}>
        <Cloud position={[-6, 9, -10]}  seed={1} segments={22} bounds={[14, 2, 7]}  volume={7}   color="#d8e8f4" opacity={0.55} fade={30} />
        <Cloud position={[8, 10, -18]}  seed={2} segments={18} bounds={[11, 2, 5]}  volume={6}   color="#cfe0ee" opacity={0.50} fade={28} />
        <Cloud position={[0, 9.5, -28]} seed={3} segments={20} bounds={[16, 2, 6]}  volume={8}   color="#d4e4f0" opacity={0.58} fade={32} />
        <Cloud position={[-14, 9, -20]} seed={4} segments={15} bounds={[10, 1.5, 5]} volume={5}  color="#dce8f4" opacity={0.48} fade={25} />
        <Cloud position={[14, 8.5, -8]} seed={5} segments={14} bounds={[9, 1.5, 5]}  volume={5}  color="#d8e8f4" opacity={0.45} fade={24} />

        {/* Summit clouds — surround the peak area */}
        <Cloud position={[-4, 13, -34]} seed={6}  segments={12} bounds={[8, 2, 4]}  volume={4.5} color="#eef4fa" opacity={0.40} fade={20} />
        <Cloud position={[5, 14, -36]}  seed={7}  segments={10} bounds={[7, 1.5, 3]} volume={4}  color="#f0f5fa" opacity={0.38} fade={18} />
        <Cloud position={[0, 12, -30]}  seed={8}  segments={14} bounds={[10, 2, 5]} volume={5}   color="#e8f0f8" opacity={0.42} fade={22} />

        {/* Low mountain mist — ground-hugging between peaks, Y ≈ 1-3 */}
        <Cloud position={[-7,  2.0, -25]} seed={11} segments={18} bounds={[12, 1.5, 6]} volume={4.5} color="#c8dce8" opacity={0.35} fade={18} />
        <Cloud position={[-2,  1.5, -22]} seed={12} segments={14} bounds={[9,  1.2, 5]} volume={3.5} color="#ccd8e4" opacity={0.30} fade={15} />
        <Cloud position={[-14, 1.8, -26]} seed={13} segments={16} bounds={[10, 1.4, 5]} volume={4.0} color="#c4d8e8" opacity={0.32} fade={16} />
        <Cloud position={[-7,  1.2, -31]} seed={14} segments={12} bounds={[11, 1.2, 5]} volume={3.8} color="#bcd4e4" opacity={0.28} fade={14} />
        <Cloud position={[2,   1.6, -28]} seed={15} segments={12} bounds={[8,  1.2, 4]} volume={3.2} color="#c8dce8" opacity={0.26} fade={13} />
        <Cloud position={[-18, 1.4, -30]} seed={16} segments={12} bounds={[9,  1.2, 4]} volume={3.4} color="#c0d4e0" opacity={0.28} fade={14} />
        {/* Deep mist — far background peaks */}
        <Cloud position={[0,   2.5, -38]} seed={17} segments={20} bounds={[20, 2.0, 7]} volume={6.0} color="#b8ccd8" opacity={0.40} fade={22} />
        <Cloud position={[-16, 2.2, -36]} seed={18} segments={16} bounds={[12, 1.8, 5]} volume={4.5} color="#b4c8d4" opacity={0.36} fade={20} />
        <Cloud position={[16,  2.0, -34]} seed={19} segments={14} bounds={[11, 1.6, 5]} volume={4.0} color="#bcccd8" opacity={0.33} fade={18} />

        {/* Hero spawn clouds — player starts above these */}
        <Cloud position={[-8, 11, 4]}   seed={9}  segments={16} bounds={[12, 2, 5]} volume={6}   color="#dce8f4" opacity={0.50} fade={28} />
        <Cloud position={[10, 10, 6]}   seed={10} segments={14} bounds={[10, 2, 4]} volume={5}   color="#d8e4f0" opacity={0.46} fade={26} />

        {/* More mountain coverage — mid peaks left/right */}
        <Cloud position={[18,  8,  -10]} seed={20} segments={16} bounds={[12, 2, 5]} volume={6}   color="#d4e2f0" opacity={0.50} fade={28} />
        <Cloud position={[-20, 8,  -12]} seed={21} segments={16} bounds={[12, 2, 5]} volume={6}   color="#d0dff0" opacity={0.48} fade={27} />
        <Cloud position={[22,  9,  -20]} seed={22} segments={14} bounds={[10, 2, 5]} volume={5.5} color="#cee0ee" opacity={0.46} fade={25} />
        <Cloud position={[-24, 9,  -18]} seed={23} segments={14} bounds={[11, 2, 5]} volume={5.5} color="#ccdded" opacity={0.46} fade={25} />
        <Cloud position={[28,  8,  -6]}  seed={24} segments={12} bounds={[9,  2, 4]} volume={5}   color="#d2e2f2" opacity={0.44} fade={24} />
        <Cloud position={[-28, 8,  -8]}  seed={25} segments={12} bounds={[9,  2, 4]} volume={5}   color="#d0e0f0" opacity={0.44} fade={24} />
        {/* Far mountain tops — deeper Z */}
        <Cloud position={[-18, 10, -38]} seed={26} segments={18} bounds={[14, 2, 6]} volume={6.5} color="#c8d8e8" opacity={0.52} fade={30} />
        <Cloud position={[20,  9,  -40]} seed={27} segments={16} bounds={[12, 2, 5]} volume={6}   color="#c4d4e4" opacity={0.48} fade={28} />
        <Cloud position={[0,  11,  -44]} seed={28} segments={20} bounds={[18, 3, 7]} volume={8}   color="#bcccd8" opacity={0.55} fade={32} />
        {/* Behind spawn — positive Z mountains */}
        <Cloud position={[-14, 8,  16]}  seed={29} segments={14} bounds={[11, 2, 5]} volume={5}   color="#d8e6f4" opacity={0.46} fade={26} />
        <Cloud position={[16,  9,  18]}  seed={30} segments={14} bounds={[10, 2, 4]} volume={5}   color="#d4e2f0" opacity={0.44} fade={25} />
        <Cloud position={[0,   9,  28]}  seed={31} segments={16} bounds={[14, 2, 6]} volume={6}   color="#cee0ee" opacity={0.50} fade={28} />
        <Cloud position={[-18, 9,  32]}  seed={32} segments={14} bounds={[11, 2, 5]} volume={5.5} color="#ccdded" opacity={0.46} fade={26} />
        <Cloud position={[20,  10, 30]}  seed={33} segments={14} bounds={[12, 2, 5]} volume={5.5} color="#d0e0ee" opacity={0.48} fade={27} />

        {/* High sky layer — large fluffy clouds, Y ≈ 14-18 */}
        <Cloud position={[0,   16, -15]} seed={40} segments={24} bounds={[20, 3, 8]} volume={10}  color="#eef4fc" opacity={0.55} fade={40} />
        <Cloud position={[-22, 15, -5]}  seed={41} segments={22} bounds={[18, 3, 7]} volume={9}   color="#f0f6fc" opacity={0.50} fade={38} />
        <Cloud position={[24,  14, -12]} seed={42} segments={20} bounds={[16, 3, 7]} volume={8.5} color="#ecf4fa" opacity={0.48} fade={36} />
        <Cloud position={[-10, 17, -30]} seed={43} segments={22} bounds={[18, 3, 8]} volume={9}   color="#eaf2f8" opacity={0.52} fade={38} />
        <Cloud position={[12,  16, -35]} seed={44} segments={20} bounds={[16, 3, 7]} volume={8}   color="#ecf4fa" opacity={0.50} fade={36} />
        <Cloud position={[0,   18, -50]} seed={45} segments={26} bounds={[22, 4, 9]} volume={11}  color="#e8f0f8" opacity={0.58} fade={42} />
        <Cloud position={[-20, 16, 10]}  seed={46} segments={20} bounds={[16, 3, 6]} volume={8}   color="#eef4fc" opacity={0.48} fade={36} />
        <Cloud position={[18,  15, 14]}  seed={47} segments={18} bounds={[14, 3, 6]} volume={7.5} color="#f0f6fc" opacity={0.46} fade={34} />
        <Cloud position={[0,   17, 22]}  seed={48} segments={22} bounds={[18, 3, 7]} volume={9}   color="#ecf4fa" opacity={0.52} fade={38} />
      </Clouds>
    </group>
  );
}
