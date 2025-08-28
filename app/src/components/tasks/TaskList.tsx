"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Target } from "lucide-react";
import { TaskCard } from "./TaskCard";
import type { Task } from "@/lib/tasks";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (task: Task) => Promise<void>;
  onUpdate: (
    id: string,
    updates: { title: string; note?: string }
  ) => Promise<void>;
  onDelete: (task: Task) => void;
  isTogglePending: boolean;
  isUpdatePending: boolean;
  isDeletePending: boolean;
  onCreateNewTask: () => void;
}

export function TaskList({
  tasks,
  onToggleComplete,
  onUpdate,
  onDelete,
  isTogglePending,
  isUpdatePending,
  isDeletePending,
  onCreateNewTask,
}: TaskListProps) {
  if (!tasks || tasks.length === 0) {
    return (
      <Card className="bg-white backdrop-blur-sm border-0 rounded-lg overflow-hidden">
        <CardContent className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mb-4">
            <Target className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-500">
            Create your first task and start organizing your goals!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isTogglePending={isTogglePending}
            isUpdatePending={isUpdatePending}
            isDeletePending={isDeletePending}
          />
        ))}
      </div>

      <div className="mt-8">
        <Button
          variant="ghost"
          onClick={onCreateNewTask}
          className="w-full border-dashed border-2 h-14 font-semibold text-md rounded-md transition-all duration-300 transform"
        >
          <Plus className="w-6 h-6 mr-3" />
          Add Another Task
        </Button>
      </div>
    </>
  );
}
