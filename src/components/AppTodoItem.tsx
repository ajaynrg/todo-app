import type { Priority, Todo } from "@/store/useTodoStore";
import useTodoStore from "@/store/useTodoStore";
import { FlagIcon } from "lucide-react";
import { useState, type ReactElement } from "react";
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

    const getPriorityFlag = (priority: Priority): ReactElement => {
        let flagColor;
        switch(priority){
            case 'LOW': flagColor = 'darkgreen';
            break;
            case 'MEDIUM': flagColor = 'orange';
            break;
            case 'HIGH': flagColor = 'darkred';
            break;
        }
        return <FlagIcon color={flagColor} size='15'/>
    }
    return (
        <TableRow className={animation ? 'line-through text-red-500':''}>
            <TableCell>{todoItem.id}</TableCell>
            <TableCell>
                <div className="flex">
                    <div>{getPriorityFlag(todoItem.priority)}</div>
                    <div className="ml-1">
                        {todoItem.priority.charAt(0) + todoItem.priority.slice(1).toLowerCase()}
                    </div>
                </div>
            </TableCell>
            <TableCell>{todoItem.text}</TableCell>
            <TableCell>{todoItem.endDate.toDateString()}</TableCell>
            <TableCell>
                <Checkbox 
                    className="cursor-pointer"
                    checked={todoItem.completed || animation}
                    onCheckedChange={() => {taskCompleted(todoItem)}}
                    disabled={todoItem.completed}
                />
            </TableCell>
        </TableRow>
    )
}