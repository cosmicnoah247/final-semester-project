# Space Odyssey

An interactive Wix-like website exploring space objects with hacker-themed transitions and scroll-triggered reveals.

## Features

- **Welcome Page**: Introduction to the journey.
- **Hacker Transitions**: Matrix-style background with falling green characters, animated text formation.
- **Interactive Objects**: Click through 5 space objects (Earth, Moon, Sun, Mars, Milky Way) with facts and lifespan info.
- **Navigation**: Left/right buttons for browsing objects, with progress counter.
- **Scroll Triggers**: Scroll down to start the experience.
- **End Screen**: Completion message with restart option.

## How to Run

1. Open `index.html` in your web browser.
2. Scroll down to begin.
3. Follow the on-screen instructions to explore.

For a local server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Technologies

- HTML5
- CSS3 (animations, matrix canvas)
- JavaScript (canvas for matrix, text animation, scroll/click events)

## Customization 
```md
## Timeline – Space Exploration
```text

4.6 B.Y.
    Solar System forms from a spinning solar nebula around the new Sun.

1054
    The Crab Nebula supernova was observed and recorded by astronomers
    in the sky.

1967
    First pulsar discovered; a rotating neutron star emitting regular
    radio pulses.

1967
    Gamma-ray bursts first detected as intense, brief flashes of
    high-energy radiation.

1971
    First strong black hole candidate identified, confirming compact
    gravity wells.

2017
    First kilonova observed as colliding neutron stars produced
    gravitational waves and light.
   ---




- Edit `js/script.js` to change objects or animations.
- Modify `css/styles.css` for styling.
- Add images to `images/` and update paths.

