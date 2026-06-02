# Mountain Portfolio — World Design Script

> **Purpose**: Este archivo es la fuente de verdad para el diseño del mundo 3D. Todo elemento visual, narrativo o técnico debe trazarse hasta aquí. Antes de implementar cualquier cosa, verificá que esté documentado en este guion. Ningún agente ni colaborador debe ignorar este archivo — es vinculante.

---

## Visión General

Un mundo abierto de vuelo libre, inspirado en Journey / Zelda BOTW / Monument Valley. El usuario puede volar en cualquier dirección sin restricciones de camino. El portfolio se descubre explorando el paisaje — cada zona cuenta una parte de la historia de Arthur sin texto explicativo forzado. El tono es cálido, cinematográfico, espiritual sin ser explícito.

**Estilo visual**: Low-poly stylized. Paleta cálida. Toon shading con gradient map de 3 tonos. Sin realismo — impresión emocional.

**Navegación**: Vuelo libre con mouse + WASD. Shift para acelerar. La cámara puede subir, bajar, girar libremente. No hay colisión con el terreno — el usuario vuela como un observador divino que puede bajar hasta el nivel del suelo cuando quiere.

---

## Mapa del Mundo

```
                              [CUMBRE / CONTACTO]
                                      |
                               [NUBES / TRANSICIÓN]
                                      |
                    [SANTUARIO] ←─────┤
                                      |
                 [CUEVA DE PROYECTOS]─┤
                                      |
                   [CAMINO ESCALADA / EXPERIENCIA]
                                      |
                     [CABAÑA TALLER / SKILLS]
                                      |
                    [BOSQUE / TRANSICIÓN]
                                      |
              [PUEBLO BASE / ABOUT] ──┤──[PARQUE DE PERROS]
                  [PUEBLO LOWER]      |
                  (positive Z)        |
                                      |
                          [VALLE DE ENTRADA / HERO]
                                      |
                          [SPAWN — ENTRE NUBES]
```

**Coordenadas en world space** (Y = altura, Z = profundidad norte-sur, X = este-oeste):

| Zona                     | X     | Y      | Z      | Estado     |
|--------------------------|-------|--------|--------|------------|
| Spawn / Hero             | 0     | 12     | 10     | ✅         |
| Pueblo Base              | 0     | 0      | 0      | ✅         |
| Lower Town (extensión)   | 0     | 0      | +5..+17| ✅         |
| Parque de Perros         | -16   | 0      | 1      | ✅         |
| East Lake Viewpoint      | 14    | 0      | -1.2   | ✅         |
| Bosque                   | 0     | 0      | -8     | ✅ parcial |
| Far Lake Viewpoint       | 14.6  | 0      | -15.4  | ✅         |
| Cabaña Taller            | 6     | 2      | -14    | diseño     |
| Camino Escalada          | 0     | 3      | -20    | diseño     |
| Cueva Proyectos          | -7    | 4      | -26    | ✅ parcial |
| Santuario                | -18   | 6      | -24    | ✅ parcial |
| Cumbre / Contacto        | 0     | 14     | -36    | diseño     |

---

## Sistemas de Entorno Global

### Vuelo Libre
- El usuario spawna entre nubes a Y=12, mirando hacia abajo sobre el valle
- WASD + mouse: vuelo en cualquier dirección
- Shift: boost de velocidad ×2
- F: alternar modo "caminata a ras del suelo" vs "vuelo libre"
- No hay colisión — el jugador puede atravesar terreno y construcciones

### Ciclo Día / Noche ✅
- Ciclo completo de 120 segundos (configurable en `DayNightController.tsx`)
- Comienza al amanecer; el sol orbita con `angle = phase * PI * 2 - PI/2`
- `isDay` = true cuando `sunY > -0.15`
- **Iluminación por fase**:
  - `AmbientLight`: intensity 0.08 (noche) → 0.75 (día); color `#ffecd4` día / `#1a2a4a` noche
  - `HemisphereLight`: intensity 0.10 (noche) → 0.55 (día)
  - `DirectionalLight` (sol): intensity 0 → 1.4, sigue posición del sol
  - `DirectionalLight` (luna): intensity 0.18–0.40 solo de noche
- **Niebla dinámica**: color `#c8a06a` (día) / `#05080f` (noche); near/far ajustados
- Las luces interiores de cabinas, faroles y autos se activan automáticamente de noche
- `onDayChange(isDay: boolean)` callback para sincronizar el resto de la escena

### Sistema de Nubes ✅
- Capa densa de nubes entre Y=8 y Y=10 (separa el mundo terrenal del cielo)
- Nubes volumétricas usando instanced spheres con material translúcido (`CloudLayer.tsx`)
- Segunda capa ligera en Y=20 (nubes altas, decorativas)
- Nubes individuales flotando alrededor de la cumbre

### Sistema de Neblina ✅
- Ground fog: neblina baja (Y=0 a Y=1.5) en el bosque y el valle al amanecer
- Niebla volumétrica con `<fog>` exponencial, cambia color y densidad con el ciclo día/noche
- En el santuario: neblina dorada especial (emissive particles + fog color dorado)

### Sistema de Agua ✅
- **Río principal**: nace en Z=-37 (montaña), baja por el bosque, cruza el pueblo (Z=-4..0), termina en lago central (Z≈0.5)
- `RIVER_CORRIDOR` en `terrainData.ts` define el centerline con 12 puntos y clearRadius para collision avoidance
- **Shader de agua**: GLSL animado en `AnimatedWater.tsx` — UV scroll + normal map animado
- **Lagos implementados** (en `lakePositions`):
  - Lago central: `[-5.5, 0.5]` — agua dodecaedro animada (toon)
  - East lake: `[14.0, -1.2]` — agua dodecaedro animada
  - Far lake: `[14.6, -15.4]` — dodecaedro estático sin animación
- **Cascada**: diseñada, pendiente de implementar en Z=-16
- Foam blanco en bordes: pendiente

### Sistema de Tráfico (StreetCars) ✅
- Autos circulando por las calles principales del pueblo
- Registrados en `trafficRegistry.ts` para prevenir colisiones en intersecciones
- Luces de faros y luces traseras activadas automáticamente de noche (`isDay` prop)
- Autos estacionados en posiciones fijas (definidas en `parkedCarPositions`)
- Parked cars: `[-12,-9.5]`, `[2.6,-3.5]`, `[3.8,8.0]`, `[-3.5,-8.0]`, `[-3.8,8.0]`, `[3.2,0.0]`, `[11.5,-9.5]`
- No hay autos en el río ni en las montañas (collision filter activo)

### Sistema de NPCs / Peatones (StreetNPCs) ✅
- Peatones caminando por las veredas, nunca en la calzada
- Rutas definidas en sidewalk corridors (x=±1.5 del borde de camino)
- No atraviesan casas, ríos ni montañas
- `isDay` prop: menos peatones de noche

### Puentes ✅
- **Puente único implementado**: piedra sobre el río en `[-6.2, z=-10.2]`, deck 5.0×1.8
- `isNearBridge(x, z, padding)` en `terrainData.ts` para collision avoidance
- **Diseñados pero pendientes**:
  - Puente 2 (Bosque): piedra cubierto de musgo en Z=-10 → puede coincidir con el existente
  - Puente 3 (Escalada): cuerda suspendida en Z=-21, X=2

### Aves ✅
- **Bandada principal** (`BirdFlock.tsx`): 12-20 aves volando en formación V a Y=7-9
- Path siguiendo curva CatmullRom de este a oeste
- Ala que bate via `useFrame` con instanced meshes
- **Cóndor solitario**: diseñado, pendiente de implementar

### Vegetación ✅
- ~150+ árboles en `treePositions` — cubro todo el mapa incluido lower town, zona cueva, santuario
- Rocas en `rockPositions` — boulders desde upper town hasta zona de montaña profunda
- Arbustos en `shrubPositions` — concentrados en parque de perros, lower town, cueva, santuario
- Flores en `flowerPositions` — 4 clusters: west grove, cave ring, sanctuary ring
- **Collision filters activos**: `safeTreePositions`, `safeRockPositions`, `safeShrubPositions`
  - Excluyen: dentro de montaña, cerca de cabinas, sobre el río, sobre lago, sobre puente, sobre camino, sobre autos estacionados

### Vegetación — Especificaciones de Modelos
Usar glTF 2.0 Draco-compressed. Si no hay modelo disponible, construir con geometrías primitivas mejoradas.

| Elemento        | Geometría alternativa                          |
|-----------------|------------------------------------------------|
| Pino alto       | 3 conos escalonados + cilindro, escala 1.5-3x  |
| Roble           | IcosahedronGeometry para canopy, escala random |
| Sauce           | Cilindro + geometría custom drooping branches  |
| Helecho         | Planos con textura atlas de hoja, billboarding |
| Flor            | Esfera pequeña + cilindro fino                 |

### Terreno
- Ground plane: `PlaneGeometry(200, 200, 64, 64)` con vertex displacement por Perlin noise
- Heightmap: suave en el valle, agresivo en las montañas
- Colores por altura: verde (bajo) → tierra/roca (medio) → gris/blanco (cumbre)
- `getTerrainHeightAt(x, z)`: función que devuelve la altura real usando el mismo noise que genera el terreno

---

## Zonas — Detalle Completo

---

### ZONA 0 — Spawn / Hero (Y=12, Z=10) ✅

**Narrativa**: El usuario aparece flotando entre nubes sobre el valle. La primera vista es el mundo entero desde arriba — montañas, bosques, el río brillando, el pueblo tranquilo. Es el "preview" de todo lo que puede explorar.

**Elementos 3D**:
- Nube grande y densa bajo el jugador (plataforma visual de spawn)
- Bandada de aves pasando cerca
- Partículas doradas flotando ascendentes
- Desde aquí se ve todo el mapa (sin niebla bloqueante a esta altura)

**Iluminación**:
- Sol bajo en el horizonte (amanecer): luz cálida desde el este
- Cielo degradado de naranja-rosa a azul profundo según ciclo día/noche
- `<Sky>` de drei animado por `DayNightController`

**UI**: Título del portfolio aparece en overlay — "Arthur | Full Stack Engineer". CTAs: "Explorar" / "Ver Proyectos" / "Contacto".

**Audio**:
- Viento suave a altura (reverb amplio)
- Música: intro orquestal etérea, piano + cuerdas
- Al bajar: la música se funde hacia el tema del pueblo

---

### ZONA 1 — Pueblo Base / About (X=0, Y=0, Z=0) ✅

**Narrativa**: El pueblo donde Arthur creció y se formó. Cálido, vivo, con gente moviéndose. Aquí está la historia personal del desarrollador.

**Elementos 3D implementados**:
- 10 cabinas upper town (Z negativo) + 14 cabinas lower town (Z positivo) + 2 casas de dos pisos
- Plaza central con lago decorativo y fuente
- Arthur NPC caminando por el centro
- Laika y Kira corriendo por el parque adyacente
- Wife NPC con colores reales (referencia fotográfica)
- Postes de luz/faroles a lo largo de todas las calles (24+ lanterns)
- El río pasa por el borde oeste del pueblo (X≈-5.5) con puente de piedra
- Lookout cabin de dos pisos en `[12.0, -13.8]` (cumbre viewpoint)
- Sistema de tráfico activo (ver Sistema de Tráfico)

**Casas — Especificación**:
```
Estructura base: BoxGeometry
Techo: ConeGeometry rotado ×4 (pirámide) o prisma triangular
Chimenea: cilindro delgado
Puerta: rectángulo oscuro
Ventanas: rectángulos con material emissive suave (luz interior)
Material: meshToonMaterial con variación de colores (beige, rojo, azul apagado)
Luces interiores: activadas de noche via isDay prop
```

**Orientación de cabinas**: `rotationY` en `cabinPositions` controla qué lado da a la calle:
- `+PI/2` → puerta da a +X (cabaña al oeste de la calle N-S)
- `-PI/2` → puerta da a -X (cabaña al este de la calle N-S)
- `0`    → puerta da a +Z (cabaña al norte de una calle E-W)
- `PI`   → puerta da a -Z (cabaña al sur de una calle E-W)

**Iluminación**:
- Luz ambiental cálida, hora dorada (día); azul-noche con luna (noche)
- Point lights en cada ventana (muy suave, color `#FFE4A0`), activados de noche
- Point light en la fuente central

**Audio**:
- Pueblo: sonidos ambientes de pueblo (pájaros, viento suave, fuente de agua)
- Música: tema tranquilo de piano
- Positional audio: fuente burbujeando, río lejano

---

### ZONA 1b — Parque de Perros (X=-16, Y=0, Z=1) ✅

**Narrativa**: El lado humano. Aquí Arthur no es solo un ingeniero — es alguien que ama a sus perros y a su familia.

**Enclosure**: centro `[-16, 1]`, half-extents 7×6 (X: -23..-9, Z: -5..7). Función `isInDogPark()` en `terrainData.ts`.

**Elementos 3D**:
- Pradera con flores silvestres (west grove: colores naturales/cálidos)
- Laika y Kira corriendo (animación existente en `DogPark.tsx`)
- Wife NPC caminando con ellos
- Bancas de madera
- Árboles frutales en los 4 bordes del enclosure + grove exterior al oeste
- Valla de madera delimitando el área
- Mariposas (diseñado, pendiente)

**Acceso**: Calle E-W en `[-5.5, 1.0]` conecta el main path con la entrada del parque (X≈-9)

**Audio**:
- Ladridos ocasionales de los perros (positional audio)
- Ambiente familiar suave
- Pájaros

---

### ZONA 1c — Lower Town (X=0, Y=0, Z=+5..+17) ✅

**Narrativa**: La expansión del pueblo hacia el sur. Misma atmósfera que Upper Town — más casas, más calles, más vida.

**Elementos 3D implementados**:
- 14 cabinas distribuidas en grilla (5 calles E-W + 2 ramas N-S)
- 1 casa de dos pisos en `[-5.0, 17.0]` — landmark del norte del lower town
- Calles E-W en Z=5, Z=10, Z=15
- Ramas N-S en X=±7.5 y X=±10.5
- Faroles en las calles cross (Z=5 y Z=10)
- Árboles y rocas filtrados por collision avoidance

**Red de calles** (`sidePathSegments`):
```
Cross streets (E-W):  Z=5  (22u), Z=10 (20u), Z=15 (18u)
Branch roads  (N-S):  X=±7.5 (12u), X=±10.5 (8u)
West connector:       Z≈1 desde X=0 hasta X=-9 (acceso al parque)
```

---

### ZONA 1d — East Lake Viewpoint (X=14, Y=0, Z=-1.2) ✅

**Narrativa**: Mirador de madera sobre el lago este. Turistas se sientan en la banca y observan el agua.

**Implementado en** `EastLakeViewpoint.tsx`:
- Boardwalk de acceso desde la rama este (X≈8) hasta la orilla del lago
- Deck sobre el agua con barandas de madera
- 5 soportes hundidos en el lago
- Banca mirando al agua
- Cartel de señalización en la entrada
- 2 turistas NPC parados en la baranda (solo de día)

**Lago asociado**: `[14.0, -1.2]` en `lakePositions` — agua dodecaedro animada

---

### ZONA 1e — Far Lake Viewpoint (X=14.6, Y=0, Z=-15.4) ✅

**Narrativa**: Segundo mirador de madera, sobre el lago lejano más grande (estático). Acceso desde la rama del lookout cabin.

**Implementado en** `FarLakeViewpoint.tsx`:
- Boardwalk de acceso desde X≈11 (summit branch road)
- Deck sobre el agua con barandas
- Soportes hundidos en el lago
- Turistas NPC de día

**Lago asociado**: `[14.6, -15.4]` en `lakePositions` — dodecaedro estático (sin animación GLSL)

---

### ZONA 2 — Bosque (X=0, Y=0, Z=-8) — Parcial

**Narrativa**: Transición. El camino entre el mundo cotidiano y el logro profesional. El bosque es misterioso pero seguro — hay luz filtrándose entre los árboles.

**Implementado**:
- Árboles densos (ver Vegetación — positions completas)
- Río con puente de piedra en `[-6.2, -10.2]`
- Rocas cubiertas en la zona

**Pendiente**:
- Neblina baja entre los troncos (ground fog por zona)
- Rayos de luz filtrándose (god rays cónicos)
- Cascada donde el río baja de nivel (Z≈-16)
- Hongos luminosos emissive azul/verde
- Luciérnagas (`<Sparkles>` drei)
- Helechos al suelo

**Iluminación**:
- Luz filtrada, verde-azulada bajo las copas
- Rayos de sol desde arriba (cones dorados, opacity 0.04)
- Sin luz directa fuerte — ambiente difuso

---

### ZONA 3 — Cabaña Taller / Skills (X=6, Y=2, Z=-14) — Diseño

**Narrativa**: El lugar donde Arthur trabaja y construye. Una cabaña elevada en las rocas con herramientas visibles, luz cálida desde adentro.

**Elementos 3D** (diseñados):
- Cabaña principal más grande y detallada (2 pisos)
- Ventanas con luz emissive ámbar fuerte
- Humo saliendo de la chimenea
- Herramientas apoyadas en la pared exterior
- Pantalla/pizarrón visible desde la ventana con código (textura)
- Escalera de madera exterior
- Terraza con telescopio
- Hacha clavada en un tronco cerca
- Leños apilados
- Puente de cuerda hacia la zona de escalada (ZONA 4)
- Cartel de madera tallado a la entrada

**Skills como objetos físicos** (cerca de la cabaña):
- Pergaminos enrollados con logos de tecnologías
- O runas talladas en piedras con los nombres de las tecnologías

**Iluminación**:
- Luz cálida fuerte desde las ventanas
- Farolillos en la terraza
- El ambiente exterior es más frío (montaña)

---

### ZONA 4 — Camino de Escalada / Experience (X=0, Y=3, Z=-20) — Diseño

**Narrativa**: La línea de tiempo profesional de Arthur. El camino sube en espiral por la montaña — cada tramo representa un período de su carrera.

**Elementos 3D** (diseñados):
- Camino sinuoso que sube en espiral por la montaña (path geometry)
- Piedras de hito a lo largo del camino (5-6 stones con fechas/roles)
- Puente de cuerda colgante sobre un abismo
- Vistas panorámicas del bosque y el pueblo abajo
- Nieve ligera en las rocas a medida que sube la altura
- Árboles más escasos y torcidos por el viento
- Marcadores de progreso (banderas en la cima de hitos)

**Hitos de Carrera**:
```
Hito 1 (Z=-18): Primer trabajo — año y empresa
Hito 2 (Z=-20): Segundo salto — tecnología adoptada
Hito 3 (Z=-22): Proyecto destacado — descripción breve
Hito 4 (Z=-24): Rol senior / arquitectura
Hito 5 (Z=-26): Presente — posición actual
```

---

### ZONA 5 — Cueva de Proyectos (X=-7, Y=4, Z=-26) — Parcial ✅

**Narrativa**: Los desafíos reales. La cueva es oscura pero hay luz dentro — Arthur encontró soluciones en la oscuridad.

**Implementado en** `CaveOfProjects.tsx`:
- Entrada de cueva en la ladera de la montaña
- Geometría del interior con antorchas y crystals emissive
- Dense tree ring alrededor del área (`terrainData.ts`)
- Rocas y arbustos framing la boca de la cueva

**Pendiente**:
- Stalactitas/stalagmitas low-poly
- Charcos de agua reflejante en el suelo
- 4-5 pedestales con proyectos como artefactos
- Paredes con relieves del "problema" resuelto
- Agua goteando del techo (particle system)

**Iluminación**:
- Oscuridad exterior, cálido-naranja interior (antorchas)
- Crystals: emissive azul-verde pulsante
- Reflexión de agua en paredes (animated point light) — pendiente

---

### ZONA 6 — Santuario (X=-18, Y=6, Z=-24) — Parcial ✅

**Narrativa**: El momento de pausa. Antes del logro final, Arthur reconoce que no llegó solo. Luz divina, paz profunda.

**Implementado**:
- `SanctuaryLight.tsx`: spotlight dorado pulsante
- `GuidanceEffects.tsx`: efectos de luz guía globales
- Tree ring alrededor del área (paleta dorada/warm)
- Flower ring con `#f5c842`, `#ffe09a`, `#f0a0c0`
- Rock ring con piedras más pequeñas

**Pendiente**:
- Plataforma de piedra circular con runas
- GOD NPC: columna de luz blanca-dorada con partículas
- Apertura circular en las nubes sobre el santuario
- Niebla dorada suave (fog color `#F5C842`)
- Texto narrativo en overlay al entrar

**Texto narrativo** (overlay al entrar):
```
"Before the first step, there was already a path.
 Before I understood the road, purpose was waiting."
```

**Iluminación**:
- `<SpotLight>` dorado desde arriba, apuntando al centro
- `SanctuaryLight` pulsante (mejorar con bloom)
- Ambient suave dorado, sin sombras duras

---

### ZONA 7 — Cumbre / Contacto (X=0, Y=14, Z=-36) — Diseño

**Narrativa**: El pico de la montaña. Se llegó. Desde aquí se ve todo el mundo.

**Elementos 3D** (diseñados):
- Pico rocoso emergiendo sobre las nubes
- Plataforma de piedra circular en la cima
- Altar/beacon central: columna de luz ascendente emissive dorado
- Banderas ondeando en el viento
- Cóndor solitario orbitando la cumbre
- Nubes rodeando la base del pico
- Form de contacto integrado como objeto 3D (tablet de piedra luminosa)

**Texto narrativo** (en la base del altar):
```
"I build with discipline, gratitude, and purpose."
"Guided since before the beginning."
```

---

## Sistema de Audio — Resumen

| Zona           | Música                  | Ambiente                              |
|----------------|-------------------------|---------------------------------------|
| Spawn/Hero     | Intro etéreo (piano)    | Viento alto, aves pasando             |
| Pueblo         | Tema tranquilo (piano)  | Pueblo, fuente, pájaros               |
| Parque Perros  | Mismo tema pueblo       | Ladridos, risa, naturaleza            |
| Bosque         | Ambient misterioso      | Bosque, río, cascada, luciérnagas     |
| Cabaña Taller  | Guitarra acústica íntima| Fuego, viento montaña, herramientas   |
| Escalada       | Épico ascendente        | Viento fuerte, pasos en grava         |
| Cueva          | Atmospheric, minimal    | Reverb cueva, goteo, fuego            |
| Santuario      | Piano solo, una nota    | Silencio + singing bowl               |
| Cumbre         | Tema principal completo | Viento épico, campana beacon          |

**Implementación** (`AudioSystem.tsx`):
- `PositionalAudio` de drei para fuentes con ubicación (río, fuente, fuego)
- `AudioListener` adjunto a la cámara del usuario
- Crossfade entre zonas basado en distancia
- Formato: `.mp3` para compatibilidad, `.ogg` como fallback
- Tecla M: mute/unmute
- Nunca autoplay sin interacción del usuario (política del navegador)

---

## Sistema de Clima / Atmósfera

- **Ciclo día/noche**: completo de 120 segundos — ver `DayNightController.tsx`
- **Viento**: partículas de viento animadas (pequeñas rayas blancas/grises) que cruzan la pantalla
- **Nieve**: en las zonas de alta montaña (Z < -22), partículas blancas cayendo suavemente — pendiente de implementar
- **Niebla por zona**: color y densidad del `<fog>` cambia con el ciclo día/noche; personalización por zona pendiente

---

## Performance — Reglas Obligatorias

| Elemento        | Técnica                                              |
|-----------------|------------------------------------------------------|
| Árboles         | InstancedMesh — máx 3 draw calls por tipo de árbol  |
| Aves            | InstancedMesh animado con useFrame                   |
| Partículas      | `<Sparkles>` de drei — NO particle systems custom    |
| Agua            | Un solo shader de agua reutilizado en todos los cuerpos de agua |
| Modelos glTF    | Draco compressed, textures ≤ 1024×1024              |
| LOD             | Desactivar sombras y reducir segment count en mobile |
| Post-processing | `<EffectComposer>` con Bloom + Vignette (desktop only)|

---

## Sistema de Station Pages

### Arquitectura

Cada zona del mapa tiene una **station page** — una ruta real en Next.js con contenido scrollable y un diorama 3D toon dedicado.

```
/                        → mundo 3D libre (sin cambios)
/station/[id]            → página inmersiva de la estación
```

**Una sola `<Canvas>`** montada en `app/layout.tsx` — nunca se desmonta entre rutas. Cuando el usuario está en `/`, el canvas no renderiza nada. Al navegar a `/station/[id]`, el diorama de esa estación hace cross-fade.

### Las 7 estaciones

| ID | Nombre | Zona del mundo | Contenido |
|----|--------|----------------|-----------|
| `base-town` | Base Town | Pueblo Base | About — intro, pillars |
| `workshop-cabin` | Workshop Cabin | Cabaña Taller | Stack — chips por categoría |
| `climbing-road` | Climbing Road | Camino Escalada | Experience — timeline |
| `cave-of-challenges` | Cave of Challenges | Cueva Proyectos | Projects — cards |
| `dog-park` | Dog Park | Parque de Perros | Human side — gallery |
| `hidden-sanctuary` | Hidden Sanctuary | Santuario | Faith — scripture + benediction |
| `summit-viewpoint` | Summit Viewpoint | Cumbre | Contact — links |

### Fuente de datos

Toda la copy, bloques y coordenadas de marcadores viven en `data/stations.ts`. **Nunca hardcodear contenido en componentes.** Si querés cambiar el texto de una estación, editás solo ese archivo.

### Tipos de bloque

| Tipo | Descripción |
|------|-------------|
| `prose` | Párrafo narrativo. Prop `lead: true` para texto de apertura en grande |
| `pillars` | 3 columnas con label + nota descriptiva |
| `chips` | Tags agrupados por categoría (stack) |
| `timeline` | Items verticales de experiencia con título y descripción |
| `projects` | Cards de proyectos con tags y links |
| `gallery` | Fotos con caption (Dog Park) |
| `scripture` | Versículos con referencia bíblica |
| `links` | CTAs de contacto (Upwork, GitHub, LinkedIn, Email) |

### Flujo de navegación world → station

1. Usuario hace click en un marcador dorado en el mundo **o** presiona E cerca de una zona
2. GSAP hace zoom cinematográfico hacia el punto del marcador (0.4s)
3. Fade out del mundo
4. `router.push('/station/[id]')` — AnimatePresence maneja la transición
5. Station page aparece con el diorama toon y el contenido scrollable
6. `← World` button hace el reverse: fade out station → fade in mundo en la misma posición

### Scroll dock del diorama

Al hacer scroll en la station page:
- El diorama 3D empieza centrado, grande, en el hero
- A medida que se scrollea: se achica y se mueve a la esquina superior derecha
- El contenido de bloques aparece debajo con `whileInView` de Framer Motion

### SEO — Obligatorio en cada station page

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const station = stationById(params.id);
  return {
    title: `${station.name} | Arthur Torres`,
    description: station.tagline,
    openGraph: {
      title: `${station.name} | Arthur Torres`,
      description: station.tagline,
      url: `https://mountain-portfolio.vercel.app/station/${params.id}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: station.name },
    alternates: { canonical: `/station/${params.id}` },
  };
}
```

### Lighthouse — Gates obligatorios

- Diorama canvas: `aria-label` descriptivo, `role="img"`
- Todos los bloques de texto: jerarquía `h1` → `h2` → `p` correcta
- Links del bloque `links`: `aria-label` con destino explícito
- Imágenes del bloque `gallery`: `alt` descriptivo siempre
- Color contrast WCAG 2.1 AA en ambos temas (A · Journal claro, B · Cinematic oscuro)
- Station canvas lazy-loaded con `next/dynamic` + `ssr: false`

---

## Interactividad — Hotspots (E-key / Marcadores)

**Decisión de arquitectura**: Click en marcador dorado o tecla E cerca de la zona → navega a `/station/[id]` con transición cinematográfica.

**Marcadores en el mundo** (`LocationMarkers.tsx`):
- `<Html>` de drei anclado a las coordenadas reales del terreno
- Pulso animado con `Math.sin` en `useFrame` (efecto beacon)
- Click → zoom GSAP hacia el punto → `router.push`
- Tecla E cuando el player está a ≤ 3 unidades → mismo flujo

Hotspots y sus coordenadas world-space:

| Estación | X | Z | Station ID |
|----------|---|---|------------|
| Base Town | 0 | 0 | `base-town` |
| Workshop Cabin | 6 | -14 | `workshop-cabin` |
| Climbing Road | 0 | -20 | `climbing-road` |
| Cave of Challenges | -7 | -26 | `cave-of-challenges` |
| Dog Park | -16 | 1 | `dog-park` |
| Hidden Sanctuary | -18 | -24 | `hidden-sanctuary` |
| Summit Viewpoint | 0 | -36 | `summit-viewpoint` |

---

## Personajes

| Personaje | Descripción | Estado |
|-----------|-------------|--------|
| Arthur    | Avatar principal. Polo blanco (#f0ede8), piel (#d4987a), pelo castaño oscuro (#2a1a0e) | ✅ |
| Laika     | Perra compañera, corre en el DogPark | ✅ |
| Kira      | Perra compañera, corre en el DogPark | ✅ |
| Wife      | NPC en el parque. Colores de referencia fotográfica real | ✅ |
| Turistas  | NPCs en viewpoints (EastLake, FarLake) | ✅ |
| GOD       | Figura de luz blanca-dorada en el Santuario | diseño |

---

## Narrativa Espiritual

**Filosofía**: Elegante, simbólico, cinematográfico. Implica guía divina a través del viaje de Arthur. Nunca explícito, nunca predicador — storytelling ambiental.

**Signos ambientales** (a lo largo de toda la escena):
- Rayos de luz cruzando caminos en transiciones clave
- Estrellas alineadas sobre momentos de hito
- Partículas de viento guiando la dirección del camino
- Brillo dorado cálido durante las subidas difíciles
- Amanecer disparándose al entrar en zonas decisivas

**Reglas de diseño**:
- Paleta dorada suave: `#F5C842`, `#FFE9A0`, blancos cálidos — nunca amarillos duros
- Partículas: `<Sparkles>` de drei o shader-based — máx 200 en mobile
- Luz: `<SpotLight>` o `<PointLight>` con falloff suave, sin sombras duras
- Sin cruces, sin iconografía religiosa explícita — solo simbolismo
- Música/ambient: opcional, user-initiated — nunca autoplay

---

## Registro de Cambios

| Fecha       | Cambio                                     | Implementado |
|-------------|--------------------------------------------|--------------|
| 2026-05-27  | Documento inicial creado                   | —            |
| 2026-05-27  | Post-processing: Bloom, Vignette           | ✅           |
| 2026-05-27  | Sistema de vuelo libre                     | ✅           |
| 2026-05-27  | Nubes volumétricas (CloudLayer)            | ✅           |
| 2026-05-27  | GradientMap en MeshToonMaterial            | ✅           |
| 2026-05-27  | Árbol variation (escala + rotación)        | ✅           |
| 2026-05-27  | Sky dinámico animado                       | ✅           |
| 2026-05-27  | Refactor MountainTerrain <300l             | ✅           |
| 2026-05-27  | Agua animada + río (GLSL shader)           | ✅           |
| 2026-05-27  | Aves con vuelo + aleteo (BirdFlock)        | ✅           |
| 2026-05-27  | Sistema de audio por zonas (AudioSystem)   | ✅           |
| 2026-05-29  | Ciclo día/noche completo (DayNightController) | ✅        |
| 2026-05-29  | StreetCars + luces nocturnas + arbitración | ✅           |
| 2026-05-29  | StreetNPCs en veredas                      | ✅           |
| 2026-05-29  | Lower Town (positive Z) completo           | ✅           |
| 2026-05-29  | EastLakeViewpoint con boardwalk + turistas | ✅           |
| 2026-05-29  | FarLakeViewpoint con boardwalk             | ✅           |
| 2026-05-29  | Town lake → dodecaedro animado             | ✅           |
| 2026-05-29  | Far lake → dodecaedro estático             | ✅           |
| 2026-05-29  | Colores reales Arthur + Wife (foto ref)    | ✅           |
| 2026-05-29  | Lookup cabin de 2 pisos [12, -13.8]        | ✅           |
| 2026-05-29  | CaveOfProjects — estructura base           | ✅ parcial   |
| 2026-05-29  | TerrainBridges — puente de piedra          | ✅ parcial   |
| 2026-05-29  | Collision filters (lago, puente, río)      | ✅           |
| 2026-05-29  | Parked car footprints en terrainData       | ✅           |
| 2026-05-29  | Favicon AT monogram                        | ✅           |
| —           | InstancedMesh para árboles                 | ❌           |
| —           | Casas mejoradas con detalles (cabaña taller)| ❌          |
| —           | Puente 3 (cuerda, escalada)                | ❌           |
| —           | Terreno con displacement (Perlin)          | ❌           |
| —           | Hotspots E-key interactivos                | ❌           |
| —           | GOD NPC en Santuario                       | ❌           |
| —           | Stalactitas/pedestales en Cueva            | ❌           |
| —           | Nieve por zona (Z < -22)                   | ❌           |
| —           | Luciérnagas / hongos luminosos (Bosque)    | ❌           |
