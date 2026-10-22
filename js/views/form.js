/* Formulario de carga de producto */
function hint() {
  const cand = {
    local: $("f_local").value.trim(),
    codigo: $("f_cod").value.trim(),
    producto: $("f_prod").value.trim(),
  };
  const o = cand.producto ? S.items.filter((x) => !x.accion && same(x, cand)) : [];
  $("hint").textContent = o.length
    ? "Ya cargado en este local con vencimiento: " +
      o.map((x) => fmt(x.venc) + " (" + (x.cant ?? 1) + " u.)").join(", ")
    : "";
}
function nuevo() {
  if (!S.clientes.length) {
    nuevoCliente();
    return;
  }
  const cli = S.vista === "cliente" ? S.cli : S.ult || S.clientes[0];
  modal(`<h2>Cargar producto</h2><label class="m">Cliente<select id="f_local" onchange="hint()">${S.clientes.map((c) => `<option ${c === cli ? "selected" : ""}>${esc(c)}</option>`).join("")}</select></label>
 <video id="vid" playsinline muted style="display:none;width:100%;border-radius:12px"></video>
 <label class="m">Código de barras (opcional)<div style="display:flex;gap:8px"><input id="f_cod" inputmode="numeric" onchange="fillCat()"><button class="chip" onclick="scan()">Escanear</button></div></label>
 <label class="m">Producto<input id="f_prod" onchange="hint()"></label><div id="hint" class="m"></div>
 <div style="display:flex;gap:8px"><label class="m" style="flex:1.4">Vencimiento<input id="f_venc" type="date"></label><label class="m" style="flex:1">Cantidad<input id="f_cant" type="number" min="1" value="1"></label></div>
 <label class="m">Ubicación (opcional)<input id="f_ubic" placeholder="Góndola, heladera…"></label>
 <button class="pri" onclick="guardar()">Guardar</button><button class="chip" style="width:100%" onclick="guardar(true)">Guardar y cargar otro</button><button class="link" onclick="cerrar()">Cancelar</button>`);
}
function fillCat() {
  const c = $("f_cod").value.trim();
  if (S.cat[c]) $("f_prod").value = S.cat[c];
  hint();
}
function guardar(otro) {
  const g = (k) => $(k).value.trim();
  if (!g("f_local") || !g("f_prod") || !g("f_venc")) {
    alert("Completá punto de venta, producto y vencimiento.");
    return;
  }
  S.items.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    local: g("f_local"),
    codigo: g("f_cod"),
    producto: g("f_prod"),
    venc: g("f_venc"),
    cant: +g("f_cant") || 1,
    ubic: g("f_ubic"),
  });
  if (g("f_cod")) S.cat[g("f_cod")] = g("f_prod");
  S.ult = g("f_local");
  save();
  otro ? nuevo() : cerrar();
}
