const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Rota para o formulário de informações do cliente
app.post('/informacoes-cliente', (req, res) => {
    const { nome, telefone, rua, numero, bairro, complemento, ponto_referencia } = req.body;
    console.log(`Informações do Cliente:
        Nome: ${nome}
        Telefone: ${telefone}
        Rua: ${rua}
        Número: ${numero}
        Bairro: ${bairro}
        Complemento: ${complemento}
        Ponto de Referência: ${ponto_referencia}`);
    res.send('Informações do cliente recebidas com sucesso!');
});

// Rota para o formulário de pedido
app.post('/pedido', (req, res) => {
    const { tamanho, guarnicoes, carne, outrasCarnes, observacoes } = req.body;
    console.log(`Pedido:
        Tamanho: ${tamanho}
        Guarnições: ${guarnicoes}
        Carne: ${carne}
        Outras Carnes: ${outrasCarnes}
        Observações: ${observacoes}`);
    res.send('Pedido recebido com sucesso!');
});

// Rota para o formulário de pagamento
app.post('/forma-pagamento', (req, res) => {
    const { pagamento, troco } = req.body;
    console.log(`Forma de Pagamento:
        Pagamento: ${pagamento}
        Troco: ${troco}`);
    res.send('Pedido recebido com sucesso!');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
