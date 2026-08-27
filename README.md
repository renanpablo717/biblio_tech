Markdown
# 📚 BiblioTech Lite — Plataforma Comunitária de Doação de Livros

O **BiblioTech Lite** é uma aplicação web desenvolvida como projeto de extensão universitária voltada ao município de Neves Paulista - SP. A proposta busca incentivar a circulação de conhecimento e a sustentabilidade por meio da economia circular, conectando doadores a leitores e estudantes da região de forma gratuita e acessível.

---

## 🚀 Funcionalidades

* **Vitrine Dinâmica de Livros:** Exibição responsiva dos exemplares divididos por categorias temáticas (Didáticos, Literatura, Infantil, Técnicos, Não Ficção e Gerais).
* **Filtros por URL:** Navegação limpa via query parameters (`?cat=...`) para segmentação do acervo.
* **Contato Direto via WhatsApp:** Botão de interesse com mensagem pré-formatada e sanitização de número com código de país e DDD.
* **Cadastro de Exemplares com Validação:** Formulário com máscara visual de telefone, validação de campos obrigatórios e termo de consentimento (LGPD).
* **Controle de Acesso & Sessão:**
  * Modo **Visitante** para navegação e visualização do acervo.
  * Autenticação de **Usuário** para publicação e gestão de doações.
  * Tratamento de senhas via função hash e persistência em `localStorage` e `sessionStorage`.
* **Interface Responsiva:** Desenvolvida com Bootstrap 4, com paleta de cores institucional alinhada ao município.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5** — Estruturação semântica das páginas.
* **CSS3** — Estilização personalizada e variáveis visuais.
* **JavaScript (ES6+)** — Manipulação de DOM, regras de negócio, criptografia básica de sessão e persistência.
* **Bootstrap 4.5** — Grid responsivo, componentes visuais e modais.
* **Font Awesome** — Ícones de interface e navegação.

---

## 📁 Estrutura de Pastas

```text
biblio_tech/
│
├── css/
│   └── estilo.css           # Folha de estilos personalizados
│
├── js/
│   ├── cadastro.js         # Lógica do formulário de cadastro e máscara de telefone
│   └── livro.js            # Filtros dinâmicos e injeção dos cards do acervo
│
├── imagens/
│   └── logo-municipio.png   # Brasão institucional
│
├── index.html              # Tela de apresentação, login, modal de cadastro e contato
├── biblioteca.html         # Painel de categorias do acervo
├── cadastro.html           # Formulário de inclusão de livros (restrito)
├── livros.html             # Vitrine dos livros filtrados
├── LICENSE
└── README.md
💻 Como Executar o Projeto Localmente
Clone o repositório:

Bash
git clone [https://github.com/SEU-USUARIO/biblio_tech.git](https://github.com/SEU-USUARIO/biblio_tech.git)
Acesse a pasta do projeto:

Bash
cd biblio_tech
Execução:

Abra a pasta no VS Code.

Inicie com a extensão Live Server (recomendado para suporte a todas as APIs de navegador) ou abra o arquivo index.html diretamente no navegador.

📌 Próximos Passos (Roadmap)
[ ] Implementação de Back-end com API REST (Node.js ou Python).

[ ] Migração da persistência do localStorage para banco de dados relacional PostgreSQL.

[ ] Painel administrativo para gestão de status dos livros (Disponível / Doado).