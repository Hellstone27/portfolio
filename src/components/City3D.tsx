import { useRef, useEffect } from "react";
import * as THREE from "three";

const City3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationIdRef = useRef<number>(0);

  // Mouse position tracking
  const mouseRef = useRef({ x: 0, y: 0 });

  // Create city buildings
  const createBuildings = () => {
    const buildings: THREE.Mesh[] = [];

    // Create buildings like in CodePen - more random and sparse with varied shapes
    for (let i = 1; i < 100; i++) {
      const buildingGroup = new THREE.Group();

      // Main building base
      const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

      // Create dark material like CodePen buildings with more dispersed reflectivity
      const material = new THREE.MeshStandardMaterial({
        color: 0x000000, // Black buildings like CodePen
        wireframe: false,
        roughness: 0.2, // Slightly more roughness for dispersed reflections
        metalness: 0.8, // Still metallic but not perfect mirror
        envMapIntensity: 1.5, // Reduced intensity for more even distribution
      });

      const building = new THREE.Mesh(geometry, material);

      // Add flickering red windows instead of wireframe
      const windowCount = Math.floor(Math.random() * 8) + 2; // 2-10 windows per building
      for (let w = 0; w < windowCount; w++) {
        const windowGeometry = new THREE.PlaneGeometry(0.05, 0.04); // Reduced height from 0.08 to 0.04
        const windowMaterial = new THREE.MeshStandardMaterial({
          color: 0x000000, // Black base color for "off" state
          emissive: 0x000000, // Start with black emissive (off)
          emissiveIntensity: 0.0, // Start completely off
          transparent: true,
          opacity: 0.95, // Slightly more opaque for better glow
          roughness: 0.0, // Perfect smoothness for maximum glow
          metalness: 0.0, // Non-metallic for pure emissive glow
        });

        const window = new THREE.Mesh(windowGeometry, windowMaterial);

        // Position windows on building faces
        const face = Math.floor(Math.random() * 4); // 4 faces
        const offsetX = (Math.random() - 0.5) * 0.8; // Random position on face
        const offsetY = (Math.random() - 0.5) * 0.8;

        switch (face) {
          case 0: // Front face
            window.position.set(offsetX, offsetY, 0.51);
            break;
          case 1: // Back face
            window.position.set(offsetX, offsetY, -0.51);
            window.rotation.y = Math.PI;
            break;
          case 2: // Right face
            window.position.set(0.51, offsetY, offsetX);
            window.rotation.y = Math.PI / 2;
            break;
          case 3: // Left face
            window.position.set(-0.51, offsetY, offsetX);
            window.rotation.y = -Math.PI / 2;
            break;
        }

        // Enhanced flickering animation properties with fast on/off effect
        (window.material as any).flickerSpeed = 2.0 + Math.random() * 8.0; // Much faster flicker speeds
        (window.material as any).onColor = 0xca1d49; // Color when "on"
        (window.material as any).offColor = 0x000000; // Black when "off"
        (window.material as any).onIntensity = 2.5 + Math.random() * 1.5; // Bright when on
        (window.material as any).offIntensity = 0.0; // Completely off

        building.add(window);
      }

      // Random scaling like CodePen
      const cubeWidth = 0.9;
      building.scale.x = building.scale.z =
        cubeWidth + (Math.random() - 0.5) * (1 - cubeWidth);
      building.scale.y = 0.1 + Math.abs((Math.random() - 0.5) * 16);

      building.position.y = building.scale.y / 2; // Sit properly on ground (y=0)
      building.castShadow = true;
      building.receiveShadow = true;

      buildingGroup.add(building);

      // Only 20% chance to add architectural features (reduced from 40%)
      const buildingType = Math.random();

      if (buildingType < 0.08) {
        // Add pyramid top (8% of buildings)
        const pyramidGeometry = new THREE.ConeGeometry(
          Math.min(building.scale.x, building.scale.z) * 0.6, // Smaller radius for better fit
          building.scale.y * 0.3, // Height
          4 // Segments for pyramid shape
        );
        const pyramid = new THREE.Mesh(pyramidGeometry, material);

        // Add windows to pyramid if it's large enough
        if (building.scale.y > 3) {
          const pyramidWindowCount = Math.floor(Math.random() * 3) + 1;
          for (let pw = 0; pw < pyramidWindowCount; pw++) {
            const windowGeometry = new THREE.PlaneGeometry(0.03, 0.025); // Reduced height from 0.04 to 0.025
            const windowMaterial = new THREE.MeshStandardMaterial({
              color: 0x000000, // Black base color for "off" state
              emissive: 0x000000, // Start with black emissive (off)
              emissiveIntensity: 0.0, // Start completely off
              transparent: true,
              opacity: 0.9,
              roughness: 0.0,
              metalness: 0.0,
            });

            const window = new THREE.Mesh(windowGeometry, windowMaterial);
            const face = Math.floor(Math.random() * 4);
            const height = (Math.random() - 0.5) * 0.4;

            switch (face) {
              case 0:
                window.position.set(0, height, 0.3);
                break;
              case 1:
                window.position.set(0, height, -0.3);
                window.rotation.y = Math.PI;
                break;
              case 2:
                window.position.set(0.3, height, 0);
                window.rotation.y = Math.PI / 2;
                break;
              case 3:
                window.position.set(-0.3, height, 0);
                window.rotation.y = -Math.PI / 2;
                break;
            }

            // Enhanced pyramid window flickering with fast on/off effect
            (window.material as any).flickerSpeed = 1.8 + Math.random() * 7.0; // Very fast flicker
            (window.material as any).onColor = 0xca1d49;
            (window.material as any).offColor = 0x000000;
            (window.material as any).onIntensity = 2.0 + Math.random() * 1.0;
            (window.material as any).offIntensity = 0.0;

            pyramid.add(window);
          }
        }

        // Position pyramid directly on top of the building center - properly aligned
        pyramid.position.x = building.position.x; // Match building's X position
        pyramid.position.z = building.position.z; // Match building's Z position
        pyramid.position.y =
          building.position.y +
          building.scale.y / 2 +
          (building.scale.y * 0.3) / 2;
        pyramid.castShadow = true;
        pyramid.receiveShadow = true;
        buildingGroup.add(pyramid);
      } else if (buildingType < 0.15) {
        // Add stacked smaller building on top (7% of buildings)
        const topGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2); // Same segments as main building
        const topBuilding = new THREE.Mesh(topGeometry, material);

        // Add windows to top building
        const topWindowCount = Math.floor(Math.random() * 4) + 1;
        for (let tw = 0; tw < topWindowCount; tw++) {
          const windowGeometry = new THREE.PlaneGeometry(0.04, 0.035); // Reduced height from 0.06 to 0.035
          const windowMaterial = new THREE.MeshStandardMaterial({
            color: 0x000000, // Black base color for "off" state
            emissive: 0x000000, // Start with black emissive (off)
            emissiveIntensity: 0.0, // Start completely off
            transparent: true,
            opacity: 0.95,
            roughness: 0.0,
            metalness: 0.0,
          });

          const window = new THREE.Mesh(windowGeometry, windowMaterial);
          const face = Math.floor(Math.random() * 4);
          const offsetX = (Math.random() - 0.5) * 0.6;
          const offsetY = (Math.random() - 0.5) * 0.6;

          switch (face) {
            case 0:
              window.position.set(offsetX, offsetY, 0.51);
              break;
            case 1:
              window.position.set(offsetX, offsetY, -0.51);
              window.rotation.y = Math.PI;
              break;
            case 2:
              window.position.set(0.51, offsetY, offsetX);
              window.rotation.y = Math.PI / 2;
              break;
            case 3:
              window.position.set(-0.51, offsetY, offsetX);
              window.rotation.y = -Math.PI / 2;
              break;
          }

          // Enhanced top building window flickering with fast on/off effect
          (window.material as any).flickerSpeed = 2.5 + Math.random() * 6.5; // Very fast flicker
          (window.material as any).onColor = 0xca1d49;
          (window.material as any).offColor = 0x000000;
          (window.material as any).onIntensity = 2.8 + Math.random() * 1.2;
          (window.material as any).offIntensity = 0.0;

          topBuilding.add(window);
        }

        const topHeight = building.scale.y * (0.2 + Math.random() * 0.4);
        topBuilding.scale.x = building.scale.x * 0.7; // Slightly smaller than main building
        topBuilding.scale.z = building.scale.z * 0.7;
        topBuilding.scale.y = topHeight;

        // Position directly on top with no gap - properly aligned
        topBuilding.position.x = building.position.x; // Match building's X position
        topBuilding.position.z = building.position.z; // Match building's Z position
        topBuilding.position.y =
          building.position.y + building.scale.y / 2 + topHeight / 2;
        topBuilding.castShadow = true;
        topBuilding.receiveShadow = true;
        buildingGroup.add(topBuilding);

        // 30% chance to add another smaller level (reduced from 50%)
        if (Math.random() < 0.3) {
          const top2Geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
          const top2Building = new THREE.Mesh(top2Geometry, material);

          // Add windows to second top building
          const top2WindowCount = Math.floor(Math.random() * 2) + 1;
          for (let t2w = 0; t2w < top2WindowCount; t2w++) {
            const windowGeometry = new THREE.PlaneGeometry(0.03, 0.025); // Reduced height from 0.04 to 0.025
            const windowMaterial = new THREE.MeshStandardMaterial({
              color: 0x000000, // Black base color for "off" state
              emissive: 0x000000, // Start with black emissive (off)
              emissiveIntensity: 0.0, // Start completely off
              transparent: true,
              opacity: 0.9,
              roughness: 0.0,
              metalness: 0.0,
            });

            const window = new THREE.Mesh(windowGeometry, windowMaterial);
            const face = Math.floor(Math.random() * 4);
            const offsetX = (Math.random() - 0.5) * 0.5;
            const offsetY = (Math.random() - 0.5) * 0.5;

            switch (face) {
              case 0:
                window.position.set(offsetX, offsetY, 0.51);
                break;
              case 1:
                window.position.set(offsetX, offsetY, -0.51);
                window.rotation.y = Math.PI;
                break;
              case 2:
                window.position.set(0.51, offsetY, offsetX);
                window.rotation.y = Math.PI / 2;
                break;
              case 3:
                window.position.set(-0.51, offsetY, offsetX);
                window.rotation.y = -Math.PI / 2;
                break;
            }

            // Enhanced second level window flickering with fast on/off effect
            (window.material as any).flickerSpeed = 1.5 + Math.random() * 7.5; // Fastest flicker range
            (window.material as any).onColor = 0xca1d49;
            (window.material as any).offColor = 0x000000;
            (window.material as any).onIntensity = 2.2 + Math.random() * 1.3;
            (window.material as any).offIntensity = 0.0;

            top2Building.add(window);
          }

          const top2Height = topHeight * 0.6;
          top2Building.scale.x = topBuilding.scale.x * 0.8;
          top2Building.scale.z = topBuilding.scale.z * 0.8;
          top2Building.scale.y = top2Height;

          // Position directly on top of the second building with no gap - properly aligned
          top2Building.position.x = building.position.x; // Match building's X position
          top2Building.position.z = building.position.z; // Match building's Z position
          top2Building.position.y =
            building.position.y +
            building.scale.y / 2 +
            topHeight +
            top2Height / 2;
          top2Building.castShadow = true;
          top2Building.receiveShadow = true;
          buildingGroup.add(top2Building);
        }
      } else if (buildingType < 0.2) {
        // Add antenna/spire (5% of buildings)
        const spireGeometry = new THREE.CylinderGeometry(
          0.02,
          0.05,
          building.scale.y * 0.5
        );
        const spire = new THREE.Mesh(spireGeometry, material);

        spire.position.x = building.position.x; // Match building's X position
        spire.position.z = building.position.z; // Match building's Z position
        spire.position.y =
          building.position.y +
          building.scale.y / 2 +
          (building.scale.y * 0.5) / 2;
        spire.castShadow = true;
        spire.receiveShadow = true;
        buildingGroup.add(spire);
      }
      // 80% of buildings remain as simple rectangles

      // Random positioning like CodePen
      buildingGroup.position.x = Math.round((Math.random() - 0.5) * 16);
      buildingGroup.position.z = Math.round((Math.random() - 0.5) * 16);
      buildingGroup.position.y = 0; // At ground level

      buildings.push(buildingGroup as any);
    }

    return buildings;
  };

  // Create moving light strands like CodePen
  const createMovingLines = () => {
    const lines: THREE.Mesh[] = [];

    for (let i = 0; i < 60; i++) {
      // Create thin light strands with enhanced glow
      const cMat = new THREE.MeshStandardMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 1.2, // Brighter glow
        transparent: true,
        opacity: 0.9,
        roughness: 0.0, // Perfect shine
        metalness: 0.9, // Highly metallic
      });
      const cGeo = new THREE.BoxGeometry(0.5, 0.005, 0.005); // Much thinner strands
      const cElem = new THREE.Mesh(cGeo, cMat);

      const cAmp = 4;
      const cPos = 25;

      // Random direction assignment
      const directionChoice = Math.random();

      if (directionChoice < 0.33) {
        // Horizontal movement (X direction) - bidirectional
        const moveRight = Math.random() > 0.5;
        cElem.position.x = moveRight ? -cPos : cPos;
        cElem.position.z = (Math.random() - 0.5) * cAmp;
        cElem.position.y = Math.abs((Math.random() - 0.5) * 6);
        (cElem as any).direction = "horizontal";
        (cElem as any).velocity =
          (0.05 + Math.random() * 0.15) * (moveRight ? 1 : -1); // Varied speed with direction
      } else if (directionChoice < 0.66) {
        // Vertical movement (Z direction) - bidirectional
        const moveForward = Math.random() > 0.5;
        cElem.position.x = (Math.random() - 0.5) * cAmp;
        cElem.position.z = moveForward ? -cPos : cPos;
        cElem.position.y = Math.abs((Math.random() - 0.5) * 6);
        cElem.rotation.y = (90 * Math.PI) / 180;
        (cElem as any).direction = "vertical";
        (cElem as any).velocity =
          (0.04 + Math.random() * 0.12) * (moveForward ? 1 : -1); // Varied speed with direction
      } else {
        // Diagonal movement - bidirectional
        const moveRightX = Math.random() > 0.5;
        const moveForwardZ = Math.random() > 0.5;
        cElem.position.x = moveRightX
          ? -cPos + (Math.random() - 0.5) * 10
          : cPos + (Math.random() - 0.5) * 10;
        cElem.position.z = moveForwardZ
          ? -cPos + (Math.random() - 0.5) * 10
          : cPos + (Math.random() - 0.5) * 10;
        cElem.position.y = Math.abs((Math.random() - 0.5) * 6);
        cElem.rotation.y = (45 * Math.PI) / 180; // 45 degree rotation for diagonal
        (cElem as any).direction = "diagonal";
        (cElem as any).velocityX =
          (0.03 + Math.random() * 0.1) * (moveRightX ? 1 : -1); // X speed with direction
        (cElem as any).velocityZ =
          (0.03 + Math.random() * 0.1) * (moveForwardZ ? 1 : -1); // Z speed with direction
      }

      lines.push(cElem);
    }

    return lines;
  };

  // Create particle system like CodePen
  const createParticleSystem = () => {
    const smoke = new THREE.Object3D();

    // Create yellow particles with shine
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff00, // Bright yellow like CodePen
      emissive: 0xffff00,
      emissiveIntensity: 0.8,
      side: THREE.DoubleSide,
      roughness: 0.1,
      metalness: 0.6,
    });
    const particleGeometry = new THREE.CircleGeometry(0.01, 3);

    for (let h = 1; h < 300; h++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      const aparticular = 5;
      particle.position.set(
        (Math.random() - 0.5) * aparticular,
        (Math.random() - 0.5) * aparticular,
        (Math.random() - 0.5) * aparticular
      );
      particle.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      smoke.add(particle);
    }

    smoke.position.y = 2;
    return smoke;
  };

  // Create solid ground plane with more dispersed shine
  const createGroundPlane = () => {
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111, // Slightly lighter for better light distribution
      roughness: 0.3, // More roughness for dispersed reflections
      metalness: 0.7, // Still reflective but not perfect mirror
      opacity: 1.0, // Fully solid
      transparent: false,
      envMapIntensity: 2.0, // Reduced for more even distribution
      emissive: 0x050505, // Subtle self-illumination
      emissiveIntensity: 0.1, // Gentle glow
    });
    const groundGeometry = new THREE.PlaneGeometry(100, 100); // Larger and more solid
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = (-90 * Math.PI) / 180;
    ground.position.y = 0; // At ground level
    ground.receiveShadow = true;
    return ground;
  };

  // Create ground grid to match solid base
  const createGroundGrid = () => {
    const size = 100; // Match the larger ground plane
    const divisions = 200; // More divisions for finer grid
    const grid = new THREE.GridHelper(size, divisions, 0xff3333, 0x661111); // Brighter red with reflective minor lines
    grid.material.opacity = 0.6; // More visible
    grid.material.transparent = true;
    grid.position.y = 0.002; // Just above ground to avoid z-fighting
    return grid;
  };

  // Animation function
  const animate = () => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;

    // Mouse-based camera movement like typical CodePen examples
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    // Calculate camera position based on mouse - typical orbiting camera
    const theta = mouseX * Math.PI; // Horizontal angle
    const phi = Math.max(0.2, Math.min(0.8, mouseY * 0.3 + 0.5)) * Math.PI; // Restricted vertical angle - prevent going below base

    const radius = 20; // Distance from center
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = Math.max(2, radius * Math.cos(phi) + 3); // Minimum Y of 2 to stay above base

    // Smooth camera movement
    cameraRef.current.position.x += (x - cameraRef.current.position.x) * 0.05;
    cameraRef.current.position.y += (y - cameraRef.current.position.y) * 0.05;
    cameraRef.current.position.z += (z - cameraRef.current.position.z) * 0.05;

    // Always look at the center of the city
    cameraRef.current.lookAt(new THREE.Vector3(0, 3, 0));

    // Animate moving lines and flickering windows
    sceneRef.current.traverse((child) => {
      // Animate moving light strands
      if (
        child instanceof THREE.Mesh &&
        (child as any).direction &&
        (child as any).velocity
      ) {
        const direction = (child as any).direction;

        if (direction === "horizontal") {
          const velocity = (child as any).velocity;
          child.position.x += velocity;
          if (velocity > 0 && child.position.x > 25) child.position.x = -25;
          if (velocity < 0 && child.position.x < -25) child.position.x = 25;
        } else if (direction === "vertical") {
          const velocity = (child as any).velocity;
          child.position.z += velocity;
          if (velocity > 0 && child.position.z > 25) child.position.z = -25;
          if (velocity < 0 && child.position.z < -25) child.position.z = 25;
        } else if (direction === "diagonal") {
          const velocityX = (child as any).velocityX;
          const velocityZ = (child as any).velocityZ;
          child.position.x += velocityX;
          child.position.z += velocityZ;

          // Reset position when out of bounds
          if (child.position.x > 25) child.position.x = -25;
          if (child.position.z > 25) child.position.z = -25;
          if (child.position.x < -25) child.position.x = 25;
          if (child.position.z < -25) child.position.z = 25;
        }
      }

      // Animate flickering windows with on/off effect
      if (
        child instanceof THREE.Mesh &&
        child.material &&
        (child.material as any).flickerSpeed
      ) {
        const material = child.material as any;
        const time = Date.now() * 0.001;

        // Create sharp on/off transitions using step function
        const flickerValue = Math.sin(time * material.flickerSpeed);
        const isOn = flickerValue > 0; // On when sine is positive, off when negative

        if (isOn) {
          // Window is "on" - show the color and glow
          material.emissive.setHex(material.onColor);
          material.emissiveIntensity = material.onIntensity;
        } else {
          // Window is "off" - completely black
          material.emissive.setHex(material.offColor);
          material.emissiveIntensity = material.offIntensity;
        }
      }
    });

    // NO rotation animations - particles stay static

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const containerRect = container.getBoundingClientRect();

    // Scene setup
    const scene = new THREE.Scene();

    // Exact fog settings from CodePen - slightly less dense
    const fogColor = "#4a4a4a";
    scene.background = new THREE.Color(fogColor);
    scene.fog = new THREE.Fog(fogColor, 12, 18); // Slightly less dense fog
    sceneRef.current = scene;

    // Camera setup - closer to CodePen settings
    const camera = new THREE.PerspectiveCamera(
      35, // Slightly wider field of view for better visibility
      containerRect.width / containerRect.height,
      1,
      500 // Match CodePen far plane
    );
    camera.position.set(0, 5, 20); // Better viewing position
    cameraRef.current = camera;

    // Renderer setup with enhanced lighting support
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(containerRect.width, containerRect.height);
    renderer.setClearColor(fogColor, 1.0); // Use the same fog color for background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Enable tone mapping for better dispersed lighting effects
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.5; // Increased exposure to make emissive glow more visible
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Enable additional rendering features for better reflections
    renderer.shadowMap.autoUpdate = true;

    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Create environment cube map for reflections
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const envMap = cubeTextureLoader.load([
      // Use the fog color as a simple environment map for reflections
      "data:image/svg+xml;base64," +
        btoa(
          `<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="#f02050"/></svg>`
        ),
      "data:image/svg+xml;base64," +
        btoa(
          `<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="#f02050"/></svg>`
        ),
      "data:image/svg+xml;base64=" +
        btoa(
          `<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="#ffffff"/></svg>`
        ),
      "data:image/svg+xml;base64=" +
        btoa(
          `<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="#000000"/></svg>`
        ),
      "data:image/svg+xml;base64=" +
        btoa(
          `<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="#f02050"/></svg>`
        ),
      "data:image/svg+xml;base64=" +
        btoa(
          `<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="#f02050"/></svg>`
        ),
    ]);

    scene.environment = envMap;

    // Enhanced lighting system for dispersed reflections across all surfaces
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Higher ambient for more even illumination
    scene.add(ambientLight);

    // Create a grid of point lights for even distribution
    const lightIntensity = 6; // Lower individual intensity for more dispersed effect
    const lightDistance = 90;

    // Top layer lights - high altitude for wide coverage
    const topLights = [];
    for (let x = -20; x <= 20; x += 20) {
      for (let z = -20; z <= 20; z += 20) {
        const light = new THREE.PointLight(
          0xffffff,
          lightIntensity,
          lightDistance
        );
        light.position.set(x, 35, z);
        if (x === 0 && z === 0) {
          light.castShadow = true;
          light.shadow.mapSize.width = 2048;
          light.shadow.mapSize.height = 2048;
        }
        scene.add(light);
        topLights.push(light);
      }
    }

    // Mid layer lights - medium altitude for building sides
    const midLights = [];
    for (let x = -15; x <= 15; x += 15) {
      for (let z = -15; z <= 15; z += 15) {
        const light = new THREE.PointLight(
          0xffffff,
          lightIntensity * 0.8,
          lightDistance * 0.8
        );
        light.position.set(x, 20, z);
        scene.add(light);
        midLights.push(light);
      }
    }

    // Low layer lights - for base and lower building illumination
    const lowLights = [];
    for (let x = -10; x <= 10; x += 10) {
      for (let z = -10; z <= 10; z += 10) {
        const light = new THREE.PointLight(
          0xffffff,
          lightIntensity * 0.6,
          lightDistance * 0.6
        );
        light.position.set(x, 8, z);
        scene.add(light);
        lowLights.push(light);
      }
    }

    // Additional scattered lights for more surface coverage
    const scatteredPositions = [
      [25, 15, 0],
      [-25, 15, 0],
      [0, 15, 25],
      [0, 15, -25],
      [18, 12, 18],
      [-18, 12, 18],
      [18, 12, -18],
      [-18, 12, -18],
      [30, 18, 15],
      [-30, 18, 15],
      [15, 18, 30],
      [15, 18, -30],
    ];

    scatteredPositions.forEach(([x, y, z]) => {
      const light = new THREE.PointLight(
        0xffffff,
        lightIntensity * 0.7,
        lightDistance * 0.7
      );
      light.position.set(x, y, z);
      scene.add(light);
    });

    // Add city elements directly to scene
    const buildings = createBuildings();
    buildings.forEach((building) => scene.add(building));

    const movingLines = createMovingLines();
    movingLines.forEach((line) => scene.add(line));

    const particles = createParticleSystem();
    scene.add(particles);

    const ground = createGroundPlane();
    scene.add(ground);

    const grid = createGroundGrid();
    scene.add(grid);

    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer || !mountRef.current) return;
      const containerRect = mountRef.current.getBoundingClientRect();
      camera.aspect = containerRect.width / containerRect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRect.width, containerRect.height);
    };

    // Handle mouse movement within hero section only
    const handleMouseMove = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      // Find the hero section (parent of hero-background)
      const heroSection = container.closest(".hero");
      if (!heroSection) return;

      const heroRect = heroSection.getBoundingClientRect();

      // Calculate mouse position relative to the hero section (simpler calculation)
      const x =
        ((mouseEvent.clientX - heroRect.left) / heroRect.width - 0.5) * 2;
      const y =
        ((mouseEvent.clientY - heroRect.top) / heroRect.height - 0.5) * 2;

      mouseRef.current = { x, y };
    };

    // Handle mouse leave to reset position
    const handleMouseLeave = () => {
      // Gradually return to center when mouse leaves
      mouseRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("resize", handleResize);

    // Add event listeners to the hero section instead of the 3D container
    const heroSection = container.closest(".hero");
    if (heroSection) {
      heroSection.addEventListener("mousemove", handleMouseMove);
      heroSection.addEventListener("mouseleave", handleMouseLeave);
    }

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      const heroSection = container.closest(".hero");
      if (heroSection) {
        heroSection.removeEventListener("mousemove", handleMouseMove);
        heroSection.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none", // Back to none since hero section handles events
      }}
    />
  );
};

export default City3D;
