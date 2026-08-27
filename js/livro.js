// 1. Livros padrão iniciais
const livrosIniciais = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    categoria: "Literatura",
    descricao: "Livro em perfeito estado, capa comum.",
    whatsapp: "17999999999"
  },
  {
    id: 2,
    titulo: "Química Geral",
    autor: "Usberco e Salvador",
    categoria: "Didáticos",
    descricao: "Poucas marcações a lápis, ideal para o Ensino Médio.",
    whatsapp: "17999999999"
  },
  {
    id: 3,
    titulo: "O Menino Maluquinho",
    autor: "Ziraldo",
    categoria: "Infantil",
    descricao: "Ilustrado e bem conservado.",
    whatsapp: "17999999999"
  }
];

// 2. Se a chave não existir no navegador, grava os padrões uma única vez
if (!localStorage.getItem('bibliotech_livros')) {
  localStorage.setItem('bibliotech_livros', JSON.stringify(livrosIniciais));
}

// 3. Lê todos os livros (padrões + cadastrados)
const todosLivros = JSON.parse(localStorage.getItem('bibliotech_livros')) || [];

// 4. Identifica a categoria da URL (?cat=...)
const urlParams = new URLSearchParams(window.location.search);
const categoriaUrl = urlParams.get('cat') || 'Todos';

// 5. Atualiza o título na tela
const elementoTitulo = document.getElementById('titulo-categoria');
if (elementoTitulo) {
  elementoTitulo.textContent = `Livros: ${categoriaUrl}`;
}

// 6. Filtra os livros pela categoria
const livrosFiltrados = todosLivros.filter(livro => {
  if (categoriaUrl === 'Todos') return true;
  return livro.categoria.toLowerCase() === categoriaUrl.toLowerCase();
});

// 7. Renderiza os cards
const gradeLivros = document.getElementById('grade-livros');
if (gradeLivros) {
  if (livrosFiltrados.length === 0) {
    gradeLivros.innerHTML = `
      <div class="col-12 text-center my-5">
        <p class="text-muted fs-5">Nenhum livro disponível nesta categoria no momento.</p>
      </div>
    `;
  } else {
    gradeLivros.innerHTML = livrosFiltrados.map(livro => {
      const msg = encodeURIComponent(`Olá! Vi seu anúncio no BiblioTech e tenho interesse no livro "${livro.titulo}".`);
      const link = `https://wa.me/55${livro.whatsapp.replace(/\D/g, '')}?text=${msg}`;

      return `
        <div class="col-12 col-md-4 mb-4">
          <div class="card h-100 shadow-sm border-0">
            <div class="card-body d-flex flex-column">
              <span class="badge badge-secondary mb-2 align-self-start">${livro.categoria}</span>
              <h5 class="card-title font-weight-bold">${livro.titulo}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Autor: ${livro.autor}</h6>
              <p class="card-text flex-grow-1">${livro.descricao}</p>
              <a href="${link}" target="_blank" class="btn text-white mt-3" style="background-color: #25D366; font-weight: 600;">
                <i class="fab fa-whatsapp mr-1"></i> Tenho Interesse
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}