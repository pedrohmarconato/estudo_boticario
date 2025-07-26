import os
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain_community.llms import OpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.text_splitter import CharacterTextSplitter
from langchain.document_loaders import TextLoader
from dotenv import load_dotenv

load_dotenv()

class DataAssistant:
    def __init__(self):
        self.llm = OpenAI(temperature=0.7)
        self.memory = ConversationBufferMemory()
        self.embeddings = OpenAIEmbeddings()
        
    def create_analysis_chain(self):
        """Cria chain para análise de dados"""
        template = """
        Você é um assistente especializado em análise de dados e business intelligence.
        Com base no contexto fornecido, responda a pergunta de forma clara e objetiva.
        
        Contexto: {context}
        Pergunta: {question}
        
        Resposta:
        """
        
        prompt = PromptTemplate(
            input_variables=["context", "question"],
            template=template
        )
        
        chain = LLMChain(
            llm=self.llm,
            prompt=prompt,
            memory=self.memory
        )
        
        return chain
    
    def create_sql_chain(self):
        """Cria chain para geração de queries SQL"""
        template = """
        Você é um especialista em SQL. Com base na descrição fornecida,
        gere uma query SQL otimizada.
        
        Tabelas disponíveis:
        - produtos (id, nome, categoria, preco, descricao)
        - clientes (id, nome, email, telefone)
        - vendas (id, produto_id, cliente_id, quantidade, valor_total, data_venda)
        
        Descrição: {description}
        
        Query SQL:
        """
        
        prompt = PromptTemplate(
            input_variables=["description"],
            template=template
        )
        
        chain = LLMChain(
            llm=self.llm,
            prompt=prompt
        )
        
        return chain
    
    def create_vector_store(self, documents_path):
        """Cria vector store para busca semântica"""
        documents = []
        
        for filename in os.listdir(documents_path):
            if filename.endswith('.txt'):
                loader = TextLoader(os.path.join(documents_path, filename))
                documents.extend(loader.load())
        
        text_splitter = CharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        
        texts = text_splitter.split_documents(documents)
        
        vectorstore = Chroma.from_documents(
            documents=texts,
            embedding=self.embeddings,
            persist_directory="./chroma_db"
        )
        
        return vectorstore
    
    def query_knowledge_base(self, query, vectorstore):
        """Busca informações na base de conhecimento"""
        docs = vectorstore.similarity_search(query, k=3)
        
        context = "\n".join([doc.page_content for doc in docs])
        
        chain = self.create_analysis_chain()
        response = chain.run(context=context, question=query)
        
        return response
    
    def generate_insights(self, data_summary):
        """Gera insights automáticos sobre os dados"""
        template = """
        Com base no resumo de dados fornecido, gere 5 insights relevantes
        para o negócio.
        
        Resumo dos dados:
        {data_summary}
        
        Insights:
        """
        
        prompt = PromptTemplate(
            input_variables=["data_summary"],
            template=template
        )
        
        chain = LLMChain(
            llm=self.llm,
            prompt=prompt
        )
        
        insights = chain.run(data_summary=data_summary)
        
        return insights

if __name__ == "__main__":
    assistant = DataAssistant()
    
    # Exemplo de uso
    sql_chain = assistant.create_sql_chain()
    query = sql_chain.run(description="Mostre os 10 produtos mais vendidos")
    print("Query SQL gerada:")
    print(query)