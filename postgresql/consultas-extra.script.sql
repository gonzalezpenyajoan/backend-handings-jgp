-- Listar las pistas ordenadas por el número de veces que aparecen en playlists de forma descendente
SELECT T.trackid, T.name, COUNT(PT.playlistid) AS playlists
    FROM track T
    LEFT JOIN playlisttrack PT ON T.trackid = PT.trackid
    GROUP BY T.name, T.trackid
    ORDER BY playlists DESC;

-- Listar las pistas más compradas
SELECT T.trackid, T.name, COUNT(IL.quantity) AS compras
    FROM track T
    LEFT JOIN invoiceline IL ON IL.trackid = T.trackid
    GROUP BY T.trackid, T.name
    ORDER BY compras DESC;

-- Listar los artistas más comprados
SELECT Artist.artistid, Artist.name, COUNT(InvoiceLine.quantity) AS compras
    FROM invoiceline InvoiceLine
    RIGHT JOIN track Track ON InvoiceLine.trackid = Track.trackid
    RIGHT JOIN album Album ON Album.albumid = Track.albumid
    RIGHT JOIN artist Artist ON Artist.artistid = Album.artistid
    GROUP BY Artist.artistid, Artist.name
    ORDER BY compras DESC;

-- Listar las pistas que aún no han sido compradas por nadie
SELECT T.trackid, T.name, COUNT(IL.quantity) AS compras
    FROM track T
    LEFT JOIN invoiceline IL ON IL.trackid = T.trackid
    GROUP BY T.trackid, T.name
    HAVING COUNT(IL.quantity) = 0;

-- Listar los artistas que aún no han vendido ninguna pista
SELECT Artist.artistid, Artist.name, COUNT(InvoiceLine.quantity) AS compras
    FROM invoiceline InvoiceLine
    RIGHT JOIN track Track ON InvoiceLine.trackid = Track.trackid
    RIGHT JOIN album Album ON Album.albumid = Track.albumid
    RIGHT JOIN artist Artist ON Artist.artistid = Album.artistid
    GROUP BY Artist.artistid, Artist.name
    HAVING COUNT(InvoiceLine.quantity) = 0;