> Dado que la mayor parte de este proyecto es una adaptación del código planteado durante las sesiones teóricas, en este readme.md solo se facilitará una síntesis del enunciado de la entrega y puntualizaciones sobre decisiones que se han tomado distintas a las del código visto en la teoría.

- [Introducción](#introducción)
  - [Obligatorio (feature/obligatorio)](#obligatorio-featureobligatorio)
  - [Opcional (feature/opcional)](#opcional-featureopcional)
  - [Mongoose (feature/mongoose)](#mongoose-featuremongoose)
- [Solución](#solución)
  - [Endpoints](#endpoints)
  - [Modelo de House](#modelo-de-house)
  - [ObjectId](#objectid)
  - [Testing](#testing)

# Introducción

Se quiere implementar la aplicación backend de un portal de reservas de casas, donde vamos a tener dos páginas:

* Listado de casas por países
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

# Solución

A continuación se comentarán algunas decisiones tomadas durante la elaboración de esta entrega, tan solo destacando aquello que pueda llamar la atención respecto del código de la teoría.

## Endpoints

Tal como se solicita en la parte obligatoria de la entrega, se han expuesto tres endpoints:

* `GET /api/houses` : Devuelve el listado de todas las casas. Tiene tres parámetros que puede recibir por URL parameters:
  * `page` y `pageSize`: Se usan para paginar el listado.
  * `countryCode`: Para devolver todas las casas de un país en concreto. Relevante ya que el enunciado informa de que se quiere mostrar un listado de casas por países.
* `GET /api/houses/:houseId` : Devuelve el detalle de una casa en concreto, indicando en la URL el id de la casa en cuestión.
* `POST /api/houses/:houseId/reviews` : Inserta una nueva review en la lista de reviews de una casa en concreto, cuyo id se indica en la URL.

## Modelo de House

En la base de datos de mongoDB, podemos observar que un documento de una casa incluye más de 30 de campos, de los cuales solo necesitamos el título, imagen, descripción, dirección, número de habitaciones, número de camas, número de baños y las últimas 5 reseñas. Además, los documentos no tienen siempre los mismos campos, estando algunos de ellos vacíos o ni siquiera existiendo en algunos de los documentos.

```json
{
    "_id" : "92111612",
    "listing_url" : "https://www.airbnb.com/rooms/16893365",
    "name" :  "Sophisticated,waterfront living w/ resort pool,hot tub,& beach access",
    "summary" : "This property is a 1364  square feet,3 Bedroom,2 bathroom accommodation located in Kaanapali.",
    "space" : "Aloha! Get ready to host your next big family gathering or holiday celebration",
    "description" : "This property is a (Phone number hidden by Airbnb) square feet, 3 Bedroom, 2 bathroom",
    "neighborhood_overview" : "",
    "notes" : "",
    "transit" : "",
    "access" : "",
    "interaction" : "",
    "house_rules" : "- No dog(s) are welcome in this home.",
    "property_type" : "Condominium",
    "room_type" : "Entire home/apt",
    "bed_type" : "Real Bed",
    "minimum_nights" : "2",
    "maximum_nights" : "180",
    "cancellation_policy" : "strict_14_with_grace_period",
    "last_scraped" : { "$date" : { "$numberLong" : "1551848400000" } },
    "calendar_last_scraped" : { "$date" : { "$numberLong" : "1551848400000" } },
    "first_review" : { "$date" : { "$numberLong" : "1504497600000" } },
    "last_review" : { "$date" : { "$numberLong" : "1550638800000" } },
    "accommodates" : { "$numberInt" : "8" },
    "bedrooms" : { "$numberInt" : "3" },
    "beds" : { "$numberInt" : "5" },
    "number_of_reviews" : { "$numberInt" : "9" },
    "bathrooms" : { "$numberInt" : "2" },
    "amenities" : [
        "TV",
        "Cable TV",
        "Wifi",
        "Air conditioning",
        "Pool",
        "Kitchen",
        "Free parking on premises",
        "Gym",
        "Hot tub",
        "Washer",
        "Dryer",
        "Essentials",
        "Shampoo",
        "Lock on bedroom door",
        "Hair dryer",
        "Iron",
        "Laptop friendly workspace",
        "Self check-in",
        "Lockbox",
        "Private entrance",
        "Hot water",
        "Microwave",
        "Coffee maker",
        "Refrigerator",
        "Dishes and silverware",
        "Oven",
        "Stove",
        "BBQ grill",
        "Patio or balcony",
        "Waterfront"
    ],
    "price" : { "$numberInt" : "69" },
    "security_deposit" : { "$numberInt" : "0" },
    "cleaning_fee" : { "$numberInt" : "25" },
    "extra_people" : { "$numberInt" : "0" },
    "guests_included" : { "$numberInt" : "1" },
    "images" : {
        "thumbnail_url" : "",
        "medium_url" : "",
        "picture_url" : "https://a0.muscache.com/im/pictures/9838338f-49db-478d-81fa-7595c0116dd2.jpg?aki_policy=large",
        "xl_picture_url" : ""
    },
    "host" : {
        "host_id" : "80926479",
        "host_url" : "https://www.airbnb.com/users/show/111808435",
        "host_name" : "Vacasa",
        "host_location" : "US",
        "host_about" : "Yes, we're a professional property management company—but we're also real people",
        "host_response_time" : "within an hour",
        "host_thumbnail_url" : "https://a0.muscache.com/im/pictures/user/8c788d94-a155-4d24-8b27-436a36da70a0.jpg?aki_policy=profile_small",
        "host_picture_url" : "https://a0.muscache.com/im/pictures/user/8c788d94-a155-4d24-8b27-436a36da70a0.jpg?aki_policy=profile_x_medium",
        "host_neighbourhood" : "Kaanapali",
        "host_response_rate" : { "$numberInt" : "82" },
        "host_is_superhost" : false,
        "host_has_profile_pic" : true,
        "host_identity_verified" : false,
        "host_listings_count" : { "$numberInt" : "226" },
        "host_total_listings_count" : { "$numberInt" : "226" },
        "host_verifications" : [
            "email",
            "phone",
            "reviews",
            "work_email"
            ]
    },
    "address" : {
        "street" : "Lahaina, HI, United States",
        "suburb" : "Maui",
        "government_area" : "Lahaina",
        "market" : "Maui",
        "country" : "United States",
        "country_code" : "US",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                { "$numberDouble" : "-156.68821" },
                { "$numberDouble" : "20.94855" }
            ],
        "is_location_exact" : false
        }
    },
    "availability" : {
        "availability_30" : { "$numberInt" : "0" },
        "availability_60" : { "$numberInt" : "8" },
        "availability_90" : { "$numberInt" : "22" },
        "availability_365" : { "$numberInt" : "22" }
    },
    "review_scores" : {
        "review_scores_accuracy" : { "$numberInt" : "10" },
        "review_scores_cleanliness" : { "$numberInt" : "10" },
        "review_scores_checkin" : { "$numberInt" : "9" },
        "review_scores_communication" : { "$numberInt" : "10" },
        "review_scores_location" : { "$numberInt" : "10" },
        "review_scores_value" : { "$numberInt" : "9" },
        "review_scores_rating" : { "$numberInt" : "96" }
    },
    "reviews" : [
        {
            "_id" : "81472908",
            "date" : { "$date" : { "$numberLong" : "1504497600000" } },
            "listing_id" : "89138864",
            "reviewer_id" : "43141237",
            "reviewer_name" : "Li",
            "comments" : "This place has the best ocean view you can imagine."
        },
        {
            "_id" : "73686017",
            "date" : { "$date" : { "$numberLong" : "1529726400000" } },
            "listing_id" : "26025897",
            "reviewer_id" : "28589030",
            "reviewer_name" : "James",
            "comments" : "Very, very convenient, delivered exactly what we wanted, comfortable."
        }
    ]
}
```

La inconsistencia en los campos que se comentaba anteriormente hace que estos documentos deban ser tratados con delicadeza. Es cierto que existen campos que casi siempre aparecen rellenos, pero no podemos tener la certeza sobre casi ninguno de ellos. En el archivo `house.model.ts` se ha implementado el siguiente modelo de datos a tenor de la estructura observada:

```javascript
export interface House {
    _id: String;
    listing_url?: String;
    name: String;
    summary?: String;
    space?: String;
    description: String;
    neighborhood_overview?: String;
    notes?: String;
    transit?: String;
    access?: String;
    interaction?: String;
    house_rules?: String;
    property_type?: String;
    room_type?: String;
    bed_type?: String;
    minimum_nights?: String;
    maximum_nights?: String;
    cancellation_policy?: String;
    last_scraped?: Date;
    calendar_last_scraped?: Date;
    first_review?: Date;
    last_review?: Date;
    accommodates?: Number;
    bedrooms?: Number;
    beds: Number;
    number_of_reviews?: Number;
    bathrooms: Number;
    amenities?: String[];
    price?: Number;
    weekly_price?: Number;
    monthly_price?: Number;
    security_deposit?: Number;
    cleaning_fee?: Number;
    extra_people?: Number;
    guests_included?: Number;
    images?: Images;
    host?: Host;
    address?: Address;
    availability?: Availability;
    review_scores?: ReviewScores;
    reviews: Review[];
}

export interface Images {
    thumbnail_url?: String;
    medium_url?: String;
    picture_url?: String;
    xl_picture_url?: String;
}

export interface Host {
    host_id: String;
    host_url: String;
    host_name: String;
    host_location: String;
    host_about?: String;
    host_response_time?: String;
    host_thumbnail_url?: String;
    host_picture_url?: String;
    host_neighbourhood?: String;
    host_response_rate?: Number;
    host_is_superhost: Boolean;
    host_has_profile_pic: Boolean;
    host_identity_verified: Boolean;
    host_listings_count: Number;
    host_total_listings_count: Number;
    host_verifications?: String[];
}

export interface Address {
    street: String;
    suburb?: String;
    government_area?: String;
    market?: String;
    country?: String;
    country_code?: String;
    location?: {
        type?: String;
        coordinates?: Number[];
        is_location_exact?: Boolean;
    }
}

export interface Availability {
    availability_30: Number;
    availability_60: Number;
    availability_90: Number;
    availability_365: Number;
}

export interface ReviewScores {
    review_scores_accuracy?: Number;
    review_scores_cleanliness?: Number;
    review_scores_checkin?: Number;
    review_scores_communication?: Number;
    review_scores_location?: Number;
    review_scores_value?: Number;
    review_scores_rating?: Number;
}

export interface Review {
    _id: String;
    date: Date;
    listing_id: String;
    reviewer_id: String;
    reviewer_name: String;
    comments?: String;
}
```

Como se puede observar, la gran mayoría de campos de las distintas interfaces se han declarado como opcionales. La opcionalidad o no de los campos se ha decidido mediante inspección de los datos.

Por supuesto, esto en cualquier caso será adaptado a otro modelo de datos más adecuado para la API, y la conversión de los datos entre ambos modelos se realizará mediante un mapper. El modelo apto para la API se puede encontrar en `house.api-model.ts`:

```javascript
import { Review } from "#dals/house/house.model.js";

export interface House {
    id: String;
    name: String;
    image: String;
    description: String;
    address: String;
    beds: Number;
    bathrooms: Number;
    latest_reviews: Review[];
}
```

## ObjectId

En teoría se ha hablado del `ObjectId` proporcionado por las librerías de Mongo. Este recurso es muy útil dado que al crear una nueva instancia de `ObjectId` se crea un nuevo Id que puede ser asignado a un documento. Sin embargo, se ha observado que el `Id` de los objetos ya existentes en la base de datos de mongo no corresponden con la estructura de un `ObjectId` de mongo, sino que se tratan de `String` de longitud variable y que nunca coinciden con un _hex string_ que pueda ser convertido en el `ObjectId` de mongo.

Debido a esta situación, y dado que se trata de una entrega con objetivos meramente académicos, se ha decidido declarar los id de las casas como simples `string`. Del mismo modo, se ha creado un helper muy sencillo que sirva para crear ids aleatorios en `src/common/helpers/id.helper.ts`:

```javascript
export const createId = (): string => Math.floor(Math.random() * 99999999).toString();
```

Esta función auxiliar simplemente genera un número aleatorio de 8 cifras en forma de string. Esta implementación está lejos de ser perfecta, ya que un id podría indicarnos información como el tipo del objeto (si así se diseña para ello), y no nos garantiza que dos documentos puedan tener el mismo id (un caso poco probable, pero totalmente posible). En cualquier caso, esta solución sencilla se ha considerado más que suficiente teniendo en cuenta la naturaleza de este proyecto.

## Testing

En la parte obligatoria de esta entrega `feature/obligatorio` se han hecho unit tests para el helper `id.helper.ts` y para los mappers de los modelos de House `house.mappers.test.ts`.

En la parte opcional de esta entrega `feature/opcional` se han añadido integration tests de los endpoints. Se podrían añadir integration tests adicionales comprobando el correcto funcionamiento de los URL params cuando se quiere devolver el listado completo de casas.