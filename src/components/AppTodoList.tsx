import type { Todo } from "@/store/useTodoStore";
import { useState } from "react";
import { AppTodoItem } from "./AppTodoItem";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";

interface AppTodoListProps {
    todoList: Todo[];
    itemsPerPage?: number;
}

export function AppTodoList({ todoList, itemsPerPage = 10 }: AppTodoListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    
    // Calculate pagination
    const totalPages = Math.ceil(todoList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTodos = todoList.slice(startIndex, endIndex);
    
    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const halfVisible = Math.floor(maxVisiblePages / 2);
            let startPage = Math.max(1, currentPage - halfVisible);
            let endPage = Math.min(totalPages, currentPage + halfVisible);
            
            if (currentPage <= halfVisible) {
                endPage = maxVisiblePages;
            }
            if (currentPage + halfVisible >= totalPages) {
                startPage = totalPages - maxVisiblePages + 1;
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }
        
        return pages;
    };
    
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    
    const pageNumbers = getPageNumbers();
    
    return (
        <div className="space-y-4">
            {/* Table */}
            <Table>
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
                    {currentTodos.map((todo) => (
                        <AppTodoItem todoItem={todo} key={todo.id} />
                    ))}
                </TableBody>
            </Table>
            
            {/* Pagination Info */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                    Showing {startIndex + 1} to {Math.min(endIndex, todoList.length)} of {todoList.length} todos
                </div>
                <div>
                    Page {currentPage} of {totalPages}
                </div>
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious 
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                        
                        {/* Show first page if we're not showing it */}
                        {pageNumbers[0] > 1 && (
                            <>
                                <PaginationItem>
                                    <PaginationLink 
                                        onClick={() => handlePageChange(1)}
                                        className="cursor-pointer"
                                    >
                                        1
                                    </PaginationLink>
                                </PaginationItem>
                                {pageNumbers[0] > 2 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                            </>
                        )}
                        
                        {/* Page numbers */}
                        {pageNumbers.map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    onClick={() => handlePageChange(page)}
                                    isActive={currentPage === page}
                                    className="cursor-pointer"
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        
                        {/* Show last page if we're not showing it */}
                        {pageNumbers[pageNumbers.length - 1] < totalPages && (
                            <>
                                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                                <PaginationItem>
                                    <PaginationLink 
                                        onClick={() => handlePageChange(totalPages)}
                                        className="cursor-pointer"
                                    >
                                        {totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}
                        
                        <PaginationItem>
                            <PaginationNext 
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}