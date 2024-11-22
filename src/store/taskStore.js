import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [], // Lista de tareas
  addTask: (newTask) => 
    set((state) => ({ tasks: [...state.tasks, newTask] })), // Agregar tarea
  setTasks: (tasks) => 
    set(() => ({ tasks })), // Establecer todas las tareas desde la API
}));
export default useTaskStore;
