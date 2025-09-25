API desenvolvida em Node.js + TypeScript, utilizando Knex para manipulação de banco de dados, Jest para testes unitários e de request, e organizada com boas práticas de arquitetura em camadas.

📂 Estrutura do Projeto

  ├── src
│   ├── config        # Configurações (ex: knexfile, env)
│   ├── database      # Migrations, seeds e conexão com o banco
│   ├── modules       # Domínios da aplicação (controllers, services, repositories)
│   ├── routes        # Definição das rotas
│   ├── utils         # Funções utilitárias
│   └── server.ts     # Ponto de entrada da aplicação
│
├── tests             # Testes unitários e de integração
├── .env              # Variáveis de ambiente
├── jest.config.ts    # Configuração do Jest
├── knexfile.ts       # Configuração do Knex
├── package.json
├── tsconfig.json
└── yarn.lock

🚀 Tecnologias Utilizadas

Node.js
TypeScript
Knex.js
 – Query builder SQL
Jest
 – Testes unitários e de integração
Supertest
 – Testes de requests HTTP
Yarn
 – Gerenciador de pacotes

⚙️ Instalação

Clone o repositório e instale as dependências:
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
yarn install

🔧 Configuração

Crie o arquivo .env baseado no .env.example:
PORT=3000
DB_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=senha
DB_NAME=meu_banco

🗄️ Banco de Dados

Rodar as migrations:
yarn knex migrate:latest

Rodar as seeds (opcional):
yarn knex seed:run

▶️ Executando a API

Modo desenvolvimento:
yarn dev

Build + execução:
yarn build
yarn start

🧪 Testes

Rodar todos os testes (unitários + integração):
yarn test

Rodar em modo watch:
yarn test:watch

📡 Exemplo de Endpoints
GET /users

Retorna todos os usuários cadastrados.

Resposta:
[
  {
    "id": 1,
    "name": "Kaio",
    "email": "kaio@example.com"
  }
]

POST /users

Cria um novo usuário.

Resposta: 
{
  "name": "Kaio",
  "email": "kaio@example.com",
  "password": "123456"
}

🏗️ Organização de Código

Controller → Recebe requisições HTTP e envia respostas.

Service → Regras de negócio.

Repository → Comunicação com o banco via Knex.

Tests → Testes unitários (services) e de integração (rotas com Supertest).

📜 Scripts disponíveis
"scripts": {
  "dev": "ts-node-dev src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "test": "jest",
  "test:watch": "jest --watch",
  "migrate": "knex migrate:latest",
  "seed": "knex seed:run"
}

📄 Licença

Este projeto está sob a licença MIT.



