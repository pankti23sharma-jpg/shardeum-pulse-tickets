import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, RoundedBox, Float } from '@react-three/drei';
import { Group } from 'three';

interface TicketModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

const TicketModel: React.FC<TicketModelProps> = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1 
}) => {
  const meshRef = useRef<Group>(null);
  const { mouse, viewport } = useThree();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
      
      // Mouse parallax effect
      const x = (mouse.x * viewport.width) / 20;
      const y = (mouse.y * viewport.height) / 20;
      
      meshRef.current.rotation.x = rotation[0] + y * 0.05;
      meshRef.current.rotation.y = rotation[1] + x * 0.05;
      meshRef.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
    }
  });

  return (
    <Float
      speed={1.4}
      rotationIntensity={0.3}
      floatIntensity={0.2}
    >
      <group
        ref={meshRef}
        position={position}
        scale={scale}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {/* Main ticket body */}
        <RoundedBox
          args={[4, 2.2, 0.15]}
          radius={0.1}
          smoothness={4}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={hovered ? "#00ffff" : "#1a1a2e"}
            transparent
            opacity={0.9}
            roughness={0.2}
            metalness={0.8}
            emissive={hovered ? "#001a1a" : "#000"}
            emissiveIntensity={hovered ? 0.2 : 0.1}
          />
        </RoundedBox>

        {/* Ticket hole */}
        <RoundedBox
          args={[0.3, 0.3, 0.2]}
          radius={0.15}
          position={[1.5, 0, 0]}
        >
          <meshStandardMaterial
            color="#000"
            transparent
            opacity={0.8}
          />
        </RoundedBox>

        {/* Event title */}
        <Text
          position={[-0.5, 0.4, 0.08]}
          fontSize={0.25}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          NEON FESTIVAL
        </Text>

        {/* Date */}
        <Text
          position={[-0.5, 0.1, 0.08]}
          fontSize={0.15}
          color="#ff00ff"
          anchorX="center"
          anchorY="middle"
        >
          DEC 25, 2024
        </Text>

        {/* Seat info */}
        <Text
          position={[-0.5, -0.2, 0.08]}
          fontSize={0.12}
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
        >
          VIP SECTION A
        </Text>

        {/* Price */}
        <Text
          position={[-0.5, -0.45, 0.08]}
          fontSize={0.18}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          0.1 SHM
        </Text>

        {/* Decorative elements */}
        <RoundedBox
          args={[0.05, 1.8, 0.02]}
          radius={0.025}
          position={[0.8, 0, 0.08]}
        >
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
          />
        </RoundedBox>

        {/* QR Code placeholder */}
        <RoundedBox
          args={[0.6, 0.6, 0.02]}
          radius={0.05}
          position={[1.2, -0.3, 0.08]}
        >
          <meshStandardMaterial
            color="#fff"
            opacity={0.9}
            transparent
          />
        </RoundedBox>
      </group>
    </Float>
  );
};

export default TicketModel;