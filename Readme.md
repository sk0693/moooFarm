# Introduction

This project is build for handling the files operation and storage. The apis is build by which `User` can upload the file(s) and see the all upload files with authorization. Also it can generate the `tiny url` by which user can give access the upload files to public.

## Installing

1. Clone the repository using :

```bash
git clone https://github.com/sk0693/crud-operation-on-file.git
```

2. Change the repository directory :

```bash
cd crud-operation-on-file
```

3. Install the needed node packges/modules :

```bash
npm install
```

4. Start the development server :

```bash
npm start
```

## Authorization

All API requests require the use of a generated Authorization Token `(JWT)`. You have to register and then login the application using `register` and `login` routes respectively. These APIs is not required the jwt token.

To authenticate an API request, you should provide your API key in the `Authorization` header.

Alternatively, you may use cookies in the browser for the `GET` requests to authorize yourself to the API. But note that this is likely to leave traces in things like your history, if accessing the API through a browser.

Using below Api route.

```http
GET :  /v1/auth/loginUsingGetAPI?email=[email]&password=[password]
```

### In headers

```http
jwt :  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWI4NGQ2YzNmOGIwMDc1ZGRmYzhmYTAiLCJpYXQiOjE1ODkxMzY3NjJ9.
```

<!-- | Parameter | Type | Description |
| :--- | :--- | :--- |
| `jwt` | `string` | **Required**. JWT Token | -->

## Availaible Routes

### register

```http
POST /v1/auth/register
```

| Parameter  | Type     | Description                           |
| :--------- | :------- | :------------------------------------ |
| `email`    | `string` | **Required**. The valid email address |
| `password` | `string` | **Required**. 8 digit password        |
| `name`     | `string` | **Optional**. The Name                |

#### Responses

```javascript
{
    "_id": String,
    "email": String,
    "name": String,
    "createdAt": Date,
    "updatedAt": Date,
}
```

### login

```http
POST /v1/auth/login
```

| Parameter  | Type     | Description                           |
| :--------- | :------- | :------------------------------------ |
| `email`    | `String` | **Required**. The valid email address |
| `password` | `String` | **Required**. 8 digit password        |

#### Response

```javascript
{
    "user": {
        "id": String,
        "email": String,
        "name": String
    },
    "token": String
}
```

### user/

```http
GET /v1/user/
```

Getting the user details.

#### Response

```javascript
{
    "result": {
        "id": String,
        "email": String,
        "name": String
    }
}
```
