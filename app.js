import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import {gsap} from 'https://cdn.skypack.dev/gsap';

// دوربین و صحنه
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 13;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// نورپردازی
scene.add(new THREE.AmbientLight(0xffffff, 1.3));
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

// متغیرها
let bee, mixer;
const clock = new THREE.Clock();
const mouseVec2 = new THREE.Vector2();

// موقعیت مدل در سکشن‌ها
const arrPositionModel = [{id: 'banner', position: {x: 0, y: -1, z: 0}, rotation: {x: 0, y: 1.5, z: 0}}, {
    id: 'intro',
    position: {x: 1, y: -1, z: -5},
    rotation: {x: 0.5, y: -0.5, z: 0}
}, {id: 'description', position: {x: -1, y: -1, z: -5}, rotation: {x: 0, y: 0.5, z: 0}}, {
    id: 'contact',
    position: {x: 0.8, y: -1, z: 0},
    rotation: {x: 0.3, y: -0.5, z: 0}
},];

// بارگذاری مدل زنبور
const loader = new GLTFLoader();
loader.load('/demon_bee_full_texture.glb', function (gltf) {
    bee = gltf.scene;
    scene.add(bee);

    mixer = new THREE.AnimationMixer(bee);
    mixer.clipAction(gltf.animations[0]).play();

    modelMove();
    // بعد از لود مدل، صدا به bee متصل می‌شه
    bee.add(beeSound);
}, undefined, function (error) {
    console.error('GLB load error:', error);
});

// حرکت مدل بر اساس اسکرول
const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });

    const position_active = arrPositionModel.findIndex(val => val.id === currentSection);
    if (position_active >= 0) {
        const target = arrPositionModel[position_active];
        gsap.to(bee.position, {...target.position, duration: 3, ease: "power1.out"});
        gsap.to(bee.rotation, {...target.rotation, duration: 3, ease: "power1.out"});
    }
};

// کنترل موس
window.addEventListener('mousemove', (event) => {
    mouseVec2.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseVec2.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// صداها
const listener = new THREE.AudioListener();
camera.add(listener);

const beeSound = new THREE.PositionalAudio(listener); // سه‌بعدی
const natureSound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();

// بارگذاری صدای زنبور
audioLoader.load('/bee.mp3', function (buffer) {
    beeSound.setBuffer(buffer);
    beeSound.setLoop(true);
    beeSound.setRefDistance(1);
    beeSound.setVolume(0.5);
});

// بارگذاری صدای طبیعت
audioLoader.load('/nature.mp3', function (buffer) {
    natureSound.setBuffer(buffer);
    natureSound.setLoop(true);
    natureSound.setVolume(0.6);
    natureSound.play();
});
scene.add(natureSound);


// حلقه رندر و تعامل
const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if (mixer) mixer.update(0.02);

    if (bee) {
        // چرخش ملایم فقط محور X
        const maxTiltX = 0.3;
        const targetRotX = mouseVec2.y * maxTiltX;
        gsap.to(bee.rotation, {
            x: targetRotX, duration: 0.6, ease: "power2.out"
        });

        // تمایل موقعیت به سمت موس
        const followStrength = 0.1;
        const targetX = THREE.MathUtils.lerp(bee.position.x, mouseVec2.x * 2, followStrength);
        const targetY = THREE.MathUtils.lerp(bee.position.y, mouseVec2.y * 1.5, followStrength);

        gsap.to(bee.position, {
            x: targetX, y: targetY, duration: 1.2, ease: "power1.out"
        });
    }

};
reRender3D();

// رویدادهای عمومی
window.addEventListener('scroll', () => {
    if (bee) modelMove();
});
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
const enableSoundOnce = () => {
    if (beeSound && !beeSound.isPlaying) {
        beeSound.play();
    }
    if (natureSound && !natureSound.isPlaying) {
        natureSound.play();
    }
    window.removeEventListener('click', enableSoundOnce);
    window.removeEventListener('touchstart', enableSoundOnce);
};

window.addEventListener('click', enableSoundOnce);
window.addEventListener('touchstart', enableSoundOnce);
