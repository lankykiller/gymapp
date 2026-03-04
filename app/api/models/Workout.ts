import mongoose, { Schema } from "mongoose";

const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  sets: [
    {
      reps: Number,
      weight: Number,
    },
  ],
});


const WorkoutSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
  exercises: [ExerciseSchema],
}, { timestamps: true });

const Workout = mongoose.model("Workout", WorkoutSchema);

export default Workout;