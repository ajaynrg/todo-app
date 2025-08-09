import type { Todo } from "@/store/useTodoStore";
import { AppTodoItem } from "./AppTodoItem";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";

export function AppTodoList({todoList}: {todoList: Todo[]}){
    return (
        <Table >
            <TableHeader>
                <TableRow className="font-bold">
                    <TableCell className="min-w-32">ID</TableCell>
                    <TableCell className="min-w-32">Priority</TableCell>
                    <TableCell className="w-[25rem]">Task</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell className="min-w-10">Complete</TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {todoList.map((todo)=>(
                    <AppTodoItem todoItem={todo} key={todo.id}/>
                ))}
            </TableBody>
        </Table>
    )
}