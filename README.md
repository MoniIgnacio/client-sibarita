# Sibarita

## _slogan_

[![... imagen](./public/images/index-background.jpg)](https://img.cyclic.app/)

Made in:

- [React]
- [Javascript]
- [React Bootstrap]
- [Mongoose]
- [Node.js]
- [Express]
- [Cloudinary]

## ✨ About Us ✨

> Hi! We are [Ignacio MONI] and [Jelle MANZANO HAAGSMA] ...

## Description



## MVP



## Data Structure Server

> 'http://localhost:5005/api/auth' => AUTH

| METHOD | URL       | PARAM | BODY             | DESCRIPTION                   |
| ------ | --------- | ----- | ---------------- | ----------------------------- |
| POST   | '/login'  | n\a   | email & password | Validate the user credentials |
| POST   | '/signup' | n\a   | all description  | New User registrer            |
| GET    | '/verify' | n/a   | n\a              | Send to FE the verify token   |

> 'http://localhost:5005/api/restaurant' => RESTAURANT

| METHOD | URL                 | PARAM | BODY            | DESCRIPTION                  |
| ------ | ------------------- | ----- | --------------- | ---------------------------- |
| GET    | '/'                 | n\a   | n\a             | Get all restaurants          |
| POST   | '/create'           | n\a   | all description | Create a new restaurant      |
| GET    | '/restId'           | id    | n\a             | Gets a specific restaurant   |
| DELETE | '/restId'           | id    | n\a             | Delete a specific restaurant |
| PATCH  | '/restId/edit'      | id    | all description | Edit a specific restaurant   |
| POST   | '/restId/reserva'   | id    | all description | Create a new reserva         |
| POST   | '/restId/dish'      | id    | all description | Create a new dish            |
| GET    | '/restId/alldishes' | id    | n\a             | Gets all dishes              |

> 'http://localhost:5005/api/user' => USER

| METHOD | URL               | PARAM | BODY            | DESCRIPTION             |
| ------ | ----------------- | ----- | --------------- | ----------------------- |
| GET    | '/userId'         | id    | n\a             | Gets a specific user    |
| DELETE | '/userId'         | id    | n\a             | Delete a specific user  |
| PATCH  | '/userId'         | id    | all description | Edit a specific user    |
| GET    | '/userId/reserve' | id    | n\a             | Gets a specific reserva |

> 'http://localhost:5005/api/dish' => DISH

| METHOD | URL       | PARAM | BODY            | DESCRIPTION            |
| ------ | --------- | ----- | --------------- | ---------------------- |
| GET    | '/dishId' | id    | n\a             | Gets a specific dish   |
| DELETE | '/dishId' | id    | n\a             | Delete a specific dish |
| PATCH  | '/dishId' | id    | all description | Edit a specific dish   |

> 'http://localhost:5005/api/comment' => COMMENT

| METHOD | URL          | PARAM | BODY            | DESCRIPTION               |
| ------ | ------------ | ----- | --------------- | ------------------------- |
| GET    | '/'          | n\a   | n\a             | Get all comments          |
| GET    | '/commentId' | id    | n\a             | Gets a specific comment   |
| DELETE | '/commentId' | id    | n\a             | Delete a specific comment |
| PATCH  | '/commentId' | id    | all description | Edit a specific comment   |

> 'http://localhost:5005/api/reserva' => RESERVA

| METHOD | URL                  | PARAM | BODY            | DESCRIPTION               |
| ------ | -------------------- | ----- | --------------- | ------------------------- |
| GET    | '/'                  | n\a   | n\a             | Get all reservas          |
| DELETE | '/reservaId'         | id    | n\a             | Delete a specific reserva |
| PATCH  | '/reservaId'         | id    | all description | Edit a specific reserva   |
| POST   | '/reservaId/comment' | id    | all description | Create a new comment      |

## Data Structure Client

| ROUTE                      | BODY            | DESCRIPTION                  |
| -------------------------- | --------------- | ---------------------------- |
| '/restaurants'             | n\a             | Get all restaurants          |
| '/restaurants'             | all description | Create a new restaurant      |
| '/restaurant/restaurantID' | n\a             | Gets a specific restaurant   |
| '/restaurant/restaurantID' | n\a             | Delete a specific restaurant |
| '/restaurant'              | all description | Edit a specific restaurant   |

## Installation

El Sibarita requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd server-sibarita/client-sibarita
npm i
npm run dev
```

For production environments...

```sh
npm start
```

| El Sibarita | Contributions                   |
| ----------- | ------------------------------- |
|             | https://github.com/JelleManzano |
|             | https://github.com/MoniIgnacio  |

[React]: https://reactjs.org/
[Javascript]: https://www.javascript.com/
[React Bootstrap]: https://react-bootstrap.github.io/
[Mongoose]: https://mongoosejs.com/
[Node.js]: http://nodejs.org
[Express]: http://expressjs.com
[Cloudinary]: https://cloudinary.com/
[Ignacio MONI]: https://www.linkedin.com/in/moniignacio02/
[Jelle MANZANO HAAGSMA]: https://www.linkedin.com/in/jelle-manzano-haagsma-6a6785189/
