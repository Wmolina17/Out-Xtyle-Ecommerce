//cart
let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".cart")
let closeCard = document.querySelector("#close-cart")

//cart favorites
let favoritesIcon = document.querySelector("#fav-icon")
let favorites = document.querySelector(".cart-favorites")
let closeFavorites = document.querySelector("#close-cart-favorites")

// background
// let fondo = document.querySelector(".fondo-negro")

// open cart
cartIcon.onclick = () =>{
    cart.classList.add("active")
    fondo.style.display = "block"
}
// close cart
closeCard.onclick = () =>{
    cart.classList.remove("active")
    fondo.style.display = "none"
}

// open favorites
favoritesIcon.onclick = () =>{
    favorites.classList.add("active")
    fondo.style.display = "block"
}
// close favorites
closeFavorites.onclick = () =>{
    favorites.classList.remove("active")
    fondo.style.display = "none"
}

// working cart
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

// making function
function ready(){

    // remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for(var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItems)
    }

    // quantity changes
    var quantityInput = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInput.length; i++){
        var input = quantityInput[i]
        input.addEventListener('change', quantityChanged)
    }

    // add to cart
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener("click", addCartClicked)
    }

    // buy buttom work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked )
    loadCartItems()
}

// but button cliked
function buyButtonClicked(){
    location.href ='https://buy.stripe.com/test_14kaG1d5S5Yy2Bi297';
    // alert("tu orden esta hecha con exito !")
    var cartContent = document.getElementsByClassName("cart-content")[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}


// function remove items from cart
function removeCartItems(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
    saveCartItems()
}

// quantityChanged
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateTotal()
    saveCartItems()
}

// addCartClicked
function addCartClicked(event){
    var newElement = document.getElementsByClassName("new-product")[0]
    newElement.style.background ="red"

    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText
    var price = shopProducts.getElementsByClassName("price")[0].innerText
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src
    addProductTocart(title, price, productImg)
    updateTotal()
    saveCartItems()
}

function addProductTocart(title, price, productImg){
    var cartShopBox = document.createElement("div")
    cartShopBox.classList.add("cart-box")
    var cartItems = document.getElementsByClassName("cart-content")[0]
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title")
    for (var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert("Este producto ya esta agregado a tu carrito")
            return;
        }
    }
    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <img src="../img/trash-alt-solid-24.png" alt="" class="cart-remove">
    `

    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItems)
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged)
    saveCartItems()
}



//update total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box') 
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + price * quantity
    }
    // if price contain some cents value
    total = Math.round(total * 100)/100
    document.getElementsByClassName('total-price')[0].innerText = '$' + total 

    // save total to local Storage
    localStorage.setItem("cartTotal", total)
}



// local storage
function saveCartItems(){
    var cartContent = document.getElementsByClassName("cart-content")[0]
    var cartBoxes = cartContent.getElementsByClassName("cart-box")
    var cartItems = []

    for(var i = 0; i < cartBoxes.length; i++ ){
        cartBox = cartBoxes[i]
        var titleElement = cartBox.getElementsByClassName("cart-product-title")[0]
        var priceElement = cart.getElementsByClassName("cart-price")[0]
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
        var productImg = cartBox.getElementsByClassName("cart-img")[0].src

        var item = {
            title : titleElement.innerText,
            price : priceElement.innerText,
            quantity : quantityElement.value,
            productImg : productImg,
        }
        cartItems.push(item)
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}

// loads in cart
function loadCartItems(){
    var cartItems = localStorage.getItem("cartItems")
    if (cartItems){
        cartItems = JSON.parse(cartItems)

        for( var i = 0; i < cartItems.length; i++){
            var item = cartItems[i]
            addProductTocart(item.title, item.price, item.productImg)

            var cartBoxes = document.getElementsByClassName("cart-box")
            var cartBox = cartBoxes[cartBoxes.length - 1]
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
            quantityElement.value = item.quantity
        }
    }
    var cartTotal = localStorage.getItem("cartTotal")
    if(cartTotal){
        document.getElementsByClassName("total-price")[0].innerText = "$" + cartTotal
    }
}

