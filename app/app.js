const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const router = require('./routes/index')
const session = require('express-session')

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))
app.use(session({
    secret: 'pair-project',
    resave:false,
    saveUninitialized: true
}))

app.use(router)

app.listen(port, ()=>{
    console.log('listen on port', port);
})
