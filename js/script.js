// ================= INTERACTIVE GALLERY =================
const planetDetails = {
    Sun: 'The Sun is the star at the center of our Solar System. It supplies the energy that powers weather, climate, and life on Earth.',
    Moon: 'Earth’s Moon is a rocky satellite that influences tides and provides the first site of human exploration beyond our planet.',
    Earth: 'Earth is the only known world with liquid water on the surface and a complex biosphere shaped by its atmosphere and magnetic field.',
    Mars: 'Mars is a cold desert world with the tallest volcano and deepest canyon in the solar system, and it remains a target for human exploration.',
    Mercury: 'Mercury is the smallest planet and the closest to the Sun, with dramatic temperature swings and a cratered surface.',
    Venus: 'Venus is a scorching world with thick clouds and runaway greenhouse heating, making it Earth’s twin in size but not in conditions.',
    Jupiter: 'Jupiter is the largest planet, a gas giant with a powerful magnetic field and dozens of moons, including the volcanic Io.',
    Saturn: 'Saturn is famous for its bright rings and many icy moons, with a low density that would float in water if a giant bathtub existed.',
    Uranus: 'Uranus is an ice giant tipped on its side, surrounded by faint rings and a cold atmosphere of hydrogen, helium, and methane.',
    Neptune: 'Neptune is a distant blue world with supersonic winds and the strongest storms of any planet in the Solar System.'
};

const galleryEntries = document.querySelectorAll('.gallery-entry');
const galleryDetailPanel = document.getElementById('gallery-detail-panel');

function updateGalleryDetail(objectKey) {
    const description = planetDetails[objectKey] || 'Select a planet to view its terminal record.';
    if (galleryDetailPanel) {
        galleryDetailPanel.innerHTML = `<h4>${objectKey} DATA FILE</h4><p>${description}</p>`;
    }
}

galleryEntries.forEach(entry => {
    entry.addEventListener('click', event => {
        event.preventDefault();
        const objectKey = entry.dataset.object;
        updateGalleryDetail(objectKey);
        galleryEntries.forEach(item => item.classList.remove('active-entry'));
        entry.classList.add('active-entry');
    });
});

if (galleryEntries.length > 0) {
    updateGalleryDetail(galleryEntries[0].dataset.object);
}

const moduleInfo = {
    'Orbital Mechanics': {
        description: 'Orbital mechanics explains how gravity and motion balance to keep spacecraft in orbit. It is the foundation of satellite navigation, launch windows, and course corrections.',
        details: [
            'Velocity and altitude determine whether a craft remains in orbit, falls back to Earth, or escapes into space.',
            'Important concepts include orbital period, eccentricity, inclination, and transfer burns.',
            'Understanding orbital mechanics is essential for mission planning, rendezvous, and interplanetary travel.'
        ]
    },
    'Planetary Systems': {
        description: 'Planetary systems are made up of planets, moons, rings, asteroids, and the central star. Each system reveals how gravity shapes worlds and their orbits.',
        details: [
            'The solar system includes terrestrial planets, gas giants, ice giants, dwarf planets, and thousands of small bodies.',
            'Atmospheres, magnetic fields, and geological activity vary widely between worlds.',
            'Exoplanet research shows that planetary systems can be very different from our own.'
            ]
    },
    'Human Spaceflight': {
        description: 'Human spaceflight covers the technology, training, and risks involved in sending people beyond Earth. This includes crewed rockets, life support, and mission control.',
        details: [
            'Crewed missions require rigorous safety systems for launch, orbit, re-entry, and landing.',
            'Astronaut training focuses on microgravity adaptation, spacecraft operations, and emergency response.',
            'Modern programs like Artemis aim to return humans to the Moon and prepare for Mars exploration.'
        ]
    }
};

const moduleModal = document.getElementById('module-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalDetails = document.getElementById('modal-details');
const modalCloseButton = document.querySelector('.modal-close');
const moduleCards = document.querySelectorAll('.module-card');

function renderModalDetails(moduleKey) {
    const moduleData = moduleInfo[moduleKey];
    if (!moduleData || !moduleModal) return;

    modalTitle.textContent = moduleKey;
    modalDescription.textContent = moduleData.description;
    modalDetails.innerHTML = moduleData.details.map(detail => `<li>${detail}</li>`).join('');
    moduleModal.classList.add('visible');
}

function closeModal() {
    if (moduleModal) {
        moduleModal.classList.remove('visible');
    }
}

moduleCards.forEach(card => {
    const moduleKey = card.dataset.module;
    card.addEventListener('click', () => renderModalDetails(moduleKey));
    card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            renderModalDetails(moduleKey);
        }
    });
});

if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeModal);
}

if (moduleModal) {
    moduleModal.addEventListener('click', event => {
        if (event.target === moduleModal) {
            closeModal();
        }
    });
}

window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// ================= LIFECYCLE INFO PANELS =================
// Removed - now using separate pages

console.log('%c> SPACE_HACKER_TERMINAL v2.0 ONLINE', 'color:#00ff00;font-weight:bold;text-shadow:0 0 10px #00ff00');
console.log('%c> Access Level: PUBLIC', 'color:#00ff00');
console.log('%c> [SYSTEM READY]', 'color:#00ff00;font-weight:bold');

// ================= NUMERIC DATA STREAM MATRIX EFFECT =================
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.ceil(canvas.width / 20);
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * canvas.height;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = '16px Courier New';
        ctx.globalAlpha = 0.6;

        for (let i = 0; i < drops.length; i++) {
            const text = Math.random() > 0.5 ? '0' : '1';
            ctx.fillText(text, i * 20, drops[i]);
            
            if (drops[i] > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i] += 20;
        }
        ctx.globalAlpha = 1;
    }

    function animate() {
        drawMatrix();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

