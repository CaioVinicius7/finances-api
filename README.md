<h2 align="center"> 
	Finances API 
</h2>

## 💭 O que é essa API?

Essa API é o projeto desenvolvido durante o capítulo 2 do Ignite de Node.js da [Rocketseat](https://www.rocketseat.com.br/), o projeto se trata de um sistema de controle de finanças, no qual o usuário pode cadastrar e visualizar suas transações.

## ✨ Quais são as funcionalidades desse sistema?

O sistema conta com as seguintes funcionalidades:

- Listagem do resumo de transações
- Listagem de transações
- Listagem de transação por id
- Criação de transação

## ⚠ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
[Node](https://nodejs.org/en/download/), [Git](https://git-scm.com/downloads) e [Insominia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/downloads/).

## 🎲 Rodando a API

```bash
# Clone este repositório
$ git clone https://github.com/CaioVinicius7/finances-api.git

# Acesse a pasta do projeto no terminal/cmd
$ cd finances-api

# Acesse o projeto pelo vs code
$ code .

# Baixe as dependências
$ yarn ou npm install

# Rode as migrations
$ yarn knex migrate:latest ou npm run knex -- migrate:latest

# Rode o servidor
$ yarn dev ou npm run dev

# O servidor ficara ativo na porta definida no arquivo .env - acesse <http://localhost:3333>
```

Obs: Após clonar o repositório crie e preencha o arquivo .env seguindo o exemplo do arquivo .env.example

## 🛠 Como rodar os testes

Para rodar os testes rode o script `test` após ter instalado as dependências do projeto.

## Autor

---

<a href="https://www.facebook.com/caio.pereira.94695">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/62827681?s=400&u=f0b18831e6690a901f956d637933b9ee2dca3104&v=4" width="100px;" alt=""/>
 <br>
 <h2><b>Caio Vinícius</b></h2></a>

<h4> Feito com muito carinho e dedicação :) </h4>

<br>

[![Linkedin Badge](https://img.shields.io/badge/-caio%20vinícius-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/caio-vin%C3%ADcius-87a761200/)
[![Gmail Badge](https://img.shields.io/badge/-caio1525pereira@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:caio1525pereira@gmail.com)](mailto:caio1525pereira@gmail.com)
