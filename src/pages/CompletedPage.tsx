import { AppTodoList } from "@/components/AppTodoList";
import useTodoStore from "@/store/useTodoStore";

export function CompletedPage(){
    const todos = useTodoStore((state) => state.todos);
    const tasks = todos.filter(todo => todo.completed);
    return (
        <div>
            <AppTodoList todoList={tasks} />
        </div>
    )
}