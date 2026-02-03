/* ===========================================
   HEADER DINAMICO - Otimizado
   =========================================== */

(function() {
    'use strict';

    // Criar header
    const header = document.createElement('header');
    header.id = 'dynamic-header';
    header.innerHTML = `
        <div class="header-content">
            <div class="header-left">
                <h1 class="header-title">Timeline de Carreira</h1>
            </div>
            <div class="header-right">
                <h2 class="header-name">Pedro Marconato</h2>
                <p class="header-role">Especialista em analytics</p>
            </div>
        </div>
        <canvas id="header-canvas"></canvas>
    `;

    // Inserir antes do primeiro elemento
    document.body.insertBefore(header, document.body.firstChild);

    // Estilos otimizados
    const style = document.createElement('style');
    style.textContent = `
        #dynamic-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: var(--header-height, 15vh);
            min-height: var(--header-min-height, 120px);
            background: var(--azul-marinho, #011E38);
            z-index: 100;
            overflow: hidden;
        }

        #header-canvas {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            opacity: 0.6;
        }

        .header-content {
            position: relative;
            z-index: 2;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 5% 0 8%;
        }

        .header-left {
            flex-shrink: 0;
        }

        .header-right {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.3rem;
        }

        .header-title {
            font-family: var(--font-primary, 'IBM Plex Sans', sans-serif);
            font-weight: 500;
            font-size: clamp(1.5rem, 4vw, 3rem);
            color: #e6b482;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            line-height: 1;
        }

        .header-title::after {
            content: '';
            display: block;
            width: 60px;
            height: 3px;
            background: #e6b482;
            margin-top: 8px;
            opacity: 0.7;
        }

        .header-name {
            font-family: var(--font-primary, 'IBM Plex Sans', sans-serif);
            font-weight: 500;
            font-size: clamp(1.2rem, 2.5vw, 2rem);
            color: #e6b482;
            margin: 0;
            letter-spacing: 0.08em;
        }

        .header-role {
            font-family: var(--font-primary, 'IBM Plex Sans', sans-serif);
            font-weight: 400;
            font-size: clamp(0.8rem, 1.5vw, 1.2rem);
            color: #c8c6c3;
            margin: 0;
            letter-spacing: 0.1em;
            text-transform: uppercase;
        }

        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                justify-content: center;
                text-align: center;
                padding: 1rem;
                gap: 0.5rem;
            }

            .header-right {
                align-items: center;
            }

            .header-title::after {
                margin: 8px auto 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Canvas com animacao otimizada
    const canvas = document.getElementById('header-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;
    let isVisible = true;

    // Resize otimizado com debounce
    let resizeTimeout;
    function resizeCanvas() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const rect = header.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            initParticles();
        }, 100);
    }

    // Particulas simplificadas
    function initParticles() {
        const count = Math.min(30, Math.floor(canvas.width / 50));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                color: Math.random() > 0.5 ? '#e6b482' : '#c8c6c3',
                alpha: Math.random() * 0.4 + 0.1
            });
        }
    }

    function animate() {
        if (!isVisible) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // Conexoes entre particulas proximas
        ctx.globalAlpha = 0.08;
        ctx.strokeStyle = '#e6b482';
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = dx * dx + dy * dy;

                if (dist < 8000) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        animationId = requestAnimationFrame(animate);
    }

    // Pausar quando nao visivel
    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
        if (isVisible && !animationId) {
            animate();
        }
    });

    // Inicializar
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Aguardar DOM carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            resizeCanvas();
            animate();
        });
    } else {
        animate();
    }
})();
