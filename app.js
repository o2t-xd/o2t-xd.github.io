let iconCart=document.querySelector(".cart-icon");
let cart=document.querySelector('.cart');
let container=document.querySelector(".container");
let close=document.querySelector(".closed");
let listProductHTML=document.querySelector('.menu');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.cart-icon span');
let body = document.querySelector('body');


let listProducts = [];
let carts= [];

iconCart.addEventListener('click',()=>{
    const cartright = window.getComputedStyle(cart).right;
    if(cart.style.right == "-100%"){
        console.log('succes');
        cart.style.right= '0%';
    }else{
        cart.style.right="-100%";
    }
})
close.addEventListener("click",()=>{
    cart.style.right="-100%";
    })


const addDataToHTML = () => {
    listProductHTML.innerHTML='';
    if(listProducts.length>0){
        listProducts.forEach(product=>{
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML=`
            <div class="pepperoni">	
                <img src="${product.image}"class="mini-pizza">
                <a class="pizza-name">${product.name}</a>
                <a class="pizza-info">${product.info}</a>
                <div class="buy-button">
                    <button class="button1" href="">В корзину</button>
                    <button class="button" href="">Купить</button>
                </div>
                <a class="price">${product.price} ₽</a>
                
            </div>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}



listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('button1')){
        let product_id = positionClick.closest('.item').dataset.id;
        addToCart(product_id);
    }
})



const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id)
    if(carts.length<=0){
        carts=[{
            product_id: product_id,
            quantity: 1
        }]
    }else if(positionThisProductInCart<0){
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () =>{
    localStorage.setItem('cart', JSON.stringify(carts));
}


const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex(value => value.id == cart.product_id);
            let CartInfo = listProducts[positionProduct];
            newCart.innerHTML = `
            <div class="item-content">
                <img src="${CartInfo.image}">
                <div class="content">
                    <div class="name">${CartInfo.name}</div>
                    <div class="item-price">${CartInfo.price} ₽</div>
                </div>
                <div class="quantity">
                    <button class="minus">-</button>
                    <span class="value">${cart.quantity}</span>
                    <button class="plus">+</button>
                </div>
            </div>
            `;
            listCartHTML.appendChild(newCart);
        });
    }
    iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let itemElement = positionClick.closest('.item');
        if (itemElement) {
            let product_id = itemElement.dataset.id;
            console.log('Product ID:', product_id);

            if (positionClick.classList.contains('minus')) {
                console.log('Minus button clicked');
                reduceQuantity(product_id);
            } else if (positionClick.classList.contains('plus')) {
                console.log('Plus button clicked');
                increaseQuantity(product_id);
            }
        } else {
            console.log('Parent item not found');
        }
    } else {
        console.log('Clicked element is not minus or plus');
    }
});

const reduceQuantity = (product_id) => {
    let item = carts.find(cart => cart.product_id == product_id);
    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
      
        carts = carts.filter(cart => cart.product_id != product_id);
    }
    addCartToHTML();
    addCartToMemory();
};

const increaseQuantity = (product_id) => {
    let item = carts.find(cart => cart.product_id == product_id);
    if (item) {
        item.quantity++;
    }
 
    addCartToHTML();
    addCartToMemory();
    
}

let products = null;
// get data from file json
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
})

let listCart = [];
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}
checkCart();
document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";


    const initApp = () => {
        // get data product
        fetch('products.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addDataToHTML()
            
            // get cart from memory
            if(localStorage.getItem('cart')){ 
                carts=JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }

        })
    }
    
    initApp();

