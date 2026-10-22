/* Utilidades: selector, escape HTML y fechas */
const $ = (id) => document.getElementById(id);
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
function hoy() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}
function dias(v) {
  return Math.round((new Date(v + "T00:00") - hoy()) / 864e5);
}
function fmt(v) {
  const a = v.split("-");
  return a[2] + "/" + a[1] + "/" + a[0].slice(2);
}
function add(n) {
  const t = hoy();
  t.setDate(t.getDate() + n);
  return (
    t.getFullYear() +
    "-" +
    String(t.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(t.getDate()).padStart(2, "0")
  );
}
