Painel Administrativo — Sistema de E-commerce

Sistema de administração para uma plataforma de e-commerce, desenvolvido com foco em operações de produtos, autenticação de administradores e integração entre frontend, backend e banco de dados relacional.

Funcionalidades

- Autenticação de administradores
- Registo de novos administradores
- Validação de e-mail através de código
- Gestão de sessão através de cookies HTTP-only
- Criação de produtos
- Listagem de produtos
- Pesquisa de produtos
- Edição de produtos
- Eliminação de produtos
- Upload de até 5 imagens por produto
- Visualização das imagens armazenadas no banco de dados
- Gestão de stock
- Gestão de preços e promoções
- Gestão de categorias
- Gestão de especificações dos produtos
- Paginação da listagem de produtos
- Validação de dados no frontend e backend
- Proteção das rotas administrativas através de sessão autenticada

Tecnologias utilizadas

Frontend

- React
- Vite
- React Router
- JavaScript
- HTML5
- CSS3
- Lucide React
- Framer Motion

Backend

- Node.js
- Express.js
- MySQL2
- Multer
- Nodemailer
- bcrypt
- cookie-parser
- crypto
- CORS

Base de dados

- MySQL
- Modelo relacional
- Chaves primárias e estrangeiras
- Relacionamentos entre tabelas

Arquitetura

O projeto utiliza uma arquitetura separada entre frontend, backend e banco de dados.

                    ┌─────────────────────┐
                    │      Frontend       │
                    │       React         │
                    │      + Vite         │
                    └──────────┬──────────┘
                               │
                         HTTP / REST API
                               │
                    ┌──────────▼──────────┐
                    │       Backend       │
                    │   Node.js + Express │
                    └──────────┬──────────┘
                               │
                         SQL / MySQL2
                               │
                    ┌──────────▼──────────┐
                    │     MySQL Database  │
                    │   Modelo Relacional │
                    └─────────────────────┘

Frontend

Responsável pela interface do painel administrativo, navegação entre páginas, gestão dos estados da aplicação, formulários e comunicação com a API.

Backend

Responsável pelas regras de negócio, autenticação, gestão de sessões, validação dos dados, upload de imagens e comunicação com o banco de dados.

A comunicação entre frontend e backend é realizada através de uma API REST.

Banco de dados

O MySQL é responsável pelo armazenamento persistente dos administradores, sessões, produtos, imagens e especificações.

---

Modelo relacional

A base de dados foi estruturada de forma relacional, separando informações que possuem responsabilidades diferentes em tabelas próprias.

Tabela "adimin"

Armazena os dados dos administradores do sistema.

Principais informações:

- "id" — chave primária
- "nome"
- "email"
- "senha" — armazenada através de hash
- outros dados relacionados ao administrador

Esta tabela representa os utilizadores que possuem acesso ao painel administrativo.

Tabela "sessoes_adimin"

Responsável pelo controlo das sessões dos administradores autenticados.

Relacionamento:

adimin 1 ──────── N sessoes_adimin

Um administrador pode possuir várias sessões registadas.

A sessão utiliza um token aleatório e possui uma data de expiração para controlar a validade do acesso.

Tabela "produtos"

Armazena as informações principais dos produtos.

Principais campos:

- "id" — chave primária
- "nome"
- "descricao"
- "preco"
- "categoria"
- "stock"
- "promocao"

Cada produto possui um identificador próprio utilizado pelas tabelas relacionadas.

Tabela de imagens dos produtos

As imagens são armazenadas separadamente dos dados principais do produto.

Relacionamento:

produtos 1 ──────── N imagens

Um produto pode possuir várias imagens, enquanto cada imagem pertence a um único produto.

A imagem é armazenada como dados binários ("BLOB"), juntamente com o seu tipo MIME.

Tabela de especificações

As especificações dos produtos também são armazenadas separadamente.

Relacionamento:

produtos 1 ──────── N especificacoes

Um produto pode possuir várias especificações.

Cada especificação possui uma referência ao produto através da chave estrangeira "product_id".

Estrutura dos relacionamentos

                    ┌─────────────────┐
                    │     adimin      │
                    │─────────────────│
                    │ PK id           │
                    │ nome            │
                    │ email           │
                    │ senha           │
                    └────────┬────────┘
                             │
                             │ 1:N
                             ▼
                    ┌─────────────────────┐
                    │  sessoes_adimin     │
                    │─────────────────────│
                    │ PK id               │
                    │ FK admin_id         │
                    │ token               │
                    │ expiracao           │
                    └─────────────────────┘


                    ┌─────────────────┐
                    │    produtos     │
                    │─────────────────│
                    │ PK id           │
                    │ nome            │
                    │ descricao       │
                    │ preco           │
                    │ categoria       │
                    │ stock           │
                    │ promocao        │
                    └───────┬─────────┘
                            │
                  ┌─────────┴─────────┐
                  │                   │
                 1:N                 1:N
                  │                   │
                  ▼                   ▼
        ┌─────────────────┐   ┌──────────────────┐
        │     imagens     │   │  especificacoes  │
        │─────────────────│   │──────────────────│
        │ PK id           │   │ PK id            │
        │ FK product_id   │   │ FK product_id    │
        │ arquivo         │   │ valor            │
        │ tipo            │   └──────────────────┘
        └─────────────────┘

A estrutura relacional permite separar os dados de forma organizada, reduzir a duplicação de informações e estabelecer relações através de chaves primárias e estrangeiras.
