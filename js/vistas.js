let mostrador = document.getElementById("mostrador")
let seleccion = document.getElementById("seleccion")
let imgSeleccionada = document.getElementById("img")
let modeloSeleccionado = document.getElementById("modelo")
let precio = document.getElementById("precio")
let fondo = document.querySelector(".fondo-negro")
let precioDesc = document.querySelector(".precio-desc")
let hrefPay = document.querySelector(".href-pay-vista")


// funcion que carga la info del item seleccionado
function cargar(item){
    seleccion.classList.add("right-n")
    // seleccion.style.right = "5%"
    // seleccion.style.display = "flex"
    fondo.style.display = "block"
    imgSeleccionada.src = item.getElementsByTagName("img")[0].src
    precioDesc.innerHTML = item.getElementsByTagName("p")[0].innerHTML
    modeloSeleccionado.innerHTML = item.getElementsByTagName("h5")[0].innerHTML
    precio.innerHTML = item.getElementsByTagName("span")[0].innerHTML
    hrefPay.href = item.getElementsByTagName("a")[0].href
}

// cerrar info
function cerrar(){
    seleccion.classList.remove("right-n")
    // seleccion.style.right = "-200%"
    // seleccion.style.display = "none"
    fondo.style.display = "none"
}