"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export interface CameraControllerProps {
  locations: { id: string; worldPosition: [number, number, number] }[];
  onNearestLocationChange?: (locationId: string | null) => void;
  onEnterLocation?: (locationId: string) => void;
  enabled?: boolean;
  focusLocationId?: string;
}

const LOOK_SENSITIVITY = 0.0023;
const BASE_SPEED = 5.0;
const SPRINT_MULTIPLIER = 2.2;
const INTERACTION_RADIUS = 2.5;
const MIN_PITCH = -Math.PI / 2 + 0.05;
const MAX_PITCH = Math.PI / 2 - 0.05;
const MIN_WORLD_Y = -3;
const MAX_WORLD_Y = 32;
const WORLD_MARGIN_X = 16;
const WORLD_MARGIN_Z = 18;
const MIN_WORLD_X = -24;
const MAX_WORLD_X = 24;
const MIN_WORLD_Z = -40;
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
    up: false,
    down: false,
    sprint: false,
  });
  const nearestLocationRef  = useRef<string | null>(null);
  const yawRef              = useRef(0);
  const pitchRef            = useRef(-0.08);
  // Prevents re-acquiring pointer lock immediately after ESC (browser SecurityError)
  const lockCooldownRef     = useRef(false);

  const forward = useMemo(() => new Vector3(), []);
  const right = useMemo(() => new Vector3(), []);
  const up = useMemo(() => new Vector3(0, 1, 0), []);
  const movementDirection = useMemo(() => new Vector3(), []);
  const lookDirection = useMemo(() => new Vector3(), []);
  const lookTarget = useMemo(() => new Vector3(), []);
  const focusDirection = useMemo(() => new Vector3(), []);
  const worldBounds = useMemo(() => {
    if (locations.length === 0) {
      return { minX: MIN_WORLD_X, maxX: MAX_WORLD_X, minZ: MIN_WORLD_Z, maxZ: MAX_WORLD_Z };
    }
    const xs = locations.map((l) => l.worldPosition[0]);
    const zs = locations.map((l) => l.worldPosition[2]);
    return {
      minX: Math.min(MIN_WORLD_X, Math.min(...xs) - WORLD_MARGIN_X),
      maxX: Math.max(MAX_WORLD_X, Math.max(...xs) + WORLD_MARGIN_X),
      minZ: Math.min(MIN_WORLD_Z, Math.min(...zs) - WORLD_MARGIN_Z),
      maxZ: Math.max(MAX_WORLD_Z, Math.max(...zs) + WORLD_MARGIN_Z),
    };
  }, [locations]);

  useEffect(() => {
    if (!enabled || !focusLocationId) return;
    const loc = locations.find((l) => l.id === focusLocationId);
    if (!loc) return;

    const [tx, ty, tz] = loc.worldPosition;
    camera.position.set(tx + 2.6, ty + 3.5, tz + 3.5);

    focusDirection.set(tx - camera.position.x, ty - camera.position.y, tz - camera.position.z).normalize();
    yawRef.current = Math.atan2(focusDirection.x, -focusDirection.z);
    pitchRef.current = Math.min(MAX_PITCH, Math.max(MIN_PITCH, Math.asin(focusDirection.y)));

    nearestLocationRef.current = loc.id;
    onNearestLocationChange?.(loc.id);
  }, [camera.position, enabled, focusDirection, focusLocationId, locations, onNearestLocationChange]);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== gl.domElement) return;
      yawRef.current += event.movementX * LOOK_SENSITIVITY;
      pitchRef.current -= event.movementY * LOOK_SENSITIVITY;
      pitchRef.current = Math.min(MAX_PITCH, Math.max(MIN_PITCH, pitchRef.current));
    };

    const onPointerLockChange = () => {
      if (document.pointerLockElement !== gl.domElement) {
        // Lock released (e.g. ESC) — block re-acquisition for 1.2 s to avoid SecurityError
        lockCooldownRef.current = true;
        setTimeout(() => { lockCooldownRef.current = false; }, 1200);
      }
    };

    const onCanvasClick = () => {
      if (document.pointerLockElement !== gl.domElement && !lockCooldownRef.current) {
        gl.domElement.requestPointerLock();
      }
    };

    const onKeyChange = (pressed: boolean) => (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW": case "ArrowUp":    movementRef.current.forward  = pressed; break;
        case "KeyS": case "ArrowDown":  movementRef.current.backward = pressed; break;
        case "KeyA": case "ArrowLeft":  movementRef.current.left     = pressed; break;
        case "KeyD": case "ArrowRight": movementRef.current.right    = pressed; break;
        case "Space":                   movementRef.current.up       = pressed; break;
        case "KeyQ":                    movementRef.current.down     = pressed; break;
        case "ShiftLeft": case "ShiftRight": movementRef.current.sprint = pressed; break;
        case "KeyE":
          if (pressed && nearestLocationRef.current && onEnterLocation) {
            onEnterLocation(nearestLocationRef.current);
          }
          break;
        default: break;
      }
    };

    const onKeyDown = onKeyChange(true);
    const onKeyUp = onKeyChange(false);

    gl.domElement.style.cursor = "crosshair";
    gl.domElement.addEventListener("click", onCanvasClick);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    document.addEventListener("pointerlockchange", onPointerLockChange);

    return () => {
      gl.domElement.removeEventListener("click", onCanvasClick);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("pointerlockchange", onPointerLockChange);
    };
  }, [enabled, gl, onEnterLocation]);

  useFrame((_, delta) => {
    if (!enabled) return;

    const speed = BASE_SPEED * (movementRef.current.sprint ? SPRINT_MULTIPLIER : 1) * delta;
    const cosP = Math.cos(pitchRef.current);
    const sinP = Math.sin(pitchRef.current);

    // Forward follows full 3D look direction
    forward.set(
      Math.sin(yawRef.current) * cosP,
      sinP,
      -Math.cos(yawRef.current) * cosP,
    );
    // Right stays horizontal so strafing feels natural
    right.set(Math.cos(yawRef.current), 0, Math.sin(yawRef.current));

    movementDirection.set(0, 0, 0);
    if (movementRef.current.forward)  movementDirection.add(forward);
    if (movementRef.current.backward) movementDirection.sub(forward);
    if (movementRef.current.right)    movementDirection.add(right);
    if (movementRef.current.left)     movementDirection.sub(right);
    if (movementRef.current.up)       movementDirection.add(up);
    if (movementRef.current.down)     movementDirection.sub(up);

    if (movementDirection.lengthSq() > 0) {
      movementDirection.normalize().multiplyScalar(speed);
      camera.position.add(movementDirection);
    }

    camera.position.x = Math.min(worldBounds.maxX, Math.max(worldBounds.minX, camera.position.x));
    camera.position.z = Math.min(worldBounds.maxZ, Math.max(worldBounds.minZ, camera.position.z));
    camera.position.y = Math.min(MAX_WORLD_Y, Math.max(MIN_WORLD_Y, camera.position.y));

    lookDirection.set(
      Math.sin(yawRef.current) * cosP,
      sinP,
      -Math.cos(yawRef.current) * cosP,
    );
    lookTarget.copy(camera.position).add(lookDirection);
    camera.lookAt(lookTarget);

    let nearest: string | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (const location of locations) {
      const dx = location.worldPosition[0] - camera.position.x;
      const dz = location.worldPosition[2] - camera.position.z;
      const dist = Math.hypot(dx, dz);
      if (dist < nearestDistance) {
        nearestDistance = dist;
        nearest = location.id;
      }
    }

    const nextNearest = nearestDistance <= INTERACTION_RADIUS ? nearest : null;
    if (nearestLocationRef.current !== nextNearest) {
      nearestLocationRef.current = nextNearest;
      onNearestLocationChange?.(nextNearest);
    }
  });

  return null;
}
