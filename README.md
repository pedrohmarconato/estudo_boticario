# Projeto de Documentação - Carreira e Estudo de Caso

Este projeto está dividido em duas seções principais:

## 1. Carreira
Seção dedicada à apresentação profissional com HTML puro e animações avançadas.

### Tecnologias utilizadas:
- HTML5
- CSS3 com animações customizadas
- JavaScript vanilla
- Frameworks de animação (GSAP, AOS, Three.js)
- Particles.js para efeitos visuais

### Como executar:
Abra o arquivo `carreira/index.html` em seu navegador.

## 2. Estudo de Caso
Análise de dados completa com visualizações e integração com IA.

### Tecnologias utilizadas:
- Python 3.8+
- Pandas, NumPy para análise de dados
- Matplotlib, Seaborn, Plotly para visualizações
- SQLAlchemy para gerenciamento de banco de dados
- LangChain para integração com IA
- Streamlit para dashboard interativo

### Configuração:
1. Crie um ambiente virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

2. Instale as dependências:
   ```bash
   cd estudo_de_caso
   pip install -r requirements.txt
   ```

3. Configure o ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. Crie o banco de dados:
   ```bash
   python scripts/database_setup.py
   ```

5. Execute o dashboard:
   ```bash
   streamlit run visualizacoes/dashboard.py
   ```

## Estrutura do Projeto

```
.
├── carreira/               # Seção de apresentação profissional
│   ├── index.html         # Página principal
│   ├── css/               # Estilos e animações
│   ├── js/                # Scripts e animações
│   └── assets/            # Imagens e recursos
│
└── estudo_de_caso/        # Análise de dados
    ├── data/              # Dados brutos
    ├── scripts/           # Scripts Python
    ├── notebooks/         # Jupyter notebooks
    ├── sql/               # Queries SQL
    ├── visualizacoes/     # Dashboards e gráficos
    └── requirements.txt   # Dependências Python
```