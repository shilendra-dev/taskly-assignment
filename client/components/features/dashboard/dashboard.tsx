import { Button } from "@/ui/atoms/button";
import { Input } from "@/ui/atoms/input";
import { DataTable } from "@/components/features/tasks/dataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/molecules/card";
import { columns } from "../tasks/columns";
import { task } from "../tasks/type";
import { useState } from "react";
import { useEffect } from "react";
import { useTaskApi } from "@/hooks/useTaskApi";
import { CreateTask } from "../tasks/createTask";
import { useTaskStore } from "@/store/taskStore";

export const Dashboard = () => {
  const taskApi = useTaskApi();
  const [showCreateTask, setShowCreateTask] = useState(false);
  const { tasks, setTasks } = useTaskStore();

  const handleDelete = (id: string) => {
    console.log(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await taskApi.getAll();
        setTasks(data.tasks);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    loadTasks();
  }, [taskApi]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      <header className="flex justify-between items-center border border-border p-2 m-2 shadow-lg rounded-lg sm:w-7xl sm:mx-auto sm:px-4 sm:py-2">
        <h1 className="font-semibold tracking-wider text-sm sm:text-md">
          Taskly
        </h1>
        <Button
          size="sm"
          variant="default"
          className="text-xs sm:text-sm px-2 sm:px-4"
        >
          Logout
        </Button>
      </header>

      <main className="flex-1 w-full px-3 sm:px-4 py-4 sm:py-6 max-w-7xl mx-auto">
        {/* User Card */}
        <Card className="w-full mb-4 sm:mb-6">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">
              Shilendra Singh
            </CardTitle>
            <CardDescription className="text-sm sm:text-base break-all">
              shelendrasingh704@gmail.com
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Tasks Card */}
        <Card className="w-full">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div className="flex-1">
                <CardTitle className="text-lg sm:text-xl">Tasks</CardTitle>
                <CardDescription className="text-sm sm:text-base mt-1">
                  View and manage all your tasks in one place
                </CardDescription>
              </div>
              <CreateTask onTaskCreated={() => setShowCreateTask(false)} />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <DataTable
              columns={columns}
              data={tasks}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
