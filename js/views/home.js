/* Pantalla principal: lista de clientes y detalle de un cliente */
function render() {
  $("fecha").textContent = new Date().toLocaleDateString("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  if (S.vista === "cliente" && !S.clientes.includes(S.cli)) S.vista = "home";
  $("app").innerHTML = S.vista === "cliente" ? vistaCliente() : vistaClientes();
}

function buscador(placeholder) {
  return `<input id="q" type="search" placeholder="${placeholder}" value="${esc(S.q)}"
    oninput="S.q=this.value;render();const q=$('q');q.focus();q.setSelectionRange(q.value.length,q.value.length)">`;
}

function abrirCliente(idx) {
  S.cli = S.clientes[idx];
  S.vista = "cliente";
  S.q = "";
  S.filtro = "urgentes";
  render();
  window.scrollTo(0, 0);
}

function volver() {
  S.vista = "home";
  S.q = "";
  render();
}

// ---- Vista 1: tabla de clientes ----
function vistaClientes() {
  if (!S.clientes.length) {
    return `
      <div class="vacio">
        <p>Todavía no cargaste ningún cliente.</p>
        <button class="pri" onclick="nuevoCliente()">Agregar el primer cliente</button>
        <button class="link" onclick="demo()">Probar con ejemplos</button>
      </div>`;
  }
  const pend = S.items.filter((i) => !i.accion);
  const venc = pend.filter((i) => dias(i.venc) < 0).length;
  const prox = pend.filter((i) => dias(i.venc) >= 0 && dias(i.venc) <= 31).length;
  const filas = S.clientes
    .map((c) => ({ c, r: resumen(c) }))
    .filter((x) => x.c.toLowerCase().includes(S.q.toLowerCase()))
    .sort((a, b) => b.r.venc - a.r.venc || b.r.prox - a.r.prox || a.c.localeCompare(b.c))
    .map(
      ({ c, r }) => `
      <tr>
        <td><button class="celda" onclick="abrirCliente(${S.clientes.indexOf(c)})"><b>${esc(c)}</b></button></td>
        <td class="num ${r.venc ? "v" : ""}">${r.venc}</td>
        <td class="num ${r.prox ? "p" : ""}">${r.prox}</td>
        <td class="num">${r.total}</td>
      </tr>`,
    )
    .join("");
  return `
    <div class="cnt">
      <div><b class="v">${venc}</b><span class="m">Vencidos</span></div>
      <div><b class="p">${prox}</b><span class="m">Por vencer</span></div>
      <div><b class="ok">${S.clientes.length}</b><span class="m">Clientes</span></div>
    </div>
    <div class="titulo"><h2>Clientes</h2><button class="chip" onclick="nuevoCliente()">+ Cliente</button></div>
    ${S.clientes.length > 4 ? buscador("Buscar cliente") : ""}
    <div class="tw">
      <table class="tabla">
        <thead>
          <tr><th>Cliente</th><th class="num">Vencidos</th><th class="num">Por vencer</th><th class="num">Productos</th></tr>
        </thead>
        <tbody>${filas || '<tr><td colspan="4" class="m">Sin resultados.</td></tr>'}</tbody>
      </table>
    </div>
    <div class="m">Por vencer = próximos 31 días, sin acción registrada. Tocá un cliente para ver sus productos.</div>`;
}

// ---- Vista 2: productos de un cliente ----
function vistaCliente() {
  const c = S.cli;
  const r = resumen(c);
  let l = S.items.filter((i) => i.local === c).sort(porFecha);
  if (S.filtro === "urgentes") l = l.filter((i) => !i.accion && dias(i.venc) <= 31);
  if (S.q) l = l.filter((i) => i.producto.toLowerCase().includes(S.q.toLowerCase()));
  const vacio =
    S.filtro === "urgentes" ? "Nada por vencer en los próximos 31 días." : "Sin productos.";
  return `
    <button class="link volver" onclick="volver()">← Clientes</button>
    <div class="titulo"><h2>${esc(c)}</h2><button class="chip" onclick="editarCliente()">Editar</button></div>
    <div class="cnt">
      <div><b class="v">${r.venc}</b><span class="m">Vencidos</span></div>
      <div><b class="p">${r.prox}</b><span class="m">Por vencer</span></div>
      <div><b class="ok">${r.total}</b><span class="m">Productos</span></div>
    </div>
    <div class="chips">
      <button class="chip ${S.filtro === "urgentes" ? "on" : ""}" onclick="S.filtro='urgentes';render()">Próximos 31 días</button>
      <button class="chip ${S.filtro === "todos" ? "on" : ""}" onclick="S.filtro='todos';render()">Todos</button>
    </div>
    ${r.total > 5 ? buscador("Buscar producto") : ""}
    <div class="tw">
      <table class="tabla">
        <thead>
          <tr><th>Producto</th><th>Vence</th><th class="num">Cant.</th><th>Estado</th></tr>
        </thead>
        <tbody>${l.map(fila).join("") || `<tr><td colspan="4" class="m">${vacio}</td></tr>`}</tbody>
      </table>
    </div>`;
}

function fila(i) {
  const e = est(i);
  const fechas = otros(i).length + 1;
  return `
    <tr>
      <td>
        <button class="celda" onclick="det('${i.id}')">
          <b>${esc(i.producto)}</b>
          ${i.ubic ? `<span class="m">${esc(i.ubic)}</span>` : ""}
          ${fechas > 1 ? `<span class="tag">${fechas} fechas distintas</span>` : ""}
          ${i.accion ? `<span class="tag">${esc(i.accion)}</span>` : ""}
        </button>
      </td>
      <td>${fmt(i.venc)}</td>
      <td class="num">${i.cant ?? 1}</td>
      <td class="${e[0]}"><b>${lab(i)}</b></td>
    </tr>`;
}
