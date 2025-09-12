import { create } from "zustand";
import { persist } from 'zustand/middleware';

type People = {
    name: string,
    picture: string,
}

type TaskBody = {
    title: string,
    description: string,
    collaborators: [People],
    _id: string,
}

interface TaskState {
    list: TaskBody[],
    addTask: (task: TaskBody) => void,
    removeTask: (id: any) => void,
    reset: () => void;
}

export const useCompletedTasks = create<TaskState>()(
    persist(
        (set, get, store) => ({
            list: [],
            addTask: (task) => set((state) => ({ list: [...state.list, task] })),
            removeTask: (id) => set((state) => ({ list: state.list.filter((_, i) => i !== id)})),
            reset: () => {
                set(store.getInitialState());
            }
        }),
        {
            name: 'completed-tasks-storage',
        }
    )
)