## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# API documentation

## Users

### `GET`  Get Users

```http://localhost:3000/users``` <br>
**Authorization:** Bearer Token <br>

### `POST` Create User

```http://localhost:3000/users``` <br>

**Body:**   <br>

```json
{
  "firstname": "Juan",
  "lastname": "Perez",
  "phone": 1173849283,
  "email": "juanperez@gmail.com",
  "password": "superpassword",
  "role": "profesor"
}
```

### `POST` Read Notification

```http://localhost:3000/users/:id/notifications/:notificationId``` <br>
**Authorization:** Bearer Token <br>

**Path Variables:**
`id`
`notificationId`

### `GET` Get User Notifications

```http://localhost:3000/users/:id/notifications``` <br>

**Authorization:** Bearer Token <br>

**Path Variables:**
`id`

### `GET` Get User by ID

```http://localhost:3000/users/:id``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`

### `POST` Login

```http://localhost:3000/login``` <br>

**Body:**   <br>

```json
{
  "username": "juanperez@gmail.com",
  "password": "0a349a8e-b555-42c4-80cd-58376b54f463"
}
```

### `POST` Forgot pass

```http://localhost:3000/forgotPassword``` <br>

**Body:**   <br>

```json
{
  "email": "juanperez@gmail.com"
}
```

## Students

### `PUT` Update Student

```http://localhost:3000/students/:id``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
id
**Body:**   <br>

```json
{
  "firstname": "Juan",
  "lastname": "Perez",
  "phone": 34578,
  "email": "juanperez@mail.com"
}
```

### `GET` Get Students

```http://localhost:3000/students``` <br>

**Authorization:** Bearer Token <br>

### `GET` Get Student by ID

```http://localhost:3000/students/:id``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`

### `DEL` Delete Student

```http://localhost:3000/students/:id``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`
`Teachers`

### `PUT` Update Teacher

```http://localhost:3000/teachers/:id``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
id
**Body:**   <br>

```json
{
  "firstname": "Savid",
  "lastname": "Silva",
  "experience": "Backend developer",
  "title": "Ingeniero en Sistemas",
  "phone": 345678,
  "email": "sk@mail.com"
}
```

### `GET` Get Teachers

```http://localhost:3000/teachers``` <br>

**Authorization:** Bearer Token <br>

### `GET` Get Teacher by ID

```http://localhost:3000/teachers/:id``` <br>

**Path Variables:**
`id`

### `DEL` Delete Teacher

```http://localhost:3000/teachers/:id``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`
`Courses`

## Inscriptions

### `POST` Enroll

```http://localhost:3000/courses/:id/inscriptions``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`
**Body:**   <br>

```json
{
  "phone": 1234556,
  "email": "juanperez@gmail",
  "reason": "Me gusta esta materia",
  "timeRangeFrom": "12",
  "timeRangeTo": "14",
  "studentId": ""
}
```

### `PUT` Update Inscription

```http://localhost:3000/courses/:id/inscriptions/:inscriptionId``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`
`inscriptionId`
**Body:**   <br>

```json
{
  "phone": 42356,
  "email": "juanperez@gmail",
  "reason": "Una razón",
  "timeRangeFrom": "14",
  "timeRangeTo": "18",
  "status": "solicitada"
}
```

### `GET` Get Inscriptions

```http://localhost:3000/courses/:id/inscriptions``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`

### `GET` Get Inscriptions by ID

```http://localhost:3000/courses/:id/inscriptions/:inscriptionId``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`
`inscriptionId`
`Ratings`

### `POST`Rate

```http://localhost:3000/courses/:id/ratings``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`
**Body:**   <br>

```json
{
  "score": 5,
  "student": {
    "id": ""
  }
}
```

### `GET` Get Ratings

```http://localhost:3000/courses/:id/ratings``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`

### `PUT` Update Rating

```http://localhost:3000/courses/:id/ratings/:ratingId``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`
`ratingId`
**Body:**   <br>

```json
{
  "description": "Porque si",
  "status": "bloqueado"
}
```

## Comments

### `POST` Comment

```http://localhost:3000/courses/:id/comments``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`
**Body:**   <br>

```json
{
  "description": "Excelente clase",
  "studentId": ""
}
```

### `GET` Get Comments by course

```http://localhost:3000/courses/:id/comments``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`

### `PUT` Update Comment

```http://localhost:3000/courses/:id/comments/:commentId``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`
`commentId`
**Body:**   <br>

```json
{
  "description": "Porque si",
  "status": "bloqueado"
}
```

### `GET` Get Comment by ID

```http://localhost:3000/courses/:id/comments/:commentId``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`
`commentId`

### `PUT` Update Course

```http://localhost:3000/courses/:id``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`
**Body:**   <br>

```json
{
  "name": "Math II",
  "subject": "Math",
  "duration": 60,
  "frequency": "mensual",
  "price": "6500",
  "description": "Clases mensual de matemáticas para nivel universitario",
  "rating": 0,
  "type": "grupal"
}
```

### `GET` Get Courses

```http://localhost:3000/courses``` <br>

### `GET` Get Courses By Teacher

```http://localhost:3000/courses/by-teacher/:id``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`

### `GET` Get Courses By Student

```http://localhost:3000/courses/by-teacher/:id``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`

### `GET` Get Course by ID

```http://localhost:3000/courses/:id``` <br>

**Path Variables:**
`id`

### `DEL` Delete Course

```http://localhost:3000/courses/:id``` <br>

**Authorization:** Bearer Token <br>
**Path Variables:**
`id`

### `POST` Create Course

```http://localhost:3000/courses``` <br>

**Authorization:** Bearer Token <br>
**Body:**   <br>

```json
{
  "name": "Geografía II",
  "subject": "Geografía",
  "duration": 60,
  "frequency": "mensual",
  "price": "6500",
  "description": "Clases mensuales de Geografía para nivel secundario",
  "type": "grupal",
  "published": true,
  "teacherId": "teacherId"
}
```

### `POST` Search Courses

```http://localhost:3000/courses/search``` <br>

**Body:**   <br>

```json
{
  "name": "Lengua II",
  "subject": "Lengua",
  "rating": 5,
  "frequency": "semanal",
  "type": "grupal"
}
```
