import type { Todo } from "@/store/useTodoStore";
import useTodoStore from "@/store/useTodoStore";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { TableCell, TableRow } from "./ui/table";

export function AppTodoItem({todoItem}: {todoItem:Todo}){
    const toggleTodo = useTodoStore((state) => state.toggleTodo)
    const [animation, setAnimation] = useState(false);

    const taskCompleted = (id: number) =>{
        setAnimation(true)
        setTimeout(()=>{
            toggleTodo(id)
        }, 1000)
    }
    return (
        <TableRow className={animation ? '':''}>
            <TableCell>{todoItem.id}</TableCell>
            <TableCell>{todoItem.priority}</TableCell>
            <TableCell>{todoItem.text}</TableCell>
            <TableCell>{todoItem.endDate.toDateString()}</TableCell>
            <TableCell>
                <Checkbox 
                    checked={todoItem.completed}
                    onCheckedChange={() => {taskCompleted(todoItem.id); todoItem.completed = true;}}
                />
            </TableCell>
        </TableRow>
    )
}