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
              {["Discover", "Create", "Trending", "Pricing"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-chart-2 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <div className="flex items-center space-x-4 ml-6">
                <Button
                  onClick={() => router.push("/auth/login")}
                  variant="ghost"
                  className="hover:bg-accent/50 hover:scale-105 transition-transform"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => router.push("/auth/login")}
                  className="relative overflow-hidden group bg-gradient-to-r from-primary to-chart-2 text-white shadow-lg hover:shadow-xl"
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
              <a
                href="#features"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#creators"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Creators
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </a>
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
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - 3D tilt effect */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-left">
              <Badge className="mb-6 px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary border-primary/20 animate-fade-in">
                <Zap className="w-3 h-3 mr-2 animate-pulse" />
                Join the movement
              </Badge>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight animate-fade-in [animation-delay:100ms]">
                <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  Create
                </span>{" "}
                viral clips <br className="hidden sm:block" />
                in seconds
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed animate-fade-in [animation-delay:200ms]">
                The next-gen platform for short-form content. Powered by AI
                tools to make your content stand out from the crowd.
              </p>

              <div className="flex flex-wrap gap-4 mb-12 animate-fade-in [animation-delay:300ms]">
                <Button
                  onClick={() => router.push("/auth/signup")}
                  size="lg"
                  className="cursor-pointer bg-gradient-to-r from-primary to-chart-2 text-white hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  Get Started Free
                </Button>
              </div>

              {/* Stats with counter animations */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-in [animation-delay:400ms]">
                {[
                  { value: "10M+", label: "Creators" },
                  { value: "500M+", label: "Clips" },
                  { value: "5B+", label: "Daily Views" },
                  { value: "100+", label: "Countries" },
                ].map((stat, i) => (
                  <div key={i} className="group">
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent mb-1">
                      <CountUp
                        end={parseInt(stat.value)}
                        duration={2}
                        delay={0.5 + i * 0.2}
                      />
                      {stat.value.includes("+") && "+"}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - 3D Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end animate-float [animation-delay:500ms]">
              <div className="relative w-[300px] h-[600px] perspective-1000">
                {/* Phone container with 3D transform */}
                <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700 hover:rotate-y-15">
                  {/* Phone front */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-[40px] p-2 shadow-2xl backface-hidden">
                    <div className="w-full h-full bg-black rounded-[36px] overflow-hidden relative">
                      {/* Video feed with parallax effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <div className="text-white text-center px-6 transform translate-z-20">
                          <PlayCircle className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                          <h3 className="text-xl font-bold mb-2">
                            Your Next Viral Clip
                          </h3>
                          <p className="text-sm opacity-80">Tap to create</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone side (3D effect) */}
                  <div className="absolute inset-y-0 left-0 w-4 bg-gray-800 rounded-l-[8px] transform-origin-left rotate-y-90 translate-x-[-4px]"></div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg animate-float-slow">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-float-slow [animation-delay:2s]">
                  <Heart className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Animated cards */}
      <section id="create" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary border-primary/20 inline-flex items-center">
              <Sparkles className="w-3 h-3 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                go viral
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional tools made simple for creators of all levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Scissors className="w-6 h-6" />,
                title: "Smart Video Editor",
                description:
                  "Trim, cut, and merge clips with AI-powered suggestions for perfect timing.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Wand2 className="w-6 h-6" />,
                title: "Magic Effects",
                description:
                  "One-tap professional effects that adapt to your content automatically.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Music2 className="w-6 h-6" />,
                title: "Sound Library",
                description:
                  "Millions of royalty-free tracks and sounds to enhance your videos.",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Instant Analytics",
                description:
                  "Real-time performance metrics to help you understand your audience.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Collaboration",
                description:
                  "Invite others to edit with you in real-time from anywhere.",
                color: "from-yellow-500 to-amber-500",
              },
              {
                icon: <Rocket className="w-6 h-6" />,
                title: "Boost Mode",
                description:
                  "Get your content in front of more viewers with our promotion tools.",
                color: "from-violet-500 to-fuchsia-500",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full border-border/20 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all hover:border-primary/30 overflow-hidden">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {feature.icon}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:text-primary"
                    >
                      Learn more{" "}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
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
              className="group"
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
            {/* 
            {["Product", "Features", "Resources", "Company"].map(
              (heading, i) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold mb-4 text-foreground uppercase tracking-wider">
                    {heading}
                  </h3>
                  <ul className="space-y-3">
                    {Array(4)
                      .fill(0)
                      .map((_, j) => (
                        <li key={j}>
                          <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {heading} Link {j + 1}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              )
            )} */}
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
