interface Set {
  kg: number;
  reps: number;
}

interface Exercise {
  name: string;
  sets: Set[];
}

interface WorkoutProps {
  id : string,
  name?: string;
  exercises: Exercise[];
}

export default function Workout({id, name, exercises }: WorkoutProps) {
 /* const exercises = [
    { name: "Bench", sets: [{ kg: 80, reps: 6 }, { kg: 75, reps: 8 }] },
    { name: "Squat", sets: [{ kg: 100, reps: 10 }, { kg: 95, reps: 8 }] },
    { name: "Shoulder press", sets: [{ kg: 50, reps: 8 }] },
    { name: "Pushup", sets: [{ kg: 0, reps: 12 }] },
    { name: "Lat pull down", sets: [{ kg: 70, reps: 10 }] },
    { name: "Back row", sets: [{ kg: 75, reps: 8 }] },
    { name: "Bicep curl", sets: [{ kg: 25, reps: 12 }] },
    { name: "Leg extension", sets: [{ kg: 60, reps: 12 }] },
    { name: "Triceps", sets: [{ kg: 20, reps: 10 }] }
  ]; */

  return (
  
    <div className="w-full max-w-2xs rounded-lg border-2 p-4">
      <h2 className="text-lg font-bold">
        {name || "Workout"}
      </h2>

      <ul className="space-y-4 font-bold grey:lg">
        {exercises.map((exercise, index) => (
          <li
            key={index}
            className="text-yellow-600"
          >
            <div>{exercise.name}</div>
            <div className="text-xs text-white">
              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex}>
                  Set {setIndex + 1}: {set.kg}kg x {set.reps}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}