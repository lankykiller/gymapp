const workouts = require("../models/workout");
const User = require("../models/user");
const workoutRouter = require("express").Router();


workoutRouter.post("/", async (req, res) => {
    const { userId, name, exercises } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const workout = new workouts({
            user: user._id,
            name,
            exercises,
        });

        const savedWorkout = await workout.save();
        user.workouts.push(savedWorkout._id);
        await user.save();
        res.status(201).json(savedWorkout);

    } catch (error) {
        res.status(500).json({ error: "Failed to create workout" });
    }
});

workoutRouter.get("/", async (req, res) => {
    //const { userId } = req.params;
    try {
        const userWorkouts = await workouts.find()
        //populate("user", "username");
        res.json(userWorkouts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch workouts" });
    }
});

workoutRouter.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const userWorkouts = await workouts
            .find({ user: userId })
            .populate("user", "username");
        res.json(userWorkouts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch workouts" });
    }
});

workoutRouter.put("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const updatedWorkout = await workouts.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        ).populate("user", "username");

        if (!updatedWorkout) {
            return res.status(404).json({ error: "Workout not found" });
        }

        res.json(updatedWorkout);
    } catch (error) {
        res.status(500).json({ error: "Failed to update workout" });
    }
});

workoutRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedWorkout = await workouts.findByIdAndDelete(id);

        if (!deletedWorkout) {
            return res.status(404).json({ error: "Workout not found" });
        }

        res.json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete workout" });
    }
});

module.exports = workoutRouter

