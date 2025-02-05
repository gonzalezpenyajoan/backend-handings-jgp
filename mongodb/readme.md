# Laboratorio MongoDB

Vamos a trabajar con el set de datos de Mongo Atlas airbnb. Lo puedes encontrar en este enlace: https://drive.google.com/drive/folders/1gAtZZdrBKiKioJSZwnShXskaKk6H_gCJ

Para restaurarlo puede seguir las instrucciones del primer vídeo de la sección 'Consultando Datos'.

Acuerdate de mirar si en el directorio /opt/app del contenedor Mongo hay contenido de backups previos que haya que borrar.

Para entregar las soluciones, añade un README.md a tu repositorio del bootcamp incluyendo enunciado y consulta (lo que pone 'Pega aquí tu consulta').

## Introducción

En este base de datos puedes encontrar un montón de alojamientos y sus reviews, esto está sacado de hacer webscrapping.

Pregunta. Si montaras un sitio real, ¿Qué posibles problemas pontenciales les ves a como está almacenada la información?

**Respuesta:** Se observa que las reviews están totalmente "embebidas" en cada documento de la colección, haciendo que algunos documentos sean muy grandes debido a la cantidad de reviews que tienen. Se debería crear una colección de reviews a parte y en todo caso se podrían "embeber" las más importantes.

## Obligatorio

Esta es la parte mínima que tendrás que entregar para superar este laboratorio.

### Consultas

* Saca en una consulta cuantos alojamientos hay en España.


```javascript
use('sample_airbnb')
db.listingsAndReviews.countDocuments(
    { "address.country_code": "ES" }
)
```

* Lista los 10 primeros alojamientos de España:
    * Ordenados por precio de forma ascendente.
    * Sólo muestra: nombre, precio, camas y la localidad (address.market).

```javascript
use('sample_airbnb')
db.listingsAndReviews.find(
    { "address.country_code": "ES" },
    { _id: 1, name: 1, price: 1, beds: 1, "address.market": 1}
).sort({price: 1}).limit(10)
```

### Filtrando

* Queremos viajar cómodos, somos 4 personas y queremos:
    * 4 camas.
    * Dos cuartos de baño o más.
    * Sólo muestra: nombre, precio, camas y baños.

```javascript
use('sample_airbnb')
db.listingsAndReviews.find(
    {
        beds: 4,
        bathrooms: {$gte: 2}
    },
    { _id: 0, name: 1, price: 1, beds: 1, bathrooms: 1}
)
```

* Aunque estamos de viaje no queremos estar desconectados, así que necesitamos que el alojamiento también tenga conexión wifi. A los requisitos anteriores, hay que añadir que el alojamiento tenga wifi.
    * Sólo muestra: nombre, precio, camas, baños y servicios (amenities).

```javascript
use('sample_airbnb')
db.listingsAndReviews.find(
    {
        beds: 4,
        bathrooms: {$gte: 2},
        amenities: {$all: ["Wifi"]}
    },
    { _id: 0, name: 1, price: 1, beds: 1, bathrooms: 1, amenities: 1}
)
```

* Y bueno, un amigo trae a su perro, así que tenemos que buscar alojamientos que permitan mascota (Pets allowed).
    * Sólo muestra: nombre, precio, camas, baños y servicios (amenities).

```javascript
use('sample_airbnb')
db.listingsAndReviews.find(
    {
        beds: 4,
        bathrooms: {$gte: 2},
        amenities: {$all: ["Wifi", "Pets allowed"]}
    },
    { _id: 0, name: 1, price: 1, beds: 1, bathrooms: 1, amenities: 1}
)
```

* Estamos entre ir a Barcelona o a Portugal, los dos destinos nos valen. Pero queremos que el precio nos salga baratito (50 $), y que tenga buen rating de reviews (campo review_scores.review_scores_rating igual o superior a 88).
    * Sólo muestra: nombre, precio, camas, baños, rating, localidad y país.

**Nota:** Cabe mencionar que existen documentos donde no existe una calificación review_scores.review_scores_rating por lo que en la siguiente consulta serán descartados:

```javascript
use('sample_airbnb')
db.listingsAndReviews.find(
    {
        beds: 4,
        bathrooms: {$gte: 2},
        amenities: {$all: ["Wifi", "Pets allowed"]},
        $or: [
            {"address.market" : "Barcelona"},
            {"address.country_code" : "PT"}],
        price: {$lte: NumberDecimal('50.00')},
        "review_scores.review_scores_rating": {$gte: 88}
    },
    { _id: 0, name: 1, price: 1, beds: 1, bathrooms: 1, "review_scores.review_scores_rating": 1, "address.market": 1, "address.country": 1}
)
```

Si se quisiera incluir los documentos que no tienen un review_scores.review_scores_rating a pesar de todo, se podría hacer la consulta siguiente:

```javascript
use('sample_airbnb')
db.listingsAndReviews.find(
    {
        beds: 4,
        bathrooms: {$gte: 2},
        amenities: {$all: ["Wifi", "Pets allowed"]},
        $or: [
            {"address.market" : "Barcelona"},
            {"address.country_code" : "PT"}],
        price: {$lte: NumberDecimal('50.00') },
        $or: [
            {"review_scores.review_scores_rating": { $gte: 88 }},
            {"review_scores.review_scores_rating": { $exists: false}}

        ]
    },
    { _id: 0, name: 1, price: 1, beds: 1, bathrooms: 1, "review_scores.review_scores_rating": 1, "address.market": 1, "address.country": 1}
)
```

* También queremos que el huésped sea un superhost (host.host_is_superhost) y que no tengamos que pagar depósito de seguridad (security_deposit).
    * Sólo muestra: nombre, precio, camas, baños, rating, si el huésped es superhost, depósito de seguridad, localidad y país.

**Nota:** El campo security_deposit no está presente en algunos documentos, por lo que la query siguiente no los devolverá a pesar de que se podría interpretar que la ausencia de un security_deposit equivale a un security_deposit = 0. Primero, veamos la consulta si ignorásemos el hecho de que security_deposit esté ausente en muchos documentos:

```javascript
use('sample_airbnb')
db.listingsAndReviews.find(
    {
        beds: 4,
        bathrooms: {$gte: 2},
        amenities: {$all: ["Wifi", "Pets allowed"]},
        $or: [
            {"address.market" : "Barcelona"},
            {"address.country_code" : "PT"}],
        price: {$lte: NumberDecimal('50.00')},
        "review_scores.review_scores_rating": {$gte: 88},
        "host.host_is_superhost": true,
        security_deposit: NumberDecimal('0.00')
    },
    {
        _id: 0,
        name: 1,
        price: 1,
        beds: 1,
        bathrooms: 1,
        "review_scores.review_scores_rating": 1,
        "host.host_is_superhost": 1,
        security_deposit: 1,
        "address.market": 1,
        "address.country": 1
    }
)
```

Ahora, veamos la consulta si tenemos en cuenta de que un security_deposit inexistente o nulo es equivalente a cero:

```javascript
use('sample_airbnb')
db.listingsAndReviews.find(
    {
        beds: 4,
        bathrooms: {$gte: 2},
        amenities: {$all: ["Wifi", "Pets allowed"]},
        $or: [
            {"address.market" : "Barcelona"},
            {"address.country_code" : "PT"}],
        price: {$lte: NumberDecimal('50.00')},
        "review_scores.review_scores_rating": {$gte: 88},
        "host.host_is_superhost": true,
        $or: [
            {security_deposit: { $exists: false }},
            {security_deposit: null},
            {security_deposit: NumberDecimal('0.00')}
        ]
    },
    {
        _id: 0,
        name: 1,
        price: 1,
        beds: 1,
        bathrooms: 1,
        "review_scores.review_scores_rating": 1,
        "host.host_is_superhost": 1,
        security_deposit: 1,
        "address.market": 1,
        "address.country": 1
    }
)
```

Por último, también habría sido posible hacer un fill con el aggregation framework. Veámoslo:

```javascript
use('sample_airbnb')
db.listingsAndReviews.aggregate([
    {
        $fill: {
            output: {
                security_deposit: {
                    value: NumberDecimal("0.00")
                }
            }
        }
    },
    {
        $match: {
            beds: 4,
            bathrooms: {$gte: 2},
            amenities: {$all: ["Wifi", "Pets allowed"]},
            $or: [
                {"address.market" : "Barcelona"},
                {"address.country_code" : "PT"}],
            price: {$lte: NumberDecimal('50.00')},
            "review_scores.review_scores_rating": {$gte: 88},
            "host.host_is_superhost": true,
            security_deposit: NumberDecimal('0.00')
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            price: 1,
            beds: 1,
            bathrooms: 1,
            "review_scores.review_scores_rating": 1,
            "host.host_is_superhost": 1,
            security_deposit: 1,
            "address.market": 1,
            "address.country": 1

        }
    }
])
```

### Agregaciones

* Queremos mostrar los alojamientos que hay en España, con los siguientes campos:
    * Nombre.
    * Localidad (no queremos mostrar un objeto, sólo el string con la localidad).
    * Precio

```javascript
use('sample_airbnb')
db.listingsAndReviews.aggregate([
    {
        $match: {
            "address.country_code" : "ES"
        }
    },
    {
        $project: {
          _id: 0,
          name: 1,
          "address.market": 1,
          price: 1
        }
    }
])
```

* Queremos saber cuántos alojamientos hay disponibles por país.

```javascript
use('sample_airbnb')
db.listingsAndReviews.aggregate([
    {
        $group: {
            _id: "$address.country",
            cuantosAlojamientos: { $sum: 1 }
        }
    }
])
```

## Opcional

* Queremos saber el precio medio de alquiler de airbnb en España.

```javascript
use('sample_airbnb')
db.listingsAndReviews.aggregate([
    {
        $match: {
            "address.country" : "Spain"
        }
    },
    {
        $group: {
            _id: "$address.country",
            avgPrice: {$avg: "$price"}
        }
    }
])
```

* ¿Y si quisieramos hacer como el anterior, pero sacarlo por países?

```javascript
use('sample_airbnb')
db.listingsAndReviews.aggregate([
    {
        $group: {
            _id: "$address.country",
            avgPrice: {$avg: "$price"}
        }
    }
])
```

* Repite los mismos pasos para calcular el precio medio de alquiler, pero agrupando también por numero de habitaciones.

```javascript
use('sample_airbnb')
db.listingsAndReviews.aggregate([
    {
        $group: {
            _id: {
                country: "$address.country",
                bedrooms: "$bedrooms"
            },
            avgPrice: {$avg: "$price"}
        }
    },
    {
        $sort: {
            "_id.country": 1,
            "_id.bedrooms": 1
        }
    }
])
```

## Desafio

Queremos mostrar el top 5 de alojamientos más caros en España, con los siguentes campos:

* Nombre.
* Precio.
* Número de habitaciones.
* Número de camas.
* Número de baños.
* Ciudad.
* Servicios, pero en vez de un array, un string con todos los servicios incluidos.

```javascript
use('sample_airbnb')
db.listingsAndReviews.aggregate([
    {
        $match: {
          "address.country_code" : "ES"
        }
    },
    {
        $sort: {
            "price" : -1
        }
    },
    {
        $project: {
          _id: 0,
          name: 1,
          price: 1,
          bedrooms: 1,
          beds: 1,
          bathrooms: 1,
          "address.market": 1,
          amenities: {
            $reduce: {
                input: "$amenities",
                initialValue: "",
                in: {
                    $cond: [
                        {$eq: ["$$value", ""]},
                        {$concat: ["$$value", "$$this"]},
                        {$concat: ["$$value", ", ", "$$this"]}
                    ]
                    
                }
            }
          }
        }
    }
])
```

