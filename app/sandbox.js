const {
    User,
    Toy,
    UserCart
} = require('./models')
const {
    Op
} = require('sequelize')

let obj = {
    "id": 4,
    "userId": 1,
    "toyId": 2,
    "quantity": 1,
    "total": 100000,
    "createdAt": "2020-11-19T17:33:12.106Z",
    "updatedAt": "2020-11-19T17:33:12.106Z",
    "Toy": {
      "id": 2,
      "name": "beyblade",
      "stock": 33,
      "color": "red",
      "company": "beyblade incorporated",
      "price": 100000,
      "createdAt": "2020-11-19T17:27:21.988Z",
      "updatedAt": "2020-11-19T17:27:21.988Z"
    }}

    console.log(obj.Toy.name);