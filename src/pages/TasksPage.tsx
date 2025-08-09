import { AppTodoList } from "@/components/AppTodoList"
import useTodoStore from "@/store/useTodoStore"

export function TasksPage(){
    const todos = useTodoStore((state) => state.todos)
    return (
        <div>
            <AppTodoList todoList={todos} />
        </div>
    )
}