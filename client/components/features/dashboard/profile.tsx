"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/atoms/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/atoms/dialog";
import { Mail } from "lucide-react";
import { Button } from "@/ui/atoms/button";
import { useUserStore } from "@/store/userStore";

export const Profile = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
  };

  const { user } = useUserStore();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex rounded-full h-8 w-8 cursor-pointer border items-center justify-center gap-2 bg-primary hover:bg-primary/80 transition-colors">
            <span className="text-primary-foreground text-sm font-medium">{user?.name[0]}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsDialogOpen(true)}
            className="cursor-pointer"
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
              <div className="flex rounded-full h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {user?.name[0]}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{user?.name}</h3>
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-primary">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/80 transition-colors"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};