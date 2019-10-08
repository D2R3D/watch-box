const bcrypt = require('bcryptjs')

   const register = async (req,res) => {
    const db = req.app.get('db')
    const {username, email, password, profile_pic} = req.body
    const foundUser = await db.find_user(email)
    if (foundUser[0]) {
        return res.status(409).send({ message: 'sorry Email email already in use'})
    }

    const salt = bcrypt.genSaltSync(15)
    const hashPass = bcrypt.hashSync(password, salt)
    const newUser = await db.register_user([username, email, hashPass, profile_pic])
    const user = newUser[0]
    req.session.user = {user}
    res.status(200).send({message: `Welcome back ${username}`, user: req.session.user, loggedIn: true})
}

    const login = async (req, res) => {
        const db = req.app.get('db')
        const {email, password} = req.body
        const foundUser = await db.find_user(email)

        if (!foundUser[0]) {
            return res.status(403).send({message:'Email not found please register'})
            }

        const authedPassword = bcrypt.compareSync(password, foundUser[0].password)

        if (!authedPassword) return res.status(200).send({message: "Password incorrect"})

        if(authedPassword) {
            delete foundUser[0].password
            const {username, email} = foundUser[0]
            const user = foundUser[0]
            req.session.user = {user}
            
            res.status(200).send({message: `welcome ${username}`, user: req.session.user, loggedIn: true})
        } else {
            res.status(401).send({message: 'username or password incorrect'})
        }
    }

    const logout = (req, res) => {
        req.session.destroy();
        res.status(200).send({message: `Goodbye`,loggedIn: false})
    }


module.exports = {
    register,
    login, 
    logout
}