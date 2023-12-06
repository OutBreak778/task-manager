"use client"

import Tasks from "./components/Tasks/Tasks";
import { useGlobalState } from "./context/GlobalProvider";

export default function Home() {

  const {tasks} = useGlobalState()

  return (
      <>
        <Tasks tasks={tasks} title="All Task" />
      </>
  )
}

