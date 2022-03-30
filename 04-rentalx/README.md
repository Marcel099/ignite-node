# RentalX API

## Índice

<!-- ts -->
   * [Índice](#índice)
   * [Sobre o projeto](#sobre-o-projeto)
   * [Como rodar na sua máquina?](#como-rodar-na-sua-máquina)
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

## Como rodar na sua máquina?

🚧 Em construção...  🚧

## Modelo Entidade-Relacionamento

<img
  alt="Imagem contendo o Modelo Entidade-Relacionamento da API RentalX. Contém as seguintes tabelas, nomeadas em inglês utilizando o padrão de nomenclatura snake case: cars, cars_image, categories, specifications, specifications_cars, users e rentals."
  title="Modelo Entidade-Relacionamento da API RentalX"
  src="./assets/diagrama.png"
/>

## Requisitos e Regras de Negócio

### Cadastro de carro

#### RF
- [x] Deve ser possível cadastrar um novo carro.

#### RN
- [x] Não deve ser possível cadastrar um mcarro com uma placa já existente.
<!-- - [ ] Não deve ser possível alterar a placa de um carro já cadastrado. -->
- [x] O carro deve ser cadastrado, por padrão, como disponível.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.

### Listagem de carros

#### RF
- [x] Deve ser possível listar todos os carros disponíveis.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

#### RN
- [x] O usuário não precisa estar autenticado no sistema.

### Cadastro de Especificação no carro

#### RF
- [x] Deve ser possível cadastrar uma especificação para um carro.
<!-- - [ ] Deve ser possível listar todas as especificações.
- [ ] Deve ser possível listar todos os carros. -->

#### RN
- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

### Cadastro de imagens do carro

#### RF
- [x] Deve ser possível cadastrar a imagem do carro.

#### RNF
- [x] Utilizar a biblioteca multer para upload de arquivos.

#### RN
- [x] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um administrador.

### Aluguel de carro

#### RF
- [x] Deve ser possível cadastrar um aluguel.

#### RN
- [x] O aluguel deve ter duração mínima de 24 horas.
- [x] Não deve ser possível cadastrar um novo alguel caso já exista um aberto para o mesmo usuário.
- [x] Não deve ser possível cadastrar um novo alguel caso já exista um aberto para o mesmo carro.
- [x] O usuário deve estar autenticado na aplicação para poder cadastrar um novo aluguel.
- [ ] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

### Devolução de carro

#### RF
- [x] Deve ser possível realizar a devolução de um carro.

#### RN
- [x] Se o carro for devolvido em menos de 24 horas, deverá ser cobrada diária completa.
- [x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, deverá ser calculado o total do aluguel.
- [x] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrada multa proporcional aos dias de atraso.
- [x] Caso haja multa, deverá ser somada ao total do aluguel.
- [x] O usuário deve estar autenticado na aplicação para poder devolver um carro.

### Listagem de Aluguéis para usuário

#### RF
- [x] Deve ser possível realizar a busca de todos os aluguéis para o usuário.

#### RN
- [x] O usuário deve estar autenticado na aplicação.

### Recuperação de senha

#### RF
- [x] Deve ser possível que o usuário recupere a senha informando o e-mail.
- [x] O usuário deve receber um e-mail com o passo-a-passo de recuperação da senha.
- [x] O usuário deve conseguir inserir uma nova senha.

#### RN
- [x] O usuário precisa informar uma nova senha.
- [x] O link enviado para a recuperação deve expirar em 3 horas.