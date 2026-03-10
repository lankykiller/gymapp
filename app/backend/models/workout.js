const mongoose = require("mongoose")

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: [
    {
      reps: Number,
      weight: Number,
    },
  ],
})

const WorkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: { type: String, required: true },
  exercises: [ExerciseSchema],
}, { timestamps: true })

const Workout = mongoose.model("Workout", WorkoutSchema)

module.exports = Workout