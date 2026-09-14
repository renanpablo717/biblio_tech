-- Consultar livros disponíveis (Já integrado no Flask)
SELECT * FROM livros WHERE status = 'disponivel';

-- Inserir novo livro (Já integrado no Flask)
INSERT INTO livros (titulo, autor, categoria_id, usuario_id) 
VALUES ('Clean Code', 'Robert C. Martin', 2, 1);

-- Atualização (UPDATE): Marcar um livro como doado
UPDATE livros 
SET status = 'doado' 
WHERE id = 1;

-- Remoção (DELETE): Excluir um livro cadastrado incorretamente
DELETE FROM livros 
WHERE id = 2;