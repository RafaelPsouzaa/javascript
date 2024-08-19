const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal= document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closedModalBtn = document.getElementById("closed-modal-btn");
const cartCount = document.getElementById("cart-count");
const addressInput =document.getElementById("address");
const addressWarm = document.getElementById("adress-warn");
const dataSpan =document.getElementById("date-span");
const isOpen = checkRestauranteOpen();

let cart=[];
// Abrir o modal do carrinho
cartBtn.addEventListener("click",()=>{
    if(isOpen === true){
        cartModal.style.display = "flex";
        updateCartModal();

    }else{
        Toastify({
            text: "Ops Restaurante fechado ",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #fc0330, #a80322)",
            },
        }).showToast();
        return;

    }
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

            
            <button class="remove-btn" data-name="${item.name}">Remover</button>
        

        </div>
        
        `
        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
     })

     cartTotal.textContent = total.toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
     });

     cartCount.innerHTML = cart.length;

}

// Funçao para remover o item do carrinho 
cartItemsContainer.addEventListener("click",function(event){
    if(event.target.classList.contains("remove-btn")){
        const name = event.target.getAttribute("data-name");
        removeItemCart(name);
    }

})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);
    if(index !== -1 ){
        const item = cart[index];
        if(item.quantity > 1 ){
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index,1);
        updateCartModal();
    }
}

addressInput.addEventListener("input",(event)=>{
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500");
        addressWarm.classList.add("hidden");
    }


})
// Finalizar Pedido
checkoutBtn.addEventListener("click",()=>{
    if(!isOpen){
        Toastify({
            text: "Ops Restaurante fechado ",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #fc0330, #a80322)",
            },
        }).showToast();
        return;
    }

    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarm.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;

    }
    // Enviar o pedido para API do whatsWeb
    const cartItems = cart.map((item) =>{
        return(
            `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price}`
        )
    }).join("")

    const message = encodeURIComponent(cartItems);
    const phone = "982532126"
    window.open(`https://wa.me/${phone}?text=${message} Endereco:${addressInput.value}`,"_blank")
    cart =[];
    updateCartModal();

})


function checkRestauranteOpen(){
    const data = new Date();
    const hora =  data.getHours();
    return hora >= 18 && hora < 22;
}

if(isOpen){
    dataSpan.classList.remove("bg-red-500");
    dataSpan.classList.add("bg-green-600");
}else{
    dataSpan.classList.remove("bg-green-600");
    dataSpan.classList.add("bg-red-500");
}

