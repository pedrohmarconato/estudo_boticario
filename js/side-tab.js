// Funcionalidade da tira lateral
document.addEventListener('DOMContentLoaded', function() {
    const sideTab = document.querySelector('.side-pull-tab');
    const overlay = document.getElementById('newPageOverlay');
    
    // Abrir nova página ao clicar na tira
    sideTab.addEventListener('click', function() {
        openNewPage();
    });
    
    // Adicionar efeito de hover com delay
    let hoverTimeout;
    sideTab.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        this.style.animationPlayState = 'paused';
    });
    
    sideTab.addEventListener('mouseleave', function() {
        hoverTimeout = setTimeout(() => {
            this.style.animationPlayState = 'running';
        }, 500);
    });
});

// Função para abrir nova página
function openNewPage() {
    // Navega para a página case-analise.html
    window.location.href = 'case-analise.html';
}

// Função para fechar nova página
function closeNewPage() {
    const overlay = document.getElementById('newPageOverlay');
    const content = overlay.querySelector('.overlay-content');
    
    // Animar saída do conteúdo
    content.style.transition = 'all 0.4s ease';
    content.style.opacity = '0';
    content.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }, 400);
}

// Fechar com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('newPageOverlay');
        if (overlay.classList.contains('active')) {
            closeNewPage();
        }
    }
});