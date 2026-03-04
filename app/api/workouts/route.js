const workouts = require("../../../models/Workout");
const User = require("../../../models/User");
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

workoutRouter.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const userWorkouts = await workouts.find({ user: userId }).populate("user", "username");
        res.json(userWorkouts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch workouts" });
    }
});

export default workoutRouter;   

