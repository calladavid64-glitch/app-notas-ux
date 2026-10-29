document.getElementById("agregar").addEventListener("click", function () {
  const texto = document.getElementById("texto").value;
  const p = document.createElement("p");
  p.innerHTML = texto + ' <a href="#" class="x">BORRAR</a>';
  p.querySelector(".x").addEventListener("click", function () { p.remove(); });
  document.getElementById("lista").appendChild(p);
});