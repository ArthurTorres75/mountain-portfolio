"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

import { getTerrainHeightAt } from "@/lib";

export interface CameraControllerProps {
  locations: { id: string; worldPosition: [number, number, number] }[];
  onNearestLocationChange?: (locationId: string | null) => void;
  onEnterLocation?: (locationId: string) => void;
  enabled?: boolean;
  focusLocationId?: string;
}

const LOOK_SENSITIVITY = 0.0023;
const BASE_SPEED = 3.4;
const SPRINT_MULTIPLIER = 1.7;
const INTERACTION_RADIUS = 2.5;
const MIN_PITCH = -Math.PI / 3.2;
const MAX_PITCH = Math.PI / 4;
const FLOOR_Y = 1.15;
const CEILING_Y = 3.8;
const EYE_HEIGHT = 1.45;
const WORLD_MARGIN_X = 16;
const WORLD_MARGIN_Z = 18;
const MIN_WORLD_X = -24;
const MAX_WORLD_X = 24;
const MIN_WORLD_Z = -34;
const MAX_WORLD_Z = 18;

export default function CameraController({
  locations,
  onNearestLocationChange,
  onEnterLocation,
  enabled = true,
  focusLocationId,
}: CameraControllerProps) {
  const { camera, gl } = useThree();
  const movementRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
  });
  const nearestLocationRef = useRef<string | null>(null);
  const yawRef = useRef(0);
  const pitchRef = useRef(-0.08);

  const forward = useMemo(() => new Vector3(), []);
  const right = useMemo(() => new Vector3(), []);
  const movementDirection = useMemo(() => new Vector3(), []);
  const lookDirection = useMemo(() => new Vector3(), []);
  const lookTarget = useMemo(() => new Vector3(), []);
  const focusDirection = useMemo(() => new Vector3(), []);
  const worldBounds = useMemo(() => {
    if (locations.length === 0) {
      return {
        minX: MIN_WORLD_X,
        maxX: MAX_WORLD_X,
        minZ: MIN_WORLD_Z,
        maxZ: MAX_WORLD_Z,
      };
    }

    const xs = locations.map((location) => location.worldPosition[0]);
    const zs = locations.map((location) => location.worldPosition[2]);

    return {
      minX: Math.min(MIN_WORLD_X, Math.min(...xs) - WORLD_MARGIN_X),
      maxX: Math.max(MAX_WORLD_X, Math.max(...xs) + WORLD_MARGIN_X),
      minZ: Math.min(MIN_WORLD_Z, Math.min(...zs) - WORLD_MARGIN_Z),
      maxZ: Math.max(MAX_WORLD_Z, Math.max(...zs) + WORLD_MARGIN_Z),
    };
  }, [locations]);

  useEffect(() => {
    if (!enabled || !focusLocationId) {
      return;
    }

    const focusLocation = locations.find((location) => location.id === focusLocationId);
    if (!focusLocation) {
      return;
    }

    const [tx, ty, tz] = focusLocation.worldPosition;

    camera.position.set(
      tx + 2.6,
      Math.min(CEILING_Y, Math.max(FLOOR_Y, getTerrainHeightAt(tx + 2.6, tz + 2.8) + EYE_HEIGHT)),
      tz + 2.8
    );

    focusDirection.set(tx - camera.position.x, ty + 0.75 - camera.position.y, tz - camera.position.z).normalize();
    yawRef.current = Math.atan2(focusDirection.x, -focusDirection.z);
    pitchRef.current = Math.min(MAX_PITCH, Math.max(MIN_PITCH, Math.asin(focusDirection.y)));

    nearestLocationRef.current = focusLocation.id;
    onNearestLocationChange?.(focusLocation.id);
  }, [camera.position, enabled, focusDirection, focusLocationId, locations, onNearestLocationChange]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const onMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== gl.domElement) {
        return;
      }

      yawRef.current += event.movementX * LOOK_SENSITIVITY;
      pitchRef.current -= event.movementY * LOOK_SENSITIVITY;
      pitchRef.current = Math.min(MAX_PITCH, Math.max(MIN_PITCH, pitchRef.current));
    };

    const onCanvasClick = () => {
      if (document.pointerLockElement !== gl.domElement) {
        gl.domElement.requestPointerLock();
      }
    };

    const onKeyChange = (pressed: boolean) => (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
        case "ArrowUp":
          movementRef.current.forward = pressed;
          break;
        case "KeyS":
        case "ArrowDown":
          movementRef.current.backward = pressed;
          break;
        case "KeyA":
        case "ArrowLeft":
          movementRef.current.left = pressed;
          break;
        case "KeyD":
        case "ArrowRight":
          movementRef.current.right = pressed;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          movementRef.current.sprint = pressed;
          break;
        case "KeyE":
          if (pressed && nearestLocationRef.current && onEnterLocation) {
            onEnterLocation(nearestLocationRef.current);
          }
          break;
        default:
          break;
      }
    };

    const onKeyDown = onKeyChange(true);
    const onKeyUp = onKeyChange(false);

    gl.domElement.style.cursor = "crosshair";
    gl.domElement.addEventListener("click", onCanvasClick);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      gl.domElement.removeEventListener("click", onCanvasClick);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [enabled, gl, onEnterLocation]);

  useFrame((_, delta) => {
    if (!enabled) {
      return;
    }

    const speed = BASE_SPEED * (movementRef.current.sprint ? SPRINT_MULTIPLIER : 1) * delta;

    forward.set(Math.sin(yawRef.current), 0, -Math.cos(yawRef.current));
    right.set(Math.cos(yawRef.current), 0, Math.sin(yawRef.current));

    movementDirection.set(0, 0, 0);

    if (movementRef.current.forward) {
      movementDirection.add(forward);
    }
    if (movementRef.current.backward) {
      movementDirection.sub(forward);
    }
    if (movementRef.current.right) {
      movementDirection.add(right);
    }
    if (movementRef.current.left) {
      movementDirection.sub(right);
    }
    if (movementDirection.lengthSq() > 0) {
      movementDirection.normalize().multiplyScalar(speed);
      camera.position.add(movementDirection);
    }

    camera.position.x = Math.min(worldBounds.maxX, Math.max(worldBounds.minX, camera.position.x));
    camera.position.z = Math.min(worldBounds.maxZ, Math.max(worldBounds.minZ, camera.position.z));
    camera.position.y = Math.min(
      CEILING_Y,
      Math.max(FLOOR_Y, getTerrainHeightAt(camera.position.x, camera.position.z) + EYE_HEIGHT)
    );

    lookDirection.set(
      Math.sin(yawRef.current) * Math.cos(pitchRef.current),
      Math.sin(pitchRef.current),
      -Math.cos(yawRef.current) * Math.cos(pitchRef.current)
    );
    lookTarget.copy(camera.position).add(lookDirection);
    camera.lookAt(lookTarget);

    let nearest: string | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    locations.forEach((location) => {
      const dx = location.worldPosition[0] - camera.position.x;
      const dz = location.worldPosition[2] - camera.position.z;
      const distance = Math.hypot(dx, dz);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = location.id;
      }
    });

    const nextNearest = nearestDistance <= INTERACTION_RADIUS ? nearest : null;

    if (nearestLocationRef.current !== nextNearest) {
      nearestLocationRef.current = nextNearest;
      onNearestLocationChange?.(nextNearest);
    }
  });

  return null;
}
