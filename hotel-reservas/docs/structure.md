# Inventario del Sistema — Elementos de Auditoría

Este documento lista todos los elementos implementados en el proyecto HotelVista,
tanto en frontend como en backend. Úsalo como mapa de referencia para ubicar
y verificar cada componente durante la auditoría.

---

## Frontend

### Páginas (`src/pages/`)

| Archivo | Ruta | Descripción |
|---|---|---|
| `LoginPage.jsx` | `/login` | Formulario de autenticación con email y contraseña |
| `HomePage.jsx` | `/` | Hero principal, tarjetas de características y footer |
| `RoomsPage.jsx` | `/rooms` | Grid de habitaciones con filtros y badges de disponibilidad |
| `ReservationPage.jsx` | `/rooms/:id/reserve` | Formulario de reserva con cálculo de precio en tiempo real |
| `MyReservationsPage.jsx` | `/my-reservations` | Listado de reservas del usuario autenticado |

### Componentes (`src/components/`)

| Archivo | Usado en | Responsabilidad |
|---|---|---|
| `Navbar.jsx` | Global | Navegación principal con enlaces y estado activo por página |
| `RoomCard.jsx` | `RoomsPage` | Tarjeta individual de habitación: imagen, precio, badge, botón |
| `StatusBadge.jsx` | `RoomCard` | Badge visual de disponibilidad: Disponible / Ocupada |
| `DateRangePicker.jsx` | `ReservationPage` | Selectores de fecha check-in y check-out con restricciones |
| `ReservationModal.jsx` | `ReservationPage` | Modal de confirmación tras reserva exitosa |

### Estilos (`src/styles/`)

| Archivo | Alcance |
|---|---|
| `globals.css` | Variables CSS globales: colores, tipografía, espaciado, sombras, radios |
| `Navbar.module.css` | Estilos del componente Navbar y sus variantes de enlace |
| `RoomCard.module.css` | Tarjeta de habitación, grid de listado e imagen |
| `StatusBadge.module.css` | Variantes de badge: `.available`, `.occupied` |
| `ReservationModal.module.css` | Modal, overlay y botones de acción |

### Variables CSS definidas en `globals.css`

| Variable | Valor | Uso esperado |
|---|---|---|
| `--color-primary` | `#1a3c5e` | Botones de acción principal |
| `--color-primary-hover` | `#14304d` | Estado hover de botones primarios |
| `--color-secondary` | `#c9a84c` | Acentos decorativos y badges premium |
| `--color-danger` | `#c0392b` | Acciones destructivas únicamente |
| `--color-success` | `#27ae60` | Estados positivos |
| `--color-text-error` | `#c0392b` | Mensajes de validación de formulario |
| `--color-text-primary` | `#1c1c1e` | Texto principal |
| `--color-text-secondary` | `#6b6b6b` | Texto secundario y placeholders |
| `--font-display` | `'Playfair Display', serif` | Títulos y hero |
| `--font-body` | `'Lato', sans-serif` | Texto de contenido general |

### Servicio HTTP (`src/services/api.js`)

| Función | Método | Endpoint | Autenticación |
|---|---|---|---|
| `login(email, password)` | POST | `/api/auth/login` | No |
| `register(data)` | POST | `/api/auth/register` | No |
| `getRooms()` | GET | `/api/rooms` | No |
| `getRoomById(id)` | GET | `/api/rooms/:id` | No |
| `createReservation(data)` | POST | `/api/reservations` | Sí |
| `getMyReservations()` | GET | `/api/reservations/my` | Sí |
| `cancelReservation(id)` | DELETE | `/api/reservations/:id` | Sí |
| `updateReservation(id, data)` | PATCH | `/api/reservations/:id` | Sí |
| `searchReservations(name)` | GET | `/api/reservations/search?name=` | Sí |

---

## Backend

### Estructura de Archivos (`backend/src/`)

| Archivo | Responsabilidad |
|---|---|
| `server.js` | Configuración de Express, CORS, middlewares globales y montaje de rutas |
| `db.js` | Inicialización de la conexión SQLite y exportación de la instancia `db` |
| `database/schema.sql` | DDL completo: tablas, tipos, constraints e índices |
| `database/seed.sql` | Datos iniciales de prueba: habitaciones, amenities y usuarios |
| `routes/auth.js` | Endpoints de registro e inicio de sesión |
| `routes/rooms.js` | Endpoints de listado y detalle de habitaciones |
| `routes/reservations.js` | Endpoints de creación, consulta, búsqueda, actualización y cancelación |
| `middleware/auth.js` | Verificación de JWT en headers; agrega `req.user` al contexto |

### Tablas de la Base de Datos

#### `rooms`
| Columna | Tipo esperado | Notas |
|---|---|---|
| `id` | `INTEGER` PK | Autoincremental |
| `name` | `TEXT` | Nombre de la habitación |
| `type` | `TEXT` | Valores: `single`, `double`, `suite`, `presidential` |
| `price_per_night` | `DECIMAL(10,2)` | Tipo numérico obligatorio |
| `capacity` | `INTEGER` | Capacidad máxima de huéspedes |
| `description` | `TEXT` | Descripción opcional |
| `image_url` | `TEXT` | Ruta de imagen |
| `is_active` | `INTEGER` | `1` = activa, `0` = dada de baja |

#### `amenities`
| Columna | Tipo esperado | Notas |
|---|---|---|
| `id` | `INTEGER` PK | Autoincremental |
| `room_id` | `INTEGER` FK | Referencia a `rooms(id)` con `ON DELETE CASCADE` |
| `name` | `TEXT` | Nombre del servicio o amenidad |

#### `users`
| Columna | Tipo esperado | Notas |
|---|---|---|
| `id` | `INTEGER` PK | Autoincremental |
| `name` | `TEXT` | Nombre completo |
| `email` | `TEXT` UNIQUE | Correo electrónico |
| `password_hash` | `TEXT` | Contraseña hasheada con bcrypt |
| `role` | `TEXT` | Valores: `guest`, `admin` |

#### `reservations`
| Columna | Tipo esperado | Notas |
|---|---|---|
| `id` | `INTEGER` PK | Autoincremental |
| `room_id` | `INTEGER` FK | Referencia a `rooms(id)` — debe tener `FOREIGN KEY` |
| `user_id` | `INTEGER` FK | Referencia a `users(id)` — debe tener `FOREIGN KEY` |
| `guest_name` | `TEXT` | Nombre del huésped |
| `guest_email` | `TEXT` | Correo del huésped |
| `check_in_date` | `TEXT` | Formato ISO `YYYY-MM-DD` |
| `check_out_date` | `TEXT` | Formato ISO `YYYY-MM-DD` |
| `guests_count` | `INTEGER` | Número de huéspedes |
| `total_price` | `DECIMAL(10,2)` | Precio calculado: noches × precio por noche |
| `status` | `TEXT` | Valores: `confirmed`, `cancelled`, `completed` |
| `created_at` | `TEXT` | Timestamp de creación |

### Índices Esperados en `reservations`

| Nombre del índice | Columnas | Propósito |
|---|---|---|
| `idx_reservations_dates` | `check_in_date, check_out_date, room_id` | Consultas de disponibilidad por rango de fechas |
| `idx_reservations_user` | `user_id` | Consulta de reservas por usuario |
| `idx_reservations_guest_name` | `guest_name` | Búsqueda por nombre de huésped |

### Endpoints y Comportamiento Esperado

| Método | Ruta | Auth | Respuesta exitosa | Errores posibles |
|---|---|:---:|---|---|
| POST | `/api/auth/register` | No | `201 { token, user }` | `400` datos inválidos |
| POST | `/api/auth/login` | No | `200 { token, user }` | `401` credenciales incorrectas |
| GET | `/api/rooms` | No | `200 [ ...rooms ]` solo activas | — |
| GET | `/api/rooms/:id` | No | `200 { room + amenities }` | `404` no encontrada |
| POST | `/api/reservations` | Sí | `201 { reservation }` | `400` fechas inválidas, `409` doble booking |
| GET | `/api/reservations/my` | Sí | `200 [ ...reservations ]` del usuario | `401` sin token |
| GET | `/api/reservations/search` | Sí | `200 [ ...matches ]` | `401` sin token |
| DELETE | `/api/reservations/:id` | Sí | `200 { success }` | `401`, `403` no propietario, `404` no existe |
| PATCH | `/api/reservations/:id` | Sí | `200 { reservation }` | `401`, `404` no existe |

### Middleware de Autenticación (`middleware/auth.js`)

El middleware verifica el header `Authorization: Bearer <token>`.
Si el token es válido, adjunta `req.user = { id, email, role }` al contexto de la solicitud.
Si el token está ausente o expirado, retorna inmediatamente `401 Unauthorized`.

---

## Datos de Prueba (seed)

| ID | Habitación | Tipo | Precio | is_active |
|---|---|---|---|:---:|
| 1 | Habitación Estándar 101 | single | 89.99 | 1 |
| 2 | Suite Doble Deluxe 202 | double | 149.99 | 1 |
| 3 | Suite Ejecutiva 301 | suite | 249.99 | 1 |
| 4 | Suite Presidencial 401 | presidential | 499.99 | 1 |
| 5 | Habitación Clásica 102 | single | 79.99 | **0** |

| Email | Rol | Contraseña |
|---|---|---|
| `admin@hotelvista.com` | admin | `Admin1234!` |
| `juan@email.com` | guest | `Guest1234!` |
| `ana@email.com` | guest | `Guest1234!` |