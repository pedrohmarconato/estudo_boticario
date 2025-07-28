// Animações e interatividade para a página Nova Etapa

document.addEventListener('DOMContentLoaded', function() {
    // Animação de entrada das seções ao fazer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa todas as section-cards
    const sections = document.querySelectorAll('.section-card');
    sections.forEach(section => {
        // Removido: opacity 0 e transform
        // section.style.opacity = '0';
        // section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Efeito parallax suave no hero
    const heroSection = document.querySelector('.hero-section');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });

    // Animação de hover nos step cards
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const number = this.querySelector('.step-number');
            number.style.transform = 'scale(1.2) rotate(360deg)';
            number.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const number = this.querySelector('.step-number');
            number.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animação de digitação no título principal
    const mainTitle = document.querySelector('.main-title');
    const titleText = mainTitle.innerHTML;
    mainTitle.innerHTML = '';
    mainTitle.style.opacity = '1';
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < titleText.length) {
            if (titleText.charAt(charIndex) === '<') {
                // Se encontrar uma tag HTML, adiciona ela inteira
                const tagEnd = titleText.indexOf('>', charIndex);
                mainTitle.innerHTML += titleText.substring(charIndex, tagEnd + 1);
                charIndex = tagEnd + 1;
            } else {
                mainTitle.innerHTML += titleText.charAt(charIndex);
                charIndex++;
            }
            setTimeout(typeWriter, 50);
        }
    }
    
    // Inicia a animação após um pequeno delay
    setTimeout(typeWriter, 500);

    // Efeito de glow nos botões ao passar o mouse
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 20px rgba(255, 188, 130, 0.5)';
    });
    
    backButton.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });

    // Animação de pulse nos timing items - REMOVIDA
    // const timingItems = document.querySelectorAll('.timing-item');
    // timingItems.forEach((item, index) => {
    //     item.style.opacity = '0';
    //     item.style.transform = 'translateX(-30px)';
    //     
    //     setTimeout(() => {
    //         item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    //         item.style.opacity = '1';
    //         item.style.transform = 'translateX(0)';
    //     }, 800 + (index * 200));
    // });

    // Contador animado para os números dos steps
    const animateNumbers = () => {
        const numbers = document.querySelectorAll('.step-number');
        numbers.forEach((num, index) => {
            const finalNumber = index + 1;
            let currentNumber = 0;
            
            const increment = () => {
                if (currentNumber < finalNumber) {
                    currentNumber++;
                    num.textContent = currentNumber;
                    setTimeout(increment, 200);
                }
            };
            
            // Inicia quando o elemento estiver visível
            const numberObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        increment();
                        numberObserver.unobserve(entry.target);
                    }
                });
            });
            
            numberObserver.observe(num);
        });
    };
    
    animateNumbers();

    // Efeito de onda no final section ao entrar na viewport
    const finalSection = document.querySelector('.final-section');
    const finalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.backgroundSize = '200% 200%';
                entry.target.style.animation = 'waveGradient 3s ease infinite';
                finalObserver.unobserve(entry.target);
            }
        });
    });
    
    if (finalSection) {
        finalObserver.observe(finalSection);
    }

    // Adiciona animação de gradient wave
    const style = document.createElement('style');
    style.textContent = `
        @keyframes waveGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
});