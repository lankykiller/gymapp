"use client";

import { useEffect, useState } from "react";
import type { WorkoutData, UserData } from "./lib/types";
import Workout from "./components/Workout";
import Level from "./components/Level";

export default function HomeClient() {
    const [workouts, setWorkouts] = useState<WorkoutData[]>([]);
    const [user, setUser] = useState<UserData>()
    const userId = "69cf766659edf9b558bff490";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [workoutsRes, userRes] = await Promise.all([
                    fetch(`http://localhost:3003/api/workouts/${userId}`),
                    fetch(`http://localhost:3003/api/users/${userId}`)
                ]);

                const workoutsData = await workoutsRes.json();
                const userData = await userRes.json();

                setWorkouts(workoutsData);
                setUser(userData);
            } catch (err) {
                console.error("Failed to fetch data", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {workouts.map((workout) => (
                <Workout
                    key={workout._id}
                    id={workout._id}
                    name={workout.name || "Workout"}
                    exercises={workout.exercises || []}
                />
            ))}
        <Level level={user?.level || 0}/>
        </div>
    );
}

      //