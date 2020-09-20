let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", agregar);
let btnTotal = document.querySelector("#btnTotal");
btnTotal.addEventListener("click", sumar);

let compras = [];


function agregar() {
    console.log("Funcion Agregar");
    let producto = document.querySelector('#producto').value;
    let precio = parseInt(document.querySelector('#precio').value);
    let descripccion = document.querySelector('#descripccion').value;
    let renglon = {
        "producto": producto,
        "precio": precio,
        'descripccion': descripccion
    }
    compras.push(renglon);
    mostrarTablaCompras();
}

function sumar() {
    console.log("Funcion Sumar");
    let total = 0;
    for (let i = 0; i < compras.length; i++) {
        total += compras[i].precio;
    }
    let max = compras[0].precio;
    for (let r of compras) {
        if (max < r.precio)
            max = r.precio;
    }
    document.querySelector("#total").innerHTML =
        "<p>Total: $" + total + "</p>" +
        "<p>Maximo: $" + max + "</p>"
}



function mostrarTablaCompras() {
    html = "";
    for (let r of compras) {
        html += `
            <tr>
            <td>${r.producto}</td>
            <td>${r.precio}</td>
            <td>${r.descripccion}</td>
            </tr>
            `;
    }
    document.querySelector("#tblCompras").innerHTML = html;
}

async function load() {

    //container.innerHTML = "<h1>Loading...</h1>";
    let response = await fetch('/app');
    if (response.ok) {

        let r = await fetch('/app');
        compras = await r.json();
        mostrarTablaCompras();
    }
}

load();