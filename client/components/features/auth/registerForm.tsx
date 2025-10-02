"use client";

import { Button } from "@/ui/atoms/button";
import { Input } from "@/ui/atoms/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuthApi } from "@/hooks/useAuthApi";
import Link from "next/link";
import { useAuth } from "@/provider/AuthProvider";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const authApi = useAuthApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      const errorMessage = "Passwords do not match";
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
      return;
    }

    try {
      const data = await authApi.register(name, email, password);
      login(data.token as string);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      const errorMessage = err.message || "Failed to create account";
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
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-xs text-muted-foreground tracking-wider">
            Sign up to get started
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="name"
            className="h-12 bg-background border-border/50 focus:border-primary/50 transition-colors"
          />

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
            autoComplete="new-password"
            className="h-12 bg-background border-border/50 focus:border-primary/50 transition-colors"
          />

          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="new-password"
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
          disabled={isLoading || !name || !email || !password || !confirmPassword}
          size="lg"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground space-y-2">
        <div>
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium transition-colors"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}