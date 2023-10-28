let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
let contenedorProducto = document.getElementById("contenedor-productos");

document.addEventListener("DOMContentLoaded", () => {
  fetchProducto();
});

const fetchProducto = async () => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id} `);
    data = await res.json();
    renderProducto(data);
  } catch (err) {
    alert(
      "Error de comunicación con el servidor de datos - Error: " + err.message
    );
  }
};

function renderProducto(data) {
  console.log("render", data);

  contenedorProducto.innerHTML = `
    
    
    <div class="producto-detalles1">
    <img class="producto-imagen" src="${data.image}" alt="${data.title}">
        <h3 class="producto-titulo">${data.title}</h3>
        <p class="producto-precio">Descripcion: ${data.description}</p>
        <h3 class="producto-titulo">Categoria: ${data.category}</h3>
        <p class="producto-precio">Precio: $${data.price}</p>
       
    </div>
    
    
    
    
    `;
}
/*category
: 
"men's clothing"
description
: 
"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
id
: 
1
image
: 
"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
price
: 
109.95
rating
: 
{rate: 3.9, count: 120}
title
: 
"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"*/
