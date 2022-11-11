# Sibarita

## _slogan_

<!-- [![... imagen](./public/images/index-background.jpg)](https://img.cyclic.app/) -->

Made in:

- [JavaScript]
- [Handlebars]
- [Mongoose]
- [Bootstrap]
- [Node.js]
- [Express]
- [Cloudinary]

## ✨ About Us ✨

> [XXX] and [xxx]

## Description

## MVP

## Data Structure Server

> 'http://localhost:5005/api/auth' => USER x

| METHOD | URL       | PARAM | BODY             | DESCRIPTION                   |
| ------ | --------- | ----- | ---------------- | ----------------------------- |
| POST   | '/login'  | n\a   | email & password | Validate the user credentials |
| POST   | '/signup' | n\a   | all description  | New User registrer            |
| GET    | '/verify' | n/a   | n\a              | Send to FE the verify token   |

> 'http://localhost:5005/api/restaurant' => RESTAURANT x

| METHOD | URL       | PARAM | BODY            | DESCRIPTION                  |
| ------ | --------- | ----- | --------------- | ---------------------------- |
| GET    | '/'       | n\a   | n\a             | Get all restaurants          |
| POST   | '/create' | n\a   | all description | Create a new restaurant      |
| GET    | '/restId' | id    | n\a             | Gets a specific restaurant   |
| DELETE | '/restId' | id    | n\a             | Delete a specific restaurant |
| PATCH  | '/restId' | id    | all description | Edit a specific restaurant   |

> 'http://localhost:5005/api/user' => USER x

| METHOD | URL       | PARAM | BODY            | DESCRIPTION            |
| ------ | --------- | ----- | --------------- | ---------------------- |
| GET    | '/userId' | id    | n\a             | Gets a specific user   |
| DELETE | '/userId' | id    | n\a             | Delete a specific user |
| PATCH  | '/userId' | id    | all description | Edit a specific user   |

> 'http://localhost:5005/api/carta' => CARTA

| METHOD | URL       | PARAM | BODY            | DESCRIPTION            |
| ------ | --------- | ----- | --------------- | ---------------------- |
| GET    | '/'       | n\a   | n\a             | Get all restaurants    |
| POST   | '/create' | n\a   | all description | Create a new cart      |
| GET    | '/cartId' | id    | n\a             | Gets a specific cart   |
| DELETE | '/cartId' | id    | n\a             | Delete a specific cart |
| PATCH  | '/cartId' | id    | all description | Edit a specific cart   |

> 'http://localhost:5005/api/comment' => COMMENT

| METHOD | URL          | PARAM | BODY            | DESCRIPTION               |
| ------ | ------------ | ----- | --------------- | ------------------------- |
| GET    | '/'          | n\a   | n\a             | Get all comments          |
| POST   | '/create'    | n\a   | all description | Create a new comment      |
| GET    | '/commentId' | id    | n\a             | Gets a specific comment   |
| DELETE | '/commentId' | id    | n\a             | Delete a specific comment |
| PATCH  | '/commentId' | id    | all description | Edit a specific comment   |

## Data Structure Client

| METHOD | URL                        | PARAM | BODY            | DESCRIPTION                  |
| ------ | -------------------------- | ----- | --------------- | ---------------------------- |
| GET    | '/restaurants'             | n\a   | n\a             | Get all restaurants          |
| POST   | '/restaurants'             | n\a   | all description | Create a new restaurant      |
| GET    | '/restaurant/restaurantID' | id    | n\a             | Gets a specific restaurant   |
| DELETE | '/restaurant/restaurantID' | id    | n\a             | Delete a specific restaurant |
| PATCH  | '/restaura'                | id    | all description | Edit a specific restaurant   |

## Installation

OurHome requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd server-sibarita/client-sibarita
npm i
npm run dev
```

For production environments...

```sh
npm run start
```

| Our Home | Contributions                  |
| -------- | ------------------------------ |
|          | https://github.com/jelle       |
|          | https://github.com/MoniIgnacio |

[javascript]: https://www.javascript.com/
[handlebars]: https://handlebarsjs.com/
[mongoose]: https://mongoosejs.com/
[bootstrap]: https://getbootstrap.com/
[node.js]: http://nodejs.org
[express]: http://expressjs.com
[cloudinary]: https://cloudinary.com/
[ignacio moni]: https://www.linkedin.com/in/moniignacio02/
[jelle]: https://www.linkedin.com/in/jelle/
