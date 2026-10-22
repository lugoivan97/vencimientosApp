/* Respaldo y restauración de datos */
function ajustes() {
  modal(
    `<h2>Respaldo de datos</h2><div class="m">Tus datos viven solo en este navegador. Copiá este texto y guardalo (por ejemplo, mandalo a tu mail) para pasarlo a otro dispositivo o recuperarlo.</div><textarea id="bk" rows="5" readonly onclick="this.select()">${esc(JSON.stringify({ items: S.items, clientes: S.clientes, cat: S.cat }))}</textarea><button class="pri" onclick="copiar()">Copiar respaldo</button><div style="font-weight:700;margin-top:6px">Restaurar</div><textarea id="rs" rows="3" placeholder="Pegá acá el respaldo"></textarea><button class="pri" onclick="restaurar()">Restaurar (reemplaza lo actual)</button><button class="link" onclick="cerrar()">Cerrar</button>`,
  );
}
function copiar() {
  const t = $("bk");
  t.select();
  try {
    navigator.clipboard.writeText(t.value).then(
      () => alert("Copiado."),
      () => alert("Texto seleccionado: copialo a mano."),
    );
  } catch (e) {
    alert("Texto seleccionado: copialo a mano.");
  }
}
function restaurar() {
  try {
    const d = JSON.parse($("rs").value);
    if (!Array.isArray(d.items)) throw 0;
    if (!confirm("Esto reemplaza los datos actuales. ¿Seguir?")) return;
    S.items = d.items
      .filter((x) => x && x.producto && x.venc)
      .map((x) => ({
        ...x,
        id: String(x.id || Math.random().toString(36).slice(2)).replace(/[^\w-]/g, ""),
      }));
    S.cat = d.cat || {};
    S.clientes = d.clientes || [];
    S.items.forEach((i) => {
      if (!S.clientes.includes(i.local)) S.clientes.push(i.local);
    });
    save();
    cerrar();
  } catch (e) {
    alert("El texto no es un respaldo válido.");
  }
}
