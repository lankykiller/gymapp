
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const usersRouter = require('./users/route')
const workoutRouter = require('./workouts/route')


const app = express()


app.use(express.json())
app.use(cors())

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('connected to mongodb'))

app.use('/api/users', usersRouter)
app.use('/api/workouts', workoutRouter)

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})