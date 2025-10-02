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
import { Header } from "./header";
import { authApi } from "@/hooks/useAuthApi";
import { useUserStore } from "@/store/userStore";

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

  const { user, setUser } = useUserStore();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await authApi.getUserProfile();
        setUser(data.user[0]);
        console.log("user", data.user[0]);
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
