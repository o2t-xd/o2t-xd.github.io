let listCart = [];

// Function to check and parse cart from cookies
function checkCart() {
    var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}

// Function to add cart items to the HTML
function addCartToHTML() {
    // Clear default data
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;

    // If there are products in the cart
    if (listCart) {
        listCart.forEach(product => {
            if (product) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${product.price * product.quantity}</div>
                `;
                listCartHTML.appendChild(newCart);
                totalQuantity += product.quantity;
                totalPrice += (product.price * product.quantity);
            }
        });
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice.toFixed(2); // Ensure the price is formatted correctly
}

// Initialize by checking the cart and adding it to HTML
checkCart();
addCartToHTML();
