// produtos.js

import { db } from "../../firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js";

const productList = document.getElementById('product-list');

async function fetchProducts() {
   try {
       const querySnapshot = await getDocs(collection(db, 'products'));
       productList.innerHTML = '';
       querySnapshot.forEach((doc) => {
           const product = doc.data();
           const productDiv = document.createElement('div');
           productDiv.classList.add('product-item');
           productDiv.innerHTML = `
               <img src="${product.imageUrl}" alt="${product.name}" />
               <h2>${product.name}</h2>`;
           productList.appendChild(productDiv);
       });
   } catch (error) {
       console.error('Erro ao buscar produtos:', error);
       alert('Erro ao buscar produtos. Tente novamente.');
   }
}

document.addEventListener('DOMContentLoaded', fetchProducts);