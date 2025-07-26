// Particle.js configuration
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 123, 255, 0.1)';
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// GSAP animations
function initGSAPAnimations() {
    // Check if GSAP is available
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.from('.hero-section h1', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-section .subtitle', {
            duration: 1.5,
            y: 30,
            opacity: 0,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        // Timeline animations
        gsap.utils.toArray('.timeline-item').forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                x: index % 2 === 0 ? -50 : 50,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
        });
    }
}

// AOS (Animate On Scroll) initialization
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
}

// Three.js 3D animations
function init3DAnimation() {
    if (typeof THREE !== 'undefined') {
        const container = document.getElementById('three-container');
        if (!container) return;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        // Add 3D objects here
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x007bff, wireframe: true });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        
        camera.position.z = 5;
        
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        
        animate();
    }
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initGSAPAnimations();
    initAOS();
    init3DAnimation();
});