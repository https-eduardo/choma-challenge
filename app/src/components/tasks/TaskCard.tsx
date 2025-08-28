"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, Loader2 } from "lucide-react";
import type { Task } from "@/lib/tasks";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (task: Task) => Promise<void>;
  onUpdate: (
    id: string,
    updates: { title: string; note?: string }
  ) => Promise<void>;
  onDelete: (task: Task) => void;
  isTogglePending: boolean;
  isUpdatePending: boolean;
  isDeletePending: boolean;
}

export function TaskCard({
  task,
  onToggleComplete,
  onUpdate,
  onDelete,
  isTogglePending,
  isUpdatePending,
  isDeletePending,
}: TaskCardProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleUpdateTask = async () => {
    if (!editingTask || !editingTask.title.trim()) return;
    await onUpdate(editingTask.id, {
      title: editingTask.title.trim(),
      note: editingTask.note?.trim() || undefined,
    });
    setEditingTask(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card
      className={`bg-white cursor-pointer border-2 border-transparent backdrop-blur-sm rounded-lg overflow-hidden hover-lift transition-all duration-300 ${
        task.completed_at ? "" : "border-2 border-gray-200"
      }`}
    >
      <CardContent className="p-6">
        {editingTask?.id === task.id ? (
          <div className="space-y-4">
            <label
              htmlFor="task-title-edit"
              className="text-sm font-medium text-gray-700"
            >
              Title *
            </label>
            <Input
              id="task-title-edit"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  title: e.target.value,
                })
              }
              placeholder="Enter task title..."
              disabled={isUpdatePending}
              className="h-12 text-lg border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 rounded-md"
            />
            <label
              htmlFor="task-note-edit"
              className="text-sm font-medium text-gray-700"
            >
              Note (Optional)
            </label>
            <Textarea
              id="task-note-edit"
              value={editingTask.note || ""}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  note: e.target.value,
                })
              }
              placeholder="Describe details, context or important reminders..."
              rows={3}
              disabled={isUpdatePending}
              className="border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 rounded-md resize-none"
            />
            <div className="flex gap-3">
              <Button
                onClick={handleUpdateTask}
                disabled={isUpdatePending}
                className="h-12 px-6 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isUpdatePending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditingTask(null)}
                disabled={isUpdatePending}
                className="h-12 px-6 border-2 border-gray-300 hover:border-gray-400 rounded-md transition-all duration-300"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Checkbox
                checked={!!task.completed_at}
                onCheckedChange={() => onToggleComplete(task)}
                disabled={isTogglePending}
                className="w-5 h-5 border-2 border-gray-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 rounded-lg transition-all duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg font-bold mb-2 transition-all duration-300 ${
                  task.completed_at
                    ? "line-through text-green-600 opacity-75"
                    : "text-gray-800"
                }`}
              >
                {task.title}
              </h3>
              {task.note && (
                <p
                  className={`text-gray-600 mb-3 leading-relaxed text-sm ${
                    task.completed_at ? "text-green-500 opacity-75" : ""
                  }`}
                >
                  {task.note}
                </p>
              )}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Created: {formatDate(task.created_at)}
                </span>
                {task.completed_at && (
                  <span className="flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>✓
                    Completed: {formatDate(task.completed_at)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingTask(task)}
                disabled={isTogglePending || isDeletePending}
                className="h-9 w-9 p-0 border-2 border-blue-300 hover:border-blue-400 hover:bg-blue-50 rounded-lg transition-all duration-300"
              >
                <Edit className="w-4 h-4 text-blue-600" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(task)}
                disabled={isTogglePending || isDeletePending}
                className="h-9 w-9 p-0 border-2 border-red-300 hover:border-red-400 hover:bg-red-50 rounded-lg transition-all duration-300"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
