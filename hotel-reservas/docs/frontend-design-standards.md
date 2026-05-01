# Estándares de Diseño Frontend

La aplicación React debe usar fielmente los artefactos de diseño definidos aquí.

## 1. Estética Visual y Sistema de Diseño
- Todos los estilos deben usar CSS Modules para evitar colisiones.
- Seguir estrictamente las paletas de colores de `globals.css`. Los elementos de acción principal deben usar `var(--color-primary)` (azul profundo).
- Las acciones destructivas (por ejemplo, verbos de cancelación) usan `var(--color-danger)` (rojo). Bajo ninguna circunstancia las acciones positivas principales deben usar colores de peligro.
- Los textos de validación y error deben usar `var(--color-text-error)` para garantizar alto contraste sobre superficies claras.
- Elementos de componente como badges deben cumplir el estándar de contraste de color WCAG AA (ratio mínimo de 4.5:1). Texto claro sobre fondos claros está prohibido.

## 2. Layouts y Estructura
- Las imágenes dentro de listas o grids DEBEN implementar `object-fit: cover` para evitar distorsión en diferentes viewports.
- Los grids (`display: grid`) en listados DEBEN usar media queries (`@media`) para ajustar las columnas de forma lógica (3 columnas en escritorio, 2 en tablet, 1 en móvil). Layouts con columnas fijas idénticas en todos los viewports no son aceptables.

## 3. Comportamiento de Componentes UI
- Los elementos interactivos (botones, enlaces) DEBEN proveer retroalimentación visual mediante pseudoclases como `:hover` y `:focus`.
- Los estados activos en paneles de navegación (Navbar) DEBEN indicar visualmente la página activa del usuario mediante estilos diferenciados.
- Los controles de formulario deben limpiarse o resetearse tras operaciones exitosas, como al cerrar modales de confirmación.
- El envío doble debe mitigarse en la UI bloqueando los botones (booleano `disabled`) e introduciendo un estado de carga durante envíos asíncronos.
- Los selectores de fecha DEBEN limitar inteligentemente la fecha mínima de salida (Check-out) en función de la fecha mínima de entrada (Check-in) o la fecha actual. Las fechas en el pasado están restringidas.