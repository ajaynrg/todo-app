import type { Todo } from "@/store/useTodoStore";
import { AppTodoItem } from "./AppTodoItem";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";

export function AppTodoList({todoList}: {todoList: Todo[]}){
    return (
        <Table >
            <TableHeader>
                <TableRow className="font-bold">
                    <TableCell className="min-w-10">ID</TableCell>
                    <TableCell className="w-[20rem]">Task</TableCell>
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