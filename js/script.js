let  cardnav=document.querySelector('#cardnav');
let  userloged=document.querySelector('#userlogedin');
let  links=document.querySelector('#links');
let loguser=localStorage.getItem('user')
let log=localStorage.getItem('log')

if(log){links.remove();
cardnav.style.display='flex'
userloged.style.display='flex'

userloged.innerHTML=loguser
logout.addEventListener('click',()=>{
    localStorage.removeItem('log')
    location.assign('index.html')
})


}
//login
let products = [
    { id: 1, title: 'Blue bag', category: 'Women', price: '150$', img: './images/blue bag.jpg' },
    { id: 2, title: 'Belows', category: 'Home', price: '150$', img: './images/belows.webp' },
    { id: 3, title: 'Candles', category: 'Home', price: '150$', img: './images/candels.webp' },
    { id: 4, title: 'Jacket', category: 'Women', price: '150$', img: './images/jacket.jpg' },
    { id: 5, title: 'Red dress', category: 'Women', price: '150$', img: './images/red dress.jpg' },
    { id: 6, title: 'Blue Tie', category: 'Men', price: '150$', img: './images/Light-Blue.jpg.jpg' },
    { id: 7, title: 'PJ', category: 'Kids', price: '150$', img: './images/kids pa.jpg' },
    { id: 8, title: 'Boys outfit', category: 'Kids', price: '150$', img: './images/kidsb.webp' },
    { id: 9, title: 'Girls outfit', category: 'Kids', price: '150$', img: './images/kidsg.jpg' },
    { id: 10, title: 'Blue heel', category: 'Women', price: '150$', img: './images/heel.jpg' },
    { id: 11, title: 'Cam', category: 'Home', price: '150$', img: './images/cam.jpeg' },
    { id: 12, title: 'Sport', category: 'Women', price: '150$', img: './images/sportwear.webp' },
    { id: 13, title: 'Blue pj', category: 'Kids', price: '150$', img: './images/kids.jpg' },
    { id: 14, title: 'Suit', category: 'Men', price: '150$', img: './images/men party.webp' },
    { id: 15, title: 'Accessoiries', category: 'Men', price: '150$', img: './images/men access.webp' },
    { id: 16, title: 'PJ', category: 'Women', price: '150$', img: './images/pajamaslady.jpg' },
    // Add more items as needed
  ];
  function saveProductToLocalStorage(product) {
    let cardProducts = JSON.parse(localStorage.getItem('cardProducts')) || [];

    const existingProduct = cardProducts.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cardProducts.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cardProducts', JSON.stringify(cardProducts));
}

// Function to add products to favorites
function addToFavourite(button, product) {
    if(log){
    const localStorageKey = 'favouriteProducts';
    const favouriteProducts = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    const existingProductIndex = favouriteProducts.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        // Product is already in favorites, remove it
        favouriteProducts.splice(existingProductIndex, 1);
        button.classList.remove('favSelected');
    } else {
        // Product is not in favorites, add it
        favouriteProducts.push({ ...product });
        button.classList.add('favSelected');
    }

    localStorage.setItem(localStorageKey, JSON.stringify(favouriteProducts));
}else{alert('log in please')}}

// Function to draw a product
function drawProduct(product) {
    // Create the outer card element
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4 col-xl-3'; // Adjusted to col-md-4 for three cards in a row

    // Create the card content
    card.innerHTML = `
      <div class="card text-center card-product">
        <div class="card-product__img">
          <img class="card-img" src="${product.img}" alt="${product.title}">
          <ul class="card-product__imgOverlay">
            <li><button><i class="fas fa-search"></i></button></li>
            <li><button class="addCard"><i class="fas fa-shopping-cart"></i></button></li>
            <li><button  class="addFavourite"><i class="fas fa-heart"></i></button></li>
          </ul>
        </div>
        <div class="card-body">
          <p>${product.category}</p>
          <h4 class="card-product__title"><a href="#">${product.title}</a></h4>
          <p class="card-product__price">${product.price}</p>
        </div>
      </div>
    `;

    return card;
}




  // Function to populate the carousel with products
  function populateCarousel(products) {
    const carouselInner = document.querySelector('#carousel-inner');

    // Clear existing content
    carouselInner.innerHTML = '';

    // Loop through products and add to carousel
    for (let i = 0; i < products.length; i += 4) {
      // Create a carousel item for every four products
      const carouselItem = document.createElement('div');
      carouselItem.className = i === 0 ? 'carousel-item active' : 'carousel-item';
      carouselInner.appendChild(carouselItem);

      // Create a row for each carousel item
      const row = document.createElement('div');
      row.className = 'row';
      carouselItem.appendChild(row);

      // Add four products to the current row
      for (let j = 0; j < 4 && i + j < products.length; j++) {
        const productCard = drawProduct(products[i + j]);
        row.appendChild(productCard);
      }
    }
  }

  // Function to search products based on title
  function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const searchResult = products.filter(product => product.title.toLowerCase().includes(searchInput));

    // Call populateCarousel with the search result
    populateCarousel(searchResult);
  }

    // Function to search products based on category
    function searchCat(cat) {
        cat=cat.textContent.toLowerCase();
        const searchResult = products.filter(product => product.category.toLowerCase().includes(cat));
        // Call populateCarousel with the search result
        populateCarousel(searchResult);
      }
      const nav = document.querySelectorAll('.cat');
      nav.forEach((searchnav) => {
           // Attach the event listener to each button
           searchnav.addEventListener('click', () => searchCat(searchnav));
        });

  // Call the function to populate the carousel with all products initially
  populateCarousel(products);

  function getLocalStorageProducts(key) {
    const productsJson = localStorage.getItem(key);
    return productsJson ? JSON.parse(productsJson) : [];
}

  function addToCard(title) {
    const cardProductDropdown = document.querySelector('.cardProduct');
    const cardProducts = getLocalStorageProducts('cardProducts');
    const existingItem = cardProducts.find(product => product.title === title.title);

    // Save the added product to local storage
    saveProductToLocalStorage(title);

    if (existingItem) {
        increaseQuantity(existingItem.title);
    } else {
        const listItem = document.createElement('li');
        listItem.className = 'd-flex justify-content-between align-items-center';
        listItem.dataset.title = title.title;
        listItem.innerHTML = `
            ${title.title}
            <div class="newitem">
                <button class="btn btn-outline-success btn-sm" onclick="increaseQuantity(this)"><i class="fas fa-plus"></i></button>
                <span class="quantity">${existingItem ? existingItem.quantity : 1}</span>
                <button class="btn btn-outline-danger btn-sm" onclick="decreaseQuantity(this)"><i class="fas fa-minus"></i></button>
            </div>
        `;

        cardProductDropdown.insertBefore(listItem, cardProductDropdown.lastElementChild.previousElementSibling);
    }
}



// Function to increase quantity in the card
function increaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent, 10);
    quantity += 1;
    quantityElement.textContent = quantity;
}

// Function to decrease quantity in the card
function decreaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent, 10);

    if (quantity > 1) {
        quantity -= 1;
        quantityElement.textContent = quantity;
    } else {
    
        const elementToRemove = button.closest('li');
        elementToRemove.remove();
    }
}


 //Event listener for the "Add to Card" buttons
(document.querySelectorAll(".addCard")).forEach((button, index) => {
    let product = products[index];
    button.addEventListener('click', () => addToCard(product));
});

// Event listener for the "Add to Favourite" buttons
(document.querySelectorAll(".addFavourite")).forEach((button, index) => {
    let product = products[index];
    button.addEventListener('click', () => addToFavourite(button, product));
});