
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const frameId = useRef<number>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xa855f7, 0.8, 100);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Create floating geometric shapes
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.ConeGeometry(0.7, 1.4, 8),
      new THREE.TorusGeometry(0.7, 0.3, 16, 100),
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ 
        color: 0x8b5cf6, 
        transparent: true, 
        opacity: 0.8,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xa855f7, 
        transparent: true, 
        opacity: 0.7,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xc084fc, 
        transparent: true, 
        opacity: 0.6,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x7c3aed, 
        transparent: true, 
        opacity: 0.9,
        shininess: 100
      }),
    ];

    const meshes: THREE.Mesh[] = [];
    
    geometries.forEach((geometry, index) => {
      const mesh = new THREE.Mesh(geometry, materials[index]);
      mesh.position.x = (Math.random() - 0.5) * 8;
      mesh.position.y = (Math.random() - 0.5) * 6;
      mesh.position.z = (Math.random() - 0.5) * 4;
      scene.add(mesh);
      meshes.push(mesh);
    });

    // Animation
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);

      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 + index * 0.002;
        mesh.rotation.y += 0.007 + index * 0.001;
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-full transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
