// Visualização simplificada de grafos COVID-19 com dados inline

class CovidGraphVisualization {
    constructor(containerId) {
        this.container = d3.select(containerId);
        
        // Dados inline para evitar problemas de carregamento
        this.data = {
            "states": [
                {
                    "id": "SP",
                    "name": "São Paulo",
                    "lat": -23.5505,
                    "lng": -46.6333,
                    "population": 46649132,
                    "cases": [
                        {"date": "2020-03", "value": 1200, "deaths": 48},
                        {"date": "2020-04", "value": 15000, "deaths": 1200},
                        {"date": "2020-05", "value": 89000, "deaths": 6700},
                        {"date": "2020-06", "value": 248000, "deaths": 14200},
                        {"date": "2020-07", "value": 489000, "deaths": 22700},
                        {"date": "2020-08", "value": 743000, "deaths": 28900}
                    ],
                    "mobility": {
                        "retail": -42,
                        "parks": -47,
                        "transit": -55,
                        "workplaces": -38
                    }
                },
                {
                    "id": "RJ",
                    "name": "Rio de Janeiro",
                    "lat": -22.9068,
                    "lng": -43.1729,
                    "population": 17463349,
                    "cases": [
                        {"date": "2020-03", "value": 800, "deaths": 25},
                        {"date": "2020-04", "value": 8000, "deaths": 700},
                        {"date": "2020-05", "value": 45000, "deaths": 4500},
                        {"date": "2020-06", "value": 106000, "deaths": 9500},
                        {"date": "2020-07", "value": 156000, "deaths": 13000},
                        {"date": "2020-08", "value": 203000, "deaths": 15400}
                    ]
                },
                {
                    "id": "MG",
                    "name": "Minas Gerais",
                    "lat": -19.9167,
                    "lng": -43.9333,
                    "population": 21411923,
                    "cases": [
                        {"date": "2020-03", "value": 200, "deaths": 5},
                        {"date": "2020-04", "value": 2000, "deaths": 90},
                        {"date": "2020-05", "value": 11000, "deaths": 380},
                        {"date": "2020-06", "value": 38000, "deaths": 840},
                        {"date": "2020-07", "value": 98000, "deaths": 2100},
                        {"date": "2020-08", "value": 178000, "deaths": 4200}
                    ]
                },
                {
                    "id": "BA",
                    "name": "Bahia",
                    "lat": -12.9714,
                    "lng": -38.5014,
                    "population": 14985284,
                    "cases": [
                        {"date": "2020-03", "value": 150, "deaths": 3},
                        {"date": "2020-04", "value": 3000, "deaths": 110},
                        {"date": "2020-05", "value": 19000, "deaths": 680},
                        {"date": "2020-06", "value": 55000, "deaths": 1700},
                        {"date": "2020-07", "value": 115000, "deaths": 2900},
                        {"date": "2020-08", "value": 195000, "deaths": 4000}
                    ]
                },
                {
                    "id": "RS",
                    "name": "Rio Grande do Sul",
                    "lat": -30.0346,
                    "lng": -51.2177,
                    "population": 11466630,
                    "cases": [
                        {"date": "2020-03", "value": 180, "deaths": 4},
                        {"date": "2020-04", "value": 1400, "deaths": 50},
                        {"date": "2020-05", "value": 7200, "deaths": 210},
                        {"date": "2020-06", "value": 23000, "deaths": 520},
                        {"date": "2020-07", "value": 62000, "deaths": 1500},
                        {"date": "2020-08", "value": 112000, "deaths": 3100}
                    ]
                },
                {
                    "id": "PR",
                    "name": "Paraná",
                    "lat": -25.4284,
                    "lng": -49.2733,
                    "population": 11597484,
                    "cases": [
                        {"date": "2020-03", "value": 120, "deaths": 3},
                        {"date": "2020-04", "value": 1100, "deaths": 60},
                        {"date": "2020-05", "value": 5300, "deaths": 190},
                        {"date": "2020-06", "value": 20000, "deaths": 470},
                        {"date": "2020-07", "value": 54000, "deaths": 1300},
                        {"date": "2020-08", "value": 98000, "deaths": 2500}
                    ]
                },
                {
                    "id": "PE",
                    "name": "Pernambuco",
                    "lat": -8.0476,
                    "lng": -34.8770,
                    "population": 9674793,
                    "cases": [
                        {"date": "2020-03", "value": 90, "deaths": 5},
                        {"date": "2020-04", "value": 5700, "deaths": 450},
                        {"date": "2020-05", "value": 30000, "deaths": 2400},
                        {"date": "2020-06", "value": 52000, "deaths": 4200},
                        {"date": "2020-07", "value": 78000, "deaths": 5800},
                        {"date": "2020-08", "value": 105000, "deaths": 7000}
                    ]
                },
                {
                    "id": "CE",
                    "name": "Ceará",
                    "lat": -3.7172,
                    "lng": -38.5434,
                    "population": 9240580,
                    "cases": [
                        {"date": "2020-03", "value": 200, "deaths": 5},
                        {"date": "2020-04", "value": 8800, "deaths": 550},
                        {"date": "2020-05", "value": 37000, "deaths": 2400},
                        {"date": "2020-06", "value": 80000, "deaths": 4900},
                        {"date": "2020-07", "value": 130000, "deaths": 6800},
                        {"date": "2020-08", "value": 175000, "deaths": 7900}
                    ]
                },
                {
                    "id": "SC",
                    "name": "Santa Catarina",
                    "lat": -27.5954,
                    "lng": -48.5480,
                    "population": 7338473,
                    "cases": [
                        {"date": "2020-03", "value": 100, "deaths": 1},
                        {"date": "2020-04", "value": 1200, "deaths": 40},
                        {"date": "2020-05", "value": 7000, "deaths": 120},
                        {"date": "2020-06", "value": 26000, "deaths": 350},
                        {"date": "2020-07", "value": 78000, "deaths": 1000},
                        {"date": "2020-08", "value": 145000, "deaths": 2000}
                    ]
                },
                {
                    "id": "PA",
                    "name": "Pará",
                    "lat": -1.4558,
                    "lng": -48.4902,
                    "population": 8777124,
                    "cases": [
                        {"date": "2020-03", "value": 40, "deaths": 1},
                        {"date": "2020-04", "value": 2400, "deaths": 160},
                        {"date": "2020-05", "value": 25000, "deaths": 2100},
                        {"date": "2020-06", "value": 75000, "deaths": 4300},
                        {"date": "2020-07", "value": 130000, "deaths": 5600},
                        {"date": "2020-08", "value": 175000, "deaths": 6300}
                    ]
                }
            ],
            "connections": [
                {"source": "SP", "target": "RJ", "strength": 0.9},
                {"source": "SP", "target": "MG", "strength": 0.8},
                {"source": "SP", "target": "PR", "strength": 0.7},
                {"source": "RJ", "target": "MG", "strength": 0.7},
                {"source": "RJ", "target": "BA", "strength": 0.5},
                {"source": "MG", "target": "BA", "strength": 0.6},
                {"source": "BA", "target": "PE", "strength": 0.8},
                {"source": "PE", "target": "CE", "strength": 0.8},
                {"source": "RS", "target": "SC", "strength": 0.9},
                {"source": "RS", "target": "PR", "strength": 0.8},
                {"source": "PR", "target": "SC", "strength": 0.9},
                {"source": "CE", "target": "PA", "strength": 0.4}
            ]
        };
        
        this.simulation = null;
        this.selectedNode = null;
        this.currentDate = '2020-03';
        this.isPlaying = false;
        this.playInterval = null;
        
        // Dimensões
        this.width = 900;
        this.height = 600;
        this.margin = { top: 20, right: 20, bottom: 20, left: 20 };
        
        // Escalas
        this.colorScale = d3.scaleSequential(d3.interpolateReds);
        this.radiusScale = d3.scaleSqrt().range([15, 60]);
        this.linkWidthScale = d3.scaleLinear().range([1, 8]);
        
        // Elementos do tooltip
        this.tooltip = d3.select('body').append('div')
            .attr('class', 'graph-tooltip')
            .style('opacity', 0);
    }
    
    init() {
        console.log('Iniciando visualização simplificada...');
        
        // Remove loading spinner
        const loadingElement = this.container.select('.graph-loading');
        if (loadingElement.node()) {
            loadingElement.remove();
        }
        
        // Configura escalas
        this.setupScales();
        
        // Cria visualização
        this.createVisualization();
        
        // Configura controles
        this.setupControls();
        
        // Renderiza estado inicial
        this.update();
    }
    
    setupScales() {
        // Escala de cores baseada no número de casos
        const maxCases = d3.max(this.data.states, d => 
            d3.max(d.cases, c => c.value)
        );
        this.colorScale.domain([0, maxCases]);
        
        // Escala de raio baseada em casos
        this.radiusScale.domain([0, maxCases]);
        
        // Escala de largura das conexões
        this.linkWidthScale.domain([0, 1]);
    }
    
    createVisualization() {
        // Container SVG
        this.svg = this.container.append('svg')
            .attr('id', 'brazil-map-svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('viewBox', `0 0 ${this.width} ${this.height}`)
            .style('background', '#f8f9fa');
        
        // Grupo principal com zoom
        const g = this.svg.append('g')
            .attr('class', 'main-group');
        
        // Zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([0.5, 4])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });
        
        this.svg.call(zoom);
        
        // Grupos para diferentes camadas
        this.linkGroup = g.append('g').attr('class', 'links');
        this.nodeGroup = g.append('g').attr('class', 'nodes');
        
        // Força de simulação
        this.simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id(d => d.id).distance(150))
            .force('charge', d3.forceManyBody().strength(-500))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide().radius(d => this.getNodeRadius(d) + 5));
    }
    
    update() {
        // Prepara dados para o período atual
        const currentData = this.prepareData();
        
        // Atualiza links
        this.updateLinks(currentData.links);
        
        // Atualiza nós
        this.updateNodes(currentData.nodes);
        
        // Reinicia simulação
        this.simulation.nodes(currentData.nodes);
        this.simulation.force('link').links(currentData.links);
        this.simulation.alpha(0.3).restart();
        
        // Atualiza estatísticas
        this.updateStats(currentData);
    }
    
    prepareData() {
        // Filtra dados para o período atual
        const nodes = this.data.states.map(state => {
            const currentCase = state.cases.find(c => c.date === this.currentDate) || 
                              { value: 0, deaths: 0 };
            
            return {
                ...state,
                currentCases: currentCase.value,
                currentDeaths: currentCase.deaths,
                radius: this.getNodeRadius({ currentCases: currentCase.value })
            };
        });
        
        // Prepara links com força baseada na conexão
        const links = this.data.connections.map(conn => ({
            ...conn,
            source: conn.source,
            target: conn.target,
            value: conn.strength
        }));
        
        return { nodes, links };
    }
    
    updateNodes(nodes) {
        const node = this.nodeGroup.selectAll('.graph-node')
            .data(nodes, d => d.id);
        
        // Remove nós antigos
        node.exit().remove();
        
        // Adiciona novos nós
        const nodeEnter = node.enter()
            .append('g')
            .attr('class', 'graph-node')
            .call(this.drag());
        
        // Círculo principal
        nodeEnter.append('circle')
            .attr('r', d => d.radius)
            .attr('fill', d => this.colorScale(d.currentCases))
            .attr('stroke', '#fff')
            .attr('stroke-width', 3)
            .style('cursor', 'pointer')
            .on('mouseover', (event, d) => this.showTooltip(event, d))
            .on('mousemove', (event) => this.moveTooltip(event))
            .on('mouseout', () => this.hideTooltip())
            .on('click', (event, d) => this.selectNode(d));
        
        // Label do estado
        nodeEnter.append('text')
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .style('fill', '#fff')
            .style('font-weight', 'bold')
            .style('font-size', '14px')
            .style('pointer-events', 'none')
            .text(d => d.id);
        
        // Merge e atualiza
        const nodeUpdate = nodeEnter.merge(node);
        
        nodeUpdate.select('circle')
            .transition()
            .duration(500)
            .attr('r', d => d.radius)
            .attr('fill', d => this.colorScale(d.currentCases));
        
        // Atualiza posição durante simulação
        this.simulation.on('tick', () => {
            nodeUpdate.attr('transform', d => `translate(${d.x},${d.y})`);
            this.linkGroup.selectAll('.graph-link')
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);
        });
    }
    
    updateLinks(links) {
        const link = this.linkGroup.selectAll('.graph-link')
            .data(links, d => `${d.source.id || d.source}-${d.target.id || d.target}`);
        
        // Remove links antigos
        link.exit().remove();
        
        // Adiciona novos links
        const linkEnter = link.enter()
            .append('line')
            .attr('class', 'graph-link')
            .attr('stroke', '#264FEC')
            .attr('stroke-opacity', 0.3)
            .attr('stroke-width', d => this.linkWidthScale(d.value));
        
        // Merge e atualiza
        linkEnter.merge(link)
            .transition()
            .duration(500)
            .attr('stroke-width', d => this.linkWidthScale(d.value))
            .attr('stroke-opacity', d => d.value * 0.6);
    }
    
    getNodeRadius(d) {
        return this.radiusScale(d.currentCases || 0);
    }
    
    drag() {
        return d3.drag()
            .on('start', (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on('drag', (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on('end', (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });
    }
    
    selectNode(node) {
        // Remove seleção anterior
        this.nodeGroup.selectAll('.graph-node circle')
            .style('stroke', '#fff')
            .style('stroke-width', 3);
        
        // Seleciona novo nó
        this.selectedNode = node;
        
        // Destaca nó selecionado
        this.nodeGroup.selectAll('.graph-node')
            .filter(d => d.id === node.id)
            .select('circle')
            .style('stroke', '#FFBC82')
            .style('stroke-width', 5);
        
        // Destaca conexões
        this.linkGroup.selectAll('.graph-link')
            .style('stroke', d => 
                (d.source.id === node.id || d.target.id === node.id) ? '#FFBC82' : '#264FEC'
            )
            .style('stroke-width', d => 
                (d.source.id === node.id || d.target.id === node.id) ? 4 : this.linkWidthScale(d.value)
            );
    }
    
    showTooltip(event, d) {
        const formatNumber = d3.format(',');
        
        this.tooltip.transition()
            .duration(200)
            .style('opacity', 1);
        
        this.tooltip.html(`
            <div class="tooltip-header">${d.name}</div>
            <div class="tooltip-content">
                <div class="tooltip-row">
                    <span class="tooltip-label">Casos:</span>
                    <span class="tooltip-value">${formatNumber(d.currentCases)}</span>
                </div>
                <div class="tooltip-row">
                    <span class="tooltip-label">Óbitos:</span>
                    <span class="tooltip-value">${formatNumber(d.currentDeaths)}</span>
                </div>
                <div class="tooltip-row">
                    <span class="tooltip-label">População:</span>
                    <span class="tooltip-value">${formatNumber(d.population)}</span>
                </div>
                <div class="tooltip-row">
                    <span class="tooltip-label">Taxa por 100k:</span>
                    <span class="tooltip-value">
                        ${((d.currentCases / d.population) * 100000).toFixed(1)}
                    </span>
                </div>
            </div>
        `);
        
        this.moveTooltip(event);
    }
    
    moveTooltip(event) {
        this.tooltip
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px');
    }
    
    hideTooltip() {
        this.tooltip.transition()
            .duration(200)
            .style('opacity', 0);
    }
    
    setupControls() {
        // Timeline slider
        const slider = document.getElementById('timeline-slider');
        if (slider) {
            slider.addEventListener('input', (e) => {
                const dates = this.getUniqueDates();
                const index = parseInt(e.target.value);
                this.currentDate = dates[index];
                this.updateDateDisplay();
                this.update();
            });
        }
        
        // Botão Play/Pause
        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', () => this.togglePlay());
        }
        
        // Botão Reset
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.reset());
        }
    }
    
    togglePlay() {
        this.isPlaying = !this.isPlaying;
        const playBtn = document.getElementById('play-btn');
        
        if (this.isPlaying) {
            playBtn.classList.add('active');
            playBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
            this.startAnimation();
        } else {
            playBtn.classList.remove('active');
            playBtn.innerHTML = '<i class="fas fa-play"></i> Reproduzir';
            this.stopAnimation();
        }
    }
    
    startAnimation() {
        const dates = this.getUniqueDates();
        let currentIndex = dates.indexOf(this.currentDate);
        
        this.playInterval = setInterval(() => {
            currentIndex++;
            if (currentIndex >= dates.length) {
                currentIndex = 0;
            }
            
            this.currentDate = dates[currentIndex];
            this.updateDateDisplay();
            this.updateSlider(currentIndex);
            this.update();
        }, 1500);
    }
    
    stopAnimation() {
        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
    }
    
    reset() {
        // Para animação
        this.stopAnimation();
        this.isPlaying = false;
        
        // Reseta para primeira data
        const dates = this.getUniqueDates();
        this.currentDate = dates[0];
        
        // Atualiza controles
        this.updateDateDisplay();
        this.updateSlider(0);
        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            playBtn.classList.remove('active');
            playBtn.innerHTML = '<i class="fas fa-play"></i> Reproduzir';
        }
        
        // Reseta visualização
        this.selectedNode = null;
        this.nodeGroup.selectAll('.graph-node circle')
            .style('stroke', '#fff')
            .style('stroke-width', 3);
        
        // Atualiza
        this.update();
    }
    
    getUniqueDates() {
        return [...new Set(
            this.data.states.flatMap(s => s.cases.map(c => c.date))
        )].sort();
    }
    
    updateDateDisplay() {
        const dateDisplay = document.getElementById('current-date');
        if (dateDisplay) {
            const [year, month] = this.currentDate.split('-');
            const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
                              'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
            dateDisplay.textContent = `${monthNames[parseInt(month) - 1]} ${year}`;
        }
    }
    
    updateSlider(index) {
        const slider = document.getElementById('timeline-slider');
        if (slider) {
            slider.value = index;
        }
    }
    
    updateStats(data) {
        const totalCases = d3.sum(data.nodes, d => d.currentCases);
        const totalDeaths = d3.sum(data.nodes, d => d.currentDeaths);
        const affectedStates = data.nodes.filter(d => d.currentCases > 0).length;
        
        // Atualiza cards de estatísticas
        const updateStat = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = d3.format(',')(value);
            }
        };
        
        updateStat('total-cases', totalCases);
        updateStat('total-deaths', totalDeaths);
        updateStat('affected-states', affectedStates);
        
        // Taxa de letalidade
        const letalityRate = totalCases > 0 ? (totalDeaths / totalCases * 100).toFixed(1) : '0.0';
        const letalityElement = document.getElementById('letality-rate');
        if (letalityElement) {
            letalityElement.textContent = `${letalityRate}%`;
        }
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos na página correta
    const graphContainer = document.getElementById('covid-graph-container');
    if (graphContainer) {
        const visualization = new CovidGraphVisualization('#covid-graph-container');
        visualization.init();
    }
});