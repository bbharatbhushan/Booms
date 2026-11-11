import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.022);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Subtle ambient & directional lights
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x60a5fa, 2.0); // Cool sky blue key light
    keyLight.position.set(10, 12, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.2); // Cool cyan rim light
    rimLight.position.set(-12, -8, -6);
    scene.add(rimLight);

    // Procedural 3D Subjects (Prisms, Rings, Tech Floating Cubes)
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // 1. Central floating wireframe knot
    const knotGeom = new THREE.TorusKnotGeometry(3.2, 0.7, 90, 16);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.85,
      wireframe: true,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.25,
    });
    const knotMesh = new THREE.Mesh(knotGeom, knotMat);
    knotMesh.position.set(6, 1, -4);
    objectsGroup.add(knotMesh);

    // 2. Secondary geometric prism (#0F172A deep slate structure)
    const icosaGeom = new THREE.IcosahedronGeometry(2.4, 0);
    const icosaMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.25,
      metalness: 0.9,
      wireframe: true,
      emissive: 0x1e293b,
      emissiveIntensity: 0.45,
    });
    const icosaMesh = new THREE.Mesh(icosaGeom, icosaMat);
    icosaMesh.position.set(-7, -3, -2);
    objectsGroup.add(icosaMesh);

    // 3. Floating particle constellation (Zero texture dependency, pure Math BufferGeometry)
    const particleCount = isSoftwareGl ? 150 : 380;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const colorIndigo = new THREE.Color(0x60a5fa);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 45;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 35;

      const pickColor = Math.random() > 0.6 ? colorIndigo : Math.random() > 0.3 ? colorCyan : colorWhite;
      particleColors[i * 3] = pickColor.r;
      particleColors[i * 3 + 1] = pickColor.g;
      particleColors[i * 3 + 2] = pickColor.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    objectsGroup.add(particleSystem);

    // Ground plane horizon grid (#0F172A accent)
    const gridHelper = new THREE.GridHelper(60, 40, 0x0f172a, 0x1e293b);
    gridHelper.position.y = -10;
    gridHelper.material.opacity = 0.35;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Interaction & Scroll State
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraY = 0;
    let targetCameraX = 0;
    let scrollY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Animation Loop with Software-WebGL pacing guard
    let frameId = 0;
    let isRunning = true;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      gl.flush();
      const poll = () => {
        if (!isRunning) return;
        const state = sync && gl.getSyncParameter ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.ALREADY_SIGNALED;
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 10);
        } else {
          if (sync && gl.deleteSync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 60);
        }
      };
      frameId = window.setTimeout(poll, 10);
    }

    const animate = () => {
      if (!isRunning) return;
      const delta = Math.min(clock.getDelta(), 0.1);

      // Rotate 3D geometrical subjects smoothly
      knotMesh.rotation.x += delta * 0.15;
      knotMesh.rotation.y += delta * 0.22;

      icosaMesh.rotation.x += delta * 0.18;
      icosaMesh.rotation.z += delta * 0.12;

      particleSystem.rotation.y += delta * 0.03;

      // Dynamic 3D Camera parallax based on scroll & mouse
      const scrollFactor = scrollY * 0.005;
      targetCameraX = mouseX * 2.5;
      targetCameraY = -scrollFactor + (mouseY * 1.5);

      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, -scrollFactor * 0.5, 0);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      isRunning = false;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);

      // Clean disposal
      knotGeom.dispose();
      knotMat.dispose();
      icosaGeom.dispose();
      icosaMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
};
