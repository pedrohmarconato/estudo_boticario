import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from sqlalchemy import create_engine
from database_setup import get_database_url, get_session, Produto, Cliente, Venda

class DataAnalyzer:
    def __init__(self):
        self.engine = create_engine(get_database_url())
        self.session = get_session()
        
    def load_data_from_db(self):
        """Carrega dados do banco para DataFrames"""
        self.df_produtos = pd.read_sql_table('produtos', self.engine)
        self.df_clientes = pd.read_sql_table('clientes', self.engine)
        self.df_vendas = pd.read_sql_table('vendas', self.engine)
        
    def analyze_sales_by_product(self):
        """Análise de vendas por produto"""
        sales_by_product = self.df_vendas.groupby('produto_id').agg({
            'quantidade': 'sum',
            'valor_total': 'sum'
        }).reset_index()
        
        sales_by_product = sales_by_product.merge(
            self.df_produtos[['id', 'nome']], 
            left_on='produto_id', 
            right_on='id'
        )
        
        return sales_by_product
    
    def analyze_sales_timeline(self):
        """Análise temporal de vendas"""
        self.df_vendas['data_venda'] = pd.to_datetime(self.df_vendas['data_venda'])
        self.df_vendas['mes'] = self.df_vendas['data_venda'].dt.to_period('M')
        
        monthly_sales = self.df_vendas.groupby('mes').agg({
            'valor_total': 'sum',
            'quantidade': 'sum'
        }).reset_index()
        
        return monthly_sales
    
    def create_sales_dashboard(self):
        """Cria dashboard interativo com Plotly"""
        sales_by_product = self.analyze_sales_by_product()
        monthly_sales = self.analyze_sales_timeline()
        
        # Gráfico de barras - Vendas por produto
        fig1 = px.bar(
            sales_by_product, 
            x='nome', 
            y='valor_total',
            title='Vendas Totais por Produto',
            labels={'valor_total': 'Valor Total (R$)', 'nome': 'Produto'}
        )
        
        # Gráfico de linha - Vendas ao longo do tempo
        fig2 = go.Figure()
        fig2.add_trace(go.Scatter(
            x=monthly_sales['mes'].astype(str),
            y=monthly_sales['valor_total'],
            mode='lines+markers',
            name='Valor Total'
        ))
        fig2.update_layout(
            title='Evolução das Vendas Mensais',
            xaxis_title='Mês',
            yaxis_title='Valor Total (R$)'
        )
        
        return fig1, fig2
    
    def generate_report(self):
        """Gera relatório de análise"""
        report = {
            'total_vendas': self.df_vendas['valor_total'].sum(),
            'total_produtos': len(self.df_produtos),
            'total_clientes': len(self.df_clientes),
            'ticket_medio': self.df_vendas['valor_total'].mean(),
            'produto_mais_vendido': self.analyze_sales_by_product().nlargest(1, 'quantidade')['nome'].values[0]
        }
        
        return report

if __name__ == "__main__":
    analyzer = DataAnalyzer()
    try:
        analyzer.load_data_from_db()
        report = analyzer.generate_report()
        print("Relatório de Análise:")
        for key, value in report.items():
            print(f"{key}: {value}")
    except Exception as e:
        print(f"Erro ao analisar dados: {e}")