/* Escáner de código de barras por cámara */
async function scan() {
  if (!("BarcodeDetector" in window)) {
    alert("Este navegador no escanea códigos. Escribilo a mano.");
    return;
  }
  const v = $("vid");
  v.style.display = "block";
  try {
    strm = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    v.srcObject = strm;
    await v.play();
    const d = new BarcodeDetector();
    tm = setInterval(async () => {
      try {
        const r = await d.detect(v);
        if (r.length) {
          $("f_cod").value = r[0].rawValue;
          stop();
          fillCat();
        }
      } catch (e) {}
    }, 400);
  } catch (e) {
    alert("No se pudo abrir la cámara.");
    stop();
  }
}
function stop() {
  clearInterval(tm);
  if (strm) strm.getTracks().forEach((t) => t.stop());
  strm = null;
  const v = $("vid");
  if (v) v.style.display = "none";
}
