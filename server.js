const express = require('express')

const app = express()
// parse data sent from frontend
app.use(express.json())

const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})


app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {

        res.json('success')
    } else {
        res.status(400).json('error login')
    }
})


app.post('/register', (req, res) => {
    const { email, name, password } = req.body
    if (email !== database.users[0].email) {
        database.users.push({
            id: '125',
            name,
            email,
            password,
            entries: 0,
            joined: new Date()
        })
        res.json(database.users[database.users.length - 1])
    } else {
        res.status(404).send('email already exists')
    }
})


app.get('/profile/:id', (req,res) => {
    const {id} = req.params
    const user = database.users.filter(user => user.id === id)

    res.json(user)
})

app.put('/image', (req, res) => {
  
    const {id} = req.body
    const [user] = database.users.filter(user => user.id === id)
    console.log(user)
    user.entries ++
    res.json(user.entries)
})

app.listen('3002', () => {
    console.log('app is running on port 3000')
})
