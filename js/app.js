/* ===========================================
   APP - Timeline Interativa
   =========================================== */

(function() {
    'use strict';

    // Dados
    const data = [
        {
            period: 'mar 2019 - jul 2020',
            company: 'Grupo RBS',
            position: 'Analista de Mercado',
            description: 'Conduzi análises de Brand Equity, automatizei relatórios estratégicos e identifiquei oportunidades tributárias significativas. Transformei processos manuais em soluções automatizadas, liberando horas semanais para análises de maior valor agregado.',
            metrics: [
                {
                    title: 'Brand Equity',
                    items: [
                        { label: 'Investimento pesquisa', value: 'R$ 300k', unit: '' },
                        { label: 'Marcas analisadas', value: '6', unit: 'marcas' }
                    ]
                },
                {
                    title: 'Automação',
                    items: [
                        { label: 'Economia semanal', value: '12h', unit: 'horas' },
                        { label: 'Economia anual', value: '600h', unit: '/ano' }
                    ]
                },
                {
                    title: 'Tributário',
                    items: [
                        { label: 'Economia impostos', value: 'R$ 1,5M', unit: 'total' }
                    ]
                }
            ]
        },
        {
            period: 'jul 2020 - jul 2021',
            company: 'DBC Company',
            position: 'Especialista em Dados',
            description: 'Apoiei a reestruturação estratégica da área de CRM no cliente Realize, implementando metodologias ágeis (Kanban) e definindo processos que reduziram o time-to-market de dashboards e aumentaram a eficiência operacional.',
            metrics: [
                {
                    title: 'Reestruturação',
                    items: [
                        { label: 'Cliente', value: 'Realize', unit: 'financeira' }
                    ]
                },
                {
                    title: 'Metodologia',
                    items: [
                        { label: 'Framework', value: 'Kanban', unit: 'ágil' }
                    ]
                },
                {
                    title: 'Contexto',
                    items: [
                        { label: 'Período', value: 'COVID-19', unit: 'pandemia' }
                    ]
                }
            ]
        },
        {
            period: 'jul 2021 - set 2022',
            company: 'Lojas Renner',
            position: 'Especialista em Dados',
            description: 'Liderei a transformação digital e migração para plataforma Databricks, desenvolvendo soluções analíticas avançadas e implementando framework de Customer Centricity. Produzi dashboards estratégicos e criei modelos de segmentação para otimizar estratégias de comunicação.',
            metrics: [
                {
                    title: 'Plataforma',
                    items: [
                        { label: 'Migração', value: 'Databricks', unit: 'nova' },
                        { label: 'Latência', value: '< 2s', unit: 'real-time' }
                    ]
                },
                {
                    title: 'Performance',
                    items: [
                        { label: 'Base clientes', value: '7M+', unit: 'clientes' },
                        { label: 'Aumento CTR', value: '35%', unit: 'conversão' }
                    ]
                },
                {
                    title: 'Framework',
                    items: [
                        { label: 'Modelo', value: 'LTV', unit: 'customer' }
                    ]
                }
            ]
        },
        {
            period: 'set 2022 - fev 2025',
            company: 'Lojas Renner',
            position: 'Coordenador de CRM',
            description: 'Responsável por estratégias de CRM, gestão de orçamento e contratos, liderança de equipe e implementação de métricas de performance para maximizar resultados. Gerenciei comunicação com mais de 7 milhões de clientes mensalmente.',
            metrics: [
                {
                    title: 'Gestão',
                    items: [
                        { label: 'Equipe', value: '8', unit: 'pessoas' },
                        { label: 'Orçamento', value: 'R$ 25M', unit: 'anual' }
                    ]
                },
                {
                    title: 'Resultados',
                    items: [
                        { label: 'Incremental', value: 'R$ 180M', unit: '+7% YoY' },
                        { label: 'Churn', value: '-23%', unit: 'redução' }
                    ]
                },
                {
                    title: 'Automação',
                    items: [
                        { label: 'Comunicações', value: '80%', unit: 'auto' },
                        { label: 'Economia', value: 'R$ 2,5M', unit: '/ano' }
                    ]
                }
            ]
        }
    ];

    // Elementos
    const timeline = document.getElementById('timeline');
    const detail = document.getElementById('detail');
    const cards = document.querySelectorAll('.card');

    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const detailPeriod = document.getElementById('detailPeriod');
    const detailCompany = document.getElementById('detailCompany');
    const detailPosition = document.getElementById('detailPosition');
    const detailDescription = document.getElementById('detailDescription');
    const metricsContainer = document.getElementById('metrics');

    let currentIndex = 0;

    // Abrir detalhe
    function openDetail(index) {
        currentIndex = index;
        updateDetail();
        timeline.classList.add('hidden');
        detail.classList.add('active');
    }

    // Fechar detalhe
    function closeDetail() {
        detail.classList.remove('active');
        timeline.classList.remove('hidden');
    }

    // Atualizar conteudo do detalhe
    function updateDetail() {
        const item = data[currentIndex];

        detailPeriod.textContent = item.period;
        detailCompany.textContent = item.company;
        detailPosition.textContent = item.position;
        detailDescription.textContent = item.description;

        // Renderizar metricas
        metricsContainer.innerHTML = item.metrics.map(metric => `
            <div class="metric">
                <h3 class="metric__title">${metric.title}</h3>
                ${metric.items.map(m => `
                    <div class="metric__item">
                        <div class="metric__label">${m.label}</div>
                        <div class="metric__value">${m.value}</div>
                        <div class="metric__unit">${m.unit}</div>
                    </div>
                `).join('')}
            </div>
        `).join('');

        // Atualizar botoes navegacao
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === data.length - 1;
    }

    // Navegacao
    function goToPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateDetail();
        }
    }

    function goToNext() {
        if (currentIndex < data.length - 1) {
            currentIndex++;
            updateDetail();
        }
    }

    // Event Listeners
    cards.forEach((card, index) => {
        card.addEventListener('click', () => openDetail(index));
    });

    closeBtn.addEventListener('click', closeDetail);
    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (!detail.classList.contains('active')) return;

        if (e.key === 'Escape') closeDetail();
        if (e.key === 'ArrowLeft') goToPrev();
        if (e.key === 'ArrowRight') goToNext();
    });

})();
