// ================= 3D SPACE EXPLORATION GAME =================
const container = document.getElementById('viewer-container');
const playButton = document.getElementById('play-button');
const optionsButton = document.getElementById('options-button');
const navigationMenu = document.getElementById('navigation-menu');
const navItems = document.querySelectorAll('.nav-item');

if (container) {
    // Scene, camera, renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    container.appendChild(renderer.domElement);

    // Realistic Lighting - Sun as main light source
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.15); // Very dim ambient for realism
    scene.add(ambientLight);
    
    const sunLight = new THREE.PointLight(0xffffff, 3.5, 5000); // Very bright sun
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 5000;
    scene.add(sunLight);

    // Texture loader
    const textureLoader = new THREE.TextureLoader();

    // Procedural starfield - enhanced
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 25000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 12000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12000;
        
        // Realistic star colors
        const starType = Math.random();
        if (starType < 0.3) { // Blue stars
            colors[i * 3] = 0.3 + Math.random() * 0.4;
            colors[i * 3 + 1] = 0.5 + Math.random() * 0.5;
            colors[i * 3 + 2] = 1.0;
        } else if (starType < 0.7) { // White stars
            const brightness = 0.8 + Math.random() * 0.2;
            colors[i * 3] = brightness;
            colors[i * 3 + 1] = brightness;
            colors[i * 3 + 2] = brightness;
        } else { // Red/yellow stars
            colors[i * 3] = 1.0;
            colors[i * 3 + 1] = 0.5 + Math.random() * 0.5;
            colors[i * 3 + 2] = 0.1 + Math.random() * 0.2;
        }
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const starMaterial = new THREE.PointsMaterial({ size: 2.5, vertexColors: true, sizeAttenuation: true });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Milky Way background - deep space
    const milkyWayGeometry = new THREE.SphereGeometry(6000, 128, 64);
    const milkyWayMaterial = new THREE.MeshBasicMaterial({
        color: 0x0a0a1f,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.5
    });
    const milkyWay = new THREE.Mesh(milkyWayGeometry, milkyWayMaterial);
    scene.add(milkyWay);

    // Sun with realistic glow
    const sunGeometry = new THREE.SphereGeometry(5, 64, 64);
    const sunTexture = textureLoader.load('https://threejs.org/examples/textures/planets/sun.jpg');
    const sunMaterial = new THREE.MeshBasicMaterial({ 
        map: sunTexture, 
        emissive: 0xffff00, 
        emissiveIntensity: 1.2
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, 0);
    sunLight.position.copy(sun.position);
    scene.add(sun);

    // Planets with realistic lighting and shadows
    const planetsData = [
        { name: 'Mercury', pos: [20, 0, 0], size: 0.8, texture: 'https://threejs.org/examples/textures/planets/mercury.jpg' },
        { name: 'Venus', pos: [30, 0, 0], size: 1, texture: 'https://threejs.org/examples/textures/planets/venus.jpg' },
        { name: 'Earth', pos: [40, 0, 0], size: 1, texture: 'https://threejs.org/examples/textures/planets/earth.jpg' },
        { name: 'Mars', pos: [50, 0, 0], size: 0.9, texture: 'https://threejs.org/examples/textures/planets/mars.jpg' },
        { name: 'Jupiter', pos: [80, 0, 0], size: 3, texture: 'https://threejs.org/examples/textures/planets/jupiter.jpg' },
        { name: 'Saturn', pos: [110, 0, 0], size: 2.5, texture: 'https://threejs.org/examples/textures/planets/saturn.jpg', rings: true },
        { name: 'Uranus', pos: [140, 0, 0], size: 1.5, texture: 'https://threejs.org/examples/textures/planets/uranus.jpg' },
        { name: 'Neptune', pos: [170, 0, 0], size: 1.5, texture: 'https://threejs.org/examples/textures/planets/neptune.jpg' }
    ];

    const planets = {};
    planetsData.forEach(data => {
        const geometry = new THREE.SphereGeometry(data.size, 64, 64);
        const texture = textureLoader.load(data.texture);
        const material = new THREE.MeshPhongMaterial({ 
            map: texture,
            emissive: 0x000000,
            emissiveIntensity: 0,
            shininess: 5
        });
        const planet = new THREE.Mesh(geometry, material);
        planet.castShadow = true;
        planet.receiveShadow = true;
        planet.position.set(...data.pos);
        
        if (data.rings) {
            const ringGeometry = new THREE.RingGeometry(data.size * 1.2, data.size * 3, 64);
            const ringTexture = textureLoader.load('https://threejs.org/examples/textures/planets/saturn_ring_alpha.png');
            const ringMaterial = new THREE.MeshBasicMaterial({ 
                map: ringTexture, 
                side: THREE.DoubleSide, 
                transparent: true 
            });
            const rings = new THREE.Mesh(ringGeometry, ringMaterial);
            rings.receiveShadow = true;
            rings.rotation.x = Math.PI / 2;
            planet.add(rings);
        }
        scene.add(planet);
        planets[data.name] = planet;
    });

    // Destinations
    const destinations = {
        'solar-system.html': new THREE.Vector3(0, 10, 100),
        'pulsars.html': new THREE.Vector3(200, 0, 0),
        'gamma-ray-bursts.html': new THREE.Vector3(-200, 0, 0),
        'black-holes.html': new THREE.Vector3(0, 200, 0),
        'supernova.html': new THREE.Vector3(0, -200, 0),
        'kilonova.html': new THREE.Vector3(200, 200, 0),
        'dark-matter.html': new THREE.Vector3(-200, -200, 0),
        'dark-energy.html': new THREE.Vector3(0, 0, -300),
        'supermassive-black-holes.html': new THREE.Vector3(300, 0, 0)
    };

    // Camera initial position
    camera.position.set(0, 30, 100);
    camera.lookAt(0, 0, 0);

    // Mouse controls for zoom and rotation
    let mouseDown = false;
    let mouseX = 0, mouseY = 0;
    let cameraDistance = 100;
    let cameraAngleX = 0;
    let cameraAngleY = 0.3;

    container.addEventListener('mousedown', (e) => {
        mouseDown = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    container.addEventListener('mousemove', (e) => {
        if (!mouseDown) return;
        const deltaX = e.clientX - mouseX;
        const deltaY = e.clientY - mouseY;
        cameraAngleY += deltaX * 0.005;
        cameraAngleX += deltaY * 0.005;
        cameraAngleX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraAngleX));
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    container.addEventListener('mouseup', () => {
        mouseDown = false;
    });

    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        cameraDistance += e.deltaY * 0.1;
        cameraDistance = Math.max(10, Math.min(500, cameraDistance));
    });

    let warping = false;
    let warpSpeed = 0;
    let autoPilot = false;
    let targetPosition = null;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Planet rotations
        Object.values(planets).forEach(planet => {
            planet.rotation.y += 0.005;
        });
        sun.rotation.y += 0.002;

        // Update camera position based on mouse controls
        if (!autoPilot && !warping) {
            const x = Math.sin(cameraAngleY) * Math.cos(cameraAngleX);
            const y = Math.sin(cameraAngleX);
            const z = Math.cos(cameraAngleY) * Math.cos(cameraAngleX);
            camera.position.set(x * cameraDistance, y * cameraDistance, z * cameraDistance);
            camera.lookAt(0, 0, 0);
        }

        if (warping) {
            warpSpeed = Math.min(warpSpeed + 0.1, 50);
            stars.position.z += warpSpeed * 0.5; // Streaking effect
        } else {
            warpSpeed = Math.max(warpSpeed - 0.1, 0);
        }

        // Auto-pilot to destinations
        if (autoPilot && targetPosition) {
            const direction = targetPosition.clone().sub(camera.position).normalize();
            camera.position.add(direction.multiplyScalar(2));
            if (camera.position.distanceTo(targetPosition) < 5) {
                autoPilot = false;
                warping = false;
            }
        }

        renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Full screen
    playButton.addEventListener('click', () => {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        }
    });

    // Menu toggle
    optionsButton.addEventListener('click', () => {
        navigationMenu.style.display = navigationMenu.style.display === 'none' ? 'block' : 'none';
    });

    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const destination = item.dataset.destination;
            startAutoPilot(destination);
        });
    });

    function startAutoPilot(destination) {
        targetPosition = destinations[destination];
        autoPilot = true;
        warping = true;
        warpSpeed = 10;
        navigationMenu.style.display = 'none';
        setTimeout(() => {
            window.location.href = destination;
        }, 5000);
    }
}
