import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitRingProps {
  radius?: number;
  tilt?: number;
  color?: string;
  thickness?: number;
}

export function OrbitRing({ radius = 3, tilt = 0, color = '#22d3ee', thickness = 0.008 }: OrbitRingProps) {
  return (
    <mesh rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, thickness, 16, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
}

interface SatelliteProps {
  radius: number;
  speed: number;
  tilt?: number;
  phase?: number;
  color?: string;
}

export function Satellite({ radius, speed, tilt = 0, phase = 0, color = '#22d3ee' }: SatelliteProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime * speed + phase;
      groupRef.current.position.set(
        Math.cos(t) * radius,
        Math.sin(t) * radius * Math.sin(tilt || 0.001),
        Math.sin(t) * radius * Math.cos(tilt || 0.001),
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Satellite body */}
      <mesh>
        <boxGeometry args={[0.12, 0.08, 0.12]} />
        <meshStandardMaterial color="#e2e8f0" emissive={color} emissiveIntensity={0.4} metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Solar panels */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.04, 0.3, 0.08]} />
        <meshStandardMaterial color="#1e3a8a" emissive="#3b82f6" emissiveIntensity={0.3} metalness={0.6} />
      </mesh>
      {/* Glow point */}
      <pointLight color={color} intensity={2} distance={1.5} />
    </group>
  );
}
