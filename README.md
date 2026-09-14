Markdown
# 📚 BiblioTech Lite

O **BiblioTech Lite** é uma aplicação web desenvolvida como projeto de extensão universitária para incentivar e facilitar a doação e troca de livros didáticos e literários na comunidade escolar e acadêmica.

---

## 🛠️ Tecnologias Utilizadas

### Front-end
* **HTML5** & **CSS3**
* **Bootstrap 4.5 / FontAwesome**
* **JavaScript ES6+** (requisições assíncronas com `fetch`)

### Back-end & Banco de Dados
* **Python 3** (Ambiente isolado `venv`)
* **Flask** & **Flask-CORS** (API REST)
* **psycopg2** (Driver de conexão PostgreSQL)
* **PostgreSQL** (Banco de dados relacional)

---

## 🏗️ Arquitetura do Sistema

A aplicação adota uma arquitetura em **3 Camadas**:

1. **Camada de Apresentação (Front-end):** Páginas estáticas dinamicamente populadas via requisições HTTP (`fetch`) executadas no navegador.
2. **Camada de Aplicação (Back-end/API):** Servidor Python/Flask encarregado da lógica de negócios, sanitização e comunicação segura via endpoints `/livros`.
3. **Camada de Dados (PostgreSQL):** Armazenamento relacional dos usuários, categorias e acervo de livros.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* Python 3 instalado
* PostgreSQL instalado e rodando na máquina

### 1. Configurar o Banco de Dados
No pgAdmin ou terminal `psql`, crie o banco de dados e execute o script SQL de inicialização:

```sql
CREATE DATABASE biblioteca;
(Crie as tabelas usuarios, categorias e livros com suas respectivas chaves estrangeiras).

2. Configurar o Servidor Python (API)
Ative o ambiente virtual:

Bash
# Windows (PowerShell)
.\venv\Scripts\Activate.ps1
Instale as dependências contidas no requirements.txt:

Bash
pip install -r requirements.txt
Inicie a API Flask:

Bash
python app.py
(A API rodará no endereço http://localhost:5000).

3. Executar o Front-end
Abra o arquivo index.html ou livros.html através da extensão Live Server no VS Code.

🔒 Segurança (OWASP & Security by Design)
Prevenção de SQL Injection: Parâmetros de consulta sanitizados via tuplas no psycopg2.

CORS Configurado: Controle de origem para requisições cross-origin entre o front-end local e a API.

Isolamento de Credenciais: Arquivos de ambiente virtual e configurações locais gerenciados através de .gitignore.