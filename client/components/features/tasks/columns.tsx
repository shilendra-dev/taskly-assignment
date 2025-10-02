"use client";

import { ColumnDef } from "@tanstack/react-table";
import { task } from "./type";
import { Badge } from "@/ui/atoms/badge";
import { Button } from "@/ui/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/atoms/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/atoms/dialog";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTaskApi } from "@/hooks/useTaskApi";
import { useTaskStore } from "@/store/taskStore";

export const columns: ColumnDef<task>[] = [
  {
    accessorKey: "title",
    header: "Task Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      // Simple status colors based on your status strings
      const getStatusVariant = (status: string) => {
        switch (status?.toLowerCase()) {
          case "completed":
            return "default"; // green
          case "in_progress":
            return "secondary"; // blue/gray
          case "pending":
            return "outline"; // just border
          default:
            return "outline";
        }
      };

      return (
        <Badge variant={getStatusVariant(status)}>
          {status || "No status"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created On",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return createdAt ? new Date(createdAt).toLocaleDateString() : "-";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const task = row.original;
      const [showDeleteDialog, setShowDeleteDialog] = useState(false);
      const taskApi = useTaskApi();
      const { deleteTask } = useTaskStore();

      const handleDelete = async () => {
        try {
          await taskApi.delete(task.id);
          deleteTask(task.id);
          setShowDeleteDialog(false);
        } catch (error) {
          console.error("Failed to delete task:", error);
        }
      };

      return (
        <div onClick={(e) => e.stopPropagation()} className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Task?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete "{task.title}"? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
