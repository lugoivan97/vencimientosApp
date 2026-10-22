/* Reporte opcional, agrupado por cliente (se puede imprimir o guardar como PDF) */
function rep() {
  const clientes = S.rl ? [S.rl] : S.clientes;
  const todos = S.items.filter((i) => clientes.includes(i.local));
  const cuenta = (f) => todos.filter(f).length;
  const seccion = (c) => {
    const l = todos.filter((i) => i.local === c).sort(porFecha);
    if (!l.length) return "";
    const filas = l
      .map((i) => {
        const e = est(i);
        return `
          <tr>
            <td>${esc(i.producto)}</td>
            <td>${fmt(i.venc)}</td>
            <td>${i.cant ?? 1}</td>
            <td class="${e[0]}">${e[1]}</td>
            <td>${esc(i.accion || "—")}${i.nota ? `<br><span class="m">${esc(i.nota)}</span>` : ""}</td>
          </tr>`;
      })
      .join("");
    return `
      <h3 style="margin:8px 0 0">${esc(c)}</h3>
      <div class="tw">
        <table class="tabla">
          <thead><tr><th>Producto</th><th>Vence</th><th>Cant.</th><th>Estado</th><th>Acción</th></tr></thead>
          <tbody>${filas}</tbody>
        </table>
      </div>`;
  };
  modal(`
    <div>
      <h2>Reporte de vencimientos</h2>
      <div class="m">${new Date().toLocaleDateString("es")} · Repositor: ______________</div>
    </div>
    <select class="noprint" aria-label="Cliente" onchange="S.rl=this.value;rep()">
      <option value="">Todos los clientes</option>
      ${S.clientes.map((c) => `<option ${S.rl === c ? "selected" : ""}>${esc(c)}</option>`).join("")}
    </select>
    ${clientes.map(seccion).join("") || '<div class="m">Sin registros.</div>'}
    <div class="row">
      <span>Vencidos: <b>${cuenta((i) => dias(i.venc) < 0)}</b></span>
      <span>Por vencer: <b>${cuenta((i) => dias(i.venc) >= 0 && dias(i.venc) <= 31)}</b></span>
      <span>Con acción: <b>${cuenta((i) => i.accion)}</b></span>
    </div>
    <button class="pri noprint" onclick="window.print()">Imprimir o guardar PDF</button>
    <button class="link noprint" onclick="cerrar()">Cerrar</button>`);
}
