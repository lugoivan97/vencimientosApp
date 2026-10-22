/* Alta, edición y baja de clientes */
function nuevoCliente() {
  modal(`
    <h2>Nuevo cliente</h2>
    <label class="m">Nombre del cliente o punto de venta
      <input id="c_nom" placeholder="Ej: Supermercado Centro">
    </label>
    <button class="pri" onclick="guardarCliente()">Guardar</button>
    <button class="link" onclick="cerrar()">Cancelar</button>`);
}

function nombreValido(n, actual) {
  if (!n) {
    alert("Escribí el nombre del cliente.");
    return false;
  }
  if (S.clientes.some((c) => c !== actual && c.toLowerCase() === n.toLowerCase())) {
    alert("Ese cliente ya existe.");
    return false;
  }
  return true;
}

function guardarCliente() {
  const n = $("c_nom").value.trim();
  if (!nombreValido(n, "")) return;
  S.clientes.push(n);
  S.clientes.sort((a, b) => a.localeCompare(b));
  save();
  cerrar();
}

function editarCliente() {
  modal(`
    <h2>Editar cliente</h2>
    <label class="m">Nombre
      <input id="c_nom" value="${esc(S.cli)}">
    </label>
    <button class="pri" onclick="renombrarCliente()">Guardar cambios</button>
    <button class="link" onclick="eliminarCliente()">Eliminar cliente</button>
    <button class="link" onclick="cerrar()">Cancelar</button>`);
}

function renombrarCliente() {
  const n = $("c_nom").value.trim();
  if (!nombreValido(n, S.cli)) return;
  S.items.forEach((i) => {
    if (i.local === S.cli) i.local = n;
  });
  S.clientes = S.clientes.map((c) => (c === S.cli ? n : c)).sort((a, b) => a.localeCompare(b));
  S.cli = n;
  save();
  cerrar();
}

function eliminarCliente() {
  const n = S.items.filter((i) => i.local === S.cli).length;
  const msg = n ? `Se eliminarán también sus ${n} productos. ¿Seguir?` : "¿Eliminar este cliente?";
  if (!confirm(msg)) return;
  S.items = S.items.filter((i) => i.local !== S.cli);
  S.clientes = S.clientes.filter((c) => c !== S.cli);
  S.vista = "home";
  save();
  cerrar();
}
