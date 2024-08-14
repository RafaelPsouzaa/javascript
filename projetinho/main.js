const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal= document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtin = document.getElementById("checkout-btn");
const closedModalBtn = document.getElementById("closed-modal-btn");
const cartCount = document.getElementById("cart-count");
const addressInput =document.getElementById("address");
const addressWarm = document.getElementById("adress-warn");

let cart=[];
// Abrir o modal do carrinho
cartBtn.addEventListener("click",()=>{
    cartModal.style.display = "flex";
    updateCartModal();
})

// Fechar o modal quando clicar 
cartModal.addEventListener("click",(event)=>{
    if(event.target === cartModal){
        cartModal.style.display = "none";
    }
})

closedModalBtn.addEventListener("click",()=>{
    cartModal.style.display = "none";
})

menu.addEventListener("click",(event)=>{
    let parentButton = event.target.closest(".add-to-cart-btn")
    // console.log(parentButton);
    if(parentButton){
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addToCart(name,price);
    }

})

// Funçao para adicionar o carrinho 

function addToCart(name,price){
    const existingItem = cart.find(item => item.name ===name);

    if(existingItem){
        //Se o item existe, aumenta apenas a quantidade +1
        existingItem.quantity +=1;
        

    }else{
        cart.push({
            name,
            price,
            quantity:1,

        })
    }
    updateCartModal()
}

// atualiza o carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML ="";
    let total = 0;

    cart.forEach(item=>{
        const cartItemElement =document.createElement("div");
        cartItemElement.classList.add("flex","justify-between","mb-4","flex-col")

        cartItemElement.innerHTML= `
        <div class="flex items-center justify-between">
        <div>
            <p class="font-medium">${item.name}</p>
            <p>Qtd: ${item.quantity}</p>
            <p class="font-medium mt-2">R$${item.price.toFixed(2)}</p>
         </div>

            
            <button>Remover</button>
        

        </div>
        
        `
        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
     })

     cartTotal.textContent = total;

}