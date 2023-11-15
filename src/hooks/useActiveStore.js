import { create } from 'zustand';

const useActiveStore = create((set) => ({
  members: [],
  add: (id) =>
    set((state) => {
      if (state.members.includes(id)) {
        return state.members;
      }
      return {
        members: [...state.members, id]
      };
    }),
  remove: (id) =>
    set((state) => ({
      members: state.members.filter((memberId) => memberId !== id)
    })),
  set: (ids) => set({ members: ids })
}));

export default useActiveStore;
