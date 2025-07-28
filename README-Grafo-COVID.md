# 🦠📊 Visualização Interativa COVID-19 - Grafo Epidemiológico Brasil

## 📋 Visão Geral

Aplicação web interativa que visualiza dados epidemiológicos da pandemia COVID-19 no Brasil através de um grafo de rede sobreposto ao mapa geográfico dos estados brasileiros. Utiliza análise de Machine Learning (BigQuery ML) para identificar clusters de similaridade epidemiológica.

## 🚀 Demonstração

**URL:** `proxima-tela.html`

![Screenshot da aplicação mostrando mapa do Brasil com grafo de conexões entre estados](docs/screenshot.png)

## 🛠️ Stack Tecnológica

- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **Visualização:** D3.js v7 + TopoJSON v3
- **Dados:** Google BigQuery Public Datasets
- **Análise:** BigQuery ML (clustering k-means)
- **Design:** Dark theme, cores neon, Boticário brand colors

## 📊 Estrutura dos Dados

### Arquivos de Dados

```
data/
├── grafo_nos.json          # Estados brasileiros (nós do grafo)
├── grafo_arestas.json      # Conexões epidemiológicas (arestas)
├── dados_covid_regioes.json # Dados regionais estruturados
└── grafo_aresta.json       # Metadados dos clusters
```

### Formato dos Nós (grafo_nos.json)
```json
{
  \"node_id\": 5,
  \"estado\": \"São Paulo\",
  \"regiao\": \"Sudeste\",
  \"latitude\": -23.5587,
  \"longitude\": -46.625,
  \"casos_per_100k\": 13858.91,
  \"cluster_id\": 2,
  \"categoria_impacto\": \"Impacto_Medio\"
}
```

### Formato das Arestas (grafo_arestas.json)
```json
{
  \"source\": \"São Paulo\",
  \"target\": \"Rio de Janeiro\",
  \"weight\": 0.85,
  \"corr_casos_simultaneos\": 0.78,
  \"cluster_match\": false,
  \"distance_km\": 358
}
```

## 🎯 Funcionalidades

### 🗺️ Visualização
- **Mapa do Brasil:** Silhueta geográfica dos estados como background
- **Nós:** Estados representados como círculos (tamanho ∝ casos/100k hab)
- **Arestas:** Conexões entre estados (espessura ∝ peso da correlação)
- **Clusters ML:** 5 grupos identificados por cores distintas

### 🎮 Interatividade
- **Zoom/Pan:** Navegação fluida com mouse/touch
- **Hover Tooltips:** Informações detalhadas sobre estados e conexões
- **Click:** Destaque das conexões do estado selecionado
- **Filtros Dinâmicos:** Por região, cluster, peso das conexões

### ⚙️ Controles
- **Toggle Conexões:** Mostrar/ocultar arestas do grafo
- **Toggle Estados:** Mostrar/ocultar nós dos estados  
- **Rótulos:** Exibir nomes dos estados
- **Slider Peso:** Filtrar conexões por força da correlação (0.0-1.0)
- **Dropdown Região:** Filtrar por região geográfica
- **Legenda Clusters:** Toggle individual dos clusters ML

## 🎨 Design System

### Cores dos Clusters
```css
Cluster 1 (Norte Isolado):     #FF6B6B
Cluster 2 (São Paulo):         #4ECDC4  
Cluster 3 (Nordeste-Sudeste):  #45B7D1
Cluster 4 (Norte-Nordeste):    #96CEB4
Cluster 5 (Sul-Centro):        #FFEAA7
```

### Paleta Boticário
```css
--azul-marinho: #011E38
--azul-royal: #264FEC  
--salmao: #FFBC82
--rosa-pink: #FF69B4
--off-white: #F5F1EB
```

## 📱 Responsividade

- **Desktop:** Layout completo com sidebar fixa
- **Tablet:** Sidebar colapsível com overlays
- **Mobile:** Interface adaptada para touch

## 🚀 Instalação e Uso

### Pré-requisitos
- Navegador moderno (Chrome 80+, Firefox 75+, Safari 13+)
- Servidor web local (para CORS dos arquivos JSON)

### Execução Local

1. **Clone/Download dos arquivos:**
   ```bash
   # Estrutura necessária:
   estudo_boticario/
   ├── proxima-tela.html
   ├── nova-etapa.html  
   └── data/
       ├── grafo_nos.json
       ├── grafo_arestas.json
       └── ...
   ```

2. **Servidor local simples:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2  
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx serve .
   
   # Live Server (VS Code)
   # Extensão: Live Server
   ```

3. **Acesso:**
   ```
   http://localhost:8000/proxima-tela.html
   ```

### Deploy

**Vercel/Netlify:**
```bash
# Upload da pasta completa
# Configurar index como proxima-tela.html
```

**GitHub Pages:**
```bash
git add .
git commit -m \"Add COVID-19 graph visualization\"
git push origin main
# Configurar Pages para servir da pasta raiz
```

## 🔧 Configuração Avançada

### Personalização das Cores
```javascript
// Editar em proxima-tela.html
const CONFIG = {
    clusters: {
        1: { color: '#SUA_COR', name: 'Seu Nome' },
        // ...
    }
};
```

### Ajuste da Projeção
```javascript
// Modificar projeção do mapa
projection = d3.geoMercator()
    .center([-54, -15])      // Centro do Brasil
    .scale(700)              // Zoom inicial
    .translate([width/2, height/2]);
```

### Filtros Customizados
```javascript
// Adicionar novos filtros
function customFilter(criteria) {
    const filtered = nodesData.filter(node => {
        return node.custom_field === criteria;
    });
    drawNodes(filtered);
}
```

## 📈 Performance

### Métricas Alvo
- **Carregamento inicial:** < 3 segundos
- **Interações:** 60fps (16.6ms/frame)
- **Zoom/Pan:** Fluido sem lag
- **Filtros:** Resposta < 100ms

### Otimizações Implementadas
- **Debounce** nos eventos de zoom
- **RequestAnimationFrame** para animações
- **Lazy loading** dos tooltips
- **Throttling** dos eventos de mouse
- **Canvas fallback** para > 1000 nós

## 🐛 Solução de Problemas

### Erro CORS
```
Acesso aos dados JSON bloqueado
→ Usar servidor web local (não file://)
```

### Mapa não aparece  
```
TopoJSON não carregou
→ Verificar conexão com internet
→ Backup local do arquivo TopoJSON
```

### Performance lenta
```
Muitas conexões renderizadas
→ Aumentar filtro de peso mínimo
→ Reduzir número de clusters ativos
```

### Responsividade quebrada
```
Layout não adapta em mobile
→ Verificar viewport meta tag
→ Testar em DevTools mobile
```

## 📋 Roadmap

### Versão 2.0
- [ ] Timeline temporal da pandemia
- [ ] Animação da propagação
- [ ] Dados de vacinação
- [ ] Comparação com outros países
- [ ] Export de imagens/dados
- [ ] API REST para dados dinâmicos

### Melhorias Técnicas
- [ ] WebGL para performance extrema
- [ ] Service Worker para cache
- [ ] Progressive Web App (PWA)
- [ ] Testes automatizados
- [ ] CI/CD pipeline

## 🤝 Contribuições

1. **Fork** do repositório
2. **Feature branch:** `git checkout -b feature/nova-funcionalidade`
3. **Commit:** `git commit -m 'Add: nova funcionalidade'`
4. **Push:** `git push origin feature/nova-funcionalidade`
5. **Pull Request** detalhado

## 📊 Dados e Fonte

**Origem:** Google BigQuery Public Datasets
- `covid19_public_data.covid19_global_cases`
- `covid19_public_data.mobility_reports` 
- `covid19_public_data.oxford_policy_tracker`

**Processamento:** BigQuery ML
- Algoritmo: K-Means clustering
- Features: casos/100k, mobilidade, stringency
- Clusters: 5 grupos epidemiológicos

**Atualização:** Dados estáticos de 2020-2021

## 📄 Licença

MIT License - Uso livre para projetos acadêmicos e comerciais.

## 🙏 Créditos

- **Dados:** Google BigQuery Public Datasets
- **Mapa:** IBGE TopoJSON (ruliana/br-atlas)
- **Visualização:** D3.js community
- **Design:** Boticário Brand Guidelines
- **Desenvolvimento:** 🤖 Generated with Claude Code

---

**🔗 Links Úteis:**
- [D3.js Documentation](https://d3js.org/)
- [TopoJSON Specification](https://github.com/topojson/topojson)
- [Google BigQuery Public Datasets](https://console.cloud.google.com/bigquery)
- [IBGE Geociências](https://www.ibge.gov.br/geociencias/)

**📧 Suporte:** Abra uma issue no repositório para dúvidas técnicas.