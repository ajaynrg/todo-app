import type { Todo } from "@/store/useTodoStore";
import useTodoStore from "@/store/useTodoStore";
import { Checkbox } from "./ui/checkbox";
import { TableCell, TableRow } from "./ui/table";

export function AppTodoItem({todoItem}: {todoItem:Todo}){
    const toggleTodo = useTodoStore((state) => state.toggleTodo)
    return (
        <TableRow>
            <TableCell>{todoItem.id}</TableCell>
            <TableCell>{todoItem.text}</TableCell>
            <TableCell>
                <Checkbox 
                    checked={todoItem.completed}
                    onCheckedChange={() => toggleTodo(todoItem.id)}
                />
            </TableCell>
        </TableRow>
    )
}