// src/hooks/useTodos.ts
import useTodoStore from "../store/useTodoStore";

export const useTodos = () => {
    const todos = useTodoStore((state) => state.todos);
    const addTodo = useTodoStore((state) => state.addTodo);
    const toggleTodo = useTodoStore((state) => state.toggleTodo);
    const deleteTodo = useTodoStore((state) => state.deleteTodo);
    const clearTodos = useTodoStore((state) => state.clearTodos);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearTodos
  }
}
