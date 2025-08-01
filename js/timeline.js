document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.tl-item');
    
    // Armazena conteúdo original de cada item
    const originalContent = [];
    timelineItems.forEach((item, index) => {
        const yearDiv = item.querySelector('.tl-year');
        const contentDiv = item.querySelector('.tl-content');
        originalContent[index] = {
            company: yearDiv.querySelector('.company').textContent,
            position: yearDiv.querySelector('.position').textContent,
            period: yearDiv.querySelector('.period').textContent,
            content: contentDiv.querySelector('p').textContent
        };
    });
    
    // Adiciona imagens placeholder se não existirem
    timelineItems.forEach((item, index) => {
        const bgDiv = item.querySelector('.tl-bg');
        const currentBg = bgDiv.style.backgroundImage;
        
        // Se não houver imagem definida, usa um gradiente como placeholder
        if (!currentBg || currentBg === 'none' || currentBg.includes('exp')) {
            const gradients = [
                'linear-gradient(135deg, #667eea 0%, #667eea 85%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f093fb 88%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #4facfe 85%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #43e97b 88%, #38f9d7 100%)'
            ];
            bgDiv.style.backgroundImage = gradients[index % gradients.length];
        }
    });
    
    // Efeito de parallax suave ao mover o mouse
    let isDesktop = window.innerWidth > 768;
    
    if (isDesktop) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            timelineItems.forEach((item, index) => {
                const bg = item.querySelector('.tl-bg');
                const offsetX = (mouseX - 0.5) * 20;
                const offsetY = (mouseY - 0.5) * 20;
                
                bg.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(1.1)`;
            });
        });
    }
    
    // Animação de entrada e habilitação de clique
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.pointerEvents = 'none'; // Desabilita cliques inicialmente
        item.style.cursor = 'default';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            
            // Habilita cliques após a animação começar
            setTimeout(() => {
                item.style.pointerEvents = 'auto';
                item.style.cursor = 'pointer';
                
                // Adiciona indicador visual de que é clicável
                item.classList.add('clickable');
            }, 400); // Aguarda o fim da animação
        }, index * 150);
    });
    
    // Função para iniciar animação em fases
    function startSlideAndExpand(clickedItem) {
        const timeline = document.getElementById('timeline');
        const index = Array.from(timelineItems).indexOf(clickedItem);
        
        // Adiciona classe para ocultar outros itens
        timeline.classList.add('timeline-animating');
        
        // Define a distância de deslizamento
        clickedItem.style.setProperty('--slide-distance', `-${index * 100}%`);
        
        // NÃO adiciona botões imediatamente - serão adicionados após a animação
        
        // Fase 1: Deslizamento lateral
        clickedItem.classList.add('slide-phase');
        
        // Após deslizamento (800ms)
        setTimeout(() => {
            // Fase 2: Prepara para expansão
            clickedItem.classList.remove('slide-phase');
            clickedItem.classList.add('prepare-expand');
            
            // Pequena pausa para estabilizar (30ms)
            setTimeout(() => {
                // Fase 3: Expansão
                clickedItem.classList.remove('prepare-expand');
                clickedItem.classList.add('expanding');
                
                // Inicia expansão ultra-suave com 30 etapas
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        // Adiciona classe base para expansão suave
                        clickedItem.classList.add('expanding-smooth');
                        
                        // Inicia expansão contínua com animação CSS
                        setTimeout(() => {
                            clickedItem.classList.add('expanding-smooth');
                        }, 100);
                        
                        // Após animação completa (2.1s)
                        setTimeout(() => {
                            // Estado final
                            clickedItem.classList.remove('expanding', 'expanding-smooth');
                            clickedItem.classList.add('expanded-full');
                            
                            // Adiciona timeline horizontal
                            setTimeout(() => {
                                console.log('Criando timeline horizontal para index:', index);
                                createHorizontalTimeline(clickedItem, index);
                                
                                // Adiciona botões de navegação APÓS a animação
                                addNavigationButtons(clickedItem, index);
                            }, 50);
                        }, 2100);
                    });
                });
            }, 30);
        }, 800);
    }
    
    // Função para restaurar conteúdo original
    function restoreOriginalContent(item, index) {
        const yearDiv = item.querySelector('.tl-year');
        const contentDiv = item.querySelector('.tl-content');
        
        yearDiv.querySelector('.company').textContent = originalContent[index].company;
        yearDiv.querySelector('.position').textContent = originalContent[index].position;
        yearDiv.querySelector('.period').textContent = originalContent[index].period;
        contentDiv.querySelector('p').textContent = originalContent[index].content;
    }
    
    // Função para adicionar botões de navegação após animação
    function addNavigationButtons(item, index) {
        const navigationContainer = document.createElement('div');
        navigationContainer.className = 'navigation-container';
        navigationContainer.style.opacity = '0';
        
        // Botão de fechar
        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '×';
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            closeExpandedView(item);
        });
        
        // Botão próximo (só aparece se não for o último)
        let nextButton = null;
        if (index < timelineItems.length - 1) {
            nextButton = document.createElement('button');
            nextButton.className = 'next-button';
            nextButton.innerHTML = '→';
            nextButton.title = 'Próximo bloco';
            nextButton.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateToNext(index);
            });
        }
        
        // Botão anterior (só aparece se não for o primeiro)
        let prevButton = null;
        if (index > 0) {
            prevButton = document.createElement('button');
            prevButton.className = 'prev-button';
            prevButton.innerHTML = '←';
            prevButton.title = 'Bloco anterior';
            prevButton.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateToPrev(index);
            });
        }
        
        navigationContainer.appendChild(closeButton);
        if (prevButton) navigationContainer.appendChild(prevButton);
        if (nextButton) navigationContainer.appendChild(nextButton);
        
        item.appendChild(navigationContainer);
        
        // Fade in dos botões
        setTimeout(() => {
            navigationContainer.style.transition = 'opacity 0.5s ease';
            navigationContainer.style.opacity = '1';
        }, 100);
    }

    // Função removida - não é mais necessária pois o texto só muda quando clicamos em outro bloco

    // Função para navegar para próximo bloco (transição direta)
    function navigateToNext(currentIndex) {
        const currentItem = timelineItems[currentIndex];
        const nextItem = timelineItems[currentIndex + 1];
        
        if (nextItem) {
            // Remove elementos do atual
            const navigationContainer = currentItem.querySelector('.navigation-container');
            if (navigationContainer) navigationContainer.remove();
            
            const horizontalTimeline = currentItem.querySelector('.timeline-horizontal');
            if (horizontalTimeline) horizontalTimeline.remove();
            
            // Transição direta: remove classes do atual e adiciona no próximo
            currentItem.classList.remove('slide-phase', 'prepare-expand', 'expanding', 'start-expand', 'expanded-full');
            currentItem.style.removeProperty('--slide-distance');
            
            // Imediatamente configura o próximo
            nextItem.style.setProperty('--slide-distance', `-${(currentIndex + 1) * 100}%`);
            nextItem.classList.add('expanded-full');
            
            // Cria conteúdo do próximo
            setTimeout(() => {
                createHorizontalTimeline(nextItem, currentIndex + 1);
                addNavigationButtons(nextItem, currentIndex + 1);
            }, 300);
        }
    }
    
    // Função para navegar para bloco anterior (transição direta)
    function navigateToPrev(currentIndex) {
        const currentItem = timelineItems[currentIndex];
        const prevItem = timelineItems[currentIndex - 1];
        
        if (prevItem) {
            // Remove elementos do atual
            const navigationContainer = currentItem.querySelector('.navigation-container');
            if (navigationContainer) navigationContainer.remove();
            
            const horizontalTimeline = currentItem.querySelector('.timeline-horizontal');
            if (horizontalTimeline) horizontalTimeline.remove();
            
            // Transição direta: remove classes do atual e adiciona no anterior
            currentItem.classList.remove('slide-phase', 'prepare-expand', 'expanding', 'start-expand', 'expanded-full');
            currentItem.style.removeProperty('--slide-distance');
            
            // Imediatamente configura o anterior
            prevItem.style.setProperty('--slide-distance', `-${(currentIndex - 1) * 100}%`);
            prevItem.classList.add('expanded-full');
            
            // Cria conteúdo do anterior
            setTimeout(() => {
                createHorizontalTimeline(prevItem, currentIndex - 1);
                addNavigationButtons(prevItem, currentIndex - 1);
            }, 300);
        }
    }
    
    // Função para fechar a visualização expandida
    function closeExpandedView(item) {
        const timeline = document.getElementById('timeline');
        const index = Array.from(timelineItems).indexOf(item);
        
        // Remove container de navegação
        const navigationContainer = item.querySelector('.navigation-container');
        if (navigationContainer) {
            navigationContainer.remove();
        }
        
        // Remove timeline horizontal se existir
        const horizontalTimeline = item.querySelector('.timeline-horizontal');
        if (horizontalTimeline) {
            horizontalTimeline.remove();
        }
        
        // Restaura conteúdo original
        restoreOriginalContent(item, index);
        
        // Remove todas as classes de animação
        item.classList.remove('slide-phase', 'prepare-expand', 'expanding', 'start-expand', 'expanded-full');
        item.style.removeProperty('--slide-distance');
        
        // Remove a classe da timeline para mostrar outros itens
        timeline.classList.remove('timeline-animating');
    }
    
    // Função para criar timeline horizontal
    function createHorizontalTimeline(item, currentIndex) {
        console.log('Função createHorizontalTimeline chamada:', item, currentIndex);
        
        const timelineHorizontal = document.createElement('div');
        timelineHorizontal.className = 'timeline-horizontal';
        
        // Conteúdo específico para cada posição
        const allBulletData = {
            // Index 0 - Analista de Mercado - Grupo RBS
            0: [
                {
                    title: 'Auditoria Brand Equity',
                    items: [
                        { text: 'Auditoria de pesquisa', number: 'R$ 300k', unit: 'investimento' },
                        { text: 'Análise das 6 marcas de mídia do grupo', number: '6', unit: 'marcas' },
                        { text: 'Fundação para decisões estratégicas', number: 'Brand', unit: 'estratégia de marca' }
                    ]
                },
                {
                    title: 'Automação e Eficiência',
                    items: [
                        { text: 'Redução em processos manuais', number: '12h', unit: 'semanais' },
                        { text: 'Economia anual através de automação', number: '600h', unit: '/ano' },
                        { text: 'Migração completa', number: 'PowerBI', unit: 'plataforma' }
                    ]
                },
                {
                    title: 'Otimização Tributária',
                    items: [
                        { text: 'Economia em impostos', number: 'R$ 1,5M', unit: 'economia total' },
                        { text: 'Auditoria gerou ticket\'s para evolução da estrutura de banco de dados', number: 'DB', unit: 'evolução' }
                    ]
                }
            ],
            // Index 1 - Especialista em Dados - DBC Company
            1: [
                {
                    title: 'Reestruturação Estratégica',
                    items: [
                        { text: 'Apoio na reestruturação da área de CRM', number: 'CRM', unit: 'área completa' },
                        { text: 'Cliente Realize', number: 'Realize', unit: 'instituição financeira' }
                    ]
                },
                {
                    title: 'Metodologias Ágeis',
                    items: [
                        { text: 'Implementação de metodologias ágeis', number: 'Kanban', unit: 'framework ágil' }
                    ]
                },
                {
                    title: 'Definição de Processos',
                    items: [
                        { text: 'Definição de processos otimizados', number: 'Processos', unit: 'novos fluxos' },
                        { text: 'Redução do time-to-market', number: 'Menor', unit: 'tempo de disponibilidade de novos dashboards' }
                    ]
                },
                {
                    title: 'Gestão de Crise',
                    items: [
                        { text: 'Dashboards construção/gestão de relatórios de produtos digitais no contexto de pandemia', number: 'COVID-19', unit: 'contexto pandemia' }
                    ]
                }
            ],
            // Index 2 - Especialista em Dados - Lojas Renner S.A
            2: [
                {
                    title: 'Transformação de Plataforma',
                    items: [
                        { text: 'Pioneiro na migração Oracle para Databricks', number: 'Databricks', unit: 'plataforma moderna' },
                        { text: 'Aumento expressivo na velocidade de consultas', number: 'Faster', unit: 'queries performance' }
                    ]
                },
                {
                    title: 'Performance e Inovação',
                    items: [
                        { text: 'Insights em tempo real', number: '< 2s', unit: 'latência' },
                        { text: 'Modelo de segmentação', number: '7M+', unit: 'clientes' },
                        { text: 'Aumento de conversão', number: '35%', unit: 'CTR: 2.1% → 2.8%' }
                    ]
                },
                {
                    title: 'Framework Customer Centricity',
                    items: [
                        { text: 'Modelo de ciclo de vida do cliente', number: 'LTV', unit: 'framework completo' },
                        { text: 'Dashboards estratégicos', number: 'Real-time', unit: 'tomada de decisão' },
                        { text: 'SQL, BigQuery, Python e Power BI', number: 'Multi', unit: 'stack técnico' }
                    ]
                }
            ],
            // Index 3 - Coordenador de CRM - Lojas Renner S.A
            3: [
                {
                    title: 'Gestão de Equipe e Orçamento',
                    items: [
                        { text: 'Liderança de equipe multidisciplinar', number: '8', unit: 'profissionais' },
                        { text: 'Gestão de orçamento anual', number: 'R$ 25', unit: 'milhões' },
                        { text: 'Economia em contratos terceirizados', number: 'R$ 2,5M', unit: '/ano' }
                    ]
                },
                {
                    title: 'Métricas de Performance',
                    items: [
                        { text: 'Consumo incremental via CRM', number: 'R$ 180M', unit: '(+7 p.p YoY)' },
                        { text: 'Volume OFF-Us', number: '+450M', unit: '(+8%)' },
                        { text: 'Clientes retidos', number: '350K', unit: '(-23% churn)' },
                        { text: 'Ticket médio', number: '+R$ 1.2K', unit: '(+28%)' }
                    ]
                },
                {
                    title: 'Inovações Implementadas',
                    items: [
                        { text: 'Comunicações automatizadas', number: '80%', unit: 'automação' },
                        { text: 'Construção de jornadas personalizadas com base em comportamento e perfil dos clientes', number: 'Jornadas', unit: 'personalizadas' },
                        { text: 'Liderança de projetos e iniciativas estratégicas de expansão da base ativa', number: 'Projetos', unit: 'estratégicos' }
                    ]
                },
                {
                    title: 'Otimização e Resultados',
                    items: [
                        { text: 'Otimização de contratos', number: '10%', unit: 'economia mantendo qualidade' },
                        { text: 'Crescimento incremental CRM', number: '+7 p.p', unit: 'YoY' },
                        { text: 'Redução de churn', number: '23%', unit: 'redução' }
                    ]
                }
            ]
        };
        
        // Seleciona o conteúdo baseado no índice ou usa um padrão
        const bulletData = allBulletData[currentIndex] || allBulletData[3];
        
        timelineHorizontal.innerHTML = `
            <div class="timeline-bullets">
                ${bulletData.map((bullet, index) => `
                    <div class="timeline-bullet">
                        <div class="timeline-bullet-title">${bullet.title}</div>
                        <div class="timeline-bullet-items">
                            ${bullet.items.map(item => `
                                <div class="timeline-item-row">
                                    <div class="timeline-item-text">${item.text}</div>
                                    <div class="timeline-item-number">${item.number}</div>
                                    <div class="timeline-item-unit">${item.unit}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="timeline-track">
                <div class="timeline-point" data-index="0"></div>
                <div class="timeline-point" data-index="1"></div>
                <div class="timeline-point" data-index="2"></div>
                <div class="timeline-point" data-index="3"></div>
            </div>
        `;
        
        item.appendChild(timelineHorizontal);
        
        // Animação de entrada imediata
        setTimeout(() => {
            timelineHorizontal.classList.add('show');
        }, 10);
        
        // Timeline sem funcionalidade de clique entre itens
        // Cada bloco terá seu próprio conteúdo específico
    }
    
    // Adicionar funcionalidade de clique
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            // Verifica se o item já está ativo, clicável e não está em animação
            if (this.classList.contains('clickable') && 
                !this.classList.contains('slide-phase') && 
                !this.classList.contains('prepare-expand') &&
                !this.classList.contains('expanding') &&
                !this.classList.contains('start-expand') &&
                !this.classList.contains('expanded-full') &&
                !document.getElementById('timeline').classList.contains('timeline-animating')) {
                
                startSlideAndExpand(this);
            }
        });
    });
    
    // Prevenir cliques durante animação
    document.addEventListener('click', function(e) {
        const timeline = document.getElementById('timeline');
        const isAnimating = timeline.classList.contains('timeline-animating');
        const isNavigationButton = e.target.classList.contains('close-button') || 
                                  e.target.classList.contains('next-button') || 
                                  e.target.classList.contains('prev-button');
        
        if (isAnimating && !isNavigationButton) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);
    
    // Navegação por teclado removida para evitar conflitos com Alt+Tab
});