"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Loader2 } from "lucide-react";
import type { Task } from "@/lib/tasks";

interface DeleteTaskDialogProps {
  taskToDelete: Task | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isPending: boolean;
}

export function DeleteTaskDialog({
  taskToDelete,
  onClose,
  onConfirm,
  isPending,
}: DeleteTaskDialogProps) {
  return (
    <Dialog open={!!taskToDelete} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px] bg-white/95 backdrop-blur-sm border-0 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-red-100 to-pink-100 rounded-md">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        {taskToDelete && (
          <div className="py-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">
                {taskToDelete.title}
              </h4>
              {taskToDelete.note && (
                <p className="text-gray-600 text-sm">{taskToDelete.note}</p>
              )}
            </div>
          </div>
        )}
        <DialogFooter className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="h-12 px-6 border-2 border-gray-300 hover:border-gray-400 rounded-md transition-all duration-300"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isPending}
            className="h-12 px-6 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-5 h-5 mr-2" />
                Delete Task
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
