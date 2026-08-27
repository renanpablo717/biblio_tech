// Trava de segurança: impede visitante de acessar a tela de cadastro
if (!sessionStorage.getItem('usuario_logado')) {
  alert('Acesso restrito! Faça login ou crie uma conta para doar livros.');
  window.location.href = 'index.html';
}


// 1. Máscara automática de WhatsApp
const inputWhatsapp = document.getElementById('whatsapp');

inputWhatsapp.addEventListener('input', function (e) {
  let valor = e.target.value.replace(/\D/g, '');

  if (valor.length > 11) valor = valor.slice(0, 11);

  if (valor.length > 6) {
    e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
  } else if (valor.length > 2) {
    e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
  } else if (valor.length > 0) {
    e.target.value = `(${valor}`;
  }
});

// 2. Salva o livro sem apagar os existentes
document.getElementById('form-cadastro-livro').addEventListener('submit', function (e) {
  e.preventDefault();

  const telefoneLimpo = inputWhatsapp.value.replace(/\D/g, '');

  if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
    alert('Por favor, informe um número de telefone com DDD válido.');
    inputWhatsapp.focus();
    return;
  }

  const novoLivro = {
    id: Date.now(),
    titulo: document.getElementById('titulo').value.trim(),
    autor: document.getElementById('autor').value.trim(),
    categoria: document.getElementById('categoria').value,
    descricao: document.getElementById('descricao').value.trim(),
    whatsapp: telefoneLimpo,
    status: 'Disponível',
    data_cadastro: new Date().toISOString()
  };

  // Pega o que já está salvo no LocalStorage
  const listaAtual = JSON.parse(localStorage.getItem('bibliotech_livros')) || [];
  
  // Adiciona o novo livro no início
  listaAtual.unshift(novoLivro);

  // Salva a lista completa de volta
  localStorage.setItem('bibliotech_livros', JSON.stringify(listaAtual));

  alert('Livro cadastrado com sucesso!');
  window.location.href = `livros.html?cat=${encodeURIComponent(novoLivro.categoria)}`;
});