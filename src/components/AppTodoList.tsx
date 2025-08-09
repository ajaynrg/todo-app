import type { Priority, Todo } from "@/store/useTodoStore";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { AppTodoItem } from "./AppTodoItem";
import { Button } from "./ui/button";
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

type SortDirection = 'asc' | 'desc' | 'none';
type SortColumn = 'priority' | 'endDate' | 'none';

export function AppTodoList({ todoList, itemsPerPage = 10 }: AppTodoListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState<SortColumn>('none');
    const [sortDirection, setSortDirection] = useState<SortDirection>('none');
    
    // Priority order for sorting (HIGH > MEDIUM > LOW)
    const priorityOrder: Record<Priority, number> = {
        'HIGH': 3,
        'MEDIUM': 2,
        'LOW': 1
    };
    
    // Sort todos based on selected column
    const sortedTodos = [...todoList].sort((a, b) => {
        if (sortColumn === 'none' || sortDirection === 'none') return 0;
        
        if (sortColumn === 'priority') {
            const aValue = priorityOrder[a.priority];
            const bValue = priorityOrder[b.priority];
            
            if (sortDirection === 'desc') {
                return bValue - aValue; // HIGH to LOW
            } else {
                return aValue - bValue; // LOW to HIGH
            }
        } else if (sortColumn === 'endDate') {
            const aDate = new Date(a.endDate).getTime();
            const bDate = new Date(b.endDate).getTime();
            
            if (sortDirection === 'desc') {
                return bDate - aDate; // Latest to Earliest
            } else {
                return aDate - bDate; // Earliest to Latest
            }
        }
        
        return 0;
    });
    
    // Calculate pagination
    const totalPages = Math.ceil(sortedTodos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTodos = sortedTodos.slice(startIndex, endIndex);
    
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
    
    const handleSort = (column: SortColumn) => {
        let newDirection: SortDirection;
        
        if (sortColumn !== column) {
            // Switching to a new column, start with desc
            newDirection = 'desc';
        } else {
            // Same column, cycle through directions
            if (sortDirection === 'none') {
                newDirection = 'desc';
            } else if (sortDirection === 'desc') {
                newDirection = 'asc';
            } else {
                newDirection = 'none';
            }
        }
        
        if (newDirection === 'none') {
            setSortColumn('none');
        } else {
            setSortColumn(column);
        }
        setSortDirection(newDirection);
        setCurrentPage(1); // Reset to first page when sorting changes
    };
    
    const getSortIcon = (column: SortColumn) => {
        if (sortColumn !== column || sortDirection === 'none') {
            return <ChevronsUpDown className="w-4 h-4" />;
        } else if (sortDirection === 'desc') {
            return <ChevronDown className="w-4 h-4" />;
        } else {
            return <ChevronUp className="w-4 h-4" />;
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
                        <TableCell className="min-w-32">
                            <Button
                                variant="ghost"
                                onClick={() => handleSort('priority')}
                                className="h-auto p-0 font-bold hover:bg-transparent flex items-center gap-2"
                            >
                                Priority
                                {getSortIcon('priority')}
                            </Button>
                        </TableCell>
                        <TableCell className="w-[25rem]">Task</TableCell>
                        <TableCell>
                            <Button
                                variant="ghost"
                                onClick={() => handleSort('endDate')}
                                className="h-auto p-0 font-bold hover:bg-transparent flex items-center gap-2"
                            >
                                End Date
                                {getSortIcon('endDate')}
                            </Button>
                        </TableCell>
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
                    Showing {startIndex + 1} to {Math.min(endIndex, sortedTodos.length)} of {sortedTodos.length} todos
                    {sortColumn !== 'none' && sortDirection !== 'none' && (
                        <span className="ml-2 text-blue-600 dark:text-blue-400">
                            (sorted by {sortColumn === 'priority' ? 'priority' : 'end date'}: {
                                sortColumn === 'priority' 
                                    ? (sortDirection === 'desc' ? 'HIGH → LOW' : 'LOW → HIGH')
                                    : (sortDirection === 'desc' ? 'Latest → Earliest' : 'Earliest → Latest')
                            })
                        </span>
                    )}
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