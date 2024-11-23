import { create } from "zustand";

const useBoardStore = create((set) => ({
  boards: [], // Lista de tareas
  listMembersStore: [], // Lista de miembros

  // Métodos para boards
  addBoard: (newBoard) => 
    set((state) => ({ boards: [...state.boards, newBoard] })), // Agregar tarea
  setBoards: (boards) => 
    set(() => ({ boards })), // Establecer todas las tareas desde la API

  // Métodos para listMembers
  // Método para establecer o agregar elementos a listMembersStore
  setListMembersStore: (newMember) =>
    set((state) => {
      // Verifica si el miembro ya está en la lista
      const exists = state.listMembersStore.some(
        (member) => member.id === newMember.id
      );

      // Si no existe, lo agrega; de lo contrario, retorna la lista sin cambios
      return exists
        ? state
        : { listMembersStore: [...state.listMembersStore, newMember] };
    }), // Establecer lista completa de miembros
  addMemberStore: (newMember) => 
    set((state) => ({ listMembers: [...state.listMembers, newMember] })), // Agregar un miembro
  removeMemberStore: (memberId) =>
    set((state) => ({
      listMembers: state.listMembers.filter((member) => member.id !== memberId),
    })), // Eliminar un miembro por su ID
}));

export default useBoardStore;
