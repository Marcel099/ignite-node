# RentalX API

## Índice
<!-- ts -->
   * [Índice](#índice)
   * [Sobre o projeto](#sobre-o-projeto)
   * [Modelo Entidade-Relacionamento](#modelo-entidade-relacionamento)
   * [Requisitos e Regras de Negócio](#requisitos-e-regras-de-negócio)
      * [Cadastro de carro](#cadastro-de-carro)
      * [Listagem de carros](#listagem-de-carros)
      * [Cadastro de Especificação no carro](#cadastro-de-especificação-no-carro)
      * [Cadastro de imagens do carro](#cadastro-de-imagens-do-carro)
      * [Aluguel de carro](#aluguel-de-carro)
<!-- te -->

## Sobre o projeto

Este projeto é uma API REST de um serviço de aluguel de carros.

Foi desenvolvido durante a trilha Node do programa Ignite da RocketSeat. É também o principal projeto desta trilha: teve seu início no capítulo 2 e foi continuamente trabalhado até o capítulo 6, o qual é o final da trilha.

Abrange conceitos diversos utilizados em aplicações Back-End, dos quais podemos citar:

- Princípios S.O.L.I.D.
- Documentação de API
- Autenticação com JSON Web Token (JWT)
- Desenvolvimento Dirigido a Testes (TDD)

Dentre as ferramentas utrilizadas, podemos destacar:

- Swagger
- Docker
- TypeORM
- JWT
- Jest

## Modelo Entidade-Relacionamento

<img
  alt="Imagem contendo o Modelo Entidade-Relacionamento da API RentalX. Contém as seguintes tabelas, nomeadas em inglês utilizando o padrão de nomenclatura snake case: cars, cars_image, categories, specifications, specifications_cars, users e rentals."
  title="Modelo Entidade-Relacionamento da API RentalX"
  src="./assets/diagrama.png"
/>

## Requisitos e Regras de Negócio

### Cadastro de carro

#### RF
- [ ] Deve ser possível cadastrar um novo carro.
- [ ] Deve ser possível listar todas as categorias.

#### RN
- [ ] Não deve ser possível cadastrar u mcarro com uma placa já existente.
- [ ] Não deve ser possível alterar a placa de um carro já cadastrado.
- [ ] O carro deve ser cadastrado, por padrão, como disponível.
- [ ] O usuário responsável pelo cadastro deve ser um usuário administrador.

### Listagem de carros

#### RF
- [ ] Deve ser possível listar todos os carros disponíveis.
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

#### RN
- [ ] O usuário não precisa estar autenticado no sistema.

### Cadastro de Especificação no carro

#### RF
- [ ] Deve ser possível cadastrar uma especificação para um carro.
- [ ] Deve ser possível listar todas as especificações.
- [ ] Deve ser possível listar todos os carros.

#### RN
- [ ] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [ ] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

### Cadastro de imagens do carro

#### RF
- [ ] Deve ser possível cadastrar a imagem do carro.
- [ ] Deve ser possível listar todos os carros.

#### RNF
- [ ] Utilizar a biblioteca multer para upload de arquivos.

#### RN
- [ ] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [ ] O usuário responsável pelo cadastro  deve ser um administrador.

### Aluguel de carro

#### RF
- [ ] Deve ser possível cadastrar um aluguel.

#### RN

- [ ] O aluguel deve ter duração mínima de 24 horas.
- [ ] Não deve ser possível cadastrar um novo alguel caso já exista um aberto para o mesmo usuário.
- [ ] Não deve ser possível cadastrar um novo alguel caso já exista um aberto para o mesmo carro.