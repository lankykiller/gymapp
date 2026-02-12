import Workout from "./components/Workout";
import Level from "./components/Level";

export default function Home() {
  const exercises = [
    { name: "Bench", sets: [{ kg: 80, reps: 6 }, { kg: 75, reps: 8 }] },
    { name: "Squat", sets: [{ kg: 100, reps: 10 }, { kg: 95, reps: 8 }] },
    { name: "Pushup", sets: [{ kg: 0, reps: 50 }] }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sant p-3 dark:bg-black">
        <h1 className="mb-6 text-2xl font-bold">
          Training main
        </h1>

        <Workout name="Chest Day" exercises={exercises} />

        <Level />
       
      </div>
  );
}
