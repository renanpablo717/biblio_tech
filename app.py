import psycopg2
from psycopg2.extras import RealDictCursor
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Libera o acesso para o seu front-end (GitHub Pages ou Live Server)

CONFIG = {
    "host": "localhost",
    "port": "5432",
    "dbname": "biblioteca",
    "user": "postgres",
    "password": " "
}

def conectar():
    return psycopg2.connect(**CONFIG)

# Rota para Listar Livros
@app.route("/livros", methods=["GET"])
def listar_livros():
    try:
        conexao = conectar()
        cursor = conexao.cursor(cursor_factory=RealDictCursor)
        
        # Consulta com JOIN para trazer os nomes da categoria e telefone do usuário
        query = """
            SELECT 
                l.id,
                l.titulo,
                l.autor,
                l.descricao,
                c.nome AS nome_categoria,
                u.telefone AS telefone
            FROM livros l
            LEFT JOIN categorias c ON l.categoria_id = c.id
            LEFT JOIN usuarios u ON l.usuario_id = u.id
            WHERE l.status = 'disponivel'
            ORDER BY l.id DESC;
        """
        cursor.execute(query)
        livros = cursor.fetchall()
        
        cursor.close()
        conexao.close()
        return jsonify(livros), 200
    except Exception as e:
        print("Erro interno:", str(e)) # Imprime o erro detalhado no terminal
        return jsonify({"erro": str(e)}), 500

# Rota para Cadastrar Novo Livro (com parâmetro SQL seguro contra SQL Injection)
@app.route("/livros", methods=["POST"])
def cadastrar_livro():
    dados = request.get_json()
    
    try:
        conexao = conectar()
        cursor = conexao.cursor()
        
        query = """
            INSERT INTO livros (titulo, autor, descricao, categoria_id, usuario_id)
            VALUES (%s, %s, %s, %s, %s) RETURNING id;
        """
        cursor.execute(query, (
            dados["titulo"],
            dados["autor"],
            dados["descricao"],
            dados["categoria_id"],
            dados["usuario_id"]
        ))
        
        novo_id = cursor.fetchone()[0]
        conexao.commit() # Confirma as alterações no banco
        
        cursor.close()
        conexao.close()
        return jsonify({"mensagem": "Livro cadastrado!", "id": novo_id}), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)