-- Listar las pistas (tabla Track) con precio mayor o igual a 1€
SELECT trackid, name, unitprice
    FROM track
    WHERE unitprice >= 1;

-- Listar las pistas de más de 4 minutos de duración
SELECT trackid, name, milliseconds
    FROM track
    WHERE milliseconds >= 4*60*1000;

-- Listar las pistas que tengan entre 2 y 3 minutos de duración
SELECT trackid, name, milliseconds
    FROM track
    WHERE milliseconds BETWEEN 2*60*1000 AND 3*60*1000;

-- Listar las pistas que uno de sus compositores (columna Composer) sea Mercury
SELECT trackid, name, composer
    FROM track
    WHERE composer LIKE '%Mercury%';

-- Calcular la media de duración de las pistas (Track) de la plataforma
SELECT AVG(milliseconds) FROM track;

-- Listar los clientes (tabla Customer) de USA, Canada y Brazil
SELECT customerid, firstname, lastname, country
    FROM customer
    WHERE country IN ('USA', 'Canada', 'Brazil');

-- Listar todas las pistas del artista 'Queen'
SELECT Track.trackid, Track.name
    FROM track Track
    INNER JOIN album Album ON Album.albumid = Track.albumid
    INNER JOIN artist Artist ON Artist.artistid = Album.artistid
    WHERE Artist.name = 'Queen';

-- Listar las pistas del artista 'Queen' en las que haya participado como compositor David Bowie
SELECT Track.trackid, Track.name, Track.composer
    FROM track Track
    INNER JOIN album Album ON Album.albumid = Track.albumid
    INNER JOIN artist Artist ON Artist.artistid = Album.artistid
    WHERE Artist.name = 'Queen' AND Track.composer LIKE '%David Bowie%';

-- Listar las pistas de la playlist 'Heavy Metal Classic'
SELECT T.trackid, T.name
    FROM playlist P
    INNER JOIN playlisttrack PT ON P.playlistid = PT.playlistid
    INNER JOIN track T ON PT.trackid = T.trackid
    WHERE P.name = 'Heavy Metal Classic';

-- Listar las playlist junto con el número de pistas que contienen
SELECT P.name AS playlist, COUNT(T.trackid) AS tracks
    FROM playlist P
    INNER JOIN playlisttrack PT ON P.playlistid = PT.playlistid
    INNER JOIN track T ON PT.trackid = T.trackid
    GROUP BY P.name;

-- Listar las playlist (sin repetir ninguna) que tienen alguna canción de AC/DC
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

-- Listar las playlist que tienen alguna canción del artista Queen, junto con la cantidad que tienen
SELECT P.name, COUNT(T.trackid) AS tracks
    FROM playlist P
    INNER JOIN playlisttrack PT ON P.playlistid = PT.playlistid
    INNER JOIN (
        SELECT Track.trackid
            FROM track Track
            INNER JOIN album Album ON Album.albumid = Track.albumid
            INNER JOIN artist Artist ON Artist.artistid = Album.artistid
            WHERE Artist.name = 'Queen'
            ) T ON PT.trackid = T.trackid
    GROUP BY P.name;

-- Listar las pistas que no están en ninguna playlist
SELECT T.trackid, T.name
    FROM track T
    LEFT JOIN playlisttrack PT ON T.trackid = PT.trackid
    WHERE PT.playlistid IS NULL;

-- Listar los artistas que no tienen álbum
SELECT Artist.artistid, Artist.name
    FROM artist Artist
    LEFT JOIN album Album ON Album.artistid = Artist.artistid
    WHERE Album.albumid IS NULL;

-- Listar los artistas con el número de álbumes que tienen
SELECT Artist.name, COUNT(Album.artistid)
    FROM artist Artist
    LEFT JOIN album Album ON Album.artistid = Artist.artistid
    GROUP BY Artist.name;