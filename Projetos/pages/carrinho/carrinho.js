let carrinho = [];

function adicionarAoCarrinho(produto) {
    carrinho.push(produto);
    atualizarCarrinho();
}

function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(produto => produto.id !== produtoId);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinhoList = document.getElementById('carrinho-list');
    carrinhoList.innerHTML = '';
    carrinho.forEach(produto => {
        const item = document.createElement('div');
        item.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="removerDoCarrinho(${produto.id})">Remover</button>
        `;
        carrinhoList.appendChild(item);
    });
}