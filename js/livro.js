// URL base do servidor Flask
const API_URL = 'http://localhost:5000/livros';

// 1. Função para renderizar os cards na tela
function exibirLivrosNaTela(livros) {
  const gradeLivros = document.getElementById('grade-livros');
  if (!gradeLivros) return;

  // Trata filtro de categoria vindo da URL (ex: ?categoria=Literatura)
  const params = new URLSearchParams(window.location.search);
  const categoriaFiltro = params.get('categoria');

  let livrosFiltrados = livros;
  if (categoriaFiltro) {
    livrosFiltrados = livros.filter(livro => 
      (livro.categoria || livro.nome_categoria || '').toLowerCase() === categoriaFiltro.toLowerCase()
    );
  }

  // Se não houver livros a exibir
  if (livrosFiltrados.length === 0) {
    gradeLivros.innerHTML = `
      <div class="col-12 text-center my-5">
        <p class="text-muted fs-5">Nenhum livro disponível nesta categoria no momento.</p>
      </div>
    `;
    return;
  }

  // Renderiza a lista de livros do banco de dados
  gradeLivros.innerHTML = livrosFiltrados.map(livro => {
    // Trata o telefone e a categoria (com fallback para valores padrão)
    const telefone = livro.telefone || livro.whatsapp || '17999999999';
    const categoriaNome = livro.nome_categoria || livro.categoria || 'Geral';
    
    const msg = encodeURIComponent(`Olá! Vi seu anúncio no BiblioTech e tenho interesse no livro "${livro.titulo}".`);
    const link = `https://wa.me/55${telefone.replace(/\D/g, '')}?text=${msg}`;

    return `
      <div class="col-12 col-md-4 mb-4">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body d-flex flex-column">
            <span class="badge badge-secondary mb-2 align-self-start">${categoriaNome}</span>
            <h5 class="card-title font-weight-bold">${livro.titulo}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Autor: ${livro.autor}</h6>
            <p class="card-text flex-grow-1">${livro.descricao || ''}</p>
            <a href="${link}" target="_blank" class="btn text-white mt-3" style="background-color: #25D366; font-weight: 600;">
              <i class="fab fa-whatsapp mr-1"></i> Tenho Interesse
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 2. Função para buscar livros da API Flask
async function carregarLivros() {
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error('Falha na resposta do servidor');
    
    const livros = await resposta.json();
    exibirLivrosNaTela(livros);
  } catch (erro) {
    console.error('Erro ao buscar livros do servidor:', erro);
    
    const gradeLivros = document.getElementById('grade-livros');
    if (gradeLivros) {
      gradeLivros.innerHTML = `
        <div class="col-12 text-center my-5">
          <p class="text-danger fs-5">Não foi possível carregar os livros. Verifique se o servidor Flask está rodando.</p>
        </div>
      `;
    }
  }
}

// 3. Executa a busca assim que a página carregar
document.addEventListener('DOMContentLoaded', carregarLivros);