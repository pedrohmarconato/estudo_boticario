# 📊 Roteiro de Estudo: Evolução Epidemiológica COVID-19 Brasil

## 🎯 **Objetivo do Estudo**
Compreender a evolução temporal da pandemia de COVID-19 no Brasil através de análise visual interativa, utilizando grafos epidemiológicos e machine learning para identificar padrões de propagação.

---

## 🗓️ **Timeline de Evolução (Mar 2020 - Fev 2021)**

### **📍 Período 1: Mar 2020 - O Início**
- **Intensidade**: 10%
- **Epicentros**: São Paulo
- **Características**:
  - Primeiro caso confirmado no Brasil
  - Foco inicial na região metropolitana de SP
  - Conexões limitadas entre estados
- **O que observar**: 
  - São Paulo como único nó destacado
  - Poucas conexões ativas
  - Clusters ainda não formados

### **📍 Período 2: Abr 2020 - Expansão Metropolitana**
- **Intensidade**: 20%
- **Epicentros**: São Paulo, Rio de Janeiro
- **Características**:
  - Expansão para o eixo SP-RJ
  - Primeiras conexões fortes entre megacidades
  - Início da formação do Cluster 2 (SP) e Cluster 5 (RJ)
- **O que observar**:
  - Conexão forte SP ↔ RJ se destacando
  - Partículas viajantes entre os epicentros
  - Intensificação dos pulsos epidemiológicos

### **📍 Período 3: Mai 2020 - Corredor Nordeste**
- **Intensidade**: 40%
- **Epicentros**: São Paulo, Rio de Janeiro, Ceará
- **Características**:
  - Entrada do vírus no Nordeste via Ceará
  - Formação do Cluster 3 (Nordeste-Sudeste)
  - Conexões aéreas facilitando propagação
- **O que observar**:
  - Ceará se destacando como novo epicentro
  - Conexões MG ↔ CE começando a aparecer
  - Triangulação SP-RJ-CE

### **📍 Período 4: Jun 2020 - Amazônia Isolada**
- **Intensidade**: 50%
- **Epicentros**: SP, RJ, CE, Amazonas
- **Características**:
  - Colapso do sistema de saúde no Amazonas
  - Formação do Cluster 1 (Norte Isolado)
  - Propagação via hidrovias e transporte aéreo
- **O que observar**:
  - Amazonas como epicentro isolado geograficamente
  - Baixa conectividade com outros estados
  - Intensidade alta localizada

### **📍 Período 5: Jul 2020 - Interiorização**
- **Intensidade**: 70%
- **Epicentros**: SP, RJ, CE, AM, Bahia
- **Características**:
  - Interiorização da pandemia
  - Bahia como hub do Nordeste
  - Consolidação do Cluster 3
- **O que observar**:
  - Bahia conectando Nordeste e Sudeste
  - Aumento das conexões CE-BA-PE
  - Corredor epidemiológico bem definido

### **📍 Período 6: Ago 2020 - Consolidação Regional**
- **Intensidade**: 80%
- **Epicentros**: SP, RJ, CE, AM, BA, Minas Gerais
- **Características**:
  - MG como conector entre regiões
  - Consolidação dos clusters regionais
  - Pico de conexões inter-regionais
- **O que observar**:
  - MG como hub central do país
  - Múltiplas conexões simultâneas
  - Formação clara dos 5 clusters

### **📍 Período 7: Set 2020 - Expansão Sul**
- **Intensidade**: 90%
- **Epicentros**: SP, RJ, CE, AM, BA, MG, Paraná
- **Características**:
  - Entrada da Região Sul
  - PR como porta de entrada do Sul
  - Conexões Sul-Sudeste se intensificando
- **O que observar**:
  - Paraná se destacando no Sul
  - Conexões PR-SP se intensificando
  - Início do Cluster 5 (Sul-Centro)

### **📍 Período 8: Out 2020 - Pico Nacional**
- **Intensidade**: 100%
- **Epicentros**: SP, RJ, CE, AM, BA, MG, PR, Rio Grande do Sul
- **Características**:
  - Pico da pandemia no Brasil
  - Todos os clusters ativos simultaneamente
  - Máxima conectividade entre estados
- **O que observar**:
  - Máxima atividade de partículas
  - Todos os nós destacados
  - Pulsos epidemiológicos intensos
  - RS completando o eixo Sul

### **📍 Período 9: Nov 2020 - Estabilização**
- **Intensidade**: 95%
- **Epicentros**: SP, RJ, CE, AM, BA, MG, PR, RS, Santa Catarina
- **Características**:
  - Estabilização em níveis altos
  - SC completando a região Sul
  - Manutenção de conexões fortes
- **O que observar**:
  - Conexões RS-SC-PR bem definidas
  - Manutenção da intensidade
  - Clusters consolidados

### **📍 Período 10: Dez 2020 - Expansão Centro-Oeste**
- **Intensidade**: 85%
- **Epicentros**: Todos anteriores + Goiás
- **Características**:
  - Centro-Oeste entrando no cenário
  - GO como hub regional
  - Conexões com DF se intensificando
- **O que observar**:
  - Goiás se destacando
  - Conexões GO-DF evidentes
  - Expansão para o interior

### **📍 Período 11: Jan 2021 - Segunda Onda**
- **Intensidade**: 90%
- **Epicentros**: Todos anteriores + Pernambuco
- **Características**:
  - Segunda onda nacional
  - PE como novo epicentro nordestino
  - Intensificação das conexões existentes
- **O que observar**:
  - Pernambuco se destacando
  - Reativação de conexões
  - Aumento da intensidade geral

### **📍 Período 12: Fev 2021 - Estabilização Regional**
- **Intensidade**: 80%
- **Epicentros**: Todos anteriores + Maranhão
- **Características**:
  - MA completando o Cluster 4
  - Estabilização em níveis controlados
  - Preparação para vacinação
- **O que observar**:
  - Maranhão-Pará bem conectados
  - Diminuição gradual da intensidade
  - Manutenção dos clusters formados

---

## 🧠 **Conceitos para Estudar**

### **1. Clusters de Machine Learning**
- **Cluster 1 (Norte Isolado)**: Amazonas - Isolamento geográfico
- **Cluster 2 (São Paulo)**: Hub econômico nacional
- **Cluster 3 (Nordeste-Sudeste)**: Corredor principal
- **Cluster 4 (Norte-Nordeste)**: Maranhão-Pará
- **Cluster 5 (Sul-Centro)**: Múltiplos epicentros

### **2. Tipos de Conexões**
- **Correlação Forte (≥80%)**: Azul - Alto risco
- **Correlação Moderada (60-79%)**: Amarelo - Risco médio  
- **Correlação Fraca (<60%)**: Vermelho - Baixo risco

### **3. Indicadores Visuais**
- **Pulsos Epidemiológicos**: Epicentros de surtos
- **Partículas Viajantes**: Propagação entre estados
- **Intensidade de Nós**: Baseada em casos/100k habitantes
- **Espessura de Conexões**: Força da correlação temporal

---

## 🎮 **Como Usar a Ferramenta**

### **Controles Disponíveis**
1. **Slider Temporal**: Navegar pelos 12 meses
2. **Play/Pause**: Animação automática
3. **Reset**: Voltar ao início (Mar 2020)
4. **Velocidade**: 0.5x, 1x, 2x, 4x

### **Interações**
1. **Click nos Estados**: Ativa simulação epidemiológica
2. **Click nas Conexões**: Animação de propagação
3. **Hover**: Informações detalhadas em tooltip

### **Estatísticas em Tempo Real**
- **Epicentros Ativos**: Número de estados destacados
- **Intensidade**: Porcentagem da propagação
- **Indicador Visual**: Verde (baixo) → Amarelo (médio) → Vermelho (alto)

---

## 📚 **Roteiro de Estudo Sugerido**

### **Sessão 1: Entendimento Básico (30 min)**
1. Observe a evolução de Mar a Jun 2020
2. Identifique os primeiros epicentros
3. Note como as conexões se formam

### **Sessão 2: Análise de Clusters (45 min)**
1. Use velocidade 0.5x para análise detalhada
2. Observe a formação de cada cluster
3. Identifique padrões geográficos

### **Sessão 3: Correlações Epidemiológicas (30 min)**
1. Foque nas conexões entre estados
2. Observe diferentes tipos de correlação
3. Analise o impacto das distâncias

### **Sessão 4: Picos e Ondas (45 min)**
1. Identifique o pico em Out 2020
2. Observe a segunda onda em Jan 2021
3. Analise padrões de estabilização

### **Sessão 5: Síntese e Insights (30 min)**
1. Execute a timeline completa em velocidade 2x
2. Identifique 3 insights principais
3. Relacione com políticas públicas do período

---

## 🔍 **Perguntas para Reflexão**

1. **Por que São Paulo foi o primeiro epicentro?**
2. **Como a geografia influenciou a propagação?**
3. **Quais clusters se formaram mais rapidamente?**
4. **Por que o Amazonas ficou isolado?**
5. **Qual o papel de Minas Gerais como conector?**
6. **Como as conexões aéreas influenciaram a propagação?**
7. **Quais estados foram mais resistentes?**
8. **Como a densidade populacional afetou os clusters?**

---

## 📈 **Métricas para Análise**

### **Por Estado**
- Casos por 100k habitantes
- Clusters de classificação ML
- Número de conexões epidemiológicas
- Intensidade temporal

### **Por Conexão**
- Correlação de casos simultâneos
- Distância geográfica
- Peso da conexão
- Duração da atividade

### **Por Período**
- Número de epicentros ativos
- Intensidade epidemiológica geral
- Clusters formados
- Conexões ativas

---

## 🎯 **Objetivos de Aprendizagem**

Ao final do estudo, você deve conseguir:

1. **Identificar padrões** de propagação epidemiológica
2. **Compreender clusters** geográficos e temporais
3. **Analisar correlações** entre estados
4. **Relacionar geografia** com epidemiologia
5. **Interpretar dados** de machine learning aplicados à saúde pública
6. **Desenvolver insights** para políticas futuras

---

## 📋 **Checklist de Estudo**

- [ ] Navegação completa pela timeline
- [ ] Identificação dos 5 clusters
- [ ] Análise de pelo menos 5 conexões diferentes
- [ ] Observação de 3 padrões temporais
- [ ] Compreensão dos indicadores visuais
- [ ] Reflexão sobre 3 insights principais
- [ ] Relacionamento com contexto histórico da pandemia

---

**🚀 Dica Final**: Use a ferramenta como uma "máquina do tempo epidemiológica" para compreender como decisões e eventos impactaram a evolução da pandemia no Brasil!