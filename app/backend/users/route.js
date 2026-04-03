const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
require('../models/workout')

usersRouter.post('/', async (req, res) => {
  const { username, password, level } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    level,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('workouts');
  res.json(users);
});

module.exports = usersRouter