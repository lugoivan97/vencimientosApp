/* Reglas de negocio: estados, vencimientos, agrupación por producto */
function urg() {
  return S.items
    .filter((i) => !i.accion && dias(i.venc) <= 31)
    .sort((a, b) => (a.venc < b.venc ? -1 : 1));
}
function est(i) {
  const d = dias(i.venc);
  return i.accion === "Se vendió todo"
    ? ["ok", "Vendido"]
    : i.accion
      ? ["ok", "Con acción"]
      : d < 0
        ? ["v", "Vencido"]
        : d <= 31
          ? ["p", "Por vencer"]
          : ["ok", "En fecha"];
}
function lab(i) {
  const d = dias(i.venc);
  return i.accion === "Se vendió todo"
    ? "Vendido"
    : d < 0
      ? "Vencido hace " + -d + " d"
      : d === 0
        ? "Vence hoy"
        : "En " + d + " d";
}
function locales() {
  return S.clientes;
}
function same(a, b) {
  return (
    a.local === b.local &&
    ((a.codigo && a.codigo === b.codigo) || a.producto.toLowerCase() === b.producto.toLowerCase())
  );
}
function otros(i) {
  return S.items.filter((x) => x.id !== i.id && !x.accion && same(x, i));
}

function porFecha(a, b) {
  return a.venc < b.venc ? -1 : 1;
}

// Resumen de un cliente: vencidos, por vencer (31 días) y total de productos
function resumen(c) {
  const todos = S.items.filter((i) => i.local === c);
  const pend = todos.filter((i) => !i.accion);
  return {
    venc: pend.filter((i) => dias(i.venc) < 0).length,
    prox: pend.filter((i) => dias(i.venc) >= 0 && dias(i.venc) <= 31).length,
    total: todos.length,
  };
}
