"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";

interface CreateTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newTask: { title: string; note: string };
  onNewTaskChange: (task: { title: string; note: string }) => void;
  onCreateTask: () => Promise<void>;
  isPending: boolean;
}

export function CreateTaskDialog({
  isOpen,
  onOpenChange,
  newTask,
  onNewTaskChange,
  onCreateTask,
  isPending,
}: CreateTaskDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <div className="flex justify-end mb-4">
        <DialogTrigger asChild>
          <Button className="h-10 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105">
            <Plus className="w-6 h-6" />
            Add New Task
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-sm border-0 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-md">
              <Plus className="w-5 h-5 text-orange-600" />
            </div>
            New Task
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Transform your idea into a concrete goal
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label
              htmlFor="task-title"
              className="text-sm font-medium text-gray-700"
            >
              Task Title *
            </label>
            <Input
              id="task-title"
              placeholder="Enter task title..."
              value={newTask.title}
              onChange={(e) =>
                onNewTaskChange({ ...newTask, title: e.target.value })
              }
              disabled={isPending}
              className="h-12 text-lg border-2 border-gray-200 focus:ring-4 focus:ring-orange-100 rounded-md transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="task-note"
              className="text-sm font-medium text-gray-700"
            >
              Note (Optional)
            </label>
            <Textarea
              id="task-note"
              placeholder="Describe details, context or important reminders..."
              value={newTask.note}
              onChange={(e) =>
                onNewTaskChange({ ...newTask, note: e.target.value })
              }
              rows={4}
              disabled={isPending}
              className="border-2 border-gray-200 rounded-md transition-all duration-300 resize-none"
            />
          </div>
        </div>
        <DialogFooter className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="h-12 px-6 border-2 border-gray-300 hover:border-gray-400 rounded-md transition-all duration-300"
          >
            Cancel
          </Button>
          <Button
            onClick={onCreateTask}
            disabled={!newTask.title.trim() || isPending}
            className="h-12 px-8 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Create Task
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
