# Vencimientos

App para repositores: cargar fechas de vencimiento por punto de venta, ver los próximos 31 días al abrir, registrar acciones (bajó el precio, se vendió todo…) y generar un reporte opcional.

## Estructura
```
vencimientos/
├── index.html            # página única
├── manifest.webmanifest  # instalable en el celular
├── sw.js                 # funciona sin conexión
├── assets/icon.svg
├── css/   variables · base · components · modals · print
└── js/
    ├── config.js · state.js · utils.js · models.js · scanner.js
    ├── views/  modal · home · clientes · aviso · form · detalle · reporte · respaldo
    ├── demo.js
    └── app.js            # arranque
```
Los scripts son clásicos (sin módulos) y se cargan en el orden de `index.html`, así que también funciona abriendo `index.html` con doble clic.

## Pantallas
1. **Clientes**: tabla con vencidos y por vencer de cada cliente.
2. **Cliente**: tabla con sus productos, ordenados por fecha.
3. **Detalle**: unidades, acción tomada, edición.

Al abrir la app aparece el aviso de los próximos 31 días, agrupado por cliente.

## Cómo correrlo
- En la PC: doble clic en `index.html`, o `python3 -m http.server` dentro de la carpeta y abrir `http://localhost:8000`.
- Para instalarla en el celular y usarla sin conexión: subirla a GitHub Pages (HTTPS) y usar "Agregar a pantalla de inicio".

## Datos
Se guardan en el navegador (localStorage), por dispositivo. Para pasarlos entre celular y PC: botón **Respaldo** → copiar → pegar en el otro dispositivo → Restaurar.
