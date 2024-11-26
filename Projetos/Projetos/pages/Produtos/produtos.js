// pages/produtos.js

import { db } from "../../firebase-config.js"; // Importando a configuração do Firebase
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

let carrinho = []; // Array para armazenar os produtos no carrinho

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    
    // Função para buscar produtos cadastrados no Firebase
    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            productList.innerHTML = ''; // Limpa a lista de produtos antes de renderizar
            querySnapshot.forEach((doc) => {
                const product = doc.data();
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-item'); // Adiciona classe para estilo
                productDiv.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}" class="product-image"/>
                    <h3>${product.name}</h3>
                    <p>Preço: R$ ${product.price.toFixed(2)}</p>
                    <button class="view-details btn btn-info">Ver Detalhes</button>
                    <button class="add-to-cart btn btn-success" data-id="${doc.id}">Adicionar ao Carrinho</button>
                `;

                // Evento para exibir mais detalhes
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

                // Evento para adicionar ao carrinho
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

    // Função para adicionar produtos ao carrinho
    const adicionarAoCarrinho = (produto) => {
        carrinho.push(produto);
        alert(`${produto.name} foi adicionado ao carrinho!`);
        atualizarCarrinho();
    };

    // Função para atualizar a visualização do carrinho
    const atualizarCarrinho = () => {
        const carrinhoList = document.getElementById('carrinho-list');
        carrinhoList.innerHTML = ''; // Limpa o conteúdo atual
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
    };

    // Função para remover produtos do carrinho
    window.removerDoCarrinho = (produtoId) => {
        carrinho = carrinho.filter(produto => produto.id !== produtoId);
        atualizarCarrinho();
    };

    fetchProducts(); // Chama a função para buscar e renderizar os produtos
});