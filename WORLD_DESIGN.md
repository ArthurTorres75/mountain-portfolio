# Mountain Portfolio — World Design Script

> **Purpose**: Este archivo es la fuente de verdad para el diseño del mundo 3D. Todo elemento visual, narrativo o técnico debe trazarse hasta aquí. Antes de implementar cualquier cosa, verificá que esté documentado en este guion.

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
                                      |
                          [VALLE DE ENTRADA / HERO]
                                      |
                          [SPAWN — ENTRE NUBES]
```

**Coordenadas aproximadas en world space** (Y = altura, Z = profundidad norte-sur, X = este-oeste):

| Zona              | X     | Y      | Z      |
|-------------------|-------|--------|--------|
| Spawn / Hero      | 0     | 12     | 10     |
| Pueblo Base       | 0     | 0      | 0      |
| Parque de Perros  | -8    | 0      | -4     |
| Bosque            | 0     | 0      | -8     |
| Cabaña Taller     | 6     | 2      | -14    |
| Camino Escalada   | 0     | 3      | -20    |
| Cueva Proyectos   | -7    | 4      | -26    |
| Santuario         | -12   | 6      | -30    |
| Cumbre / Contacto | 0     | 14     | -36    |

---

## Sistemas de Entorno Global

### Vuelo Libre
- El usuario spawna entre nubes a Y=12, mirando hacia abajo sobre el valle
- WASD + mouse: vuelo en cualquier dirección
- Shift: boost de velocidad ×2
- F: alternar modo "caminata a ras del suelo" vs "vuelo libre"
- No hay colisión — el jugador puede atravesar terreno y construcciones

### Sistema de Nubes
- Capa densa de nubes entre Y=8 y Y=10 (separa el mundo terrenal del cielo)
- Nubes volumétricas usando `<Clouds>` de drei o instanced spheres con material translúcido
- Al atravesarlas: niebla temporal + sonido de viento fuerte
- Segunda capa ligera en Y=20 (nubes altas, decorativas)
- Nubes individuales flotando alrededor de la cumbre

### Sistema de Neblina
- Ground fog: neblina baja (Y=0 a Y=1.5) en el bosque y el valle al amanecer
- Niebla volumétrica con `<fog>` exponencial, distinta por zona
- En el santuario: neblina dorada especial (emissive particles + fog color dorado)

### Sistema de Agua
- **Río principal**: nace en la montaña (Z=-18), baja por el bosque, cruza el pueblo (Z=-2), termina en un lago en el valle (Z=4)
- Ancho del río: ~3 unidades. Sinuoso, no recto.
- **Shader de agua**: UV scroll + normal map animado + `MeshPhysicalMaterial` con reflectividad
- **Lagos**: 3 lagos decorativos en el valle y el bosque
- **Cascada**: pequeña caída de agua en Z=-16 donde el río baja del nivel montañoso al bosque
- Material: azul-verde translúcido, foam blanco en los bordes

### Puentes
- **Puente 1** (Pueblo): puente de madera sobre el río en Z=-1, X=0. Tablas de madera, barandas a los costados.
- **Puente 2** (Bosque): puente de piedra cubierto de musgo en Z=-10, X=-2. Más antiguo, atmosférico.
- **Puente 3** (Escalada): puente de cuerda suspendido entre dos riscos en Z=-21, X=2. Se balancea ligeramente.

### Aves
- **Bandada principal**: 12-20 aves volando en formación V a Y=7-9, pasando ocasionalmente por el mundo de este a oeste
- **Aves del bosque**: 4-6 aves individuales en el bosque, posadas en ramas o volando entre árboles a baja altura
- **Cóndor solitario**: una ave grande que orbita lentamente la cumbre a Y=18
- Implementación: instanced meshes con ala que bate via `useFrame`, path siguiendo una curva CatmullRom

### Vegetación
- **Bosque denso** (Z=-6 a Z=-14): pinos altos, robles low-poly, helechos al suelo
- **Valle** (Z=0 a Z=8): pastizales con flores, árboles dispersos, variación de altura en el terreno
- **Zona de montaña** (Z=-15 en adelante): pinos más escasos, rocas prominentes, nieve en las cimas
- **Borde del río**: sauce llorón low-poly a ambos lados del agua

### Vegetación — Especificaciones de Modelos
Usar glTF 2.0 Draco-compressed. Si no hay modelo disponible, construir con geometrías primitivas mejoradas.

| Elemento        | Geometría alternativa                         |
|-----------------|-----------------------------------------------|
| Pino alto       | 3 conos escalonados + cilindro, escala 1.5-3x |
| Roble           | IcosahedronGeometry para canopy, escala random |
| Sauce           | Cilindro + geometría custom drooping branches  |
| Helecho         | Planos con textura atlas de hoja, billboarding |
| Flor            | Esfera pequeña + cilindro fino                |

### Terreno
- Ground plane: `PlaneGeometry(200, 200, 64, 64)` con vertex displacement por Perlin noise
- Heightmap: suave en el valle, agresivo en las montañas
- Colores por altura: verde (bajo) → tierra/roca (medio) → gris/blanco (cumbre)
- `getTerrainHeightAt(x, z)`: función que devuelve la altura real usando el mismo noise que genera el terreno

---

## Zonas — Detalle Completo

---

### ZONA 0 — Spawn / Hero (Y=12, Z=10)

**Narrativa**: El usuario aparece flotando entre nubes sobre el valle. La primera vista es el mundo entero desde arriba — montañas, bosques, el río brillando, el pueblo tranquilo. Es el "preview" de todo lo que puede explorar.

**Elementos 3D**:
- Nube grande y densa bajo el jugador (plataforma visual de spawn)
- Bandada de aves pasando cerca
- Partículas doradas flotando ascendentes
- Desde aquí se ve todo el mapa (sin niebla bloqueante a esta altura)

**Iluminación**:
- Sol bajo en el horizonte (amanecer): luz cálida desde el este
- Cielo degradado de naranja-rosa a azul profundo
- `<Sky>` de drei con `sunPosition={[1, 0.1, 0]}`

**UI**: Título del portfolio aparece en overlay — "Arthur | Full Stack Engineer". CTAs: "Explorar" / "Ver Proyectos" / "Contacto".

**Audio**:
- Viento suave a altura (reverb amplio)
- Música: intro orquestal etérea, piano + cuerdas
- Al bajar: la música se funde hacia el tema del pueblo

---

### ZONA 1 — Pueblo Base / About (X=0, Y=0, Z=0)

**Narrativa**: El pueblo donde Arthur creció y se formó. Cálido, vivo, con gente moviéndose. Aquí está la historia personal del desarrollador.

**Elementos 3D**:
- 6-8 casas low-poly con chimeneas humeantes (particle system de humo)
- Plaza central con una fuente de agua
- Arthur personaje caminando por el centro
- Laika y Kira corriendo por el parque adyacente
- Wife NPC sentada en un banco
- Árbol grande central (tipo roble) en la plaza
- Mercadillo con carpas de tela
- Postes de luz/linternas por las calles
- El río pasa por el borde sur del pueblo con Puente 1

**Casas — Especificación**:
```
Estructura base: BoxGeometry
Techo: ConeGeometry rotado ×4 (pirámide) o prisma triangular
Chimenea: cilindro delgado
Puerta: rectángulo oscuro
Ventanas: rectángulos con material emissive suave (luz interior)
Material: meshToonMaterial con variación de colores (beige, rojo, azul apagado)
```

**Iluminación**:
- Luz ambiental cálida, hora dorada
- Point lights en cada ventana (muy suave, color #FFE4A0)
- Point light en la fuente central

**Audio**:
- Pueblo: sonidos ambientes de pueblo (pájaros, viento suave, fuente de agua)
- Música: tema tranquilo de piano
- Positional audio: fuente burbujeando, río lejano

---

### ZONA 1b — Parque de Perros (X=-8, Y=0, Z=-4)

**Narrativa**: El lado humano. Aquí Arthur no es solo un ingeniero — es alguien que ama a sus perros y a su familia.

**Elementos 3D**:
- Pradera con flores silvestres
- Laika y Kira corriendo en círculos (animación existente mejorada)
- Wife NPC caminando con ellos
- Bancas de madera
- Árboles frutales
- Valla de madera delimitando el área
- Mariposas (instanced meshes pequeños con aleteo)

**Audio**:
- Ladridos ocasionales de los perros (positional audio)
- Risas/ambiente familiar suave
- Pájaros

---

### ZONA 2 — Bosque (X=0, Y=0, Z=-8)

**Narrativa**: Transición. El camino entre el mundo cotidiano y el logro profesional. El bosque es misterioso pero seguro — hay luz filtrándose entre los árboles.

**Elementos 3D**:
- Pinos altos densos (60+ árboles usando InstancedMesh)
- Neblina baja entre los troncos (ground fog)
- Rayos de luz filtrándose entre los árboles (god rays cónicos translúcidos)
- Río con Puente 2 de piedra
- Cascada pequeña donde el río baja de nivel
- Hongos luminosos en la base de los árboles (emissive suave azul/verde)
- Aves individuales posadas en ramas
- Luciérnagas (Sparkles de drei, verde suave, nocturnas)
- Helechos al suelo
- Piedras cubiertas de musgo

**Iluminación**:
- Luz filtrada, verde-azulada bajo las copas
- Rayos de sol desde arriba (cones cónicos dorados, opacity 0.04)
- Sin luz directa fuerte — ambiente difuso

**Audio**:
- Ambience forestal: viento en árboles, crujidos, hojas
- Agua del río y cascada (positional)
- Pájaros en el bosque
- Luciérnagas: ningún sonido pero refuerzan la atmósfera visual

---

### ZONA 3 — Cabaña Taller / Skills (X=6, Y=2, Z=-14)

**Narrativa**: El lugar donde Arthur trabaja y construye. Una cabaña elevada en las rocas con herramientas visibles, luz cálida desde adentro.

**Elementos 3D**:
- Cabaña principal más grande y detallada (2 pisos)
- Ventanas con luz emissive ámbar fuerte
- Humo saliendo de la chimenea
- Herramientas apoyadas en la pared exterior (iconos de skills como objetos)
- Una pantalla/pizarrón visible desde la ventana con código (textura)
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

**Audio**:
- Viento de montaña
- Fuego crepitando (desde la chimenea)
- Martilleo ocasional suave
- Música: tema íntimo, guitarra acústica

---

### ZONA 4 — Camino de Escalada / Experience (X=0, Y=3, Z=-20)

**Narrativa**: La línea de tiempo profesional de Arthur. El camino sube en espiral por la montaña — cada tramo representa un período de su carrera.

**Elementos 3D**:
- Camino sinuoso que sube en espiral por la montaña (path geometry)
- Piedras de hito a lo largo del camino (5-6 stones con fechas/roles)
- Puente de cuerda colgante sobre un abismo (Puente 3)
- Vistas panorámicas del bosque y el pueblo abajo
- Nieve ligera en las rocas a medida que sube la altura
- Árboles más escasos y torcidos por el viento
- Águila/cóndor visible volando cerca
- Marcadores de progreso (banderas en la cima de hitos)
- Nubes pasando lateralmente a la altura del camino

**Hitos de Carrera** (posiciones aproximadas a lo largo del camino):
```
Hito 1 (Z=-18): Primer trabajo — año y empresa
Hito 2 (Z=-20): Segundo salto — tecnología adoptada
Hito 3 (Z=-22): Proyecto destacado — descripción breve
Hito 4 (Z=-24): Rol senior / arquitectura
Hito 5 (Z=-26): Presente — posición actual
```

**Iluminación**:
- Más fría y azulada (altitud)
- Sombras largas del sol bajo
- Bordes de nubes iluminados desde abajo

**Audio**:
- Viento fuerte de montaña
- Pasos en nieve/grava (si se activa modo caminata)
- Música: tema épico ascendente, cuerdas + percusión

---

### ZONA 5 — Cueva de Proyectos (X=-7, Y=4, Z=-26)

**Narrativa**: Los desafíos reales. La cueva es oscura pero hay luz dentro — Arthur encontró soluciones en la oscuridad. Cada proyecto es una gema o un artefacto en la cueva.

**Elementos 3D**:
- Entrada de cueva en la ladera de la montaña (geometría de arco irregular)
- Interior iluminado por antorchas y cristales emissive
- Stalactitas/stalagmitas low-poly
- Charcos de agua reflejante en el suelo
- 4-5 "pedestales" con proyectos como artefactos:
  - Holograma/cristal flotante con nombre del proyecto
  - Al acercarse: aparece descripción en overlay UI
- Paredes con relieves que muestran el "problema" que se resolvió
- Gemas azules/turquesas emissive en las paredes
- Agua goteando del techo (particle system)
- Una salida al otro lado da al santuario

**Iluminación**:
- Oscuridad exterior, cálido-naranja interior (antorchas)
- Crystals: emissive azul-verde pulsante
- Reflexión de agua en paredes (animated point light)

**Audio**:
- Reverb de cueva en todo el audio dentro
- Goteo de agua (positional)
- Fuego de antorchas (crackle, positional)
- Música: misterioso, atmospheric, minimalista

---

### ZONA 6 — Santuario (X=-12, Y=6, Z=-30)

**Narrativa**: El momento de pausa. Antes del logro final, Arthur reconoce que no llegó solo. Luz divina, paz profunda.

**Elementos 3D**:
- Claro escondido entre las rocas de la montaña, oculto desde abajo
- Plataforma de piedra circular con runas suaves grabadas
- GOD NPC: figura de luz blanca-dorada (no humanoide explícita — columna de luz con partículas)
- Rayos de luz dorada descendiendo desde el cielo (shaft lights)
- Partículas doradas ascendentes (Sparkles dorados, densidad media)
- Árboles con hojas doradas alrededor del claro
- Nubes partiéndose exactamente sobre el santuario (apertura circular en las nubes)
- Flores blancas en el suelo
- Niebla dorada suave (fog color #F5C842 con opacity muy baja)

**Texto narrativo** (aparece en overlay al entrar):
```
"Before the first step, there was already a path.
 Before I understood the road, purpose was waiting."
```

**Iluminación**:
- `<SpotLight>` dorado desde arriba, apuntando al centro del santuario
- `SanctuaryLight` pulsante existente (mejorar con bloom)
- Ambient suave dorado, sin sombras duras

**Audio**:
- Silencio casi total — solo viento muy suave
- Tono armónico sostenido (singing bowl)
- Al entrar: música cesa abruptamente → silencio → luego el tono armónico aparece
- Música reanuda suavemente: piano solo, una nota a la vez

---

### ZONA 7 — Cumbre / Contacto (X=0, Y=14, Z=-36)

**Narrativa**: El pico de la montaña. Se llegó. Desde aquí se ve todo el mundo. El contacto no es un formulario burocrático — es una invitación desde la cima.

**Elementos 3D**:
- Pico rocoso emergiendo sobre las nubes
- Plataforma de piedra circular en la cima
- Altar/beacon central: columna de luz ascendente emissive dorado
- Banderas ondeando en el viento (geometría que anima con Math.sin)
- Cóndor solitario orbitando la cumbre
- Nubes rodeando la base del pico (se ve el tope, las nubes abajo)
- Estrellas visibles incluso de día (cielo más oscuro a esta altura)
- Form de contacto integrado como objeto 3D (tablet de piedra luminosa)

**Texto narrativo** (en la base del altar):
```
"I build with discipline, gratitude, and purpose."
"Guided since before the beginning."
```

**Iluminación**:
- Sol directo desde arriba (esta zona está sobre las nubes)
- Beacon: emissive blanco-dorado con bloom intenso
- Rim light cálido en las rocas
- Dios rays cayendo alrededor del pico

**Audio**:
- Viento épico de cumbre
- Música: tema principal completo, orquestal, emotivo
- Al acercarse al beacon: campanada suave
- Al enviar el form: fanfare breve

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

**Implementación**:
- `PositionalAudio` de drei para fuentes con ubicación (río, fuente, fuego)
- `AudioListener` adjunto a la cámara del usuario
- Crossfade entre zonas basado en distancia (fade out zona actual, fade in nueva)
- Formato: `.mp3` para compatibilidad, `.ogg` como fallback
- Volumen master controlable con tecla M (mute/unmute)
- Nunca autoplay sin interacción del usuario (política del navegador)

---

## Sistema de Clima / Atmósfera

- **Estado fijo**: siempre amanecer/hora dorada — no hay ciclo de día/noche dinámico
- **Viento**: partículas de viento animadas (pequeñas rayas blancas/grises) que cruzan la pantalla
- **Nieve**: en las zonas de alta montaña (Z < -22), partículas blancas cayendo suavemente
- **Niebla por zona**: se cambia el `<fog>` density/color al entrar en cada zona

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

## Interactividad — Hotspots

Al acercarse a menos de 3 unidades de un hotspot:
1. Aparece indicador flotante "[ E ] Explorar" en overlay UI
2. Al presionar E: panel de info aparece (nombre de sección, descripción, links)
3. El panel tiene estilos glassmorphism (blur + semi-transparent)
4. Al cerrar: vuelve al mundo

Hotspots definidos:
- Pueblo (About)
- Cabaña (Skills)
- Cada hito de Escalada (Experience item)
- Cada pedestal de Cueva (Project item)
- Altar de Cumbre (Contact form)

---

## Registro de Cambios

| Fecha       | Cambio                         | Implementado |
|-------------|--------------------------------|--------------|
| 2026-05-27  | Documento inicial creado       | —            |
| 2026-05-27  | Post-processing: Bloom, Vignette   | ✅          |
| 2026-05-27  | Sistema de vuelo libre         | ✅           |
| 2026-05-27  | Nubes volumétricas             | ✅           |
| 2026-05-27  | GradientMap en MeshToonMaterial| ✅           |
| 2026-05-27  | Árbol variation (escala+rot)   | ✅           |
| 2026-05-27  | Sky dinámico (amanecer)        | ✅           |
| 2026-05-27  | Refactor MountainTerrain <300l | ✅           |
| 2026-05-27  | Agua animada + río (GLSL)      | ✅           |
| 2026-05-27  | Aves con vuelo + aleteo        | ✅           |
| (siguiente) | InstancedMesh para árboles     | ❌           |
| 2026-05-27  | Sistema de audio por zonas     | ✅           |
| (siguiente) | Casas mejoradas con detalles   | ❌           |
| (siguiente) | Puentes (3 tipos)              | ❌           |
| (siguiente) | Cueva de Proyectos             | ❌           |
| (siguiente) | Terreno con displacement       | ❌           |
