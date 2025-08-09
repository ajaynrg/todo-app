import { AppTodoList } from "@/components/AppTodoList";
import useTodoStore from "@/store/useTodoStore";

export function UpcomingPage(){
    const todos = useTodoStore((state) => state.todos);
    const tasks = todos.filter(todo => !todo.completed && Number(todo.endDate) > Date.now());
    return (
        <div>
            <AppTodoList todoList={tasks} />
        </div>
    )
}