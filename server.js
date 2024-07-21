const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/pedido', (req, res) => {
    const {
        nome,
        telefone,
        endereco,
        numero,
        bairro,
        complemento,
        pontoReferencia,
        formaPagamento,
        valorPago,
        refeicoes,
        tipoEntrega,
        hora
    } = req.body;

    const taxaEntrega = tipoEntrega === 'entrega' ? 4.00 : 0;
    const total = refeicoes.reduce((acc, refeicao) => acc + refeicao.preco, 0) + taxaEntrega;

    let mensagem = `Pedido:\n\n${refeicoes.map(r => `Tamanho: ${r.tamanho} | Preço: R$${r.preco.toFixed(2)} | Guarnições: ${r.guarnicoes.join(', ')} | Carne: ${r.carne} | Outras Carnes: ${r.outrasCarnes.join(', ')} | Observações: ${r.observacoes}`).join('\n')}\n\nTotal: R$${total.toFixed(2)}\n\nCliente:\nNome: ${nome}\nTelefone: ${telefone}\nEndereço: ${endereco} ${numero}, ${bairro.join(', ')} ${complemento} - ${pontoReferencia}\n\nForma de Pagamento:\n${formaPagamento}\nValor Pago: R$${valorPago}`;

    if (formaPagamento === 'pix' || formaPagamento === 'picpay') {
        mensagem += `\n\n*Entrega com pagamento em pix ou picpay, só será montada e entregue após o envio do pagamento*`;
    }

    const mensagemCodificada = encodeURIComponent(mensagem);
    const numeroWhatsApp = '5527997149533';
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    res.json({ linkWhatsApp });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
