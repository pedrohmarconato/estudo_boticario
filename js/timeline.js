/* ===========================================
   TIMELINE - Interatividade
   =========================================== */

(function() {
    'use strict';

    const timeline = document.getElementById('timeline');
    const items = document.querySelectorAll('.tl-item');

    // Dados originais
    const originalData = [];
    items.forEach((item, i) => {
        const year = item.querySelector('.tl-year');
        const content = item.querySelector('.tl-content');
        originalData[i] = {
            company: year.querySelector('.company').textContent,
            position: year.querySelector('.position').textContent,
            period: year.querySelector('.period').textContent,
            content: content.querySelector('p').textContent
        };
    });

    // Dados dos bullets por empresa
    const bulletData = {
        0: [ // Grupo RBS
            { title: 'Auditoria Brand Equity', items: [
                { text: 'Investimento em pesquisa', number: 'R$ 300k', unit: 'investimento' },
                { text: 'Marcas analisadas', number: '6', unit: 'marcas' }
            ]},
            { title: 'Automacao', items: [
                { text: 'Horas economizadas', number: '12h', unit: 'semanais' },
                { text: 'Economia anual', number: '600h', unit: '/ano' }
            ]},
            { title: 'Otimizacao Tributaria', items: [
                { text: 'Economia em impostos', number: 'R$ 1,5M', unit: 'economia' }
            ]}
        ],
        1: [ // DBC Company
            { title: 'Reestruturacao CRM', items: [
                { text: 'Cliente atendido', number: 'Realize', unit: 'instituicao financeira' }
            ]},
            { title: 'Metodologia', items: [
                { text: 'Framework implementado', number: 'Kanban', unit: 'agile' }
            ]},
            { title: 'Gestao de Crise', items: [
                { text: 'Contexto', number: 'COVID-19', unit: 'pandemia' }
            ]}
        ],
        2: [ // Renner - Especialista
            { title: 'Migracao de Plataforma', items: [
                { text: 'Nova plataforma', number: 'Databricks', unit: 'moderna' },
                { text: 'Performance', number: '< 2s', unit: 'latencia' }
            ]},
            { title: 'Segmentacao', items: [
                { text: 'Base de clientes', number: '7M+', unit: 'clientes' },
                { text: 'Aumento CTR', number: '35%', unit: 'conversao' }
            ]}
        ],
        3: [ // Renner - Coordenador
            { title: 'Gestao', items: [
                { text: 'Equipe', number: '8', unit: 'profissionais' },
                { text: 'Orcamento', number: 'R$ 25M', unit: 'anual' }
            ]},
            { title: 'Resultados', items: [
                { text: 'Consumo incremental', number: 'R$ 180M', unit: '+7% YoY' },
                { text: 'Reducao churn', number: '23%', unit: 'retencao' }
            ]},
            { title: 'Automacao', items: [
                { text: 'Comunicacoes', number: '80%', unit: 'automatizadas' }
            ]}
        ]
    };

    // Animacao de entrada
    items.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';

        setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, i * 100);
    });

    // Click handler
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (timeline.classList.contains('timeline-animating')) return;
            if (item.classList.contains('expanded-full')) return;

            expandItem(item, index);
        });
    });

    function expandItem(item, index) {
        timeline.classList.add('timeline-animating');

        // Fase 1: Slide
        item.style.setProperty('--slide-distance', `-${index * 100}%`);
        item.classList.add('slide-phase');

        // Fase 2: Prepare
        setTimeout(() => {
            item.classList.remove('slide-phase');
            item.classList.add('prepare-expand');

            // Fase 3: Expand
            setTimeout(() => {
                item.classList.remove('prepare-expand');
                item.classList.add('expanding', 'expanding-smooth');

                // Final
                setTimeout(() => {
                    item.classList.remove('expanding', 'expanding-smooth');
                    item.classList.add('expanded-full');

                    createTimeline(item, index);
                    createNavigation(item, index);
                }, 2000);
            }, 50);
        }, 800);
    }

    function closeItem(item, index) {
        // Remover elementos
        const nav = item.querySelector('.navigation-container');
        const tl = item.querySelector('.timeline-horizontal');
        if (nav) nav.remove();
        if (tl) tl.remove();

        // Restaurar conteudo
        const year = item.querySelector('.tl-year');
        const content = item.querySelector('.tl-content');
        year.querySelector('.company').textContent = originalData[index].company;
        year.querySelector('.position').textContent = originalData[index].position;
        year.querySelector('.period').textContent = originalData[index].period;
        content.querySelector('p').textContent = originalData[index].content;

        // Remover classes
        item.classList.remove('slide-phase', 'prepare-expand', 'expanding', 'expanding-smooth', 'expanded-full');
        item.style.removeProperty('--slide-distance');
        timeline.classList.remove('timeline-animating');
    }

    function navigateTo(currentItem, currentIndex, newIndex) {
        // Limpar atual
        const nav = currentItem.querySelector('.navigation-container');
        const tl = currentItem.querySelector('.timeline-horizontal');
        if (nav) nav.remove();
        if (tl) tl.remove();

        currentItem.classList.remove('slide-phase', 'prepare-expand', 'expanding', 'expanding-smooth', 'expanded-full');
        currentItem.style.removeProperty('--slide-distance');

        // Configurar novo
        const newItem = items[newIndex];
        newItem.style.setProperty('--slide-distance', `-${newIndex * 100}%`);
        newItem.classList.add('expanded-full');

        setTimeout(() => {
            createTimeline(newItem, newIndex);
            createNavigation(newItem, newIndex);
        }, 200);
    }

    function createNavigation(item, index) {
        const nav = document.createElement('div');
        nav.className = 'navigation-container';
        nav.style.opacity = '0';

        // Close
        const close = document.createElement('button');
        close.className = 'close-button';
        close.innerHTML = '×';
        close.onclick = (e) => { e.stopPropagation(); closeItem(item, index); };
        nav.appendChild(close);

        // Prev
        if (index > 0) {
            const prev = document.createElement('button');
            prev.className = 'prev-button';
            prev.innerHTML = '←';
            prev.onclick = (e) => { e.stopPropagation(); navigateTo(item, index, index - 1); };
            nav.appendChild(prev);
        }

        // Next
        if (index < items.length - 1) {
            const next = document.createElement('button');
            next.className = 'next-button';
            next.innerHTML = '→';
            next.onclick = (e) => { e.stopPropagation(); navigateTo(item, index, index + 1); };
            nav.appendChild(next);
        }

        item.appendChild(nav);

        setTimeout(() => {
            nav.style.transition = 'opacity 0.3s ease';
            nav.style.opacity = '1';
        }, 100);
    }

    function createTimeline(item, index) {
        const data = bulletData[index] || bulletData[0];

        const container = document.createElement('div');
        container.className = 'timeline-horizontal';

        container.innerHTML = `
            <div class="timeline-bullets">
                ${data.map(bullet => `
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
                ${[0,1,2,3].map(i => `<div class="timeline-point${i === index ? ' active' : ''}" data-index="${i}"></div>`).join('')}
            </div>
        `;

        item.appendChild(container);

        setTimeout(() => container.classList.add('show'), 50);
    }
})();
