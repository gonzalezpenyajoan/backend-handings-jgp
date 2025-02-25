# Introducción

El laboratorio de este módulo se compone de 2 bloques:

- **Obligatorio**: Restaurar una BBDD y crear una serie de consultas para recuperar información.
- **Extra (opcional)**: aquí encontrarás un listado de consultas avanzadas para poder profundizar y practicar más.

# Obligatorio

Vamos a restaurar la base de datos de **LemonMusic**, una plataforma musical con información sobre canciones, playlists, artistas, etc.

Podemos restaurar la base de datos de dos formas:

- O bien ejecutando un fichero de scripts SQL.
- O bien restaurando un fichero de backup.

# Consultas

Crea un fichero `consultas.script.sql` y resuelve las siguientes consultas (copiar el enunciado de la consulta como comentario sobre la `SELECT`):

- Listar las pistas (tabla Track) con precio mayor o igual a 1€

```sql
SELECT trackid, name, unitprice
	FROM track
	WHERE unitprice >= 1;
```

- Listar las pistas de más de 4 minutos de duración

```sql
SELECT trackid, name, milliseconds
	FROM track
	WHERE milliseconds >= 4*60*1000;
```

- Listar las pistas que tengan entre 2 y 3 minutos de duración

```sql
SELECT trackid, name, milliseconds
	FROM track
	WHERE milliseconds BETWEEN 2*60*1000 AND 3*60*1000;
```

- Listar las pistas que uno de sus compositores (columna Composer) sea Mercury

```sql
SELECT trackid, name, composer
	FROM track
	WHERE composer LIKE '%Mercury%';
```

- Calcular la media de duración de las pistas (Track) de la plataforma

```sql
SELECT AVG(milliseconds) FROM track;
```

- Listar los clientes (tabla Customer) de USA, Canada y Brazil

```sql
SELECT customerid, firstname, lastname, country
	FROM customer
	WHERE country IN ('USA', 'Canada', 'Brazil');
```

- Listar todas las pistas del artista 'Queen' (`Artist.Name = 'Queen'`)

```sql
SELECT Track.trackid, Track.name
	FROM track Track
	INNER JOIN album Album ON Album.albumid = Track.albumid
	INNER JOIN artist Artist ON Artist.artistid = Album.artistid
	WHERE Artist.name = 'Queen';
```

- Listar las pistas del artista 'Queen' en las que haya participado como compositor David Bowie

```diff
SELECT Track.trackid, Track.name, Track.composer
	FROM track Track
	INNER JOIN album Album ON Album.albumid = Track.albumid
	INNER JOIN artist Artist ON Artist.artistid = Album.artistid
-	WHERE Artist.name = 'Queen';
+	WHERE Artist.name = 'Queen' AND Track.composer LIKE '%David Bowie%';
```

- Listar las pistas de la playlist 'Heavy Metal Classic'

```sql
SELECT T.trackid, T.name
	FROM playlist P
	INNER JOIN playlisttrack PT ON P.playlistid = PT.playlistid
	INNER JOIN track T ON PT.trackid = T.trackid
	WHERE P.name = 'Heavy Metal Classic';
```

- Listar las playlist junto con el número de pistas que contienen

```sql
SELECT P.name AS playlist, COUNT(T.trackid) AS tracks
	FROM playlist P
	INNER JOIN playlisttrack PT ON P.playlistid = PT.playlistid
	INNER JOIN track T ON PT.trackid = T.trackid
	GROUP BY P.name;
```

- Listar las playlist (sin repetir ninguna) que tienen alguna canción de AC/DC

```sql
SELECT P.name
	FROM playlist P
	INNER JOIN playlisttrack PT ON P.playlistid = PT.playlistid
	INNER JOIN (
		SELECT Track.trackid
			FROM track Track
			INNER JOIN album Album ON Album.albumid = Track.albumid
			INNER JOIN artist Artist ON Artist.artistid = Album.artistid
			WHERE Artist.name = 'AC/DC'
			) T ON PT.trackid = T.trackid
	GROUP BY P.name;
```

- Listar las playlist que tienen alguna canción del artista Queen, junto con la cantidad que tienen

```diff
-SELECT P.name
+SELECT P.name, COUNT(T.trackid) AS tracks
	FROM playlist P
	INNER JOIN playlisttrack PT ON P.playlistid = PT.playlistid
	INNER JOIN (
		SELECT Track.trackid
			FROM track Track
			INNER JOIN album Album ON Album.albumid = Track.albumid
			INNER JOIN artist Artist ON Artist.artistid = Album.artistid
-			WHERE Artist.name = 'AC/DC'
+			WHERE Artist.name = 'Queen'
			) T ON PT.trackid = T.trackid
	GROUP BY P.name;
```

- Listar las pistas que no están en ninguna playlist

```sql
SELECT T.trackid, T.name
	FROM track T
	LEFT JOIN playlisttrack PT ON T.trackid = PT.trackid
	WHERE PT.playlistid IS NULL;
```

- Listar los artistas que no tienen álbum

```sql
SELECT Artist.artistid, Artist.name
	FROM artist Artist
	LEFT JOIN album Album ON Album.artistid = Artist.artistid
	WHERE Album.albumid IS NULL;
```

- Listar los artistas con el número de álbumes que tienen
  - Para saber si está bien, asegúrate de que algunos de los artistas de la query anterior (artistas sin álbum) aparecen en este listado con 0 álbumes

```sql
SELECT Artist.name, COUNT(Album.artistid)
	FROM artist Artist
	LEFT JOIN album Album ON Album.artistid = Artist.artistid
	GROUP BY Artist.name;
```


# Extra (opcional)

Crear un fichero `consultas-extra.script.sql` y resolver las siguientes consultas (copiar el enunciado de la consulta como comentario sobre la `SELECT`):

- Listar las pistas ordenadas por el número de veces que aparecen en playlists de forma descendente

```sql
SELECT T.trackid, T.name, COUNT(PT.playlistid) AS playlists
    FROM track T
    LEFT JOIN playlisttrack PT ON T.trackid = PT.trackid
    GROUP BY T.name, T.trackid
    ORDER BY playlists DESC;
```

- Listar las pistas más compradas (la tabla InvoiceLine tiene los registros de compras)

```sql
SELECT T.trackid, T.name, COUNT(IL.quantity) AS compras
	FROM track T
	LEFT JOIN invoiceline IL ON IL.trackid = T.trackid
	GROUP BY T.trackid, T.name
	ORDER BY compras DESC;
```

- Listar los artistas más comprados

**Respuesta:** Usamos `RIGHT JOIN` para incluir `tracks` que no hayan sido vendidas, pero esto no debería ser muy relevante porque los artistas _más_ vendidos serán aquellos que de por si ya tendrían sus pistas incluidas en un `INNER JOIN`.

```sql
SELECT Artist.artistid, Artist.name, COUNT(InvoiceLine.quantity) AS compras
	FROM invoiceline InvoiceLine
	RIGHT JOIN track Track ON InvoiceLine.trackid = Track.trackid
	RIGHT JOIN album Album ON Album.albumid = Track.albumid
	RIGHT JOIN artist Artist ON Artist.artistid = Album.artistid
	GROUP BY Artist.artistid, Artist.name
	ORDER BY compras DESC;
```

- Listar las pistas que aún no han sido compradas por nadie

```diff
SELECT T.trackid, T.name, COUNT(IL.quantity) AS compras
	FROM track T
	LEFT JOIN invoiceline IL ON IL.trackid = T.trackid
	GROUP BY T.trackid, T.name
-	ORDER BY compras DESC;
+	HAVING COUNT(IL.quantity) = 0;
```

- Listar los artistas que aún no han vendido ninguna pista

```diff
SELECT Artist.artistid, Artist.name, COUNT(InvoiceLine.quantity) AS compras
	FROM invoiceline InvoiceLine
	RIGHT JOIN track Track ON InvoiceLine.trackid = Track.trackid
	RIGHT JOIN album Album ON Album.albumid = Track.albumid
	RIGHT JOIN artist Artist ON Artist.artistid = Album.artistid
	GROUP BY Artist.artistid, Artist.name
-	ORDER BY compras DESC;
+	HAVING COUNT(InvoiceLine.quantity) = 0;
```

# Entrega

Para entregar esta práctica, créate un repositorio en Github, sube los dos ficheros (el básico, y si aplica el extra) y añade en la entrega la URL del repositorio.
