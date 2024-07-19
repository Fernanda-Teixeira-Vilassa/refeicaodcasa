document.addEventListener('DOMContentLoaded', () => {
    const adicionarRefeicaoBtn = document.getElementById('adicionar-refeicao');
    const listaRefeicoes = document.getElementById('lista-refeicoes');
    const totalSpan = document.getElementById('total');
    const tamanhoSelect = document.getElementById('tamanho');
    const precoPorTamanho = {
        p: 15,
        m: 18,
        g: 21
    };
    
    let total = 0;

    adicionarRefeicaoBtn.addEventListener('click', () => {
        const tamanho = tamanhoSelect.value;
        const preco = precoPorTamanho[tamanho];
        const guarnicoes = Array.from(document.querySelectorAll('input[name="guarnicao"]:checked')).map(el => el.value).join(', ');
        const carne = document.querySelector('input[name="carne"]:checked') ? document.querySelector('input[name="carne"]:checked').value : 'Nenhuma';
        const outrasCarnes = Array.from(document.querySelectorAll('input[name="outra-carne"]:checked')).map(el => el.value).join(', ');
        const observacoes = document.getElementById('observacoes').value;

        if (!tamanho || !carne) {
            alert('Por favor, selecione o tamanho da refeição e uma opção de carne.');
            return;
        }

        const refeicaoItem = document.createElement('li');
        refeicaoItem.textContent = `Tamanho: ${tamanho} | Preço: R$${preco.toFixed(2)} | Guarnições: ${guarnicoes} | Carne: ${carne} | Outras Carnes: ${outrasCarnes} | Observações: ${observacoes}`;
        listaRefeicoes.appendChild(refeicaoItem);

        // Atualiza o total
        total += preco + (document.querySelectorAll('input[name="outra-carne"]:checked').length * 6);
        totalSpan.textContent = `R$${(total + 4).toFixed(2)}`;  // Adiciona a taxa de entrega
        
        // Limpar o formulário após adicionar
        document.getElementById('pedido-form').reset();
    });

    document.getElementById('forma-pagamento').addEventListener('change', (e) => {
        const pagamento = e.target.value;
        document.getElementById('dinheiro-info').style.display = pagamento === 'dinheiro' ? 'block' : 'none';
        document.getElementById('pix-info').style.display = pagamento === 'pix' ? 'block' : 'none';
        document.getElementById('picpay-info').style.display = pagamento === 'picpay' ? 'block' : 'none';
    });

    document.getElementById('valor-pago').addEventListener('input', (e) => {
        const valorPago = parseFloat(e.target.value) || 0;
        const valorTotal = total + 4;  // Inclui a taxa de entrega
        const troco = valorPago - valorTotal;
        document.getElementById('troco-info').textContent = `Troco: R$${troco.toFixed(2)}`;
    });

    document.getElementById('pedido-completo-form').addEventListener('submit', (e) => {
        e.preventDefault(); // Previne o envio padrão do formulário
        
        const formData = new FormData(e.target);
        const cliente = {
            nome: formData.get('nome'),
            telefone: formData.get('telefone'),
            endereco: `${formData.get('endereco')} ${formData.get('numero')}, ${formData.get('bairro')} ${formData.get('complemento')} - ${formData.get('ponto-referencia')}`
        };
        const pagamento = formData.get('forma-pagamento');
        const valorPago = formData.get('valor-pago');
        const troco = document.getElementById('troco-info').textContent;

        const mensagem = `Pedido:\n\n${Array.from(listaRefeicoes.children).map(li => li.textContent).join('\n')}\n\nTotal: R$${(total + 4).toFixed(2)}\n\nCliente:\nNome: ${cliente.nome}\nTelefone: ${cliente.telefone}\nEndereço: ${cliente.endereco}\n\nForma de Pagamento:\n${pagamento}\nValor Pago: R$${valorPago}\n${troco}`;

        // Codificar a mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagem);
        const numeroWhatsApp = '5527997149533'; // Número do WhatsApp com código do país
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

        // Abre o WhatsApp com a mensagem pré-preenchida
        window.open(linkWhatsApp, '_blank');

        // Opcional: Resetar o formulário após o envio
        document.getElementById('pedido-completo-form').reset();
        listaRefeicoes.innerHTML = ''; // Limpa a lista de refeições
        total = 0;
        totalSpan.textContent = 'Total: R$0,00';
    });
});
