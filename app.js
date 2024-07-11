let iconCart=document.querySelector(".cart-icon");
let cart=document.querySelector('.cart');
let container=document.querySelector(".container");
let close=document.querySelector(".closed");

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