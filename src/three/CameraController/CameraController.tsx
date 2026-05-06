"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export interface CameraControllerProps {
  locations: { id: string; worldPosition: [number, number, number] }[];
  onNearestLocationChange?: (locationId: string | null) => void;
  onEnterLocation?: (locationId: string) => void;
  enabled?: boolean;
}

const LOOK_SENSITIVITY = 0.0023;
const BASE_SPEED = 3.4;
const SPRINT_MULTIPLIER = 1.7;
const INTERACTION_RADIUS = 2.5;
const MIN_PITCH = -Math.PI / 3.2;
const MAX_PITCH = Math.PI / 4;
const FLOOR_Y = 1.15;
const CEILING_Y = 3.8;

export default function CameraController({
  locations,
  onNearestLocationChange,
  onEnterLocation,
  enabled = true,
}: CameraControllerProps) {
  const { camera, gl } = useThree();
  const movementRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    ascend: false,
    descend: false,
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
        case "Space":
          movementRef.current.ascend = pressed;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          movementRef.current.descend = pressed;
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
    if (movementRef.current.ascend) {
      movementDirection.y += 0.45;
    }
    if (movementRef.current.descend) {
      movementDirection.y -= 0.45;
    }

    if (movementDirection.lengthSq() > 0) {
      movementDirection.normalize().multiplyScalar(speed);
      camera.position.add(movementDirection);
    }

    camera.position.y = Math.min(CEILING_Y, Math.max(FLOOR_Y, camera.position.y));
    camera.position.x = Math.min(11, Math.max(-11, camera.position.x));
    camera.position.z = Math.min(9, Math.max(-20, camera.position.z));

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
