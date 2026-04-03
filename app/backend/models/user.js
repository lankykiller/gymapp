const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  level: { type: Number, default: 1 },
  passwordHash: {type: String},
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
}, { timestamps: true });

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User

