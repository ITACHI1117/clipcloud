"use client";
import { useEffect, useState } from "react";
import {
  Play,
  Upload,
  Zap,
  Search,
  Star,
  ArrowRight,
  Menu,
  X,
  Video,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Download,
  Sparkles,
  Globe,
  Users,
  Clock,
  Hash,
  Music,
  Camera,
  Mic,
  Edit3,
  Filter,
  ChevronRight,
  Smartphone,
  Tablet,
  Monitor,
  Headphones,
  PlaySquare,
  BarChart3,
  Cloud,
  Twitter,
  Instagram,
  Youtube,
  Github,
  MessageSquare,
  PlayCircle,
  Rocket,
  Scissors,
  Wand2,
  Music2,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function CloudClipLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const router = useRouter();

  const AllowedUsers = [
    {
      name: "Family",
      img: "/images/family.jpg",
    },
    {
      name: "Kids",
      img: "/images/kids.jpg",
    },
    {
      name: "Teens",
      img: "/images/teen.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10 animate-float"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background"></div>

        {/* Animated spotlight */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-primary/30 to-chart-2/30 blur-[100px] animate-spotlight"></div>
        </div>
      </div>

      {/* Navigation - Sleek glass morphism */}
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-[15deg] transition-transform duration-300">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                CloudClip
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-4 ml-6">
                <Button
                  onClick={() => router.push("/auth/login")}
                  variant="ghost"
                  className="cursor-pointer hover:bg-accent/50 hover:scale-105 transition-transform"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => router.push("/auth/login")}
                  className="cursor-pointer relative overflow-hidden group bg-gradient-to-r from-primary to-chart-2 text-white shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">Start Clipping</span>
                  <Cloud className="w-4 h-4 ml-2 relative z-10" />
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-chart-2/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden cursor-pointer"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-3">
              <div className="pt-2 space-y-2">
                <Button
                  onClick={() => router.push("/auth/login")}
                  variant="ghost"
                  className="w-full justify-start cursor-pointer"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => router.push("/auth/signup")}
                  className="cursor-pointer w-full bg-gradient-to-r from-primary to-chart-2 text-white"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - 3D tilt effect */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute bottom-32 left-20 w-3 h-3 bg-cyan-400 rounded-full animate-bounce opacity-50"></div>
          <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute bottom-20 right-32 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-30"></div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Column - Content */}
            <div className="text-left space-y-8">
              {/* New headline */}
              <div className="space-y-4">
                <h1 className="text-6xl sm:text-5xl lg:text-8xl font-black tracking-tight leading-none">
                  <span className="block text-white mb-2">Turn</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                    Ideas
                  </span>
                  <span className="block text-white">Into Gold</span>
                </h1>

                <div className="flex items-center gap-2 text-lg text-slate-300">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>The #1 platform for viral content</span>
                </div>
              </div>

              {/* New description */}
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                Transform your raw footage into scroll-stopping content with our
                editing suite. Join{" "}
                <span className="text-blue-400 font-semibold">
                  2.4M creators
                </span>{" "}
                who've already gone viral with Cloudclip.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={() => router.push("/auth/signup")}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 hover:shadow-blue-500/25 hover:scale-[1.02]"
                >
                  <span className="relative z-10 flex items-center">
                    Start Creating Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>
            </div>

            {/* Right Column - Enhanced 3D Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Floating elements with new designs */}
                <div className="absolute -top-16 -left-12 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl animate-float rotate-12 backdrop-blur-sm border border-blue-400/20">
                  <Video className="w-8 h-8 text-white" />
                </div>

                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl animate-float-slow [animation-delay:1s] -rotate-12">
                  <Users className="w-6 h-6 text-white" />
                </div>

                <div className="absolute top-1/2 -left-16 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                  <Globe className="w-6 h-6 text-white" />
                </div>

                {/* Main phone container */}
                <div className="relative w-[320px] md:w-[380px] h-[640px] md:h-[720px]">
                  {/* Phone shadow */}
                  <div className="absolute inset-0 bg-black/40 rounded-[48px] blur-2xl transform translate-y-8 translate-x-4"></div>

                  {/* Phone body */}
                  <div className="relative w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-[48px] p-3 shadow-2xl border border-slate-700/50 backdrop-blur-sm">
                    {/* Screen */}
                    <div className="w-full h-full bg-black rounded-[42px] overflow-hidden relative">
                      {/* Dynamic island */}
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20"></div>

                      {/* Video content */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                        <video
                          src="videos/cloudclip2.mp4"
                          controls={false}
                          autoPlay={true}
                          muted={true}
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />

                        {/* Overlay UI elements */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                          <div className="absolute bottom-8 left-4 right-4 text-white">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2"></div>
                            </div>
                            <div className="flex items-center justify-between text-xs opacity-75"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phone reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[48px] pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Custom animations */}
        <style jsx>{`
          @keyframes gradient-x {
            0%,
            100% {
              background-size: 200% 200%;
              background-position: left center;
            }
            50% {
              background-size: 200% 200%;
              background-position: right center;
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }

          @keyframes float-slow {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-10px) rotate(-5deg);
            }
          }

          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-slow {
            animation: float-slow 8s ease-in-out infinite;
          }

          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }
        `}</style>
      </section>
      {/* Video Showcase Section - Parallax effect */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background z-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute -left-20 -top-20 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/20 to-chart-2/20 blur-[100px] animate-spin-slow"></div>
          <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-chart-3/20 to-chart-4/20 blur-[80px] animate-spin-slow [animation-delay:3s]"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                CloudClip
              </span>{" "}
              is for Everyone
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              CloudClip can be used by anyone and it's for everyone
            </p>
          </div>

          {/* Video grid with hover animations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AllowedUsers.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative group overflow-hidden rounded-2xl shadow-lg"
              >
                <div className="aspect-[9/16] bg-primary flex items-center justify-center">
                  <img
                    src={item.img}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                  <PlayCircle className="w-12 h-12 text-white/50 group-hover:text-white/80 transition-colors" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent  opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-white/80"></p>
                    <div className="flex items-center mt-2 space-x-4 text-sm">
                      <span className="flex items-center">
                        <Cloud className="w-4 h-4 mr-1" />
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={() => router.push("/auth/login")}
              variant="outline"
              size="lg"
              className="group cursor-pointer"
            >
              Explore More
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Animated gradient background */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-chart-2 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to create your next viral clip?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join millions of creators who are shaping the future of short-form
            content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("/auth/signup")}
              size="lg"
              className="cursor-pointer bg-white text-primary hover:bg-white/90 hover:scale-105 transition-transform shadow-xl"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Animated border */}
      <footer className="bg-background border-t border-border/20 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-border-width"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center text-center gap-12">
            <div className="lg:col-span-1">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-full flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  CloudClip
                </span>
              </div>
              <p className="text-muted-foreground mb-6">
                The next-gen platform for short-form content creation and
                sharing.
              </p>
              <div className="flex items-center justify-center space-x-4">
                {[Twitter, Instagram, Youtube, Github].map((Icon, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  >
                    <Icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border/20 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CloudClip. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
