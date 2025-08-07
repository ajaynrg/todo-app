import { create } from 'zustand';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[],
  addTodo: (text: string) => void,
  toggleTodo: (id: number) => void,
  deleteTodo: (id: number) => void,
  clearTodos: () => void,
}

const useTodoStore = create<TodoStore>((set) => ({
        todos: [],
        addTodo: (text: string) => {
            set((state) => ({
                todos: [...state.todos, { id: state.todos.length + 1, text, completed: false }],
            }));
        },
        toggleTodo: (id: number) => {
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