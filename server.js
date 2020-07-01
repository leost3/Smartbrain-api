const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'smart-brain',
    }
})


const app = express()
// parse data sent from frontend
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => res.send(database.users))

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db))

app.put('/image', (req, res) => image.getImage(req, res, db));
app.put('/imageUrl', (req, res) => image.handleApiCall(req, res));


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`app is running on port ${PORT}`))


console.log(PORT)