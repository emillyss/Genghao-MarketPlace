// admin.js
import { db } from "./firebase-config.js"; // Importando a configuração do Firebase
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js";

document.getElementById('adminForm').addEventListener('submit', async function(event) {
   event.preventDefault();

   const fullName = document.getElementById('fullName').value;
   const username = document.getElementById('username').value;
   const email = document.getElementById('email').value;
   const country = document.getElementById('country').value;
   const phone = document.getElementById('phone').value;
   const permissionLevel = document.getElementById('permissionLevel').value;
   const password = document.getElementById('password').value;

   // Validações gerais (exemplo)
   if (!validatePhone(phone)) {
       alert("Telefone inválido!");
       return;
   }

   if (!validatePassword(password)) {
       alert("A senha deve ter pelo menos 8 caracteres e incluir letras maiúsculas, minúsculas, números e caracteres especiais.");
       return;
   }

   // Cadastrar no Firestore
   try {
       await addDoc(collection(db, 'administrators'), {
           fullName,
           username,
           email,
           country,
           phone,
           permissionLevel,
           password // Considere criptografar a senha antes de armazená-la!
       });
       alert("Administrador cadastrado com sucesso!");
       document.getElementById('adminForm').reset();
   } catch (error) {
       console.error("Erro ao cadastrar administrador:", error);
       alert("Erro ao cadastrar administrador.");
   }
});

// Funções de validação (exemplo)
function validatePhone(phone) {
   const phonePattern = /^\+55 \(\d{2}\) \d{5} \d{4}$/; // Exemplo para Brasil
   return phonePattern.test(phone);
}

function validatePassword(password) {
   return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password);
}