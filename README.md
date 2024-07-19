# Refeição D Casa

Bem-vindo ao projeto **Refeição D Casa**! Este é um sistema de pedidos de refeições online com uma interface simples e funcional. 

## Estrutura do Projeto

- **public/**
  - `index.html` - Página principal do site com o formulário para pedidos e informações do cliente.
  - `styles.css` - Arquivo de estilos para uma aparência alegre e moderna.
  - `scripts.js` - JavaScript para lógica de adição de refeições, cálculo de total e gerenciamento de forma de pagamento.
- **server.js** - Código do servidor utilizando Express para gerenciar requisições e dados do cliente.
- **package.json** - Arquivo de configuração do Node.js com dependências do projeto.

## Funcionalidades

1. **Menu do Dia**: Exibe a descrição do menu atual.
2. **Informações do Cliente**: Formulário para coletar informações como nome, telefone, e endereço.
3. **Pedido**: Permite selecionar o tamanho da refeição e adicionar ao pedido, com cálculo automático do total.
4. **Forma de Pagamento**: Escolha entre Dinheiro, Pix ou Picpay e forneça informações adicionais, como necessidade de troco ou chaves de pagamento.

## Instruções de Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM (Node Package Manager)
