import psycopg2

CONFIG = {
    "host": "localhost",
    "port": "5432",
    "dbname": "biblioteca",
    "user": "postgres",
    "password": " "
}

def conectar():
    try:
        conexao = psycopg2.connect(**CONFIG)
        print("Conexão com o banco de dados estabelecida com sucesso.")
        return conexao
    except psycopg2.OperationalError as erro:
        print("Falha ao conectar no banco. Verifique host, porta, usuário e senha.")
        raise erro


if __name__ == "__main__":
    conexao = conectar()
    cursor = conexao.cursor()
    cursor.execute("SELECT version();")
    print("Versão do PostgreSQL:", cursor.fetchone()[0])
    cursor.close()
    conexao.close()