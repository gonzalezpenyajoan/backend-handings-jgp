# Laboratorio Módulo 1 - Modelado

## Requisitos

### Descripción general

Resumamos los requisitos de nuestro modelo según el enunciado. Se trata de un portal de programación con distintos cursos conteniendo distintos videos dentro de cada curso.

* Un vídeo pertenece a un único curso.
* Un vídeo está hecho por un único autor y se muestra en la página del vídeo.
* Un curso puede estar hecho por múltiples autores. Un autor puede haber participado en múltiples cursos.
* Se puede ver una página con datos del autor --> Poco visitada.
* Se puede ver el detalle de un curso y los vídeos asociados a dicho curso. --> Visitada a menudo.
* Se puede ver una página propia para cada vídeo con su descripción y detalles --> Visitada a menudo.
* El archivo multimedia se almacena en un storage S3 y en un headless CMS --> Solo almacenamos GUID o URL.
* Los detalles del vídeo también están almacenados en un recurso externo. Mongo solo almacenará un GUID.
* Escritura: Se espera que no se suba más de un par de cursos al día y no se cree más de un autor al día.

### Requisitos parte obligatoria

* Queremos mostrar los últimos cursos publicados.
* Queremos mostrar cursos por área (devops, front end, ...).
* Queremos mostrar un curso con sus vídeos.
* En un vídeo queremos mostrar su autor.

![image](./modelado-mandatory-solution.png)
