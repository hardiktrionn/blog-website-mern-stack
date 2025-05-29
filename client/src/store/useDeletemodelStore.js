// modalStore.js
import { create } from "zustand";

const useDeletemodelStore = create((set) => ({
  isDeleteModalOpen: false,
  itemToDelete: null,
  openDeleteModal: (itemToDelete) => set({ isDeleteModalOpen: true, itemToDelete }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false, itemToDelete: null }),
}));

export default useDeletemodelStore;
