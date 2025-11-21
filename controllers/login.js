const jwt = require('jsonwebtoken')
const bycrpt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { DB_SECRET } = require('../utils/config')



loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne( { username } )
  const passwordCorrect = user === null ? false : await bycrpt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) return response.status(401).json({
    error: 'invalid username or password'
  })

  const userInfoForToken = {
    username: user.username,
    id: user._id,
  }

  const tokenExpiration = { expiresIn: 60 * 60 }

  const token = jwt.sign( userInfoForToken, DB_SECRET, tokenExpiration )

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = { loginRouter }