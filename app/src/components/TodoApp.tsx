"use client";

import { useState } from "react";
import { Target } from "lucide-react";
import { CreateTaskDialog } from "./tasks/CreateTaskDialog";
import { DeleteTaskDialog } from "./tasks/DeleteTaskDialog";
import { TaskList } from "./tasks/TaskList";
import { UserStatusCard } from "./user/UserStatusCard";
import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useToggleComplete,
  useDeleteTask,
} from "@/lib/queries";
import { Task } from '@/lib/tasks';

type Props = { email: string };

export default function TodoApp({ email }: Props) {
  const { data: tasks = [], isLoading } = useTasks(email);
  const createTask = useCreateTask(email);
  const updateTask = useUpdateTask(email);
  const toggleComplete = useToggleComplete(email);
  const deleteTask = useDeleteTask(email);

  const [newTask, setNewTask] = useState({ title: "", note: "" });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) return;
    await createTask.mutateAsync({
      title: newTask.title.trim(),
      note: newTask.note.trim() || undefined,
    });
    setNewTask({ title: "", note: "" });
    setIsCreateDialogOpen(false);
  };

  const handleToggleComplete = async (task: Task) => {
    await toggleComplete.mutateAsync({
      id: task.id,
      completed: !!task.completed_at,
    });
  };

  const handleUpdateTask = async (
    id: string,
    updates: { title: string; note?: string }
  ) => {
    await updateTask.mutateAsync({
      id,
      updates,
    });
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    await deleteTask.mutateAsync(taskToDelete.id);
    setTaskToDelete(null);
  };

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const pendingTasks = tasks.filter((task) => !task.completed_at);
  const completedTasks = tasks.filter((task) => task.completed_at);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 from-50% to-white to-50% p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 animate-float">
            <Target className="w-12 h-12 text-white" />
          </div>
        </div>

        <CreateTaskDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          newTask={newTask}
          onNewTaskChange={setNewTask}
          onCreateTask={handleCreateTask}
          isPending={createTask.isPending}
        />

        <UserStatusCard
          email={email}
          isLoading={isLoading}
          pendingTasks={pendingTasks.length}
          completedTasks={completedTasks.length}
          totalTasks={tasks.length}
        />

        <DeleteTaskDialog
          taskToDelete={taskToDelete}
          onClose={() => setTaskToDelete(null)}
          onConfirm={handleDeleteTask}
          isPending={deleteTask.isPending}
        />

        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onUpdate={handleUpdateTask}
          onDelete={setTaskToDelete}
          isTogglePending={toggleComplete.isPending}
          isUpdatePending={updateTask.isPending}
          isDeletePending={deleteTask.isPending}
          onCreateNewTask={handleOpenCreateDialog}
        />
      </div>
    </div>
  );
}
