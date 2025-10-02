import { create } from "zustand";
import { task } from "../components/features/tasks/type";

interface TaskStore {
    tasks: task[];
    setTasks: (tasks: task[]) => void;
    deleteTask: (id: string) => void;
    createTask: (task: task) => void;
    updateTask: (task: task) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [] as task[],
    setTasks: (tasks: task[]) => set({ tasks }),
    deleteTask: (id: string) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
    })),
    createTask: (task: task) => set((state) => ({
        tasks: [...state.tasks, task],
    })),
    updateTask: (task: task) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),
})) 