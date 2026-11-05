# Instrucciones del proyecto

## Contexto

- Bruma es una página estática de presentación de una cafetería ficticia; no hay backend, framework, sistema de build ni gestor de paquetes.
- Consulta [README.md](../README.md) para conocer la estructura y cómo abrir el sitio.
- Mantén la implementación ligera con HTML, CSS y JavaScript nativos. No añadas dependencias ni herramientas de build salvo que el cambio lo requiera.

## Organización y convenciones

- `index.html`: contenido y estructura semántica. Conserva el idioma español y los enlaces entre secciones.
- `styles.css`: presentación adaptable, variables de color y estilos de los temas claro y oscuro.
- `script.js`: interacciones del menú móvil, selector de tema, reloj y año del pie de página.
- Sigue el formato e indentación existentes. Mantén los cambios relacionados con cada responsabilidad en su archivo correspondiente.
- Reutiliza las variables CSS existentes al modificar colores y conserva el comportamiento de ambos temas.

## Interfaz y accesibilidad

- Utiliza colores oscuros para los headers y claros para el texto; respeta la jerarquía visual y la legibilidad en todos los temas.
- Mantén el diseño funcional en móvil y escritorio; revisa los breakpoints existentes antes de añadir otros.
- Usa elementos HTML semánticos, texto alternativo descriptivo para imágenes informativas y etiquetas accesibles para controles interactivos.
- Al cambiar controles o navegación, conserva los atributos ARIA y sus estados sincronizados con el comportamiento.
- Respeta `prefers-reduced-motion` y los estilos de foco visibles existentes.

## Verificación

- No hay comandos de build ni una suite de pruebas configurada. Para cambios de interfaz o comportamiento, abre `index.html` en un navegador y comprueba las vistas móvil y escritorio y los estados afectados.
- Para cambios en navegación, tema o reloj, comprueba también que el JavaScript se ejecuta sin errores en la consola.
- No afirmes que se ejecutaron pruebas automatizadas si no se han añadido al proyecto.

## Recursos externos

- Las fuentes de Google Fonts y las fotografías de Unsplash requieren conexión a Internet. Mantén alternativas razonables cuando cambies fuentes o imágenes.
- Los datos de dirección, horarios, carta y contacto son contenido de demostración; no los presentes como información verificada.