export interface Task {
  id: string;
  email: string;
  title: string;
  created_at: string;
  completed_at: string | null;
  note: string | null;
}

export interface CreateTaskData {
  email: string;
  title: string;
  note?: string;
}

export interface UpdateTaskData {
  title?: string;
  note?: string;
  completed_at?: string | null;
}

const API_BASE_URL = "/api/tasks";

export async function getTasksByEmail(email: string): Promise<Task[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data.tasks || [];
  } catch (error) {
    console.error("Erro when fetching tasks:", error);
    throw new Error("Error to fetch tasks");
  }
}

export async function createTask(taskData: CreateTaskData): Promise<Task> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error while creating task:", error);
    throw new Error("Error to create task");
  }
}

export async function updateTask(
  id: string,
  updates: UpdateTaskData
): Promise<Task> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error to update task:", error);
    throw new Error("Error to update task");
  }
}

export async function completeTask(id: string): Promise<Task> {
  return updateTask(id, { completed_at: new Date().toISOString() });
}

export async function uncompleteTask(id: string): Promise<Task> {
  return updateTask(id, { completed_at: null });
}

export async function deleteTask(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP Error: ${response.status}`);
    }
  } catch (error) {
    console.error("Error while deleting task:", error);
    throw new Error("Error while deleting task");
  }
}
