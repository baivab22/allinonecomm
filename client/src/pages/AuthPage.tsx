import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, Github, Mail } from "lucide-react";

export default function AuthPage() {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const mode = location === "/signup" ? "signup" : location === "/forgot-password" ? "forgot" : "login";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
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
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary">LUMINA<span className="text-secondary">.</span></h2>
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
              {mode === "login" && "Enter your credentials to access your account"}
              {mode === "signup" && "Join our community and start shopping"}
              {mode === "forgot" && "Enter your email to receive a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="John" required className="h-11 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Doe" required className="h-11 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all" />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="name@example.com" required className="h-11 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all" />
              </div>
              {mode !== "forgot" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {mode === "login" && (
                      <Link href="/forgot-password">
                        <a className="text-xs font-medium text-secondary hover:underline">Forgot password?</a>
                      </Link>
                    )}
                  </div>
                  <Input id="password" type="password" required className="h-11 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all" />
                </div>
              )}
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
                  <>
                    {mode === "login" && "Sign In"}
                    {mode === "signup" && "Create Account"}
                    {mode === "forgot" && "Send Reset Link"}
                  </>
                )}
              </Button>
            </form>

            {mode !== "forgot" && (
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
            )}

            {mode !== "forgot" && (
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-11 rounded-xl border-border/50 hover:bg-muted/50 transition-all font-medium">
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button variant="outline" className="h-11 rounded-xl border-border/50 hover:bg-muted/50 transition-all font-medium">
                  <Mail className="mr-2 h-4 w-4" />
                  Google
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
                    <a className="font-bold text-secondary hover:underline underline-offset-4">Sign up</a>
                  </Link>
                </>
              )}
              {mode === "signup" && (
                <>
                  Already have an account?{" "}
                  <Link href="/login">
                    <a className="font-bold text-secondary hover:underline underline-offset-4">Sign in</a>
                  </Link>
                </>
              )}
              {mode === "forgot" && (
                <Link href="/login">
                  <a className="font-bold text-secondary hover:underline underline-offset-4">Back to sign in</a>
                </Link>
              )}
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
