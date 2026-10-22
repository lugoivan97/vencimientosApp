/* Arranque de la app */
render();
aviso();
if ("serviceWorker" in navigator && location.protocol.startsWith("http"))
  navigator.serviceWorker.register("sw.js").catch(() => {});
