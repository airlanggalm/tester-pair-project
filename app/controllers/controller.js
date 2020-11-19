const {
    User,
    Toy,
    UserCart
} = require('../models/index')
const {
    comparePw
} = require('../helper/password')
const toy = require('../models/toy')

class Controller {
    static home(req, res) {
        let userId = req.session.userId
        let name = req.session.name
        res.render('home.ejs', {
            userId,
            name
        })
    }

    static logIn(req, res) {
        res.render('login')
    }

    static register(req, res) {
        res.render('register')
    }

    static addUser(req, res) {
        // console.log(req.body);
        let userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.findAll({
                where: {
                    email: userData.email
                }
            })
            .then(data => {
                if (data.length == 0) {
                    User.create(userData)
                        .then(_ => {
                            res.redirect('/')
                        })
                        .catch(err => {
                            res.send(err.message)
                        })
                } else {
                    res.send('EMAIL SUDAH TERDAFTAR')
                }
            })

    }

    static cekLogIn(req, res) {
        const email = req.body.email
        const password = req.body.password

        User.findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                if (user && comparePw(password, user.password)) {
                    req.session.userId = user.id
                    req.session.name = user.name
                    res.redirect('/')
                } else {
                    res.send('invalid username or password')
                }
            })
            .catch(err => {
                res.send(err.message)
            })
    }

    static logOut(req, res) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                // req.end();
                res.redirect('/');
            }
        });
    }

    static showToys(req, res) {
        Toy.findAll()
            .then((data) => {
                // console.log(req.session);
                res.render("toys", {
                    data
                })
            })
            .catch(err => {
                res.send(err.message)
            })

    }

    static buyToys(req, res) {
        let dataToy
        Toy.findByPk(+req.params.id)
            .then(data => {
                dataToy = data
                let toy = {
                    userId: req.session.userId,
                    toyId: dataToy.id,
                    quantity: 1,
                    total: dataToy.price
                }
                return UserCart.create(toy)
            })
            .then(_ => {
                // console.log(req.session);
                return User.findAll({
                    where: {
                        id: req.session.userId
                    },
                    include: {
                        model: UserCart,
                        where: {
                            userId: req.session.userId
                        },
                        include: {
                            model: Toy
                        }

                    }
                })
                // .then(data => {
                //     // console.log(data[0].UserCarts[0].Toy);
                // })
                // .catch(err => {})
            })
            .then(data => {
                // console.log(data1[0].UserCarts[0].Toy.id);
                let toy = data[0].UserCarts
                // console.log(toy);
                // console.log(data);
                // res.send(data[0].UserCarts)
                res.render("buys", {
                    data: toy
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static thanks(req, res) {
        res.render('thanks')
    }

    static delOrder(req, res) {
        UserCart.destroy({
                where: {
                    id: +req.params.id
                }
            })
            .then(_ => {
                res.redirect('/toys')
            })
            .catch(err => {
                res.send(err.message)
            })
    }

    static decrementToy(req, res) {
        console.log(req.params.id);
        Toy.decrement('stock', {
                where: {
                    id: +req.params.id
                }
            })
            .then(data => {
                res.redirect('/toys')
            })
            .catch(err => {
                res.send(err.message)
            })
    }
}

module.exports = Controller