/* Ventana emergente genérica */
function modal(h) {
  stop();
  $("ov").innerHTML = '<div class="sheet">' + h + "</div>";
  $("ov").style.display = "flex";
}
function cerrar() {
  stop();
  $("ov").style.display = "none";
  $("ov").innerHTML = "";
  render();
}
