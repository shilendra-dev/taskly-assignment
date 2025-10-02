"use client";

import { useState, useEffect } from "react";
import { Button } from "@/ui/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/atoms/dialog";
import { Input } from "@/ui/atoms/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/atoms/select";
import { useTaskApi } from "@/hooks/useTaskApi";
import { toast } from "react-hot-toast";
import { task } from "./type";
import { useTaskStore } from "@/store/taskStore";

interface UpdateTaskProps {
  task: task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateTask({ task, open, onOpenChange }: UpdateTaskProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateTask } = useTaskStore();

  const taskApi = useTaskApi();

  // Populate form when task changes
  useEffect(() => {
    if (task && task.title && task.status) {
      setTitle(task.title);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!task) return;

    if (!title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    if (!status) {
      toast.error("Please select a status");
      return;
    }

    setIsUpdating(true);

    try {
      await taskApi.update(task.id, title.trim(), status);
      toast.success("Task updated successfully!");

      // Update store
      updateTask(task.id, { title: title.trim(), status });

      // Close dialog
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen && task) {
      // Reset form to original values when dialog closes
      setTitle(task.title);
      setStatus(task.status);
    }
  };

  if (!task || !task.title || !task.status) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] mx-4 max-w-[calc(100vw-2rem)]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
            <DialogDescription>
              Update the task details below.
              {task && ` Currently editing: "${task.title}"`}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Task Title
              </label>
              <Input
                id="title"
                placeholder="Enter task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isUpdating}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <Select
                value={status}
                onValueChange={setStatus}
                disabled={isUpdating}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}