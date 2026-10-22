/* Estado global y persistencia en localStorage */
let S = {
  items: [], // productos cargados
  clientes: [], // nombres de clientes (puntos de venta)
  cat: {}, // catálogo: código de barras -> nombre
  vista: "home", // 'home' (lista de clientes) | 'cliente'
  cli: "", // cliente abierto
  filtro: "urgentes",
  q: "",
  rl: "",
  ult: "",
};
let sel = "",
  strm,
  tm;

try {
  const d = JSON.parse(localStorage.getItem(K) || "{}");
  S.items = d.items || [];
  S.cat = d.cat || {};
  S.clientes = d.clientes || [];
} catch (e) {}

// Compatibilidad: clientes que solo existían escritos dentro de los productos
S.items.forEach((i) => {
  if (!S.clientes.includes(i.local)) S.clientes.push(i.local);
});

function save() {
  try {
    localStorage.setItem(K, JSON.stringify({ items: S.items, clientes: S.clientes, cat: S.cat }));
  } catch (e) {}
}
