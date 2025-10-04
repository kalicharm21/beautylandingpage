import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { RotateCcw, Eye, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

interface Product3DViewerProps {
  modelPath?: string;
  productName: string;
  onToggleView?: () => void;
  showToggle?: boolean;
}

// Fallback 3D model component (simple geometric shape)
const FallbackModel = ({ color = '#d4a574' }: { color?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
      <cylinderGeometry args={[0.8, 1, 2, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.4}
        transparent
        opacity={0.9}
      />
      {/* Cap */}
      <mesh position={[0, 1.2, 0]} scale={0.9}>
        <cylinderGeometry args={[0.85, 0.85, 0.4, 16]} />
        <meshStandardMaterial
          color="#2c1810"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Label */}
      <mesh position={[0, 0, 0.81]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 0.6]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
        />
      </mesh>
    </mesh>
  );
};

// Note: LoadedModel is kept for future use when actual GLB files are added
// For now, we use the FallbackModel since GLB files don't exist yet
const LoadedModel = ({ url, productName }: { url: string; productName: string }) => {
  const [loadError, setLoadError] = useState(false);

  if (loadError) {
    return <FallbackModel />;
  }

  try {
    const { scene } = useGLTF(url, undefined, undefined, (error) => {
      console.warn('Failed to load 3D model:', error);
      setLoadError(true);
    });
    
    const meshRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      }
    });

    return (
      <primitive 
        ref={meshRef}
        object={scene} 
        scale={2} 
        position={[0, -1, 0]}
      />
    );
  } catch (error) {
    console.warn('Error rendering 3D model:', error);
    return <FallbackModel />;
  }
};

const Product3DViewer = ({ 
  modelPath, 
  productName, 
  onToggleView, 
  showToggle = true 
}: Product3DViewerProps) => {
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);
  const controlsRef = useRef<any>(null);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setResetTrigger(prev => prev + 1);
  };

  const toggleAutoRotate = () => {
    setIsAutoRotate(!isAutoRotate);
  };

  return (
    <div className="relative w-full h-96 bg-gradient-soft rounded-lg overflow-hidden shadow-soft border border-border">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        {showToggle && onToggleView && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onToggleView}
            className="glass"
            title="Switch to image gallery"
          >
            <Image className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="secondary"
          size="sm"
          onClick={toggleAutoRotate}
          className="glass"
          title={isAutoRotate ? 'Stop rotation' : 'Start rotation'}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleReset}
          className="glass"
          title="Reset view"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-muted-foreground text-sm"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Loading 3D model...
        </motion.div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        <Suspense fallback={null}>
          {/* Always use fallback for now since GLB files don't exist */}
          <FallbackModel />
          
          <Environment preset="studio" />
          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={1.5} 
            far={4.5} 
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={isAutoRotate}
          autoRotateSpeed={2}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />
      </Canvas>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground glass px-3 py-2 rounded">
        <p>Click and drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};

export default Product3DViewer;