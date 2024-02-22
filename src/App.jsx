import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import TaskModal from "./components/task-modal";
import { toast } from "sonner";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  // * Fetch all tasks
  const fetchTask = async () => {
    try {
      const res = await fetch("http://localhost:8000/tasks/");
      // console.log(res);
      const data = await res.json();
      // console.log(data);
      setTasks(data?.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(tasks);

  //  * Delete a task
  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success("Task Deleted Succesfully");
        fetchTask();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // * Add a task
  const handleAddTask = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/tasks/", data);
      console.log(res.data);
      if (res?.data.success) {
        toast.success("Added task succesfully");
      }
      fetchTask();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <main className="mt-10 p-8">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <header className="text-4xl font-semibold text-center flex-col  md:flex items-center gap-6 justify-center">
        Todo Application
        <TaskModal handleAddTask={handleAddTask} />
      </header>
      <section className="py-5 flex flex-wrap justify-center gap-10">
        {tasks.length > 0 ? (
          tasks?.map((ele) => (
            <Todo handleDeleteTask={handleDeleteTask} {...ele} />
          ))
        ) : (
          <h1>No Tasks found</h1>
        )}
      </section>
    </main>
  );
}

export default App;
