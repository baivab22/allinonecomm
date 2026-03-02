import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  type RegisterInput,
  type LoginInput,
  type ForgotPasswordInput,
} from "@shared/schema";
import { toast } from "sonner";

export default function AuthPage() {
  const [location] = useLocation();
  const { login, register, forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const mode =
    location === "/signup"
      ? "signup"
      : location === "/forgot-password"
        ? "forgot"
        : "login";

  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const registerForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", phone: "" },
  });

  const forgotForm = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const handleLogin = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      await login(data);
    } catch {
      // Error handled in useAuth
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      await register(data);
    } catch {
      // Error handled in useAuth
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    try {
      const message = await forgotPassword(data.email);
      toast.success(message);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Abstract Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <Link href="/">
          <a className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to store
          </a>
        </Link>
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary">
            LUMINA<span className="text-secondary">.</span>
          </h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-[440px] relative z-10 px-4"
      >
        <Card className="border-border/50 shadow-xl rounded-2xl overflow-hidden bg-background/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {mode === "login" && "Welcome back"}
              {mode === "signup" && "Create an account"}
              {mode === "forgot" && "Reset password"}
            </CardTitle>
            <CardDescription>
              {mode === "login" &&
                "Enter your credentials to access your account"}
              {mode === "signup" && "Join our community and start shopping"}
              {mode === "forgot" &&
                "Enter your email to receive a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Login Form */}
            {mode === "login" && (
              <form
                onSubmit={loginForm.handleSubmit(handleLogin)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...loginForm.register("email")}
                    className="h-11 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-xs text-destructive">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password">
                      <a className="text-xs font-medium text-secondary hover:underline">
                        Forgot password?
                      </a>
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...loginForm.register("password")}
                    className="h-11 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-xs text-destructive">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={loginForm.watch("rememberMe")}
                    onCheckedChange={(checked) =>
                      loginForm.setValue("rememberMe", !!checked)
                    }
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            )}

            {/* Signup Form */}
            {mode === "signup" && (
              <form
                onSubmit={registerForm.handleSubmit(handleRegister)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...registerForm.register("name")}
                    className="h-11 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                  />
                  {registerForm.formState.errors.name && (
                    <p className="text-xs text-destructive">
                      {registerForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="name@example.com"
                    {...registerForm.register("email")}
                    className="h-11 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-xs text-destructive">
                      {registerForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    {...registerForm.register("phone")}
                    className="h-11 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    {...registerForm.register("password")}
                    className="h-11 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-xs text-destructive">
                      {registerForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            )}

            {/* Forgot Password Form */}
            {mode === "forgot" && (
              <form
                onSubmit={forgotForm.handleSubmit(handleForgotPassword)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email address</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="name@example.com"
                    {...forgotForm.register("email")}
                    className="h-11 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                  />
                  {forgotForm.formState.errors.email && (
                    <p className="text-xs text-destructive">
                      {forgotForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            )}

            {mode !== "forgot" && (
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
            )}

            {mode !== "forgot" && (
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="h-11 rounded-xl border-border/50 hover:bg-muted/50 transition-all font-medium"
                  onClick={() =>
                    (window.location.href = "/api/auth/google")
                  }
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="h-11 rounded-xl border-border/50 hover:bg-muted/50 transition-all font-medium"
                  onClick={() =>
                    (window.location.href = "/api/auth/facebook")
                  }
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="#1877F2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  className="h-11 rounded-xl border-border/50 hover:bg-muted/50 transition-all font-medium"
                  onClick={() =>
                    (window.location.href = "/api/auth/tiktok")
                  }
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.37-6.22V9.4a8.16 8.16 0 0 0 4.85 1.58V7.53a4.85 4.85 0 0 1-1-.84z" />
                  </svg>
                  TikTok
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-wrap justify-center pb-8 pt-2">
            <p className="text-sm text-muted-foreground">
              {mode === "login" && (
                <>
                  Don't have an account?{" "}
                  <Link href="/signup">
                    <a className="font-bold text-secondary hover:underline underline-offset-4">
                      Sign up
                    </a>
                  </Link>
                </>
              )}
              {mode === "signup" && (
                <>
                  Already have an account?{" "}
                  <Link href="/login">
                    <a className="font-bold text-secondary hover:underline underline-offset-4">
                      Sign in
                    </a>
                  </Link>
                </>
              )}
              {mode === "forgot" && (
                <Link href="/login">
                  <a className="font-bold text-secondary hover:underline underline-offset-4">
                    Back to sign in
                  </a>
                </Link>
              )}
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
