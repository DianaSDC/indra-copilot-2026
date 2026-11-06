# Bruma — Café para quedarse!!!!

Bruma es una página web estática de presentación para una cafetería ficticia de Madrid. Incluye información sobre el local, una carta de ejemplo y datos para visitarlo. Está hecha con HTML, CSS y JavaScript nativos, sin frameworks ni dependencias de instalación.

## Funcionalidades

- Diseño adaptable a móviles y escritorio....
- Menú de navegación móvil.
- Selector de tema claro y oscuro; la preferencia se guarda en el navegador.
- Reloj analógico y hora local actualizados en tiempo real.
- Año del pie de página actualizado automáticamente...
- Secciones de presentación, historia, carta y visita, con enlaces de navegación.

## Estructura del proyecto

```text
mi-web/
├── index.html   # Contenido y estructura de la página
├── styles.css   # Diseño, estilos adaptables y temas
├── script.js    # Navegación, tema, reloj y año
└── README.md    # Documentación del proyecto
```

## Cómo ejecutar

No es necesario instalar dependencias ni compilar el proyecto. Abre `index.html` directamente en un navegador.

Para trabajar en local, también puedes abrir la carpeta en Visual Studio Code y servirla con una extensión como **Live Server**.

## Pruebas

Las pruebas usan el ejecutor integrado de Node.js (versión 18 o posterior), sin instalar dependencias. Desde la raíz del proyecto, ejecútalas con:

```text
node --test
```

## Personalización

- Edita `index.html` para cambiar los textos, la carta, la dirección, los horarios y los enlaces.
- Edita `styles.css` para modificar el diseño, los colores y los puntos de adaptación.
- Edita `script.js` para cambiar el comportamiento interactivo.

## Recursos externos

La página carga las tipografías **DM Sans** y **Playfair Display** desde Google Fonts, y fotografías desde Unsplash. Es necesaria una conexión a Internet para cargar esos recursos; sin ella, se usarán las tipografías de reserva y las imágenes externas podrían no mostrarse.
