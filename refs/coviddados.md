# Relatórios e estudos sobre dados de mobilidade do Google e COVID-19 no Brasil

Durante 2020 e 2021, múltiplas instituições brasileiras e internacionais conduziram análises robustas cruzando dados do Google Community Mobility Reports com informações epidemiológicas de COVID-19 no Brasil. **O principal achado: reduções de 36% na mobilidade para varejo/recreação correlacionaram-se com diminuições significativas na transmissão viral, com defasagem temporal de 1-14 dias**. Essas pesquisas forneceram insights fundamentais para políticas públicas e demonstraram como dados de mobilidade podem prever e mitigar surtos pandêmicos.

## Principais estudos acadêmicos identificados

### Pesquisas internacionais com análise brasileira

O estudo "Community movement and COVID-19: a global study using Google's Community Mobility Reports", publicado na Cambridge Core por Sulyok e Walker (2020), analisou 135 países incluindo o Brasil. A pesquisa utilizou análises de correlação cruzada com Kendall's τ, revelando que **o Brasil apresentou correlações fracas com defasagens próximas a 0 dias**, contrastando com países industrializados ocidentais que mostraram correlações mais fortes e defasagens maiores.

A Oxford Academic publicou "Social distancing in Latin America during the COVID-19 pandemic", comparando Brasil, Chile, Bolívia, Colômbia e Peru. O estudo mostrou que **o índice de rigor brasileiro atingiu 80 no final de abril de 2020**, resultando em declínios de aproximadamente 50% em visitas a parques e locais de varejo/recreação, mas apenas 20% em mercearias e farmácias.

### Estudos focados no Brasil

A pesquisa "Urban mobility and COVID-19 in Brazil: Comparison between 2020 and 2021", publicada na SciELO Brasil, examinou Pernambuco usando os seis indicadores de mobilidade do Google. **Em 2020, as maiores reduções ocorreram em varejo/recreação (-36,0%) e parques (-32,9%)**. As correlações de Spearman revelaram associações positivas significativas entre proximidade aos níveis basais de mobilidade e aumento de casos.

O estudo "Measuring the mobility impact on the COVID-19 pandemic", da Universidade Federal de Pernambuco e Sapienza (2022), aplicou modelos de regressão linear generalizada em todas as 27 federações brasileiras. A pesquisa mediu **o impacto dinâmico agregado da mobilidade em cada categoria socioeconômica**, fornecendo estimativas precisas de defasagem temporal entre contágio e divulgação de dados.

A Fiocruz publicou múltiplos estudos, incluindo "Assessing the spread of COVID-19 in Brazil", que utilizou modelos probabilísticos para calcular a probabilidade de disseminação a partir de São Paulo e Rio de Janeiro. **As regiões Norte e Nordeste foram identificadas como áreas de alto risco devido à combinação de vulnerabilidade social e padrões de mobilidade**.

## Metodologias técnicas e implementação em BigQuery

### Estrutura dos dados públicos

Os estudos utilizaram principalmente três conjuntos de dados públicos no BigQuery:

**Google Community Mobility Reports** (`bigquery-public-data.covid19_google_mobility`)
- Tabela principal: `mobility_report`
- Campos essenciais: percentuais de mudança em relação à linha de base para seis categorias de locais
- Granularidade: nacional, estadual e municipal

**COVID-19 Open Data** (`bigquery-public-data.covid19_open_data`)
- Casos e óbitos diários por localização geográfica
- Integração direta com dados de mobilidade via campos de data e localização

### Exemplos de consultas SQL utilizadas

A consulta básica para correlação entre mobilidade e casos seguiu este padrão:

```sql
WITH mobility_data AS (
  SELECT 
    sub_region_1,
    date,
    AVG(retail_and_recreation_percent_change_from_baseline) as avg_retail,
    AVG(workplaces_percent_change_from_baseline) as avg_workplace
  FROM `bigquery-public-data.covid19_google_mobility.mobility_report`
  WHERE country_region = 'Brazil'
  GROUP BY sub_region_1, date
),
covid_data AS (
  SELECT 
    subregion1_name,
    date,
    SUM(new_confirmed) as daily_new_cases,
    SUM(new_deceased) as daily_new_deaths
  FROM `bigquery-public-data.covid19_open_data.covid19_open_data`
  WHERE country_code = 'BR'
  GROUP BY subregion1_name, date
)
SELECT 
  m.*,
  c.daily_new_cases,
  c.daily_new_deaths,
  CORR(m.avg_retail, c.daily_new_cases) OVER (
    PARTITION BY m.sub_region_1 
    ORDER BY m.date 
    ROWS BETWEEN 13 PRECEDING AND CURRENT ROW
  ) as rolling_correlation
FROM mobility_data m
JOIN covid_data c
  ON m.sub_region_1 = c.subregion1_name
  AND m.date = c.date
```

### Ferramentas de BI implementadas

**Looker Studio** foi amplamente utilizado com o Data Block pré-construído para Community Mobility Reports, permitindo visualizações em tempo real. **Power BI** implementou conexões DirectQuery para análise em tempo real, enquanto **Tableau** focou em mapas de calor mostrando correlações mobilidade-COVID por região.

Os pipelines de processamento incluíram Cloud Functions para ingestão de dados, Dataflow para ETL, e Cloud Scheduler para automação. A arquitetura permitiu análises em tempo real e modelagem preditiva usando bibliotecas Python como PyStan para modelagem bayesiana.

## Principais descobertas e correlações

### Defasagem temporal e eficácia das medidas

O estudo de Fortaleza identificou **correlação máxima com defasagem de -1 dia** entre fluxo veicular e número de reprodução R(t), sugerindo que mudanças na mobilidade precedem imediatamente alterações na transmissão. Análises mais amplas mostraram impactos nas taxas de infecção **2-5 semanas após reduções de mobilidade**, considerando período de incubação e atrasos de notificação.

As correlações específicas por categoria em Pernambuco revelaram:
- Mercearias/farmácias: ρ = 0,291 (p<0,001) - maior correlação
- Varejo/recreação: ρ = 0,187 (p=0,001)
- Locais de trabalho: ρ = 0,185 (p=0,001)
- Residencial: ρ = -0,127 (p=0,030) - correlação inversa esperada

### Diferenças regionais e impacto socioeconômico

São Paulo emergiu como **hub mais central que Rio de Janeiro para risco de disseminação**, enquanto as regiões Norte e Nordeste apresentaram maior vulnerabilidade devido a condições socioeconômicas. **Áreas metropolitanas experimentaram os maiores impactos nos primeiros 30 dias de restrições**, com capitais estaduais servindo como epicentros iniciais.

O caso de Araraquara destacou-se como primeira cidade brasileira a implementar lockdown rigoroso em 2021, **alcançando redução de 80% nas mortes**. Essa experiência demonstrou a eficácia de medidas rigorosas quando implementadas adequadamente.

### Comparações internacionais

Enquanto Europa e EUA apresentaram reduções de 20-70% nas taxas de infecção com restrições de mobilidade, **o Brasil mostrou padrões similares de timing mas correlações mais fracas**, possivelmente devido a menor adesão, coordenação federal limitada e desigualdades socioeconômicas que dificultaram o cumprimento de restrições.

## Organizações e pesquisadores-chave

### Instituições brasileiras líderes

A **Fundação Oswaldo Cruz (Fiocruz)** destacou-se como principal hub de pesquisa, com o Programa de Computação Científica (PROCC) liderando análises computacionais. Pesquisadores-chave incluem Flávio C. Coelho (modelagem epidemiológica), Raquel M. Lana (epidemiologia geográfica) e Daniel Villela (análise de disseminação).

O **Instituto de Pesquisa Econômica Aplicada (IPEA)** contribuiu através do Projeto Acesso a Oportunidades, liderado por Rafael H.M. Pereira, focando em mobilidade urbana e acessibilidade a serviços de saúde durante a pandemia.

Universidades federais como UFRJ, UFMG e USP formaram redes colaborativas, com destaque para o Instituto Luiz Alberto Coimbra (COPPE/UFRJ) em modelagem de mobilidade pandêmica.

### Colaborações internacionais

Northeastern University (Boston) colaborou através do projeto GLEAM com Alessandro Vespignani e Ana Pastore y Piontti. Harvard, Brown e Columbia Universities contribuíram com expertise em modelagem de doenças e avaliação de políticas públicas.

## Recomendações estratégicas para cenários futuros

### Timing de intervenção

Simulações demonstraram que **curvas de contágio poderiam ter sido significativamente mais suaves se restrições de mobilidade fossem impostas imediatamente após confirmação do primeiro caso**. A recomendação é implementar restrições dentro de 1-3 dias da detecção de transmissão comunitária, usando dados de mobilidade em tempo real como sistema de alerta precoce.

### Priorização de categorias de mobilidade

Focar restrições em **varejo/recreação e parques para máximo impacto**, mantendo acesso a serviços essenciais como mercearias/farmácias com protocolos de segurança. Políticas de trabalho remoto devem ser tratadas como investimento em infraestrutura de longo prazo.

### Adaptação regional e equidade

Investir em monitoramento de mobilidade em nível de bairro permite políticas direcionadas. **Combinar dados de mobilidade com indicadores socioeconômicos** garante design de políticas equitativas. Mapear vulnerabilidade social junto com padrões de mobilidade identificou populações que necessitam suporte adicional para cumprir restrições.

### Infraestrutura tecnológica e de dados

Integrar múltiplas fontes (Google/Apple, sistemas locais de tráfego como DETRAN) fornece visão abrangente. Desenvolver **modelos epidêmicos incorporando parâmetros de mobilidade para estimativa contínua de R(t)** permite resposta adaptativa. Implementar sistemas de monitoramento que preservem privacidade individual mantém confiança pública.

### Construção de resiliência de longo prazo

As lições da pandemia devem informar planejamento urbano sustentável, promovendo transporte ativo e reduzindo dependência de transporte público lotado. **Construir capacidade de UTI e teste em regiões vulneráveis** identificadas através de análise de mobilidade prepara o sistema de saúde para futuros surtos.

## Conclusão

A integração de dados de mobilidade do Google com informações epidemiológicas de COVID-19 no Brasil durante 2020-2021 forneceu insights sem precedentes sobre dinâmicas de transmissão e eficácia de intervenções. **A capacidade de prever surtos com 1-14 dias de antecedência através de padrões de mobilidade** representa ferramenta poderosa para preparação pandêmica futura. As metodologias desenvolvidas, especialmente implementações em BigQuery e modelos bayesianos, estabeleceram frameworks replicáveis para análise em tempo real. Para o Grupo Boticário, essas descobertas oferecem base sólida para desenvolver estratégias de continuidade de negócios que considerem padrões de mobilidade, vulnerabilidades regionais e necessidade de resposta rápida em cenários pandêmicos futuros.