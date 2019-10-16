require('dotenv').config()
const express =require('express')
const massive = require('massive')
const userCtrl = require('./userController')
const session = require('express-session')
const profCtrl = require('./profileController')
const cors = require('cors')
const axios = require('axios')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const {apiKey} = require('../src/config')

const app =(express())

app.use(express.json())
app.use(cors())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 60000 * 10
    }
}))


// app.get('', profCtrl.getMovies)
app.get('/api/popularMovies', (req, res, next) => {
    axios.get(`http://api.themoviedb.org/3/movie/popular${apiKey}`).then(response => {
        res.status(200).send(response.data)
    })
})
// app.get('/auth/users', userCtrl.getUser)


app.post('/auth/register', userCtrl.register)
app.post('/auth/login', userCtrl.login)
app.delete('/auth/logout', userCtrl.logout)
// app.post('/user/profile', profCtrl.profile)

app.put('/auth/user/:id', profCtrl.updateProfile)


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)

   
})

app.listen(SERVER_PORT,() => console.log(`server live on ${SERVER_PORT} 🔥`))
