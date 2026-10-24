/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/Register.tsx

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { type Session } from "@supabase/supabase-js";

export default function TaskManager({ session }: { session: Session }) {
const [newTask, setNewTask] = useState({ title: "", description: "" });
const [tasks, setTasks] = useState<any[]>([]);
const [newTitle, setNewTitle] = useState("");
const [newDescription, setNewDescription] = useState("");
const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: true });
    if (error) {
        console.error("Error fetching tasks:", error);
        return;
    } else {
        console.log("Tasks:", data);
    }
    setTasks(data );
}
useEffect(() => {
    fetchTasks();
}, [])
console.log("Tasks in state:", tasks);
const handleSubmit = async (e: any) => {
    e.preventDefault();
    const {error} = await supabase.from("tasks").insert({ ...newTask, email: session.user.email }).single();
    if (error) {
        console.error("Error adding task:", error);
        return;
    }
    setNewTask({ title: "", description: "" });
}
const deleteTask = async (id: number) => {
    //eq()=> add opeartions
    const {error} = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
        console.error("Error deleting task:", error);
        return;
    }
    setNewTask({ title: "", description: "" });
}
const editTask = async (id: number,) => {
    //eq()=> add opeartions
    const {error} = await supabase.from("tasks").update({ title: newTitle, description: newDescription }).eq("id", id);
    if (error) {
        console.error("Error deleting task:", error);
        return;
    }
    setNewTask({ title: "", description: "" });
}
  return (
    <div>
      <h2>Task Manager</h2>
    <form onSubmit={handleSubmit}>
        <input type='text' placeholder="Title" onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
        <input type='text' placeholder="Description" onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
        <button type="submit">Add Task</button>
    </form>
    {tasks.map((task) => (
        <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <input type='text' placeholder="New Title" onChange={(e)=> setNewTitle(e.target.value)} />
            <input type='text' placeholder="New Description" onChange={(e) => setNewDescription(e.target.value)} />
            <button onClick={() => editTask(task.id)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
     )
    )}
    </div>
  );
}