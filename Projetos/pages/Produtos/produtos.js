import { db } from "../../firebase-config.js"; 
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

let carrinho = []; 

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    
    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            productList.innerHTML = ''; 
            querySnapshot.forEach((doc) => {
                const product = doc.data();
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-item');
                productDiv.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}" class="product-image"/>
                    <h3>${product.name}</h3>
                    <p>Preço: R$ ${product.price.toFixed(2)}</p>
                    <button class="view-details">Ver Detalhes</button>
                    <button class="add-to-cart" data-id="${doc.id}">Adicionar ao Carrinho</button>
                `;

                productDiv.querySelector('.view-details').addEventListener('click', () => {
                    alert(`
                        Nome: ${product.name}
                        Preço: R$ ${product.price.toFixed(2)}
                        Peso: ${product.weight}
                        Material: ${product.material}
                        Pedido Mínimo: ${product.minOrder}
                        Tamanho: ${product.size}
                        Lugar de Origem: ${product.origin}
                        Cores: ${product.colors}
                        Marca: ${product.brand}
                        Categoria: ${product.category}
                    `);
                });

                productDiv.querySelector('.add-to-cart').addEventListener('click', () => {
                    adicionarAoCarrinho({
                        id: doc.id,
                        name: product.name,
                        price: product.price,
                    });
                });

                productList.appendChild(productDiv);
            });
        } catch (error) {
            console.error('Erro ao buscar produtos: ', error);
            alert('Erro ao buscar produtos. Tente novamente.');
        }
    };

    const adicionarAoCarrinho = (produto) => {
        carrinho.push(produto);
        alert(`${produto.name} foi adicionado ao carrinho!`);
        atualizarCarrinho();
    };

    const atualizarCarrinho = () => {
        const carrinhoList = document.getElementById('carrinho-list');
        carrinhoList.innerHTML = ''; 
        if (carrinho.length === 0) {
            carrinhoList.innerHTML = '<p>Seu carrinho está vazio.</p>';
            return;
        }
        carrinho.forEach(produto => {
            const item = document.createElement('div');
            item.innerHTML = `
                <h3>${produto.name}</h3>
                <p>Preço: R$ ${produto.price.toFixed(2)}</p>
                <button onclick="removerDoCarrinho('${produto.id}')">Remover</button>
            `;
            carrinhoList.appendChild(item);
        });
    };

    window.removerDoCarrinho = (produtoId) => {
        carrinho = carrinho.filter(produto => produto.id !== produtoId);
        atualizarCarrinho();
    };

    fetchProducts();
});