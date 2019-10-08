require('dotenv').config()
const express =require('express')
const massive = require('massive')
const userCtrl = require('./userController')
const session = require('express-session')
const movieCtrl = require('./moviesController')
const cors = require('cors')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app =(express())

app.use(express.json())
app.use(cors())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 60000
    }
}))


// app.get('api/movies', movieCtrl.getMovies)

app.post('/auth/register', userCtrl.register)
app.post('/auth/login', userCtrl.login)
app.post('/auth/logout', userCtrl.logout)


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)

   
})

app.listen(SERVER_PORT,() => console.log(`server live on ${SERVER_PORT} 🔥`))