let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", agregar);
let autorMasDocs = document.querySelector('#autorMasDocs');
autorMasDocs.addEventListener('click', getAutorMasDocs);
let docMasAntiguo = document.querySelector('#masAntiguo');
docMasAntiguo.addEventListener('click', getDocMasAntiguo);
let docMasModerno = document.querySelector('#masModerno');
docMasModerno.addEventListener('click', getDocMasModerno);
let listaTema = document.querySelector('#listaTematica');
listaTema.addEventListener('click', getListaTematica)

let biblioteca = [];

function getListaTematica() {
    let inputTema = document.querySelector('#ingresarTema').value;
    let html = ''
    for (let i = 0; i < biblioteca.length; i++) {
        if (biblioteca[i].tema == inputTema) {
            html += `
            <tr>
            <td>${biblioteca[i].titulo}</td>
            </tr>
            `;
        }
    }
    document.querySelector('#tablaPorTema').innerHTML = html;
}

function getDocMasAntiguo() {
    let nMin = biblioteca[0].fecha;
    let doc;
    for (let i = 0; i < biblioteca.length; i++) {
        if (biblioteca[i].fecha < nMin) {
            nMin = biblioteca[i].fecha;
            doc = biblioteca[i].titulo;
        }
    }
    document.querySelector("#antiguoModerno").innerHTML =
        "<p>Documento: " + doc + "</p>" +
        "<p>Fecha: " + nMin + "</p>"
}

function getDocMasModerno() {
    let nMax = biblioteca[0].fecha;
    let doc;
    for (let i = 0; i < biblioteca.length; i++) {
        if (biblioteca[i].fecha > nMax) {
            nMax = biblioteca[i].fecha;
            doc = biblioteca[i].titulo;
        }
    }
    document.querySelector("#antiguoModerno").innerHTML =
        "<p>Documento: " + doc + "</p>" +
        "<p>Fecha: " + nMax + "</p>"
}

function getAutorMasDocs() {
    //Esta función es un desastre pero funciona, la dejo para demostrar que lo intenté jajaja.
    let autores = [];
    let artiuculosAutores = [];
    let estaAnotado = false;
    for (let i = 0; i < biblioteca.length; i++) {
        for (let j = 0; j < autores.length; j++) {
            if (biblioteca[i].autor == autores[j]) {
                estaAnotado = true;
            }
        }
        if (!estaAnotado) {
            autores.push(biblioteca[i].autor);
        }
    }
    for (let i = 0; i < biblioteca.length; i++) {
        for (let j = 0; j < autores.length; j++) {
            if (biblioteca[i].autor == autores[j]) {
                if (artiuculosAutores[j]) {
                    artiuculosAutores[j]++;
                } else {
                    artiuculosAutores[j] = 1
                }
            }
        }
    }
    let nMax = artiuculosAutores[0];
    let numeroAutor;
    for (let i = 0; i < artiuculosAutores.length; i++) {
        if (artiuculosAutores[i] > nMax) {
            nMax = artiuculosAutores[i];
            numeroAutor = i;
        }
    }
    if (!numeroAutor) {
        numeroAutor = 0;
    }
    console.log(nMax)
    document.querySelector("#numero").innerHTML = 'Autor con mas documentos: ' + biblioteca[numeroAutor].autor;
}

function agregar() {
    console.log("Funcion Agregar");
    let titulo = document.querySelector('#titulo').value;
    let autor = document.querySelector('#autor').value;
    let tema = document.querySelector('#tema').value;
    let fecha = parseInt(document.querySelector('#fecha').value);
    let renglon = {
        "titulo": titulo,
        "autor": autor,
        "tema": tema,
        "fecha": fecha
    }
    biblioteca.push(renglon);
    mostrarTablabiblioteca();
}

function mostrarTablabiblioteca() {
    html = "";
    for (let r of biblioteca) {
        html += `
            <tr>
            <td>${r.titulo}</td>
            <td>${r.autor}</td>
            <td>${r.tema}</td>
            <td>${r.fecha}</td>
            </tr>
            `;
    }
    document.querySelector("#tblBiblioteca").innerHTML = html;
}