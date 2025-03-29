import { create } from 'zustand'

export const userStore = create((set) => ({
  user: undefined,
  updateUser: (user) => set({ user}),
}))