# Configuração Inicial do Administrador

## Criando o Primeiro Usuário Admin

Para criar um usuário administrador, siga estes passos:

### 1. Criar uma Conta de Usuário

1. Acesse o backend do Lovable Cloud
2. Vá para a seção "Authentication" → "Users"
3. Clique em "Add User"
4. Preencha:
   - **Email**: seu-email@exemplo.com
   - **Password**: sua-senha-segura
   - **Auto Confirm User**: ✅ (marque esta opção)
5. Clique em "Create User"
6. **Copie o User ID** que será exibido (algo como: `123e4567-e89b-12d3-a456-426614174000`)

### 2. Adicionar Permissão de Admin

1. No backend, vá para "Database" → "user_roles"
2. Clique em "Insert" → "Insert row"
3. Preencha:
   - **user_id**: cole o User ID que você copiou
   - **role**: selecione `admin`
   - Os outros campos serão preenchidos automaticamente
4. Clique em "Save"

### 3. Fazer Login no Sistema

1. Acesse a aplicação na tela inicial (Idle Screen)
2. Clique **5 vezes** no canto superior esquerdo
3. Um modal de login aparecerá
4. Entre com o email e senha que você criou
5. Você será redirecionado para o painel administrativo!

## Populando o Banco com Produtos de Exemplo

O banco já contém as categorias iniciais. Para adicionar produtos:

### Opção 1: Via Interface Admin
1. Faça login no painel admin
2. Vá para "Produtos"
3. Clique em "Novo Produto"
4. Preencha os dados e salve

### Opção 2: Via SQL (Produtos de Exemplo)

Execute este SQL no backend (Database → SQL Editor):

```sql
-- Primeiro, pegue os IDs das categorias
-- SELECT id, name FROM categories;

-- Substitua os UUIDs abaixo pelos IDs reais das suas categorias

-- Produtos da categoria Bebidas
INSERT INTO public.products (name, description, price, image_url, category_id) VALUES
('Água Mineral 500ml', 'Água mineral natural sem gás', 2.50, '/src/assets/product-water.jpg', 'UUID_DA_CATEGORIA_BEBIDAS'),
('Refrigerante Cola 2L', 'Refrigerante sabor cola', 7.99, '/src/assets/product-water.jpg', 'UUID_DA_CATEGORIA_BEBIDAS'),
('Suco de Laranja 1L', 'Suco natural de laranja', 8.50, '/src/assets/product-water.jpg', 'UUID_DA_CATEGORIA_BEBIDAS');

-- Produtos da categoria Padaria
INSERT INTO public.products (name, description, price, image_url, category_id) VALUES
('Pão Francês', 'Pão francês tradicional - kg', 12.00, '/src/assets/category-bakery.jpg', 'UUID_DA_CATEGORIA_PADARIA'),
('Pão de Forma', 'Pão de forma integral 500g', 6.50, '/src/assets/category-bakery.jpg', 'UUID_DA_CATEGORIA_PADARIA');

-- Produtos da categoria Doces & Snacks
INSERT INTO public.products (name, description, price, image_url, category_id) VALUES
('Chocolate ao Leite', 'Barra de chocolate ao leite 90g', 5.99, '/src/assets/product-chocolate.jpg', 'UUID_DA_CATEGORIA_DOCES'),
('Biscoito Recheado', 'Biscoito recheado sabor chocolate', 3.50, '/src/assets/product-chocolate.jpg', 'UUID_DA_CATEGORIA_DOCES');

-- Produtos da categoria Congelados
INSERT INTO public.products (name, description, price, image_url, category_id) VALUES
('Pizza Congelada', 'Pizza congelada de mussarela 460g', 15.90, '/src/assets/category-frozen.jpg', 'UUID_DA_CATEGORIA_CONGELADOS'),
('Sorvete 2L', 'Sorvete sabor napolitano 2 litros', 18.99, '/src/assets/category-frozen.jpg', 'UUID_DA_CATEGORIA_CONGELADOS');
```

## Recursos do Painel Admin

### Dashboard
- Visualização do total de produtos
- Visualização do total de categorias
- Status do sistema

### Categorias
- Criar nova categoria
- Editar categoria existente
- Excluir categoria
- Ordenar categorias por display_order

### Produtos
- Criar novo produto
- Editar produto existente
- Excluir produto
- Associar produto a categoria
- Upload de imagens via URL

## Recursos do Cliente

### Fluxo de Compra
1. **Tela Inicial (Idle)**: Toque para iniciar
2. **Home**: Visualize as categorias
3. **Listagem de Produtos**: 
   - Sidebar com todas as categorias
   - Grid de produtos
   - Modal de detalhes ao clicar no produto
4. **Carrinho**: Revise e edite quantidades
5. **Pagamento PIX**: QR Code simulado
6. **Confirmação**: Tela de sucesso

### Timeout de Inatividade
- Após 2 minutos sem interação, o sistema volta para a tela inicial
- Não funciona em rotas /admin

### Acesso Secreto ao Admin
- Clique 5 vezes no canto superior esquerdo da tela inicial ou home
- Modal de login aparecerá
- Apenas usuários com role 'admin' podem acessar
