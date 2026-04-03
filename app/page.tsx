import HomeClient from "./homeClient";



export default function Home() {
  
  return (
    <div className="min-h-screen bg-zinc-50 font-sant p-3 dark:bg-black">
      <h1 className="mb-6 text-2xl font-bold">
        Training main
      </h1>

      <HomeClient />

    </div>
  );
}
