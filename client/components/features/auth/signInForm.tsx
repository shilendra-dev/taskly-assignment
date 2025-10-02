"use client";

import { Button } from "@/ui/atoms/button";
import { Input } from "@/ui/atoms/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuthApi } from "@/hooks/useAuthApi";
import Link from "next/link";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const authApi = useAuthApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { token } = await authApi.login(email, password);
      localStorage.setItem("auth_token", token);
      toast.success("Signed in successfully!");
      router.push("/");
    } catch (err: any) {
      const errorMessage = err.message || "Invalid email or password";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-80 max-w-sm mx-auto text-center space-y-8">
      <div className="flex flex-col gap-4 space-y-2">
        <div className="flex gap-1 items-center justify-center flex-col">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="text-xs text-muted-foreground tracking-wider">
            Welcome back
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="email"
            className="h-12 bg-background border-border/50 focus:border-primary/50 transition-colors"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="current-password"
            className="h-12 bg-background border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>

        {error && (
          <div className="bg-destructive/5 border border-destructive/20 text-destructive p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-12 font-medium"
          disabled={isLoading || !email || !password}
          size="lg"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground space-y-2">
        <div>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary hover:underline font-medium transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
