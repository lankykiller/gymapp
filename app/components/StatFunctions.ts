/*
XP CALCULATION SYSTEM:
- Base: 100 xp per level
- 20xp per session
- 2xp per  rep to exercise
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


export function calculateWorkoutXP(workout: Workout, streakMultiplier: number): number {

  let xp = 0;

  workout.exercises.forEach((exercise) => {
    const totalReps = exercise.sets.reduce((sum, set) => sum + set.reps, 0);
    const totalWeight = exercise.sets.reduce((sum, set) => sum + set.kg, 0);

    xp += totalReps * 2;
    xp += totalWeight * 1.5;

  });

  streakMultiplier = getStreakMultiplier(streakMultiplier)

  if (xp > 0) {
    xp += 20;
  }

  return Math.round(xp * streakMultiplier);
}

function getStreakMultiplier(sessionsPerWeek: number): number {
  if (sessionsPerWeek < 1) {
    return 0
  } else if (sessionsPerWeek == 1) {
    return 1.0;
  } else if (sessionsPerWeek == 2) {
    return 1.2;
  } else if (sessionsPerWeek == 3) {
    return 1.5;
  } else if (sessionsPerWeek == 4) {
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


export function calculatePerformancePerMuscle(workouts: any[]) {
  const exerciseData = new Map<
    string,
    {
      lowestKg: number;
      bestKg: number;
      bestReps: number;
    }
  >();

  workouts.forEach((workout) => {
    workout.exercises.forEach((exercise: Exercise) => {
      const name = exercise.name.toLowerCase().trim();

      const bestSet = exercise.sets.reduce((best, set) =>
        set.kg > best.kg ? set : best
      );

      if (!exerciseData.has(name)) {
        exerciseData.set(name, {
          lowestKg: bestSet.kg,
          bestKg: bestSet.kg,
          bestReps: bestSet.reps,
        });
      }

      const entry = exerciseData.get(name)!;

      exercise.sets.forEach((set) => {
        if (set.kg < entry.lowestKg) {
          entry.lowestKg = set.kg;
        }
      });

      if (bestSet.kg > entry.bestKg) {
        entry.bestKg = bestSet.kg;
        entry.bestReps = bestSet.reps;
      }
    });
  });

  return Array.from(exerciseData.entries()).map(([exercise, data]) => ({
    exercise,
    bestKg: data.bestKg,
    bestReps: data.bestReps,
    lowestKg: data.lowestKg,
    improvementKg: data.bestKg - data.lowestKg,
  }));
}

export function muscleGroupsCurrentMonth(workouts: Workout[]) {
  const result: Record<string, number> = {};
  const now = new Date();
  const lastMonth = new Date(now);
  lastMonth.setMonth(now.getMonth());
  //console.log("lastMonth:", lastMonth);

  workouts.forEach((workout) => {
    //console.log("workoutsdate", workout.createdAt)
    if (!workout.createdAt) return;
    if (workout.createdAt >= lastMonth) {
      //console.log("inside");
      workout.exercises.forEach((exercise) => {
        const muscle = exercise.muscleGroup.toLocaleLowerCase();
        console.log("exercise:", exercise);
        if (!result[muscle]) result[muscle] = 0;
        result[muscle]++;
      });
    }
  });
  //console.log("result:", result);
  return result;
}

export function muscleGroupsAllTime(workouts: Workout[]) {
  const result: Record<string, number> = {};

  workouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      const muscle = exercise.muscleGroup.toLocaleLowerCase().trim();

      if (!result[muscle]) result[muscle] = 0;
      result[muscle]++;
    });
  });

  return result;
}

export function muscleGroupsPerWeek(workouts: Workout[]) {
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
      const muscle = exercise.muscleGroup.toLocaleLowerCase().trim();

      if (!result[weekKey][muscle]) result[weekKey][muscle] = 0;
      result[weekKey][muscle]++;
    });
  });
  console.log("results", result)

  return result;
}


