"use client";

import { useSearchParams, useRouter } from "next/navigation";
import TodoApp from "@/components/TodoApp";
import { useEffect } from "react";

export default function TasksPageContent() {
  const search = useSearchParams();
  const router = useRouter();
  const email = search.get("email") ?? "";

  useEffect(() => {
    if (!email) router.replace("/");
  }, [email, router]);

  if (!email) return null;

  return <TodoApp email={email} />;
}
