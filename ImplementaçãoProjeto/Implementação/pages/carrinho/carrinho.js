// carrinho.js
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
    carrinhoList.innerHTML = ''; // Limpa a lista atual
    if (carrinho.length === 0) {
        carrinhoList.innerHTML = '<p>Seu carrinho está vazio.</p>'; // Mensagem quando o carrinho está vazio
        return;
    }
    
    // Renderiza os itens no carrinho
    carrinho.forEach(produto => {
        const item = document.createElement('div');
        item.classList.add('product-item'); // Adiciona classe para estilo
        item.innerHTML = `
            <h3>${produto.name}</h3>
            <p>Preço: R$ ${produto.price.toFixed(2)}</p>
            <button class="btn btn-danger" onclick="removerDoCarrinho('${produto.id}')">Remover</button>
        `;
        carrinhoList.appendChild(item);
    });
}