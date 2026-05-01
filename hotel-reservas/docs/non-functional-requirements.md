# Requisitos No Funcionales

## 1. Seguridad
- **Autenticación**: Uso de JSON Web Tokens (JWT) mediante encabezados de autorización en las rutas protegidas.
- **Seguridad de base de datos**: Adherencia estricta y absoluta a consultas SQL parametrizadas, evitando cualquier concatenación directa de strings para prevenir inyección SQL, especialmente en consultas de búsqueda.
- **Control de acceso**: Los usuarios nunca deben poder modificar ni eliminar recursos asociados a una identidad de usuario diferente a la suya.

## 2. Rendimiento
- **Evitar N+1**: Las consultas ORM o nativas deben agregar dependencias (como amenities) de forma óptima mediante JOINs o consultas por lotes sobre IDs específicos, evitando ejecutar consultas independientes en loop por cada elemento principal obtenido.

## 3. Resiliencia e Integridad
- **Integridad relacional**: El modelo de base de datos debe emplear estrictamente restricciones `FOREIGN KEY` en todas las tablas relacionales (por ejemplo, `reservations` hacia `rooms`, y `amenities` hacia `rooms`).
- **Idempotencia y códigos de error**: Los recursos inexistentes, como intentar actualizar una reserva que no existe, DEBEN retornar un `404` de forma limpia, nunca un `200` envolvente.