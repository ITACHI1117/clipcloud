"use client";
import { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signupSchema";
import { useSignUp } from "@/queries/auth.queries";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function SignUpComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const SubmitQuery = useSignUp();

  const onSubmit = async (data) => {
    SubmitQuery.mutate({
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      password: data.password,
      role: "Consumer",
    });
    setIsLoading(true);
  };

  useEffect(() => {
    if (SubmitQuery.isSuccess) {
      setIsLoading(false);
      toast.success("Sign up successful! Welcome on Board🎉");
      router.push("/auth/login");
    }
  }, [SubmitQuery.isSuccess]);

  useEffect(() => {
    if (SubmitQuery.isPending) {
      setIsLoading(true);
      toast.info("Creating your account...");
    }
  }, [SubmitQuery.isPending]);

  useEffect(() => {
    if (SubmitQuery.isError) {
      setIsLoading(false);
      toast.error("Sign up failed. Please try again.");
      console.error("Sign up error:", SubmitQuery.error);
    }
  }, [SubmitQuery.isError, SubmitQuery.error]);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const passwordChecks = {
    length: password?.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const passwordStrength =
    Object.values(passwordChecks).filter(Boolean).length * 20;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl"
        />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-chart-2 rounded-full flex items-center justify-center shadow-lg">
                <Cloud className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Join CloudClip
          </h1>
          <p className="text-muted-foreground">
            Create your account to start sharing your moments
          </p>
        </div>

        {/* Sign Up Card */}
        <Card className="border border-border/50 bg-card/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                Create Account
              </CardTitle>
              <div className="flex items-center text-xs text-muted-foreground">
                <Shield className="w-3 h-3 mr-1 text-primary" />
                Secure
              </div>
            </div>
            <CardDescription>
              Fill in your details to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstname" className="text-sm font-medium">
                    First Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="John"
                      {...register("firstname")}
                      className="pl-10 h-11 focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  </div>
                  {errors.firstname && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="lastname"
                      type="text"
                      placeholder="Doe"
                      {...register("lastname")}
                      className="pl-10 h-11 focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  </div>
                  {errors.lastname && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastname.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                    className="pl-10 h-11 focus-visible:ring-2 focus-visible:ring-primary/50"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="yourusername"
                    {...register("username")}
                    className="pl-10 h-11 focus-visible:ring-2 focus-visible:ring-primary/50"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                    @
                  </span>
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    {...register("password")}
                    className="pl-10 pr-10 h-11 focus-visible:ring-2 focus-visible:ring-primary/50"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}

                {/* Password strength indicator */}
                {password && (
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Password strength
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {passwordStrength < 40 && "Weak"}
                        {passwordStrength >= 40 &&
                          passwordStrength < 80 &&
                          "Good"}
                        {passwordStrength >= 80 && "Strong"}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          passwordStrength < 40
                            ? "bg-red-500"
                            : passwordStrength < 80
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                    className="pl-10 pr-10 h-11 focus-visible:ring-2 focus-visible:ring-primary/50"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
                {password &&
                  confirmPassword &&
                  password !== confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      Passwords don't match
                    </p>
                  )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white font-medium shadow transition-all duration-300 group"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Sign Up
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Already have an account?
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-11"
              onClick={() => router.push("/auth/login")}
            >
              Sign In
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Help
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2025 CloudClip. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
