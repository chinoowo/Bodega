let productos = [];
const url1 = "https://musicpro.bemtorres.win/api/v1/test/saludo";
const url = "http://localhost:8080/api/v1/products";
const url2 = "https://musicpro.bemtorres.win/api/v1/test/saldo";
const options = {
    headers: {
        'Accept': 'application/json'
    },

    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
}



async function getProducts() {
    const response = await fetch(url, options);
    const products = await response.json();
    ImprimirProductos(products);
}
getProducts();



function ImprimirProductos(products) {
    let contenedor = document.getElementById("cuerpoTabla");
    contenedor.innerHTML = "";
    products.forEach(producto => {
        contenedor.innerHTML += mapearProducto(producto);
    });
}

function mapearProducto(producto) {
    return `<tr>

    <td>${producto.productId}</td>
    <td>${producto.productName}</td>
    <td>${producto.productType}</td>
    <td>${producto.productCode}</td>
    <td>${producto.stock}</td>
    <td>
    <button class='btn btn-danger btn-sm' onclick="eliminarProducto(${producto.productId})">Eliminar</button>

    <button class='btn btn-warning btn-sm' onclick="popularDatosid('${producto.productId}','${producto.productName}','${producto.productType}','${producto.productCode}','${producto.stock}')">Actualizar</button>
    </td>
</tr>`;
}


function eliminarProducto(productId) {
    fetch(url + "/" + productId, {
        headers: {
            'Accept': 'application/json'
        },

        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
    }).then(response => {
        console.log(response);
        getProducts();
    });
}



function guardarProducto() {
    let data = {
        productId: document.getElementById("ProductId").value,
        productName: document.getElementById("nombreP").value,
        productType: document.getElementById("tipoP").value,
        productCode: document.getElementById("CodigoP").value,
        stock: document.getElementById("stockP").value
    };
    let productId = document.getElementById("ProductId").value
    fetch(url + "/" + productId, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": 'application/json; charset=UTF-8'
        }
    }).then((res) => { getProducts() }).then(() => console.log("Producto repetido")) /* .catch((error)=>console.log("Producto repetido")) */
}



function popularDatosid(productId, productName, productType, productCode, stock) {

    document.getElementById('ProductId').value = productId;
    document.getElementById('nombreP').value = productName;
    document.getElementById('tipoP').value = productType;
    document.getElementById('CodigoP').value = productCode;
    document.getElementById('stockP').value = stock;
}

function ActualizarProducto() {
    let data = {
        productId: document.getElementById("ProductId").value,
        productName: document.getElementById("nombreP").value,
        productType: document.getElementById("tipoP").value,
        productCode: document.getElementById("CodigoP").value,
        stock: document.getElementById("stockP").value,
        id: document.getElementById('productId')
    };
    let productId = document.getElementById("ProductId").value
    fetch(url + "/" + productId, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": 'application/json; charset=UTF-8'
        }
    }).then((res) => { getProducts() })
}


function apiConsumo() {
    let message = '';
    fetch(url1)
        .then(data => {
            return data.json();
        })
        .then(resp => {
            console.log(resp.message);
            message = resp.message;



        });
}

function apiConsumo2() {
    let message = '';
    let saldo = '';
    fetch(url2)
        .then(data => {
            return data.json();
        })
        .then(resp => {
            console.log(resp.message);
            message = resp.message;

            console.log(resp.saldo);
            saldo = resp.saldo;

            document.getElementById("saldo").value = saldo;

        });
}








