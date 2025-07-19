# 🐝 3D Bee Interaction

An interactive and visually engaging 3D bee animation built with [Three.js](https://threejs.org/), [GSAP](https://greensock.com/gsap/), and Web Audio API.  
The bee reacts to scrolling, mouse movements, and fills the environment with immersive sound.  

> A joyful blend of animation, motion, and code — perfect for learning and inspiration.

---

## 🚀 Demo

🌐 [Live Preview](#)  
*(Replace this with your GitHub Pages or Netlify link if deployed)*

---

## ✨ Features

- 🎞️ GLTF-based animated bee model
- 🧭 Scroll-based transitions between content sections
- 🐭 Mouse-based directional response (tilts gently on the X-axis)
- 🔊 Realistic bee buzzing and ambient nature sound
- 🌐 Responsive layout and smooth rendering with WebGL
- 🔁 Auto animation using `AnimationMixer`

---

## 📦 Technologies Used

- [Three.js](https://threejs.org/) — for 3D rendering
- [GSAP](https://greensock.com/gsap/) — for smooth transitions
- [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) — for loading 3D models
- Web Audio API — for ambient and spatial sound

---

---

## 🧠 How It Works

- The 3D bee model is loaded via `GLTFLoader`, and animated using `AnimationMixer`.
- Scroll position determines the bee’s location and orientation between content sections.
- Mouse movement adjusts the bee’s X-axis rotation to simulate attention.
- Sound is managed using `THREE.PositionalAudio` and `THREE.AudioListener` — one for the bee and one ambient.

---

## 🎥 Demo Video


https://github.com/user-attachments/assets/d531b62c-d4ec-42eb-8d19-821ce80e27c8





