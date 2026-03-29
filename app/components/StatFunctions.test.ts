import { calculateWorkoutFrequency, calculateWorkoutXP, calculatePerformancePerMuscle, muscleGroupsCurrentMonth, muscleGroupsPerWeek } from "./StatFunctions";

function createWorkout(date?: Date) {
    return {
        name: "Test Workout",
        createdAt: date instanceof Date ? date : undefined,
        exercises: []
    };
}

function createWorkExer() {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    return {
        name: "test workout",
        createdAt: twoWeeksAgo,
        exercises: [
            {
                name: "bench press",
                muscleGroup: "Chest",
                sets: [
                    { kg: 70, reps: 8 },
                    { kg: 70, reps: 8 },
                    { kg: 70, reps: 6 }
                ]
            },
            {
                name: "squat",
                muscleGroup: "Legs",
                sets: [
                    { kg: 80, reps: 10 },
                    { kg: 80, reps: 8 },
                    { kg: 80, reps: 6 }
                ]
            },
            {
                name: "chest press",
                muscleGroup: "Chest",
                sets: [
                    { kg: 90, reps: 8 },
                    { kg: 90, reps: 8 },
                    { kg: 90, reps: 6 }
                ]
            },

        ]
    }
}

function createWorkExer2() {

    const now = new Date();
    return {
        name: "test workout",
        createdAt: now,
        exercises: [
            {
                name: "Bench Press",
                muscleGroup: "Chest",
                sets: [
                    { kg: 70, reps: 10 },
                    { kg: 70, reps: 8 },
                    { kg: 75, reps: 6 }
                ]
            },
            {
                name: "Squat",
                muscleGroup: "Legs",
                sets: [
                    { kg: 70, reps: 10 },
                    { kg: 70, reps: 8 },
                    { kg: 70, reps: 6 }
                ]
            }

        ]
    }
}

function createWorkExer3() {
    const now = new Date();
    now.setDate(now.getDate());
    return {
        name: "test workout",
        createdAt: now,
        exercises: [
            {
                name: "bench press",
                muscleGroup: "chest",
                sets: [
                    { kg: 70, reps: 8 },
                    { kg: 70, reps: 8 },
                    { kg: 70, reps: 6 }
                ]
            },
            {
                name: "squat",
                muscleGroup: "Legs",
                sets: [
                    { kg: 80, reps: 10 },
                    { kg: 80, reps: 8 },
                    { kg: 80, reps: 6 }
                ]
            },
            {
                name: "chest press",
                muscleGroup: "Chest",
                sets: [
                    { kg: 90, reps: 8 },
                    { kg: 90, reps: 8 },
                    { kg: 90, reps: 6 }
                ]
            },

        ]
    }
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


describe("calculateWorkoutXP", () => {

    test("three exercises", () => {

        const workout = createWorkExer();
        const streakMultiplier = 1;

        const result = calculateWorkoutXP(workout, streakMultiplier)

        expect(result).toBe(1236)
    });

    test("two exercises with streak 3", () => {

        const workout = createWorkExer();
        const streakMultiplier = 3;

        const result = calculateWorkoutXP(workout, streakMultiplier)

        expect(result).toBe(1854)
    });


    test("empty workout", () => {

        const workout = createWorkout();
        const streakMultiplier = 1;

        const result = calculateWorkoutXP(workout, streakMultiplier)

        expect(result).toBe(0)
    });

});

describe("calculatePerformancePerMuscle", () => {

    //one test for all :(
    test("performancePerMuscle", () => {

        const workout = createWorkExer();
        const workout2 = createWorkExer2();
        const workouts = [workout, workout2]

        const result = calculatePerformancePerMuscle(workouts)

        expect(result).toEqual([
            {
                exercise: "bench press",
                bestKg: 75,
                bestReps: 6,
                lowestKg: 70,
                improvementKg: 5,
            },
            {
                exercise: "squat",
                bestKg: 80,
                bestReps: 10,
                lowestKg: 70,
                //not real improvement as best was before
                improvementKg: 0 || 10,
            },
            {
                exercise: "chest press",
                bestKg: 90,
                bestReps: 8,
                lowestKg: 90,
                improvementKg: 0,
            },
        ]);
    });

});

describe("muscleGroupLastMonth", () => {

    test("muscleGroupOneTime", () => {

        const workout = createWorkExer3();
        const workout2 = createWorkExer2();
        const workouts = [workout, workout2]

        const result = muscleGroupsCurrentMonth(workouts)

        expect(result).toEqual({
            chest: 3,
            legs: 2,
        });
    });

});

describe("muscleGroupPerYearAlltime", () => {

    test("muscleGroupPerWeek", () => {

        const workout3 = createWorkExer()
        const workout = createWorkExer3();
        const workout2 = createWorkExer2();
        const workouts = [workout, workout2, workout3]

        const result = muscleGroupsPerWeek(workouts)

        expect(result).toEqual({
            "2026-W12": {
                chest: 2, 
                legs: 1,
            },
            "2026-W14": {
                chest: 3,
                legs: 2,
            },
        });
    });

});





