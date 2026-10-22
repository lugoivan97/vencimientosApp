/* Datos de ejemplo para probar la app */
function demo() {
  const datos = [
    ["Galletitas chocolate 300 g", "Supermercado Centro", "Góndola 4", -3],
    ["Aceite de girasol 900 ml", "Supermercado Centro", "Góndola 9", 9],
    ["Aceite de girasol 900 ml", "Supermercado Centro", "Depósito", 25],
    ["Yogur firme vainilla 190 g", "Autoservicio Norte", "Heladera 2", 4],
    ["Snack de maíz 120 g", "Kiosco Plaza", "Exhibidor", 60],
  ];
  datos.forEach(([producto, local, ubic, d], k) => {
    if (!S.clientes.includes(local)) S.clientes.push(local);
    S.items.push({
      id: "d" + k + Date.now().toString(36),
      producto,
      local,
      ubic,
      venc: add(d),
      cant: 6,
    });
  });
  S.clientes.sort((a, b) => a.localeCompare(b));
  save();
  render();
  aviso();
}
