import os
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

Base = declarative_base()

class Produto(Base):
    __tablename__ = 'produtos'
    
    id = Column(Integer, primary_key=True)
    nome = Column(String(200), nullable=False)
    categoria = Column(String(100))
    preco = Column(Float)
    descricao = Column(Text)
    data_cadastro = Column(DateTime, default=datetime.utcnow)
    
    vendas = relationship("Venda", back_populates="produto")

class Cliente(Base):
    __tablename__ = 'clientes'
    
    id = Column(Integer, primary_key=True)
    nome = Column(String(200), nullable=False)
    email = Column(String(200), unique=True)
    telefone = Column(String(20))
    data_cadastro = Column(DateTime, default=datetime.utcnow)
    
    vendas = relationship("Venda", back_populates="cliente")

class Venda(Base):
    __tablename__ = 'vendas'
    
    id = Column(Integer, primary_key=True)
    produto_id = Column(Integer, ForeignKey('produtos.id'))
    cliente_id = Column(Integer, ForeignKey('clientes.id'))
    quantidade = Column(Integer)
    valor_total = Column(Float)
    data_venda = Column(DateTime, default=datetime.utcnow)
    
    produto = relationship("Produto", back_populates="vendas")
    cliente = relationship("Cliente", back_populates="vendas")

def get_database_url():
    db_type = os.getenv('DB_TYPE', 'sqlite')
    
    if db_type == 'postgresql':
        return f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    elif db_type == 'mysql':
        return f"mysql+mysqlconnector://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    else:
        return "sqlite:///estudo_caso.db"

def create_database():
    engine = create_engine(get_database_url())
    Base.metadata.create_all(engine)
    return engine

def get_session():
    engine = create_database()
    Session = sessionmaker(bind=engine)
    return Session()

if __name__ == "__main__":
    print("Criando banco de dados...")
    engine = create_database()
    print(f"Banco de dados criado com sucesso: {get_database_url()}")