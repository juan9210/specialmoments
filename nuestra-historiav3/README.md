# 💕 Nuestra Historia PWA - Juan ❤️ Amgie

Experiencia web **instalable como app** en cualquier celular. Progressive Web App (PWA) completa.

## 📱 ¿Qué es una PWA?

Es una web que se comporta **exactamente como una app nativa**:
- Se instala en la pantalla de inicio del celular con icono propio
- Se abre en pantalla completa (sin barra de navegador)
- Funciona offline (una vez cargada)
- Tiene splash screen al abrirse
- Se ve idéntica en iPhone y Android

## 🚀 Cómo instalarla en el celular

### En Android (Chrome / Samsung Internet / Edge)
1. Abre el link en el navegador
2. Aparecerá un **botón dorado con ícono de descarga ⬇** (esquina superior derecha) — tócalo
3. O ve al menú del navegador → "Instalar app" / "Añadir a pantalla de inicio"
4. Aparece el icono con el corazón dorado en la pantalla de inicio 💛

### En iPhone (Safari)
1. Abre el link en **Safari** (importante, no Chrome)
2. Aparecerá un pop-up sugiriendo instalarla (después de 5 segundos)
3. O manualmente: toca el botón **compartir** ⬆ → "Añadir a pantalla de inicio"
4. Aparece el icono en la pantalla de inicio

Una vez instalada, se abre **como cualquier app nativa**: en pantalla completa, sin barra del navegador, con su splash screen y todo.

## 📂 Estructura del proyecto

```
nuestra-historia/
├── index.html
├── manifest.json          ← Configuración PWA
├── sw.js                  ← Service Worker (offline)
├── css/style.css
├── js/
│   ├── config.js          ← EDITA AQUÍ
│   ├── script.js
│   └── register-sw.js     ← Registro del SW
├── icons/                 ← Iconos de la app (todos los tamaños)
│   ├── icon-72.png ... icon-512.png
│   ├── icon-192-maskable.png
│   ├── icon-512-maskable.png
│   ├── apple-touch-icon.png
│   └── splash-*.png       ← Splash screens iOS
├── images/                ← Tus 15 fotos aquí
│   └── momento1.jpg ... momento15.jpg
├── music/cancion.mp3
└── README.md
```

## 🖼️ Imágenes que debes agregar

En `/images/` coloca: `momento1.jpg` hasta `momento15.jpg` (15 fotos, JPG optimizado)

## 🎵 Música

En `/music/` coloca `cancion.mp3`

## 🌐 Despliegue (OBLIGATORIO para que sea PWA)

Las PWAs **requieren HTTPS** para funcionar. La forma más fácil:

### Netlify (recomendado)
1. Ve a https://app.netlify.com/drop
2. Arrastra la carpeta completa
3. Copia la URL: `https://xxx.netlify.app`
4. Amgie abre la URL → puede instalarla como app ✨

### GitHub Pages / Vercel / Firebase Hosting
Todos funcionan igual. Solo necesitan HTTPS (todos los proveedores lo dan gratis).

⚠️ **No funciona con doble clic local** (protocolo `file://`). Debe estar servido por HTTPS.

## 🎨 Personalización

Todo se edita en `js/config.js`:
- Nombres, fecha de aniversario
- 15 momentos del timeline
- Stats, razones, promesas
- Carta y mensaje final

Para cambiar el nombre de la app (que aparece bajo el icono en el celular), edita `manifest.json`:
```json
"short_name": "Nuestra Historia"
```

## 🥚 Easter eggs

- 7 clics en "Te amo" → mensaje secreto
- 90 segundos → mensaje secreto automático
- Código Konami (↑↑↓↓←→←→BA) → fuegos artificiales

## ⚙️ Iconos

Los iconos generados son un **corazón dorado sobre fondo rosa pastel** con bordes redondeados estilo iOS.

Si quieres cambiarlos, reemplaza los archivos en `/icons/` manteniendo los mismos tamaños y nombres.

Hecho con amor por Juan Carlos, para Amgie. 💛
