let iconCart=document.querySelector(".cart-icon");
let cart=document.querySelector('.cart');
let container=document.querySelector(".container");
let close=document.querySelector(".closed");
let listProductHTML=document.querySelector('.menu')


let listProducts = [];

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
            newProduct.classList.add('item');
            newProduct.innerHTML=`
            <div class="pepperoni" data-id="1">	
                <img src="images/pizzas/pepperoni pic.png"class="mini-pizza">
                <a class="pizza-name">Пепперони</a>
                <a class="pizza-info">Пикантная пепперони , увеличенная порция моцареллы, фирменный томатный соус</a>
                <div class="buy-button">
                    <button class="button1" href="">В корзину</button>
                    <button class="button" href="">Купить</button>
                </div>
                <a class="price">600 ₽</a>
                
            </div>
            `
            listProductHTML.appendChild(newProduct);
        })
    }
}



listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('button1')) {
        let id_product = positionClick.getElementById;
        alert(id_product);
    }

})




    const initApp = () => {
        // get data product
        fetch('products.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addDataToHTML()
            
        })
    }
    initApp();