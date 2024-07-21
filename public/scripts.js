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
    const taxaEntrega = 4.00;

    let total = 0;

    adicionarRefeicaoBtn.addEventListener('click', () => {
        const tamanho = tamanhoSelect.value;
        const preco = precoPorTamanho[tamanho];
        const guarnicoes = Array.from(document.querySelectorAll('input[name="guarnicao"]:checked')).map(el => el.value);
        const carne = document.querySelector('input[name="carne"]:checked') ? document.querySelector('input[name="carne"]:checked').value : 'Nenhuma';
        const outrasCarnes = Array.from(document.querySelectorAll('input[name="outra-carne"]:checked')).map(el => el.value).join(', ');
        const observacoes = document.getElementById('observacoes').value;

        if (!tamanho || !carne) {
            alert('Por favor, selecione o tamanho da refeição e uma opção de carne.');
            return;
        }

        if (guarnicoes.length < 5) {
            alert('Por favor, selecione pelo menos 5 guarnições.');
            return;
        }

        const guarnicoesText = guarnicoes.join(', ');
        const refeicaoItem = document.createElement('li');
        refeicaoItem.textContent = `Tamanho: ${tamanho} | Preço: R$${preco.toFixed(2)} | Guarnições: ${guarnicoesText} | Carne: ${carne} | Outras Carnes: ${outrasCarnes} | Observações: ${observacoes}`;
        listaRefeicoes.appendChild(refeicaoItem);

        total += preco + (document.querySelectorAll('input[name="outra-carne"]:checked').length * 4);
        totalSpan.textContent = `Total: R$${total.toFixed(2)}`;

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
        const valorTotal = total + (document.querySelector('input[name="entrega-retirada"]:checked').value === 'entrega' ? taxaEntrega : 0);
        const troco = valorPago - valorTotal;
        document.getElementById('troco-info').textContent = `Troco: R$${troco.toFixed(2)}`;
    });

    document.getElementById('pedido-completo-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const cliente = {
            nome: formData.get('nome'),
            telefone: formData.get('telefone'),
            endereco: `${formData.get('endereco')} ${formData.get('numero')}, ${Array.from(formData.getAll('bairro')).join(', ')} ${formData.get('complemento')} - ${formData.get('ponto-referencia')}`
        };
        const pagamento = formData.get('forma-pagamento');
        const valorPago = formData.get('valor-pago');
        const troco = document.getElementById('troco-info').textContent;
        const hora = formData.get('hora') || 'Não informada';

        let mensagem = `Pedido:\n\n${Array.from(listaRefeicoes.children).map(li => li.textContent).join('\n')}\n\nTotal: R$${(total + (document.querySelector('input[name="entrega-retirada"]:checked').value === 'entrega' ? taxaEntrega : 0)).toFixed(2)}\n\nCliente:\nNome: ${cliente.nome}\nTelefone: ${cliente.telefone}\nEndereço: ${cliente.endereco}\n\nForma de Pagamento:\n${pagamento}\nValor Pago: R$${valorPago}\n${troco}\n\nHorário de Entrega: ${hora}`;

        if (pagamento === 'pix' || pagamento === 'picpay') {
            mensagem += `\n\n*Entrega com pagamento em pix ou picpay, só será montada e entregue após o envio do pagamento*`;
        }

        const mensagemCodificada = encodeURIComponent(mensagem);
        const numeroWhatsApp = '5527997149533';
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

        window.open(linkWhatsApp, '_blank');

        document.getElementById('pedido-completo-form').reset();
        listaRefeicoes.innerHTML = '';
        total = 0;
        totalSpan.textContent = 'Total: R$0,00';
    });

    document.querySelectorAll('input[name="entrega-retirada"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const valorEntrega = e.target.value === 'entrega' ? taxaEntrega : 0;
            totalSpan.textContent = `Total: R$${(total + valorEntrega).toFixed(2)}`;

            const horarioDiv = document.getElementById('horario');
            horarioDiv.style.display = 'block';
            document.getElementById('hora').value = '';
        });
    });

    document.getElementById('hora').addEventListener('change', (e) => {
        const horaSelecionada = new Date();
        const [hora, minutos] = e.target.value.split(':');
        horaSelecionada.setHours(hora, minutos, 0);

        const horaMinima = new Date();
        horaMinima.setMinutes(horaMinima.getMinutes() + 30);

        const horaMaxima = new Date();
        horaMaxima.setHours(14, 0, 0); // 14:00

        if (horaSelecionada < horaMinima) {
            alert('O horário de entrega deve ser no mínimo 30 minutos a partir do momento atual.');
            e.target.value = '';
            return;
        }

        if (horaSelecionada.getHours() < 11 || horaSelecionada > horaMaxima) {
            alert('O horário de entrega deve estar entre 11:00 e 14:00.');
            e.target.value = '';
        }
    });
});
