import { useState } from "react";
import { auth, googleProvider, githubProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { useEffect } from "react";

interface AuthFormProps {
  mode: "login" | "register";
  onAuthSuccess?: () => void;
  switchMode?: () => void;
}

const sliderImages = [
  "/gallery/1.webp",
  "/gallery/2.webp",
  "/gallery/3.webp",
  "/gallery/4.webp",
  "/gallery/5.webp",
  "/gallery/6.webp",
  "/gallery/7.webp",
  "/gallery/8.webp",
  "/gallery/9.webp",
  "/gallery/10.webp",
  "/gallery/11.webp",
  "/gallery/12.webp",
];

export default function AuthForm({ mode, onAuthSuccess, switchMode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Registration successful! You are now logged in.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful!");
      }
      onAuthSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleProvider = async (provider: any) => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success("Login successful!");
      onAuthSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated BG Slider */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {/* Top row: slides left */}
        <div className="absolute top-0 left-0 w-full h-1/2 flex items-end">
          <div className="flex animate-slider-left min-w-full">
            {[...sliderImages, ...sliderImages].map((img, idx) => (
              <img
                key={"top-" + idx}
                src={img}
                alt="BG Slide"
                className="h-48 md:h-64 w-auto object-cover flex-shrink-0 opacity-80 mx-1 rounded-xl shadow-lg"
                draggable={false}
              />
            ))}
          </div>
        </div>
        {/* Bottom row: slides right */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 flex items-start">
          <div className="flex animate-slider-right min-w-full">
            {[...sliderImages, ...sliderImages].map((img, idx) => (
              <img
                key={"bot-" + idx}
                src={img}
                alt="BG Slide"
                className="h-48 md:h-64 w-auto object-cover flex-shrink-0 opacity-80 mx-1 rounded-xl shadow-lg"
                draggable={false}
              />
            ))}
          </div>
        </div>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-purple-900/60 z-10" />
        <style>{`
          @keyframes sliderLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes sliderRight {
            0% { transform: translateX(0); }
            100% { transform: translateX(50%); }
          }
          .animate-slider-left {
            animation: sliderLeft 40s linear infinite;
          }
          .animate-slider-right {
            animation: sliderRight 40s linear infinite;
          }
        `}</style>
      </div>
      {/* Auth Card */}
      <div className="relative z-20 w-full flex items-center justify-center">
        <Card className="max-w-md w-full mx-auto shadow-2xl border border-white/30 bg-white/40 backdrop-blur-3xl rounded-2xl p-6 md:p-10">
          <CardHeader>
            <div className="flex flex-col items-center gap-2">
              <img src="/logo.png" alt="Logo" className="object-contain mb-4 mx-auto" style={{ width: '500px', maxWidth: '100%' }} />
              <CardTitle className="text-purple-100 text-2xl font-bold text-center">
                {mode === "register" ? "Create Your Account" : "Sign In to Dashboard"}
              </CardTitle>
              <p className="text-purple-300 text-center text-sm">
                {mode === "register" ? "Join and unleash your creativity!" : "Welcome back! Please login to continue."}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="pl-12 bg-slate-800/70 border-purple-500/30 text-purple-200 h-12 rounded-xl text-base focus:ring-2 focus:ring-purple-400/40 transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete={mode === "register" ? "new-password" : "current-password"}
                  className="pl-12 bg-slate-800/70 border-purple-500/30 text-purple-200 h-12 rounded-xl text-base focus:ring-2 focus:ring-purple-400/40 transition-all"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-pink-600 h-12 rounded-xl text-base transition-all duration-200 mt-2" disabled={loading}>
                {loading ? (mode === "register" ? "Registering..." : "Logging in...") : (mode === "register" ? "Register" : "Login")}
              </Button>
            </form>
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-purple-500/20" />
              <span className="mx-2 text-purple-400 text-xs">OR</span>
              <div className="flex-1 h-px bg-purple-500/20" />
            </div>
            <Button variant="outline" className="w-full mb-2 flex items-center justify-center gap-2 border-purple-500/30 text-purple-200 hover:bg-purple-700/10 h-12 rounded-xl text-base transition-all duration-200" onClick={() => handleProvider(googleProvider)} disabled={loading}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-purple-500/30 text-purple-200 hover:bg-purple-700/10 h-12 rounded-xl text-base transition-all duration-200" onClick={() => handleProvider(githubProvider)} disabled={loading}>
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="h-5 w-5" />
              Continue with GitHub
            </Button>
            {switchMode && (
              <div className="mt-4 text-center">
                <button
                  className="text-purple-400 hover:underline text-sm"
                  onClick={switchMode}
                  type="button"
                >
                  {mode === "register"
                    ? "Already have an account? Login"
                    : "Don't have an account? Register"}
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 