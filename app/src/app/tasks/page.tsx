"use client";

import { Suspense } from "react";
import TasksPageContent from "./TasksPageContent";

export default function TasksPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <TasksPageContent />
    </Suspense>
  );
}
