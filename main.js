import {getCart,setCart} from "./util";
import "./style.css";

async function getProducts(){
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  console.log(data.products);
  return data.products;
}

function getProductsCards(product){
  const div = document.createElement("div");
  div.innerHTML = 
  `<div class="card card-compact bg-base-100 shadow-xl relative">
  <figure><img src="${product.thumbnail}" alt="Shoes" />
  </figure>
  <div class="absolute top-0 right-0 bg-primary text-white w-14 h-14 flex items-center justify-center text-center font-semibold rounded-tr-2xl rounded-bl-2xl">
    ${product.discountPercentage} OFF</div>
  <div class="card-body">
    <h2 class="card-title">${product.title}</h2>
    <p>${product.description}</p>
    <p>$${product.price}</p>
  </div>
</div>
  `;
  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'card-actions justify-end';

  const button = document.createElement('button');
  button.innerText = 'Add to Cart';
  button.className = 'btn btn-sm btn-primary';

  buttonDiv.append(button);

  button.addEventListener("click",()=>{
    const cart = getCart();

    const productInCart = cart.items.find((item) => item.id === product.id)
    if(!productInCart){
      cart.items.push({
        id: product.id,
        title: product.title,
        description: product.description,
        thumbnail: product.thumbnail,
        price: product.price,
        quantity: 1,
      });
    } 
    else{
      cart.items = cart.items.map((item)=>{
        if(item.id === product.id){
          // return {
          //   ...item,
          //   quantity: item.quantity + 1,
          // }
          item.quantity = item.quantity + 1;
          return item;
        }
        return item;
      })
    }
    
    setCart(cart);
  })
  
  div.querySelector('.card-body').appendChild(buttonDiv);
  return div;
}

function initialState(){
  const cart = getCart();
  if(!cart){
    const initialCart = {
      items: [],
      discount: 0,
      shipping: 100,
    };
    setCart(initialCart);
  }
  else{
    document.querySelector('.cart-total-items').innerHTML = cart.items.length;
  }
}

async function renderProducts(){
  const products = await getProducts();
  const productsDiv = document.querySelector(".products");

  for(let i=0; i<products.length; ++i){
    productsDiv.append(getProductsCards(products[i]));
  }
  console.log(productsDiv);
}

window.addEventListener('load', () => {
  renderProducts();
  initialState();
});