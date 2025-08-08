import { create } from 'zustand';

export interface Todo {
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
        todos: [
            { id: 1, text: "Buy groceries", completed: false },
            { id: 2, text: "Walk the dog", completed: true },
            { id: 3, text: "Read a book", completed: false },
        ],
        addTodo: (text: string) => {
            set((state) => ({
                todos: [...state.todos, { id: state.todos.length + 1, text, completed: false }],
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