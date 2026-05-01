# Requisitos Funcionales

## 1. Autenticación
- **Registro**: Los usuarios pueden registrarse con sus datos básicos.
- **Inicio de sesión**: Los usuarios pueden autenticarse con correo y contraseña mediante JWT.

## 2. Gestión de Habitaciones
- **Listar habitaciones**: El sistema debe retornar únicamente las habitaciones **activas** (`is_active = 1`).
- **Detalle de habitación**: El sistema debe mostrar capacidades, precios y amenities detallados para una habitación seleccionada.

## 3. Reservas
- **Creación**: Los usuarios pueden seleccionar una habitación, fechas y número de huéspedes.
  - El sistema debe prevenir el doble booking garantizando que las fechas seleccionadas no se solapen con reservas `confirmed` existentes para esa misma habitación.
  - Cálculos válidos: el precio total es el resultado exacto de multiplicar las noches de estadía por el precio real por noche.
- **Mis reservas**: Los usuarios autenticados pueden listar exclusivamente sus propias reservas.
- **Cancelación**: Los usuarios pueden cancelar una reserva siempre que no haya transcurrido su fecha.
  - Los usuarios tienen permitido cancelar ÚNICAMENTE sus propias reservas. Cancelar reservas ajenas está estrictamente prohibido.
- **Búsqueda**: Búsqueda avanzada de reservas por coincidencia parcial de nombre de contacto.
