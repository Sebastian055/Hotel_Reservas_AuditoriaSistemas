# Estándares de Diseño Backend

## 1. Lineamientos del Esquema de Base de Datos
- Todas las relaciones entre entidades (como reservas vinculadas a una habitación o usuario específico) DEBEN estar estructuralmente garantizadas en el esquema mediante definiciones SQL estándar de `FOREIGN KEY`. Esto no es negociable para la estabilidad del sistema.
- Los tipos de datos deben ser estrictos: costos, decimales y valores numéricos precisos deben usar restricciones numéricas estructurales. Almacenar `price` como segmento de texto `VARCHAR` está explícitamente prohibido, ya que altera el orden lexicográfico y complica las operaciones aritméticas.

## 2. Optimizaciones de Infraestructura
- Las búsquedas que atraviesan filtros de rangos de fechas deben estar respaldadas por parámetros `CREATE INDEX` predefinidos en el esquema de la base de datos (por ejemplo, índices compuestos sobre `check_in_date`, `check_out_date` y `room_id`).

## 3. Especificaciones de Endpoints
- Los endpoints que realizan cálculos o retornan arreglos basados en operaciones matemáticas no deben confiar implícitamente en los inputs. Si se depende de marcas de tiempo internas, se debe garantizar la precisión adecuada de las variables (los deltas en milisegundos pueden mapear directamente a limitaciones de punto flotante en lenguajes dinámicos). Las fechas deben manejarse con cuidado.
- Cualquier solicitud que mute un conjunto de datos (`POST`, `PATCH`, `DELETE`) requiere verificar que el recurso existe por su ID antes de proceder con las acciones SQL.
- Las actualizaciones parciales (`PATCH`) deben verificar el número de filas modificadas. Si se alteraron `0` elementos, significa que el ID no fue encontrado, lo que corresponde a una respuesta `404 Not Found`.
