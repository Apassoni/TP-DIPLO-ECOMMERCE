//https://api.mercadolibre.com/sites/MLA/search?q=Zapatillas%20Running%20Mujer&limit=10&sort=relevance

//--------------------------------------------------------------------------------------------

let productos = [];

// Función para hacer la consulta a la API y obtener los datos
function obtenerProductosDesdeAPI() {
 
  const url = "https://fakestoreapi.com/products";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Filtrar y mapear los datos relevantes de la respuesta de la API
      productos = data.map((producto) => ({
        id: producto.id,
        titulo: producto.title,
        precio: producto.price,
        imagen: producto.image,
        categoria: producto.category,
      }));
      cargarProductos(productos);
    })
    .catch((error) => {
      console.error("Error al obtener los productos desde la API:", error);
    });
}

// Llamada para obtener los productos desde la API
obtenerProductosDesdeAPI();

// Resto del código (funciones cargarProductos, botonesCategorias, agregarAlCarrito, actualizarBotonesAgregar, etc.)

//------------------------------------------------------------------------------------------------


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
let botonesMasInfo = document.querySelectorAll(".producto-masinfo");
const numerito = document.querySelector("#numerito");

botonesCategorias.forEach((boton) =>
  boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
  })
);

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";

  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    producto.titulo=producto.titulo.substring(0,25);
    div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
                <button class="producto-masinfo" id="MI${producto.id}">MasInfo</button>
            </div>
        `;

    contenedorProductos.append(div);
  });

  actualizarBotonesAgregar();
}

// funcion filtrado botones aside

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const productoCategoria = productos.find(
        (producto) => producto.categoria === e.currentTarget.id
      );
      tituloPrincipal.innerText = productoCategoria.categoria;
      const productosBoton = productos.filter(
        (producto) => producto.categoria === e.currentTarget.id
      );
      console.log(productosBoton);

      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");
  botonesMasInfo = document.querySelectorAll(".producto-masinfo");


  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });

  botonesMasInfo.forEach((boton) => {
    boton.addEventListener("click", verMasInfo);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  console.log(e);

  Toastify({
    text: "Producto agregado",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #4b33a8, #785ce9)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem",
    },
    offset: {
      x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: "1.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  const idBoton = parseInt(e.currentTarget.id);
  
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );
  console.log(productoAgregado);

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  actualizarNumerito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numerito.innerText = nuevoNumerito;
}


function verMasInfo(e){

  const idBoton = parseInt((e.currentTarget.id).replace(/\D/g,''));
  console.log(idBoton);
  window.location.href = "producto.html?id=" + idBoton;








}