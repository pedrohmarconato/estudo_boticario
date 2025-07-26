-- Queries de exemplo para análise de dados

-- 1. Top 10 produtos mais vendidos
SELECT 
    p.nome,
    p.categoria,
    SUM(v.quantidade) as total_vendido,
    SUM(v.valor_total) as receita_total
FROM vendas v
JOIN produtos p ON v.produto_id = p.id
GROUP BY p.id, p.nome, p.categoria
ORDER BY total_vendido DESC
LIMIT 10;

-- 2. Vendas mensais
SELECT 
    DATE_TRUNC('month', data_venda) as mes,
    COUNT(*) as num_vendas,
    SUM(quantidade) as total_itens,
    SUM(valor_total) as receita_mensal
FROM vendas
GROUP BY mes
ORDER BY mes;

-- 3. Clientes mais valiosos
SELECT 
    c.nome,
    c.email,
    COUNT(v.id) as num_compras,
    SUM(v.valor_total) as valor_total_gasto
FROM clientes c
JOIN vendas v ON c.id = v.cliente_id
GROUP BY c.id, c.nome, c.email
ORDER BY valor_total_gasto DESC
LIMIT 20;

-- 4. Análise de categorias
SELECT 
    p.categoria,
    COUNT(DISTINCT p.id) as num_produtos,
    SUM(v.quantidade) as total_vendido,
    SUM(v.valor_total) as receita_categoria,
    AVG(v.valor_total) as ticket_medio
FROM produtos p
LEFT JOIN vendas v ON p.id = v.produto_id
GROUP BY p.categoria
ORDER BY receita_categoria DESC;

-- 5. Tendência de vendas por dia da semana
SELECT 
    EXTRACT(DOW FROM data_venda) as dia_semana,
    COUNT(*) as num_vendas,
    SUM(valor_total) as receita_dia
FROM vendas
GROUP BY dia_semana
ORDER BY dia_semana;

-- 6. Produtos sem vendas
SELECT 
    p.id,
    p.nome,
    p.categoria,
    p.preco
FROM produtos p
LEFT JOIN vendas v ON p.id = v.produto_id
WHERE v.id IS NULL;

-- 7. Análise de sazonalidade
SELECT 
    EXTRACT(MONTH FROM data_venda) as mes,
    EXTRACT(YEAR FROM data_venda) as ano,
    SUM(valor_total) as receita_mensal
FROM vendas
GROUP BY ano, mes
ORDER BY ano, mes;