const handleRegister = (req, res, db, bcrypt) => {

    const { email, name, password } = req.body
    if (!email || !name || !password) return res.status(400).json('incorrect form submission')

    bcrypt.hash(password, 10).then(hash => {
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email,
            })
                .into('login')
                .returning('email')
                .then(loginemail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            email: loginemail[0],
                            name: name,
                            joined: new Date()
                        })
                        .then(user => {
                            res.json(user[0])
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
                .then(trx.commit)
                .catch(trx.rollback)
        })
            .catch(err => res.status(400).json('unable to register'))
    })
}

module.exports = {
    handleRegister
}