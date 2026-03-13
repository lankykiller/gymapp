import { calculateWorkoutFrequency} from "./StatFunctions";

function createWorkout(date? : Date) {
    return {
        name: "Test Workout",
        createdAt: date instanceof Date ? date : undefined,
        exercises: []
    };
}

interface Exercise {
  name: string;
  sets: OneSet[];
  muscleGroup: string;
}

interface OneSet {
  kg: number;
  reps: number;
}

interface Workout {
  name: string;
  exercises: Exercise[];
  createdAt?: Date;
}

//funtion workoutExercise()


describe("calculateWorkoutFrequency", () => {

    test("returns 0 if no workouts", () => {
        const result = calculateWorkoutFrequency([]);
        expect(result).toBe(0);
    });

    test("returns 0 if workout has no createdAt", () => {
        const workouts = [
            createWorkout()
        ]
        const result = calculateWorkoutFrequency(workouts);
        expect(result).toBe(0);
    });

     test("ones a week", () => {
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        const now = new Date();

        const workouts = [
            createWorkout(twoWeeksAgo),
            createWorkout(now),
        ];

        const result = calculateWorkoutFrequency(workouts);

        expect(result).toBe(1)
    });

    test("two times a week", () => {
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        const now = new Date();

        const workouts = [
            createWorkout(twoWeeksAgo),
            createWorkout(twoWeeksAgo),
            createWorkout(now),
            createWorkout(now)
        ];

        const result = calculateWorkoutFrequency(workouts);

        expect(result).toBe(2)
    });

});


