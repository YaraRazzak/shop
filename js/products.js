document.addEventListener('DOMContentLoaded', function () {
    // Call functions to load My Products and Favourite Products
    loadMyProducts();
    loadFavouriteProducts();
    updateTotalPrice();
});

function loadMyProducts() {
    const myProducts = getLocalStorageProducts('cardProducts');
    const prodSection = document.querySelector('.prod');

    // Check if there are products in local storage
    if (myProducts && myProducts.length > 0) {
        // Draw product cards in the prod section
        drawProductCards(myProducts, prodSection, true); // Added an argument to draw the remove button
    } else {
        // Display a message if there are no products
        prodSection.innerHTML = '<p>No products added yet.</p>';
    }
}

function loadFavouriteProducts() {
    const favouriteProducts = getLocalStorageProducts('favouriteProducts');
    const favSection = document.querySelector('.fav');

    // Check if there are favourite products in local storage
    if (favouriteProducts && favouriteProducts.length > 0) {
        // Draw product cards in the fav section
        drawProductCards(favouriteProducts, favSection, true, true); // Added an argument to draw the remove button and hide quantity
    } else {
        // Display a message if there are no favourite products
        favSection.innerHTML = '<p>No favourite products added yet.</p>';
    }
}

function getLocalStorageProducts(key) {
    const productsJson = localStorage.getItem(key);
    return productsJson ? JSON.parse(productsJson) : [];
}

function drawProductCards(products, section, showRemoveButton, hideQuantity) {
    // Clear existing content in the section
    section.innerHTML = '';

    // Loop through products and add product cards to the section
    products.forEach(product => {
        const productCard = drawProduct(product, showRemoveButton, hideQuantity);
        section.appendChild(productCard);
    });
}

function drawProduct(product, showRemoveButton, hideQuantity) {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4 col-xl-3';

    card.innerHTML = `
      <div class="card text-center card-product">
        <div class="card-product__img">
          <img class="card-img" src="${product.img}" alt="${product.title}">
          <ul class="card-product__imgOverlay">
            ${showRemoveButton ? `<li><button onclick="removeItem('${product.title}')">Remove Item <i class="fas fa-trash-alt"></i></button></li>` : ''}
          </ul>
        </div>
        <div class="card-body">
          <p>${product.category}</p>
          <h4 class="card-product__title"><a href="#">${product.title}</a></h4>
          <p class="card-product__price">${product.price}</p>
          ${hideQuantity ? '' : `<div class="quantity-controls">
            <button class="btn btn-outline-success btn-sm" onclick="increaseQuantity('${product.title}')"><i class="fas fa-plus"></i></button>
            <span class="quantity">${product.quantity}</span>
            <button class="btn btn-outline-danger btn-sm" onclick="decreaseQuantity('${product.title}')"><i class="fas fa-minus"></i></button>
          </div>`}
        </div>
      </div>
    `;

    return card;
}

function removeItem(title) {
    const cardProducts = getLocalStorageProducts('cardProducts');
    const updatedCardProducts = cardProducts.filter(product => product.title !== title);
    localStorage.setItem('cardProducts', JSON.stringify(updatedCardProducts));
    loadMyProducts();
    updateTotalPrice();

    // Remove the card of the item from the DOM
    const cardToRemove = document.querySelector(`[data-title="${title}"]`);
    if (cardToRemove) {
        cardToRemove.remove();
    }
}

function removeFavouriteItem(title) {
    const favouriteProducts = getLocalStorageProducts('favouriteProducts');
    const updatedFavouriteProducts = favouriteProducts.filter(product => product.title !== title);
    localStorage.setItem('favouriteProducts', JSON.stringify(updatedFavouriteProducts));
    loadFavouriteProducts();

    // Remove the card of the item from the DOM
    const cardToRemove = document.querySelector(`[data-title="${title}"]`);
    if (cardToRemove) {
        cardToRemove.remove();
    }
}

function updateTotalPrice() {
    const cardProducts = getLocalStorageProducts('cardProducts');
    const totalPriceElement = document.getElementById('totalPrice');

    if (cardProducts && cardProducts.length > 0) {
        const totalPrice = cardProducts.reduce((total, product) => total + (parseFloat(product.price) * product.quantity), 0);
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    } else {
        totalPriceElement.textContent = 'Total Price: $0.00';
    }
}

function increaseQuantity(title) {
    const cardProducts = getLocalStorageProducts('cardProducts');
    const updatedCardProducts = cardProducts.map(product => {
        if (product.title === title) {
            product.quantity += 1;
        }
        return product;
    });

    localStorage.setItem('cardProducts', JSON.stringify(updatedCardProducts));
    loadMyProducts();
    updateTotalPrice();
}

function decreaseQuantity(title) {
    const cardProducts = getLocalStorageProducts('cardProducts');
    const updatedCardProducts = cardProducts.map(product => {
        if (product.title === title && product.quantity > 1) {
            product.quantity -= 1;
        }
        return product;
    });

    localStorage.setItem('cardProducts', JSON.stringify(updatedCardProducts));
    loadMyProducts();
    updateTotalPrice();
}