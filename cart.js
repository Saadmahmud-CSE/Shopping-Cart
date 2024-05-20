import {getCart,setCart} from "./util";
import "./style.css";
import { decl } from "postcss";

function initialState(){
    const cart = getCart();
    if(cart){
        document.querySelector('.cart-total-items').innerHTML = cart.items.length;
    }
}

function getCartRow(cartItem){
    const tr = document.createElement('tr');
    tr.innerHTML = 
    `<td>
        <div class="flex items-center gap-3">
            <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
                <img src="${cartItem.thumbnail}" alt="Avatar Tailwind CSS Component" />
            </div>
            </div>
            <div>
            <div class="font-bold">${cartItem.title}</div>
            </div>
        </div>
        </td>
        <td>
        $${cartItem.price}
        </td>
        <td>
        <input 
        type="number" 
        placeholder="Type here" 
        value="${cartItem.quantity}"
        class="quantity-input input input-bordered w-40 max-w-xs" />
        </td>
        <td>$${cartItem.price * cartItem.quantity}</td>`;

        const input = tr.querySelector('.quantity-input')
        input.addEventListener('input',(e)=>{
            const newQuantity = e.target.valueAsNumber;
            if(Number.isInteger(newQuantity) && newQuantity>=0){
                const cart = getCart();
                cart.items = cart.items.map((item)=>{
                    if(cartItem.id !== item.id) return item;
                    item.quantity = newQuantity;
                    return item;
                });
                setCart(cart);
                renderCart();
            }
        })
    return tr;
}

function totalPrice() {
    const cart=getCart();
    let total=0,discount=0,totalDis;
    for(let i=0;i<cart.items.length;i++){
        total+=cart.items[i].price*cart.items[i].quantity;
        discount+=(cart.items[i].price/100)*cart.items[i].quantity;
    }
    totalDis=total+discount;
    document.getElementById("sub-total").innerHTML=`$${total}`;
    document.getElementById("discount").innerHTML=`$${Math.ceil(discount)}`;
    document.getElementById("total").innerHTML=`$${Math.floor(totalDis)}`;
}

function renderCart(){
    const cart = getCart();
    const cartItemsDiv = document.querySelector('.cart-items');
    cartItemsDiv.innerHTML = "";
    for(let i=0; i<cart.items.length; i++){
        cartItemsDiv.append(getCartRow(cart.items[i]));
    }
    totalPrice();
}

window.addEventListener('load', () => {
    initialState();
    renderCart();
});

window.addEventListener('click',checkOut);
function checkOut(){
    document.querySelector('#checks').innerHTML="Checkout Succcessful";
}