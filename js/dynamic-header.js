document.addEventListener('DOMContentLoaded', function() {
    // Criar o header dinamicamente
    const header = document.createElement('header');
    header.id = 'dynamic-header';
    header.innerHTML = `
        <div class="header-content">
            <div class="header-left">
                <h1 class="header-title">Timeline de Carreira</h1>
            </div>
            <div class="header-right">
                <h2 class="header-name">Pedro Marconato</h2>
                <span class="header-divider">•</span>
                <p class="header-role">Especialista em analytics</p>
            </div>
        </div>
        <canvas id="header-canvas"></canvas>
    `;
    
    // Inserir o header no início do body
    document.body.insertBefore(header, document.body.firstChild);
    
    // Adicionar estilos CSS dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        #dynamic-header {
            background-color: rgba(1,30,56,0.85) !important; /* azul-marinho translúcido para permitir efeito do canvas */
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 20vh;
            min-height: 150px;
            z-index: 1000;
            overflow: hidden;
            background: var(--azul-marinho);
        }
        
        #header-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 1;
            z-index: 1;
        }
        
        .header-content {
            position: relative;
            z-index: 2;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 3% 0 8%;
            width: 100%;
        }
        
        .header-left {
            flex: 0 0 auto;
            margin-right: 4rem;
        }
        
        .header-right {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.3rem;
            flex: 1;
        }
        
        .header-title {
            font-family: var(--font-primary);
            font-weight: 500;
            font-size: 3rem;
            color: #e6b482;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            position: relative;
            display: inline-block;
            line-height: 1;
        }
        
        .header-title::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 80px;
            height: 4px;
            background: #e6b482;
            opacity: 0.7;
        }
        
        .header-name {
            font-family: var(--font-primary);
            font-weight: 500;
            font-size: 2rem;
            color: #e6b482;
            margin: 0;
            letter-spacing: 0.08em;
            line-height: 1.2;
        }
        
        .header-divider {
            display: none;
        }
        
        .header-role {
            font-family: var(--font-primary);
            font-weight: 400;
            font-size: 1.2rem;
            color: #c8c6c3;
            margin: 0;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            line-height: 1.2;
        }
        
        /* Ajustar o timeline para não ficar sob o header */
        #timeline {
            margin-top: 20vh;
        }
        
        @media screen and (max-width: 768px) {
            .header-content {
                flex-direction: column;
                justify-content: center;
                gap: 1rem;
                padding: 1rem;
            }
            
            .header-left {
                text-align: center;
            }
            
            .header-right {
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
            }
            
            .header-title {
                font-size: 2rem;
                letter-spacing: 0.2em;
            }
            
            .header-title::after {
                width: 60px;
                left: 50%;
                transform: translateX(-50%);
            }
            
            .header-name {
                font-size: 1.5rem;
                text-align: center;
            }
            
            .header-divider {
                display: none;
            }
            
            .header-role {
                font-size: 1rem;
                text-align: center;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Canvas animation
    const canvas = document.getElementById('header-canvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.2;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Partículas que reagem ao movimento
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = Math.random() > 0.5 ? '#e6b482' : '#c8c6c3';
            this.alpha = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Criar partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Variáveis para o efeito de luz
    let lightEffect = {
        x: 0,
        targetX: 0,
        width: 0,
        targetWidth: 0,
        opacity: 0,
        targetOpacity: 0,
        color: { r: 255, g: 255, b: 255 }
    };
    
    function lerp(start, end, t) {
        return start + (end - start) * t;
    }
    
    function updateHeaderLight() {
        const timelineItems = document.querySelectorAll('.tl-item');
        let hoveredItem = null;
        
        timelineItems.forEach(item => {
            if (item.matches(':hover')) {
                hoveredItem = item;
            }
        });
        
        if (hoveredItem) {
            // Obter posição e dimensões do item
            const rect = hoveredItem.getBoundingClientRect();
            const bg = hoveredItem.querySelector('.tl-bg');
            const bgStyle = window.getComputedStyle(bg);
            const bgImage = bgStyle.backgroundImage;
            
            // Definir posição e largura da luz
            lightEffect.targetX = rect.left + rect.width / 2;
            lightEffect.targetWidth = rect.width;
            lightEffect.targetOpacity = 0.3;
            
            // Extrair cor dominante do gradiente
            if (bgImage.includes('gradient')) {
                if (bgImage.includes('#667eea')) {
                    lightEffect.color = { r: 102, g: 126, b: 234 };
                } else if (bgImage.includes('#f093fb')) {
                    lightEffect.color = { r: 240, g: 147, b: 251 };
                } else if (bgImage.includes('#4facfe')) {
                    lightEffect.color = { r: 79, g: 172, b: 254 };
                } else if (bgImage.includes('#43e97b')) {
                    lightEffect.color = { r: 67, g: 233, b: 123 };
                }
            }
        } else {
            // Desativar luz quando não há hover
            lightEffect.targetOpacity = 0;
        }
        
        // Interpolar valores suavemente
        lightEffect.x = lerp(lightEffect.x, lightEffect.targetX, 0.15);
        lightEffect.width = lerp(lightEffect.width, lightEffect.targetWidth, 0.15);
        lightEffect.opacity = lerp(lightEffect.opacity, lightEffect.targetOpacity, 0.1);
    }
    
    function drawLightEffect() {
        if (lightEffect.opacity > 0.01) {
            const { r, g, b } = lightEffect.color;
            ctx.save();

            // Luz/sombra natural (halo radial em todas as direções, limitado ao quadrante + margem)
            const quadranteCount = 4; // ajuste se mudar o número de quadrantes
            const quadranteWidth = canvas.width / quadranteCount;
            const effectRadius = quadranteWidth * 1.7;
            const halo = ctx.createRadialGradient(
                lightEffect.x, canvas.height * 0.7, quadranteWidth * 0.12,
                lightEffect.x, canvas.height * 0.7, effectRadius
            );
            halo.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${lightEffect.opacity * 0.28})`);
            halo.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${lightEffect.opacity * 0.14})`);
            halo.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${lightEffect.opacity * 0.06})`);
            halo.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
            ctx.globalAlpha = 1;
            ctx.fillStyle = halo;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Brilho central suave
            const glowGradient = ctx.createRadialGradient(
                lightEffect.x, canvas.height * 0.8, 0,
                lightEffect.x, canvas.height * 0.8, lightEffect.width * 0.6
            );
            glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${Math.min(lightEffect.opacity * 0.7, 1)})`);
            glowGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${Math.min(lightEffect.opacity * 0.3, 1)})`);
            glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
            ctx.fillStyle = glowGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.restore();
        }
    }
    
    // Animação principal
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Atualizar efeito de luz
        updateHeaderLight();
        
        // Desenhar o efeito de luz primeiro (como fundo)
        drawLightEffect();
        
        // Desenhar e atualizar partículas
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Conectar partículas próximas
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = '#e6b482';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Reação ao movimento do mouse
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.speedX += (dx / distance) * force * 0.1;
                particle.speedY += (dy / distance) * force * 0.1;
            }
        });
    });
});