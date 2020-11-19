const router = require('express').Router()
const Controller = require('../controllers/controller')

const isLogIn = (req, res, next) => {
    if(req.session.userId){
        next()
    } else{
        res.redirect('/login')
    }
}

router.get('/', Controller.home)

router.get('/login', Controller.logIn)
router.post('/login', Controller.cekLogIn)

router.get('/register', Controller.register)
router.post('/register', Controller.addUser)

router.use(isLogIn)
router.get('/toys', Controller.showToys)
router.get('/toys/buy/:id', Controller.buyToys )
router.get('/thanks', Controller.thanks)
router.get('/logout', Controller.logOut)
router.get('/toys/delete/:id', Controller.delOrder)
router.get('/thanks/:id', Controller.decrementToy)

module.exports = router