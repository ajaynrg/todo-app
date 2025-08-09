import App from "@/App";
import { CompletedPage } from "@/pages/CompletedPage";
import { PendingPage } from "@/pages/PendingPage";
import { TasksPage } from "@/pages/TasksPage";
import { UpcomingPage } from "@/pages/UpcomingPage";
import {
    createBrowserRouter,
} from "react-router";

export const routes = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children:[
            { index: true, Component: TasksPage },
            { path: "tasks", Component: TasksPage },
            { path: "pending", Component: PendingPage},
            { path: "upcoming", Component: UpcomingPage},
            { path: "completed", Component: CompletedPage},
        ]
    },
]);