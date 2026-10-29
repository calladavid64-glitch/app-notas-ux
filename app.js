const formulario = document.getElementById("formulario");
const texto = document.getElementById("texto");
const agregar = document.getElementById("agregar");
const lista = document.getElementById("lista");
const vacio = document.getElementById("vacio");
const mensaje = document.getElementById("mensaje");

let notas = [];
let ultimaEliminada = null;
let temporizador;

function mostrarMensaje(contenido, tipo, conDeshacer) {
  clearTimeout(temporizador);
  mensaje.textContent = contenido + " ";
  mensaje.className = "mensaje " + tipo;
  if (conDeshacer) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton-secundario";
    boton.textContent = "Deshacer";
    boton.addEventListener("click", deshacer);
    mensaje.appendChild(boton);
  }
  temporizador = setTimeout(function () {
    mensaje.textContent = "";
    ultimaEliminada = null;
  }, 8000);
}

function dibujar() {
  lista.innerHTML = "";
  vacio.hidden = notas.length > 0;
  notas.forEach(function (nota, indice) {
    const item = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = nota;
    const eliminar = document.createElement("button");
    eliminar.type = "button";
    eliminar.className = "boton-secundario";
    eliminar.textContent = "Eliminar";
    eliminar.setAttribute("aria-label", "Eliminar nota: " + nota);
    eliminar.addEventListener("click", function () {
      ultimaEliminada = { nota: nota, indice: indice };
      notas.splice(indice, 1);
      dibujar();
      mostrarMensaje("Nota eliminada.", "info", true);
    });
    item.appendChild(span);
    item.appendChild(eliminar);
    lista.appendChild(item);
  });
}

function deshacer() {
  if (!ultimaEliminada) return;
  notas.splice(ultimaEliminada.indice, 0, ultimaEliminada.nota);
  ultimaEliminada = null;
  dibujar();
  mostrarMensaje("Nota restaurada.", "exito", false);
}

texto.addEventListener("input", function () {
  agregar.disabled = texto.value.trim() === "";
});

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const valor = texto.value.trim();
  if (valor === "") return;
  notas.push(valor);
  texto.value = "";
  agregar.disabled = true;
  dibujar();
  mostrarMensaje("Nota agregada.", "exito", false);
  texto.focus();
});

dibujar();