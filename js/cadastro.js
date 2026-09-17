document.addEventListener('DOMContentLoaded', () => {
  const formCadastro = document.getElementById('form-cadastro'); 

  if (!formCadastro) {
    console.error('ERRO: Formulário com id="form-cadastro" NÃO foi encontrado no HTML! Certifique-se de que o elemento existe e que o script está sendo carregado após o DOM estar pronto.');
    return;
  }

  console.log('Formulário encontrado com sucesso. Listener de submit registrado.');

  formCadastro.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    console.log('Evento de submit disparado!');

    const btnSubmit = formCadastro.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit ? btnSubmit.innerHTML : '';
    
    if (btnSubmit) {
      btnSubmit.innerHTML = 'Cadastrando...';
      btnSubmit.disabled = true;
    }

    // Captura dos elementos
    const elTitulo = document.getElementById('titulo');
    const elAutor = document.getElementById('autor');
    const elDescricao = document.getElementById('descricao');
    const elCategoria = document.getElementById('categoria');

    if (!elTitulo || !elAutor || !elCategoria) {
      console.error('ERRO: Um ou mais campos de input (titulo, autor, categoria) não foram encontrados no HTML!');
      if (btnSubmit) {
        btnSubmit.innerHTML = textoOriginal;
        btnSubmit.disabled = false;
      }
      return;
    }

    const novoLivro = {
      titulo: elTitulo.value,
      autor: elAutor.value,
      descricao: elDescricao ? elDescricao.value : '',
      categoria_id: parseInt(elCategoria.value) || 1, 
      usuario_id: 1 
    };

    console.log('Enviando os seguintes dados para a API:', novoLivro);

    try {
      const resposta = await fetch('http://localhost:5000/livros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoLivro)
      });

      console.log('Status da resposta HTTP:', resposta.status);

      if (!resposta.ok) {
        const erroBody = await resposta.json();
        throw new Error(erroBody.erro || 'Falha ao comunicar com o servidor');
      }

      const dados = await resposta.json();
      console.log('Resposta recebida do Flask:', dados);
      
      alert('Livro cadastrado com sucesso no banco de dados!');
      window.location.href = 'livros.html';

    } catch (erro) {
      console.error('Erro ao cadastrar:', erro);
      alert('Erro ao cadastrar: ' + erro.message);
      
      if (btnSubmit) {
        btnSubmit.innerHTML = textoOriginal;
        btnSubmit.disabled = false;
      }
    }
  });
});