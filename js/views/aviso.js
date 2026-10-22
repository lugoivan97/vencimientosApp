/* Aviso al abrir: vencimientos de los próximos 31 días, agrupados por cliente */
function aviso() {
  const w = urg();
  if (!w.length) return;
  const grupos = S.clientes
    .map((c) => ({ c, l: w.filter((i) => i.local === c) }))
    .filter((g) => g.l.length)
    .sort((a, b) => (a.l[0].venc < b.l[0].venc ? -1 : 1));
  const color = (i) => (dias(i.venc) < 0 ? "v" : dias(i.venc) <= 7 ? "p" : "ok");
  const bloque = ({ c, l }) => `
    <div class="aviso-cli">
      <div class="row">
        <button class="link" style="padding:0;font-weight:700;color:inherit" onclick="cerrar();abrirCliente(${S.clientes.indexOf(c)})">${esc(c)}</button>
        <span class="m">${l.length} producto${l.length > 1 ? "s" : ""}</span>
      </div>
      ${l
        .slice(0, 5)
        .map(
          (i) =>
            `<div class="row"><span>${esc(i.producto)}</span><b class="${color(i)}">${fmt(i.venc)}</b></div>`,
        )
        .join("")}
      ${l.length > 5 ? `<div class="m">y ${l.length - 5} más…</div>` : ""}
    </div>`;
  modal(`
    <div><div class="m">Al abrir la app</div><h2>Próximos 31 días</h2></div>
    ${grupos.map(bloque).join("")}
    <button class="pri" onclick="cerrar()">Entendido</button>`);
}
