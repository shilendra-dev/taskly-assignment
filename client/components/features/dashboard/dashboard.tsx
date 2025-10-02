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
import { useState, useEffect } from "react";
import { useTaskApi } from "@/hooks/useTaskApi";
import { CreateTask } from "../tasks/createTask";
import { useTaskStore } from "@/store/taskStore";
import { Header } from "./header";
import { authApi } from "@/hooks/useAuthApi";
import { useUserStore } from "@/store/userStore";
import { UpdateTask } from "../tasks/updateTask";

export const Dashboard = () => {
  const taskApi = useTaskApi();
  const { tasks, setTasks } = useTaskStore();
  const { setUser } = useUserStore();

  const [selectedTask, setSelectedTask] = useState<task | null>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const loadTasks = async () => {
    try {
      const data = await taskApi.getAll();
      setTasks(data.tasks ?? []);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await taskApi.delete(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleRowClick = (task: task) => {
    setSelectedTask(task);
    setShowUpdateDialog(true);
  };

  useEffect(() => {
    loadTasks();
  }, [tasks]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await authApi.getUserProfile();
        setUser(data?.user?.[0] ?? null);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };
    loadUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />

      <main className="flex-1 w-full px-3 sm:px-4 py-4 sm:py-6 max-w-7xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div className="flex-1">
                <CardTitle className="text-lg sm:text-xl">Tasks</CardTitle>
                <CardDescription className="text-sm sm:text-base mt-1">
                  View and manage all your tasks in one place
                </CardDescription>
              </div>
              <CreateTask onTaskCreated={loadTasks} />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <DataTable
              columns={columns}
              data={Array.isArray(tasks) ? tasks : []}
              onDelete={handleDelete}
              onRowClick={handleRowClick}
            />
          </CardContent>
        </Card>
      </main>

      <UpdateTask
        task={selectedTask ?? null}
        open={showUpdateDialog}
        onOpenChange={setShowUpdateDialog}
      />
    </div>
  );
};
