import { create } from "zustand";

const useBoardStore = create((set) => ({
  boards: [], // Lista de tareas
  addBoard: (newBoard) => 
    set((state) => ({ boards: [...state.boards, newBoard] })), // Agregar tarea
  setBoards: (boards) => 
    set(() => ({ boards })), // Establecer todas las tareas desde la API
}));
export default useBoardStore;