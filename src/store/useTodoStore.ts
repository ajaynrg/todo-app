import { create } from 'zustand';

export interface Todo {
  id: number;
  priority: Priority;
  text: string;
  date: Date;
  completed: boolean;
}

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

interface TodoStore {
  todos: Todo[],
  addTodo: (text: string, date: Date, priority: Priority) => void,
  toggleTodo: (id: number) => void,
  deleteTodo: (id: number) => void,
  clearTodos: () => void,
}

const useTodoStore = create<TodoStore>((set) => ({
        todos: [
            { id: 1, text: "Buy groceries", date: new Date(), completed: false, priority: "MEDIUM" },
            { id: 2, text: "Walk the dog", date: new Date(), completed: true, priority: "LOW" },
            { id: 3, text: "Read a book", date: new Date(), completed: false, priority: "HIGH" },
        ],
        addTodo: (text: string, date: Date, priority: Priority) => {
            set((state) => ({
                todos: [
                    ...state.todos,
                    { id: state.todos.length + 1, text, date, completed: false, priority }
                ],
            }));
        },
        toggleTodo: (id: number) => {
            console.log('Toggling the item for id ',id);
            set((state) => ({
                todos: state.todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo),
            }));
        },
        deleteTodo: (id: number) => {
            set((state) => ({
                todos: state.todos.filter((todo) => todo.id !== id),
            }));
        },
        clearTodos: () => {
            set({ todos: [] });
        },
    }));

export default useTodoStore;