"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2, User } from "lucide-react";

interface UserStatusCardProps {
  email: string;
  isLoading: boolean;
  pendingTasks: number;
  completedTasks: number;
  totalTasks: number;
}

export function UserStatusCard({
  email,
  isLoading,
  pendingTasks,
  completedTasks,
  totalTasks,
}: UserStatusCardProps) {
  return (
    <Card className="bg-white backdrop-blur-sm border-0 rounded-lg mb-8 overflow-hidden hover-lift">
      <CardContent className="p-8 relative">
        <div className="flex items-center justify-between flex-col gap-4 md:flex-row md:gap-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center flex-col sm:flex-row gap-2 text-gray-700">
              <User className="w-5 h-5 text-orange-500" />
              <span className="font-medium">Connected as:</span>
              <span className="font-bold text-orange-600">{email}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {pendingTasks}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {completedTasks}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              {isLoading ? (
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : (
                <div className="text-2xl font-bold text-blue-600">
                  {totalTasks}
                </div>
              )}
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
