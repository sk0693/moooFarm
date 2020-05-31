# Introduction

This project is build for handling the files operation and storage. The apis is build by which `User` can upload the file(s) and see the all upload files with authorization. Also it can generate the `tiny url` by which user can give access the upload files to public.

## Installing

1. Clone the repository using :

```bash
git clone https://github.com/sk0693/crud-operation-on-file.git
```

2. Change the repository directory :

```bash
cd moooFarm
```

3. Install the needed node packges/modules :

```bash
npm install
```

4. Start the development server :

```bash
npm start
```

# Availaible Routes

### Create New service

```http
POST /v1/mfs/createMFService
```

| Parameter     | Type     | Description                            |
| :------------ | :------- | :------------------------------------- |
| `serviceName` | `string` | **Required**. The valid Service Name   |
| `price`       | `Number` | **Required**. The price of service     |
| `description` | `string` | **Optional**. Description              |
| `discount`    | `Number` | **Optional**. Discount on this service |

## Authorization

All API requests require the use of a generated Authorization Token `(JWT)`. You have to register and then login the application using `register` and `login` routes respectively. These APIs is not required the jwt token.

To authenticate an API request, you should provide your API(Token) key in the `Authorization` header.

Alternatively, you may use cookies in the browser for the `GET` requests to authorize yourself to the API. But note that this is likely to leave traces in things like your history, if accessing the API through a browser.

### In headers

```http
Authorization :  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWI4NGQ2YzNmOGIwMDc1ZGRmYzhmYTAiLCJpYXQiOjE1ODkxMzY3NjJ9.
```

### register

```http
POST /v1/auth/register
```

| Parameter  | Type     | Description                           |
| :--------- | :------- | :------------------------------------ |
| `email`    | `string` | **Required**. The valid email address |
| `password` | `string` | **Required**. 8 digit password        |
| `name`     | `string` | **Optional**. The Name                |

### login

```http
POST /v1/auth/login
```

| Parameter  | Type     | Description                           |
| :--------- | :------- | :------------------------------------ |
| `email`    | `String` | **Required**. The valid email address |
| `password` | `String` | **Required**. 8 digit password        |

### Deposit Amount

```http
POST /v1/wallet/deposit
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `amount`  | `Number` | **Required**. The valid Amount |

#### Response

```javascript
{
    "deposit": 400,
    "bonus": 503,
    "winnings": 20
}
```

### Avail Service

```http
POST /v1/user/availService
```

| Parameter   | Type     | Description                                 |
| :---------- | :------- | :------------------------------------------ |
| `serviceId` | `String` | **Required**. The valid Service Id to avail |

#### Response

```javascript
{
    "result": "Congratulations the service has been activated !!",
    "old_wallet": {
        "total": 500,
        "wallet": {
            "deposit": 100,
            "bonus": 60,
            "winnings": 340
        }
    },
    "new_wallet": {
        "total": 180,
        "wallet": {
            "deposit": 0,
            "bonus": 28,
            "winnings": 152
        }
    }
}
```
