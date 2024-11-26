// pages/home/home.js
import { db, storage } from "../../firebase-config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

const productList = document.getElementById('product-list');

// pages/home/home.js
document.addEventListener('DOMContentLoaded', () => {
    const originField = document.getElementById('product-origin');
    // Aqui você pode adicionar uma lógica para buscar o país do usuário
    // Por agora, estamos colocando um valor padrão
    originField.value = "Brasil"; // Valor padrão de exemplo
});

// Função para exibir os produtos cadastrados
async function fetchProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        productList.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image"/>
                <h2>${product.name}</h2>
                <p>R$ ${product.price.toFixed(2)}</p>
            `;
            productList.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Erro ao buscar produtos: ', error);
        alert('Erro ao buscar produtos. Tente novamente.');
    }
}

document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const imageFile = document.getElementById('product-image').files[0];

    if (!imageFile) {
        alert('Por favor, selecione uma imagem!');
        return;
    }

    try {
        const imageRef = ref(storage, `products/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        const imageUrl = await getDownloadURL(imageRef);

        await addDoc(collection(db, 'products'), {
            name: name,
            price: parseFloat(price),
            imageUrl: imageUrl
        });

        alert('Produto cadastrado com sucesso!');
        document.getElementById('product-form').reset();
        fetchProducts();
    } catch (error) {
        console.error('Erro ao cadastrar produto: ', error);
        alert('Erro ao cadastrar produto. Tente novamente.');
    }
});

fetchProducts();

window.addEventListener('hashchange', () => {
    const sections = ['home', 'cadastro', 'produtos', 'carrinho'];
    sections.forEach(section => {
        document.getElementById(section).style.display = 
            window.location.hash === `#${section}` ? 'block' : 'none';
    });
});

window.dispatchEvent(new Event('hashchange'));