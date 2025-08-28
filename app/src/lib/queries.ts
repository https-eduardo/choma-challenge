"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task, CreateTaskData, UpdateTaskData } from "./tasks";
import {
  getTasksByEmail,
  createTask as createTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
  completeTask as completeTaskApi,
  uncompleteTask as uncompleteTaskApi,
} from "./tasks";

function taskKeys(email: string) {
  return { list: ["tasks", email] as const };
}

export function useTasks(email: string) {
  return useQuery({
    queryKey: taskKeys(email).list,
    queryFn: () => getTasksByEmail(email),
    enabled: !!email,
  });
}

export function useCreateTask(email: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Omit<CreateTaskData, "email">) =>
      createTaskApi({ ...input, email }),
    onMutate: async (newTask) => {
      await qc.cancelQueries({ queryKey: taskKeys(email).list });

      const previousTasks = qc.getQueryData<Task[]>(taskKeys(email).list);

      const optimisticTask: Task = {
        id: `temp-${Date.now()}`,
        email,
        title: newTask.title,
        note: newTask.note || null,
        created_at: new Date().toISOString(),
        completed_at: null,
      };

      qc.setQueryData<Task[]>(taskKeys(email).list, (old) =>
        old ? [optimisticTask, ...old] : [optimisticTask]
      );

      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      if (context?.previousTasks) {
        qc.setQueryData(taskKeys(email).list, context.previousTasks);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: taskKeys(email).list });
    },
  });
}

export function useUpdateTask(email: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateTaskData }) =>
      updateTaskApi(id, updates),
    onMutate: async ({ id, updates }) => {
      await qc.cancelQueries({ queryKey: taskKeys(email).list });

      const previousTasks = qc.getQueryData<Task[]>(taskKeys(email).list);

      qc.setQueryData<Task[]>(taskKeys(email).list, (old) =>
        old?.map((task) => (task.id === id ? { ...task, ...updates } : task))
      );

      return { previousTasks };
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        qc.setQueryData(taskKeys(email).list, context.previousTasks);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: taskKeys(email).list });
    },
  });
}

export function useToggleComplete(email: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      completed ? uncompleteTaskApi(id) : completeTaskApi(id),
    onMutate: async ({ id, completed }) => {
      await qc.cancelQueries({ queryKey: taskKeys(email).list });

      const previousTasks = qc.getQueryData<Task[]>(taskKeys(email).list);

      qc.setQueryData<Task[]>(taskKeys(email).list, (old) =>
        old?.map((task) =>
          task.id === id
            ? {
                ...task,
                completed_at: completed ? null : new Date().toISOString(),
              }
            : task
        )
      );

      return { previousTasks };
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        qc.setQueryData(taskKeys(email).list, context.previousTasks);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: taskKeys(email).list });
    },
  });
}

export function useDeleteTask(email: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTaskApi(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: taskKeys(email).list });

      const previousTasks = qc.getQueryData<Task[]>(taskKeys(email).list);

      qc.setQueryData<Task[]>(taskKeys(email).list, (old) =>
        old?.filter((task) => task.id !== id)
      );

      return { previousTasks };
    },
    onError: (err, id, context) => {
      if (context?.previousTasks) {
        qc.setQueryData(taskKeys(email).list, context.previousTasks);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: taskKeys(email).list });
    },
  });
}
