# Laboratorio API REST

Se quiere implementar la aplicación backend de un portal de reservas de casas, donde vamos a tener dos páginas:

* Listado de casas
* Detalle de una casa: título, imagen, descripción, dirección, número de habitaciones, número de camas, número de baños y últimas 5 reseñas.

## Obligatorio (feature/obligatorio)

* Montar el proyecto backend con la estructura pods.
* Exponer 3 endpoints: Listado de casas, detalle de una casa y añadir una review (nombre y comentario, la fecha se calcula en el backend cuando se inserta).
* En cada endpoint, se pide que se devuelva solamente los campos necesarios que se usen en el front (Api Model <-> mapper <-> Model)
* Implementar los endpoints en modo mock.
* Implementar los endpoints con MongoDB.
* Añadir unit tests de los ficheros mappers y helpers utilizados.
* Añadir paginación al endpoint de listado de casas.

## Opcional (feature/opcional)

* Añadir un endpoint para el login.
* Añadir endpoint para actualizar el detalle de una casa.
* Securizar el endpoint anterior para que solamente un usuario admin pueda utilizarlo.
* Añadir test de integración de algún endpoint.

## Mongoose (feature/mongoose)

* Añadir una nueva rama e implementar la versión en Mongoose.