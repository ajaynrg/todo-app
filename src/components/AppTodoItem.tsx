import type { Todo } from "@/store/useTodoStore";
import useTodoStore from "@/store/useTodoStore";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { TableCell, TableRow } from "./ui/table";

export function AppTodoItem({todoItem}: {todoItem:Todo}){
    const toggleTodo = useTodoStore((state) => state.toggleTodo);
    const [animation, setAnimation] = useState(false);
    const taskCompleted = (todoItem: Todo)=>{
        setAnimation(true);
        setTimeout(()=>{
            toggleTodo(todoItem.id);
        }, 500)
    }
    return (
        <TableRow className={animation ? 'line-through text-red-500':''}>
            <TableCell>{todoItem.id}</TableCell>
            <TableCell>{todoItem.priority}</TableCell>
            <TableCell>{todoItem.text}</TableCell>
            <TableCell>{todoItem.endDate.toDateString()}</TableCell>
            <TableCell>
                <Checkbox 
                    className="cursor-pointer"
                    checked={todoItem.completed || animation}
                    onCheckedChange={() => {taskCompleted(todoItem)}}
                />
            </TableCell>
        </TableRow>
    )
}