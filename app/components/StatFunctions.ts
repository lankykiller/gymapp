/*
XP CALCULATION SYSTEM:
- Base: 100 xp per level
- 20xp per session
- 2xp per added rep to exercise
- weight * 1.5xp total exercise weight
- Streak multipliers (sessions per week):
  1 session = 1.0x, 2 = 1.2x, 3 = 1.5x, 4 = 2.0x, 5+ = 2.5x
*/

interface OneSet {
  kg: number;
  reps: number;
}

interface Exercise {
  name: string;
  sets: OneSet[];
  muscleGroup: string;
}

interface Workout {
  name: string;
  exercises: Exercise[];
  createdAt?: Date;
}

interface ExerciseProgress {
  exercise: string;
  latestBestKg: number;
  latestBestReps: number;
  lowestKg: number;
  improvementKg: number;
}

export function calculateWorkoutXP(workout: Workout, streakMultiplier: number = 1.0): number {
  let xp = 20; 

  workout.exercises.forEach((exercise) => {
    const totalReps = exercise.sets.reduce((sum, set) => sum + set.reps, 0);
    const totalWeight = exercise.sets.reduce((sum, set) => sum + set.kg, 0);

    xp += totalReps * 2;
    xp += totalWeight * 1.5;
   
  });

  return Math.round(xp * streakMultiplier);
}

function getStreakMultiplier(sessionsPerWeek: number): number {
  if(sessionsPerWeek < 1){
    return 0
  } else if (sessionsPerWeek == 1){
    return 1.0;
  } else if (sessionsPerWeek == 2){
    return 1.2;
  } else if (sessionsPerWeek == 3){
    return 1.5;
  } else if (sessionsPerWeek == 4){
    return 2.0;
  } else {
    return 2.5;
  } 
}

export function calculateWorkoutFrequency(workouts: Workout[]): number {
  if (workouts.length === 0) return 0;
  if (!workouts[0].createdAt) return 0;

  const dateRange = Math.max(
    1,
    (new Date().getTime() - new Date(workouts[0].createdAt).getTime()) / (1000 * 60 * 60 * 24 * 7)
  );
  return Math.round((workouts.length / dateRange) * 10) / 10;
}


function calculatePerformancePerMuscle(workouts: Workout[]): ExerciseProgress[] {
  const exerciseData = new Map<
    string,
    {
      lowestKg: number;
      latestWorkoutTime: number;
      latestBestKg: number;
      latestBestReps: number;
    }
  >();

  workouts.forEach((workout) => {
    const workoutTime = workout.createdAt ? new Date(workout.createdAt).getTime() : 0;

    workout.exercises.forEach((exercise) => {

      const bestSet = exercise.sets.reduce((best, set) =>
        set.kg > best.kg ? set : best
      );

      if (!exerciseData.has(exercise.name)) {
        exerciseData.set(exercise.name, {
          lowestKg: bestSet.kg,
          latestWorkoutTime: workoutTime,
          latestBestKg: bestSet.kg,
          latestBestReps: bestSet.reps,
        });
      }

      const entry = exerciseData.get(exercise.name)!;

      exercise.sets.forEach((set) => {
        if (set.kg < entry.lowestKg) {
          entry.lowestKg = set.kg;
        }
      });

      if (workoutTime >= entry.latestWorkoutTime) {
        entry.latestWorkoutTime = workoutTime;
        entry.latestBestKg = bestSet.kg;
        entry.latestBestReps = bestSet.reps;
      }
    });
  });

  return Array.from(exerciseData.entries()).map(([exercise, data]) => ({
    exercise,
    latestBestKg: data.latestBestKg,
    latestBestReps: data.latestBestReps,
    lowestKg: data.lowestKg,
    improvementKg: data.latestBestKg - data.lowestKg,
  }));
}

function muscleGroupsLastMonth(workouts: Workout[]) {
  const result: Record<string, number> = {};
  const now = new Date();
  const lastMonth = new Date(now);
  lastMonth.setMonth(now.getMonth() - 1);

  workouts.forEach((workout) => {
    if (!workout.createdAt) return;

    if (workout.createdAt >= lastMonth) {
      workout.exercises.forEach((exercise) => {
        const muscle = exercise.muscleGroup;

        if (!result[muscle]) result[muscle] = 0;
        result[muscle]++;
      });
    }
  });

  return result;
}

function muscleGroupsAllTime(workouts: Workout[]) {
  const result: Record<string, number> = {};

  workouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      const muscle = exercise.muscleGroup;

      if (!result[muscle]) result[muscle] = 0;
      result[muscle]++;
    });
  });

  return result;
}

function muscleGroupsPerWeek(workouts: Workout[]) {
  const result: Record<string, Record<string, number>> = {};

  workouts.forEach((workout) => {
    if (!workout.createdAt) return;

    const date = new Date(workout.createdAt);
    const weekKey = `${date.getFullYear()}-W${Math.ceil(
      ((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) /
        86400000 +
        new Date(date.getFullYear(), 0, 1).getDay() +
        1) /
        7
    )}`;

    if (!result[weekKey]) result[weekKey] = {};

    workout.exercises.forEach((exercise) => {
      const muscle = exercise.muscleGroup;

      if (!result[weekKey][muscle]) result[weekKey][muscle] = 0;
      result[weekKey][muscle]++;
    });
  });

  return result;
}


function getWorkoutStats(workouts: Workout[]) {
  return {
    totalWorkouts: workouts.length,
    workoutFrequency: calculateWorkoutFrequency(workouts),
    performancePerMuscle: calculatePerformancePerMuscle(workouts),
  };
}
