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

function calculateSetVolume(set: OneSet): number {
  return set.kg * set.reps;
}

function calculateExerciseVolume(exercise: Exercise): number {
  return exercise.sets.reduce((total, set) => total + calculateSetVolume(set), 0);
}

function calculateWorkoutVolume(workout: Workout): number {
  return workout.exercises.reduce((total, exercise) => total + calculateExerciseVolume(exercise), 0);
}

function calculateWorkoutXP(workout: Workout, streakMultiplier: number = 1.0): number {
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
  if (sessionsPerWeek == 1){
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

function calculatePerformancePerMuscle(workouts: Workout[]): { [key: string]: number } {
  const muscleData: { [key: string]: { volume: number; count: number } } = {};

  workouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      const muscle = exercise.muscleGroup;
      const volume = calculateExerciseVolume(exercise);

      if (!muscleData[muscle]) {
        muscleData[muscle] = { volume: 0, count: 0 };
      }
      muscleData[muscle].volume += volume;
      muscleData[muscle].count += 1;
    });
  });

  const result: { [key: string]: number } = {};
  for (const [muscle, data] of Object.entries(muscleData)) {
    result[muscle] = Math.round(data.volume / data.count); // Average volume
  }
  return result;
}

function calculatePerformancePerExercise(workouts: Workout[]): { [key: string]: number } {
  const exerciseData: { [key: string]: number } = {};

  workouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      const volume = calculateExerciseVolume(exercise);
      exerciseData[exercise.name] = (exerciseData[exercise.name] || 0) + volume;
    });
  });

  return exerciseData;
}

function calculateTotalVolumePerMonth(workouts: Workout[]): number {
  return workouts.reduce((total, workout) => total + calculateWorkoutVolume(workout), 0);
}

function calculateExercisesPerMusclePerMonth(workouts: Workout[]): { [key: string]: number } {
  const muscleCount: { [key: string]: number } = {};

  workouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      const muscle = exercise.muscleGroup;
      muscleCount[muscle] = (muscleCount[muscle] || 0) + 1;
    });
  });

  return muscleCount;
}

function calculateWorkoutFrequency(workouts: Workout[]): number {
  if (workouts.length === 0) return 0;
  if (!workouts[0].createdAt) return 0;

  const dateRange = Math.max(
    1,
    (new Date().getTime() - new Date(workouts[0].createdAt).getTime()) / (1000 * 60 * 60 * 24 * 7)
  );
  return Math.round((workouts.length / dateRange) * 10) / 10;
}

//Stat functions
 
function getWorkoutStats(workouts: Workout[]) {
  return {
    totalWorkouts: workouts.length,
    totalVolume: calculateTotalVolumePerMonth(workouts),
    workoutFrequency: calculateWorkoutFrequency(workouts),
    performancePerMuscle: calculatePerformancePerMuscle(workouts),
    performancePerExercise: calculatePerformancePerExercise(workouts),
    exercisesPerMuscle: calculateExercisesPerMusclePerMonth(workouts),
  };
}
