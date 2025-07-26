import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scripts.data_analysis import DataAnalyzer

st.set_page_config(
    page_title="Dashboard de Análise",
    page_icon="📊",
    layout="wide"
)

@st.cache_data
def load_data():
    analyzer = DataAnalyzer()
    analyzer.load_data_from_db()
    return analyzer

def main():
    st.title("📊 Dashboard de Análise de Vendas")
    st.markdown("---")
    
    # Sidebar
    st.sidebar.title("Filtros")
    
    try:
        analyzer = load_data()
        
        # Métricas principais
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.metric(
                "Total de Vendas",
                f"R$ {analyzer.df_vendas['valor_total'].sum():,.2f}"
            )
        
        with col2:
            st.metric(
                "Número de Clientes",
                f"{len(analyzer.df_clientes):,}"
            )
        
        with col3:
            st.metric(
                "Produtos Cadastrados",
                f"{len(analyzer.df_produtos):,}"
            )
        
        with col4:
            st.metric(
                "Ticket Médio",
                f"R$ {analyzer.df_vendas['valor_total'].mean():.2f}"
            )
        
        st.markdown("---")
        
        # Gráficos
        col1, col2 = st.columns(2)
        
        with col1:
            st.subheader("Vendas por Produto")
            sales_by_product = analyzer.analyze_sales_by_product()
            fig = px.bar(
                sales_by_product.nlargest(10, 'valor_total'),
                x='nome',
                y='valor_total',
                color='valor_total',
                color_continuous_scale='Blues'
            )
            fig.update_layout(height=400)
            st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            st.subheader("Evolução Temporal das Vendas")
            monthly_sales = analyzer.analyze_sales_timeline()
            fig = go.Figure()
            fig.add_trace(go.Scatter(
                x=monthly_sales['mes'].astype(str),
                y=monthly_sales['valor_total'],
                mode='lines+markers',
                name='Valor Total',
                line=dict(color='#1f77b4', width=3)
            ))
            fig.update_layout(height=400)
            st.plotly_chart(fig, use_container_width=True)
        
        st.markdown("---")
        
        # Tabela de dados
        st.subheader("Detalhamento de Vendas")
        
        # Filtros para a tabela
        col1, col2, col3 = st.columns(3)
        
        with col1:
            produto_filter = st.selectbox(
                "Filtrar por Produto",
                ["Todos"] + analyzer.df_produtos['nome'].tolist()
            )
        
        with col2:
            data_inicio = st.date_input(
                "Data Início",
                datetime.now() - timedelta(days=30)
            )
        
        with col3:
            data_fim = st.date_input(
                "Data Fim",
                datetime.now()
            )
        
        # Aplicar filtros
        df_vendas_filtrado = analyzer.df_vendas.copy()
        
        if produto_filter != "Todos":
            produto_id = analyzer.df_produtos[
                analyzer.df_produtos['nome'] == produto_filter
            ]['id'].values[0]
            df_vendas_filtrado = df_vendas_filtrado[
                df_vendas_filtrado['produto_id'] == produto_id
            ]
        
        # Mostrar tabela
        st.dataframe(
            df_vendas_filtrado.head(20),
            use_container_width=True
        )
        
    except Exception as e:
        st.error(f"Erro ao carregar dados: {str(e)}")
        st.info("Certifique-se de que o banco de dados foi configurado corretamente.")

if __name__ == "__main__":
    main()