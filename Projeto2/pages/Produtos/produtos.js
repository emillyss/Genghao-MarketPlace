// pages/produtos.js
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    // Função para buscar produtos cadastrados no Firebase (exemplo)
    const fetchProducts = async () => {
        // Lógica para buscar produtos do Firebase
        // Exemplo de produto estático para testes:
        const products = [
            {
                name: 'Produto Exemplo',
                price: 'R$ 100,00',
                weight: '2kg',
                material: 'Plástico',
                minOrder: 1,
                size: '30cm',
                origin: 'Brasil',
                colors: 'Azul, Vermelho',
                brand: 'Marca X',
                category: 'Esportes e lazer',
                imageUrl: 'url_da_imagem_exemplo.jpg',
            }
        ];

        // Renderizando produtos na página
        products.forEach((product) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>Preço: ${product.price}</p>
                <button class="view-details">Ver Detalhes</button>
            `;

            // Adicionando evento para exibir mais detalhes
            productItem.querySelector('.view-details').addEventListener('click', () => {
                alert(`
                    Nome: ${product.name}
                    Preço: ${product.price}
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

            productList.appendChild(productItem);
        });
    };

    fetchProducts();
});
