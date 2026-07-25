import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { Earth } from './Earth';
import { OrbitRing, Satellite } from './OrbitRing';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-64 w-64 rounded-full bg-gradient-to-br from-space-700 to-space-900 border border-neon-cyan/20 animate-pulse-glow" />
    </div>
  );
}

export function EarthScene() {
  return (
    <ErrorBoundary fallback={<SceneFallback />}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, -2, -3]} intensity={0.6} color="#22d3ee" />

        <Suspense fallback={null}>
          <Earth />
          <OrbitRing radius={2.8} tilt={0.2} color="#22d3ee" />
          <OrbitRing radius={3.2} tilt={-0.3} color="#3b82f6" thickness={0.005} />
          <OrbitRing radius={3.6} tilt={0.5} color="#6366f1" thickness={0.004} />

          <Satellite radius={2.8} speed={0.4} tilt={0.2} phase={0} color="#22d3ee" />
          <Satellite radius={3.2} speed={-0.3} tilt={-0.3} phase={2} color="#3b82f6" />
          <Satellite radius={3.6} speed={0.25} tilt={0.5} phase={4} color="#6366f1" />

          <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={4}
          maxDistance={12}
          autoRotate
          autoRotateSpeed={0.4}
          rotateSpeed={0.5}
          zoomSpeed={0.6}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
    </ErrorBoundary>
  );
}
