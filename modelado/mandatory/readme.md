# Laboratorio Módulo 1 - Modelado

## Requisitos

### Descripción general

Resumamos los requisitos de nuestro modelo según el enunciado. Se trata de un portal de programación con distintos cursos conteniendo distintos videos dentro de cada curso.

* Un vídeo pertenece a un único curso.
* Un vídeo está hecho por un único autor y se muestra en la página del vídeo.
* Un curso puede estar hecho por múltiples autores. Un autor puede haber participado en múltiples cursos.
* Se puede ver una página con datos del autor → Poco visitada.
* Se puede ver el detalle de un curso y los vídeos asociados a dicho curso. → Visitada a menudo.
* Se puede ver una página propia para cada vídeo con su descripción y detalles → Visitada a menudo.
* El archivo multimedia se almacena en un storage S3 y en un headless CMS → Solo almacenamos GUID o URL.
* Los detalles del vídeo también están almacenados en un recurso externo. Mongo solo almacenará un GUID.
* Escritura: Se espera que no se suba más de un par de cursos al día y no se cree más de un autor al día.

### Requisitos parte obligatoria

* Queremos mostrar los últimos cursos publicados.
* Queremos mostrar cursos por área (devops, front end, ...).
* Queremos mostrar un curso con sus vídeos.
* En un vídeo queremos mostrar su autor.

## Solución propuesta

Para el modelado de los datos, se ha partido de una estructura con tres colecciones: category, video y author.

* **Category:** Se refiere a una categoría o grupo a la que un vídeo puede pertenecer. En el caso concreto de la parte obligatoria de esta entrega, esta colección se refiere a un curso. Sin embargo, en la parte opcional se tratará al curso como un caso particular de category. Contiene el nombre del curso y la información de sus autores.

* **Video:** Contiene la información relativa a un video: nombre, categoría (curso) al que pertenece, autor, descripción corta (para la página principal), artículo (texto descriptivo en la página principal del vídeo), fecha de publicación y fecha de su última actualización.

    * Recordemos que la descripción corta y el artículo se almacenan en un recurso externo pero se ha especificado que mongo guarda su GUID.

    * Las fechas de publicación y fecha de última actualización son datos relevantes para saber cuáles son los últimos cursos publicados (o que se actualizaron más recientemente).

* **Author:** Contiene la información de los autores de los cursos y/o videos, con su nombre, descripción, array de sus cursos y array de sus videos. Se podrían añadir más campos como fecha de nacimiento o redes sociales.

A estas tres colecciones se le añade una cuarta:

* **LatestVideos:** Se trata de una colección autocalculada con los últimos vídeos publicados, que se mostrarán en la página principal correspondiente. De este modo, cuando se acceda a la página principal se puede acceder a esta lista reducida de vídeos (y con menos campos en cada uno de ellos), separada de la colección principal de vídeos.

![image](./modelado-mandatory-solution.png)

## Patrones aplicados

### Subset pattern (computer)

### Extended reference pattern

### Tree pattern