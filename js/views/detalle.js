/* Detalle del producto: acciones, unidades, edición y borrado */
function det(id) {
  const i = S.items.find((x) => x.id === id);
  sel = i.accion || "";
  const e = est(i);
  modal(`<div><div class="m">${esc(i.local)}${i.ubic ? " · " + esc(i.ubic) : ""}</div><h2>${esc(i.producto)}</h2></div>
 <div class="row"><span>Vence ${fmt(i.venc)} · ${i.cant ?? 1} u.</span><b class="${e[0]}">${lab(i)}</b></div>
 ${
   otros(i).length
     ? `<div class="m" style="border:1px solid var(--line);border-radius:12px;padding:10px"><b>Mismo producto, otras fechas:</b>${otros(
         i,
       )
         .map(
           (o) =>
             `<div class="row"><span>${fmt(o.venc)}</span><span>${o.cant ?? 1} u.</span></div>`,
         )
         .join("")}</div>`
     : ""
 }
 <div style="font-weight:700">Acción tomada</div>${ACC.map((a) => `<button class="opt ${sel === a ? "on" : ""}" data-a="${a}" onclick="pick(this.dataset.a)">${a}</button>`).join("")}
 <label class="m">Unidades que quedan (0 = se vendió todo)<input id="d_cant" type="number" min="0" value="${i.cant ?? 1}"></label>
 <label class="m">Nota<textarea id="d_nota" rows="2">${esc(i.nota || "")}</textarea></label>
 <button class="pri" onclick="guardarAcc('${id}')">Guardar acción</button>
 ${i.accion ? `<button class="link" onclick="quitar('${id}')">Quitar acción</button>` : ""}<button class="link" onclick="edit('${id}')">Editar datos</button><button class="link" onclick="elim('${id}')">Eliminar registro</button><button class="link" onclick="cerrar()">Cerrar</button>`);
}
function pick(a) {
  sel = a;
  document.querySelectorAll(".opt").forEach((b) => b.classList.toggle("on", b.dataset.a === a));
}
function guardarAcc(id) {
  const i = S.items.find((x) => x.id === id),
    c = $("d_cant").value;
  let n = c === "" ? (i.cant ?? 1) : Math.max(0, +c);
  if (n === 0 && !sel) sel = "Se vendió todo";
  if (sel === "Se vendió todo") {
    if ((i.cant ?? 1) > 0) i.cantAntes = i.cant ?? 1;
    n = 0;
  }
  if (!sel && n === (i.cant ?? 1)) {
    alert("Elegí una acción o cambiá las unidades.");
    return;
  }
  i.cant = n;
  i.nota = $("d_nota").value.trim();
  if (sel) {
    i.accion = sel;
    i.accionFecha = new Date().toISOString();
  }
  save();
  cerrar();
}
function quitar(id) {
  const i = S.items.find((x) => x.id === id);
  if (i.cant === 0) i.cant = i.cantAntes || 1;
  delete i.accion;
  delete i.accionFecha;
  save();
  cerrar();
}
function edit(id) {
  const i = S.items.find((x) => x.id === id);
  modal(
    `<h2>Editar datos</h2><label class="m">Cliente<select id="e_local">${S.clientes.map((c) => `<option ${c === i.local ? "selected" : ""}>${esc(c)}</option>`).join("")}</select></label><label class="m">Producto<input id="e_prod" value="${esc(i.producto)}"></label><label class="m">Vencimiento<input id="e_venc" type="date" value="${esc(i.venc)}"></label><label class="m">Ubicación<input id="e_ubic" value="${esc(i.ubic || "")}"></label><button class="pri" onclick="guardarEd('${id}')">Guardar cambios</button><button class="link" onclick="det('${id}')">Cancelar</button>`,
  );
}
function guardarEd(id) {
  const i = S.items.find((x) => x.id === id),
    g = (k) => $(k).value.trim();
  if (!g("e_local") || !g("e_prod") || !g("e_venc")) {
    alert("Completá punto de venta, producto y vencimiento.");
    return;
  }
  i.local = g("e_local");
  i.producto = g("e_prod");
  i.venc = g("e_venc");
  i.ubic = g("e_ubic");
  save();
  cerrar();
}
function elim(id) {
  if (confirm("¿Eliminar este registro?")) {
    S.items = S.items.filter((x) => x.id !== id);
    save();
    cerrar();
  }
}
