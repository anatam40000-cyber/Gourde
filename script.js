// État du panier
let cart = [];

// Éléments du DOM
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const toggleCartBtn = document.getElementById('toggle-cart');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-count');
const cartTotalSpan = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart');

// Ajouter des écouteurs aux boutons "Ajouter au panier"
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        
        addToCart(productName, productPrice);
    });
});

// Ajouter un produit au panier
function addToCart(productName, productPrice) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    // Afficher un message de confirmation
    alert(`✅ ${productName} a été ajouté au panier!`);
    
    updateCart();
}

// Mettre à jour l'affichage du panier
function updateCart() {
    // Mettre à jour le nombre d'articles
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountSpan.textContent = totalItems;
    
    // Mettre à jour la liste des articles
    cartItemsList.innerHTML = '';
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li style="text-align: center; color: #999;">Votre panier est vide</li>';
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            const itemTotal = (item.price * item.quantity).toFixed(2);
            
            li.innerHTML = `
                <div>
                    <strong>${item.name}</strong> (${item.quantity}x)
                    <br>
                    <small>${item.price.toFixed(2)} € × ${item.quantity} = ${itemTotal} €</small>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Supprimer</button>
            `;
            
            cartItemsList.appendChild(li);
        });
    }
    
    // Mettre à jour le total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalSpan.textContent = total.toFixed(2) + ' €';
}

// Supprimer un article du panier
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Basculer l'affichage du panier
toggleCartBtn.addEventListener('click', () => {
    cartModal.classList.toggle('hidden');
});

// Fermer le panier en cliquant en dehors
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.add('hidden');
    }
});

// Validation de la commande
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('❌ Votre panier est vide!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`✅ Commande validée!\n\nMontant total : ${total.toFixed(2)} €\n\nMerci pour votre achat GreenBottle!`);
    
    // Vider le panier après la commande
    cart = [];
    updateCart();
    cartModal.classList.add('hidden');
});

// Vider le panier
clearCartBtn.addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir vider le panier?')) {
        cart = [];
        updateCart();
    }
});

// Initialiser le panier au chargement
updateCart();
