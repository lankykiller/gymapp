export type WorkoutSet = {
  kg: number;
  reps: number;
};

export type Exercise = {
  name: string;
  sets: WorkoutSet[];
};

export type WorkoutData = {
  _id: string; 
  name?: string;
  exercises: Exercise[];
};

export type UserData = {
    _id: string;
    level?: number;
}