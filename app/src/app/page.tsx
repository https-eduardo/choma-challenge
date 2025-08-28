"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/lib/useDebounce";
import {
  Mail,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const debouncedEmail = useDebounce(email, 300);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setIsValid(validateEmail(debouncedEmail));
  }, [debouncedEmail]);

  const goToTasks = () => {
    if (!isValid) return;
    const search = new URLSearchParams({ email: debouncedEmail }).toString();
    router.push(`/tasks?${search}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 from-50% to-white to-50% relative overflow-hidden">
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-xl w-full">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mb-6 shadow-lg animate-float">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 gradient-animate">
              Todo App
            </h1>
          </div>

          <Card className="bg-white backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden hover-lift">
            <div className="inset-0 bg-gradient-to-r from-orange-500/5 to-yellow-500/5"></div>
            <CardHeader className="flex flex-col items-center pb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl mb-4 animate-pulse-glow">
                <Mail className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Let&apos;s start!
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Enter your email to access your tasks
              </p>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="your-email@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`h-14 text-lg border-2 transition-all duration-300 ${
                      isValid && email
                        ? "border-green-400 bg-green-50/50 shadow-lg"
                        : email
                        ? "border-red-300 bg-red-50/50"
                        : "border-gray-200 hover:border-orange-300 focus:border-orange-400"
                    } rounded-xl px-4 focus:ring-4 focus:ring-orange-100`}
                  />
                  {email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {isValid ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  )}
                </div>

                {email && !isValid && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">
                      Please enter a valid email
                    </p>
                  </div>
                )}
                {isValid && email && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-xl border border-green-200">
                    <CheckCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">
                      Valid email! Click continue
                    </p>
                  </div>
                )}
              </div>

              <Button
                onClick={goToTasks}
                disabled={!isValid}
                className={`h-14 text-lg font-semibold w-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  isValid ? "" : "bg-gray-300 text-gray-500"
                } rounded-xl`}
              >
                {isValid ? (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="text-center mt-8 text-gray-500">
            <p className="text-sm">
              Organize, prioritize and achieve your goals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
