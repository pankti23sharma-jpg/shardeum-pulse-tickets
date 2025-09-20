import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import TicketModel from './TicketModel';

interface Scene3DProps {
  className?: string;
  enableControls?: boolean;
  cameraPosition?: [number, number, number];
}

const Scene3D: React.FC<Scene3DProps> = ({ 
  className = "", 
  enableControls = true,
  cameraPosition = [0, 0, 8]
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={cameraPosition} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#00ffff" />
        <pointLight position={[5, -5, 5]} intensity={0.5} color="#ff00ff" />
        <pointLight position={[0, 0, 10]} intensity={0.3} color="#a855f7" />

        {/* Environment */}
        <Environment preset="night" />

        {/* 3D Ticket Model */}
        <Suspense fallback={null}>
          <TicketModel />
        </Suspense>

        {/* Controls */}
        {enableControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        )}
      </Canvas>
    </div>
  );
};

export default Scene3D;