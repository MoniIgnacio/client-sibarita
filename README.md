# El Sibarita

## _Para los autenticos amantes de la comida._

[![(El Sibarita)](https://res.cloudinary.com/dbrqv6ypj/image/upload/v1668769008/Sibarita-img/wq7ue7wkxr3zmrbde14a.png)](https://sibarita.netlify.app/)

---

Made in:

- [React]
- [Javascript]
- [React Bootstrap]
- [Jwt Token]
- [Regexr]
- [Mongoose]
- [Node.js]
- [Express]
- [Cloudinary]
- [Axios]

---

## ✨ About Us ✨

> Hi! We are [Ignacio MONI] and [Jelle MANZANO HAAGSMA].

-Jelle: a junior fullstack javascript developer, with a solid background in tourism that always had an interest in all that revolves around computer science/programming.

---

## Description

This aplication tries to solve the problem for both clients and restaurant owners. What problems you may ask, so how many times have you seen super bad critics on a restaurant
and the owner tells that that person in particular has never been there? Thats something that El sibarita tries to solve, you can only comment once the restaurant has confirmed
that you have been at the restaurant (you may reserve beforehand through our app obviously!). With this, the owners do not have to take the risk of having a bad critic from someone that just wants to see the world burn! And also for the clients, they know they can rely on the critics proviced by previous users that went to a said restaurant!.

---

## User Stories

---

- 404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- Signup: As an anon I can sign up in the platform so that I can start creating and managing my backlog
- Login: As a user I can login to the platform so that I can start creating and managing my backlog
- Logout: As a user I can logout from the platform so no one else can modify my information
- Toogle media As a user I can toogle between different types of media
- Add elements As a user I can add elements to my backlog
- Delete elements As a user I can delete elements from my backlog
- Mark elements As a user I can mark elements in my backlog as done
- Random element As a user I can get a random element from my backlog
- Check profile As a user I can check my profile and stats

---

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

> 'http://localhost:5005/api/upload' => UPLOAD

| METHOD | URL | PARAM | BODY  | DESCRIPTION  |
| ------ | --- | ----- | ----- | ------------ |
| GET    | '/' | n\a   | image | Upload Image |

---

## Services

- Auth
- Comment
- Config
- Dish
- Reserva
- Restaurant
- Upload
- User

---

## Models Backend

User

```sh
{
   email: {type: String, required: [true, "Email is required."], unique: true, lowercase: true, trim: true},
   password: {type: String, required: [true, "Password is required."]},
   password2: {type: String},
   username: {type: String, required: true, trim: true},
   role: {type: String, enum: ["client", "owner", "admin"], default: "client"},
   phoneNumber: {type: Number, required: true}
}
```

Comment

```sh
{
  comment: {type: String, required: true, trim: true},
  photo: String,
  serviceScore: {type: Number, required: true},
  foodScore: {type: Number, required: true},
  ambientScore: {type: Number, required: true},
  user: [{type: Schema.Types.ObjectId, ref: "User"}],
  restaurant: [{type: Schema.Types.ObjectId, ref: "Restaurant"}]
}
```

Restaurant

```sh
{
  name: {type: String, required: true, trim: true},
  location: {type: String, required: true, trim: true},
  photos: [String],
  cuisinType: {type: String, required: true, enum: ["Italiana", "Española","Japonesa", "China"...], default: "Argentina"},
  phoneNumber: {type: Number, required: true},
  owner: {type: Schema.Types.ObjectId, ref: "User"}}
```

Reserva

```sh
{
  fecha: {required: true, type: String},
  hour: {required: true, type: String},
  pax: {required: true, type: Number, trim: true},
  hasConsumed: {type: Boolean, default: false},
  restaurant:{ type: Schema.Types.ObjectId, ref: "Restaurant"},
  whoReserved:{type: Schema.Types.ObjectId, ref: "User"}
    }
```

Dish

```sh
{
  title: {type: String, required: true, trim: true},
  description: {type: String, trim: true},
  price: {type: Number, required: true},
  category: {type: String, required: true, enum: ["entrante", "principal", "postre"], default: "principal"},
  restaurant: {type: Schema.Types.ObjectId, ref: "Restaurant"},
}
```

---

## Installation

El Sibarita requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

[Server Code] --- [Client Code]

```sh
cd server-sibarita/client-sibarita
npm i
npm run dev
```

For production environments...

```sh
npm start
```

---

| El Sibarita | Contributions                   |
| ----------- | ------------------------------- |
|             | https://github.com/JelleManzano |
|             | https://github.com/MoniIgnacio  |

---

[react]: https://reactjs.org/
[javascript]: https://www.javascript.com/
[react bootstrap]: https://react-bootstrap.github.io/
[mongoose]: https://mongoosejs.com/
[node.js]: http://nodejs.org
[express]: http://expressjs.com
[cloudinary]: https://cloudinary.com/
[regexr]: https://regexr.com/
[jwt token]: https://jwt.io/
[server code]: https://github.com/MoniIgnacio/server-sibarita
[client code]: https://github.com/MoniIgnacio/client-sibarita
[axios]: https://www.npmjs.com/package/axios
[ignacio moni]: https://www.linkedin.com/in/moniignacio02/
[jelle manzano haagsma]: https://www.linkedin.com/in/jelle-manzano-haagsma-6a6785189/
