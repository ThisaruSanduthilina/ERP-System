import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from "@/contexts/AuthContext";
import { MessageCircle, ArrowRight } from "lucide-react";
import { LoginFormFields } from "./LoginFormFields";
import { GoogleLoginButton } from "./GoogleLoginButton";

// This should be your Google Client ID from the Google Cloud Console
const GOOGLE_CLIENT_ID = "1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com";

export const LoginForm = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(identifier, password, rememberMe);
      
      if (success) {
        toast({
          title: "Login successful",
          description: (
            <div className="flex items-center gap-2">
              Welcome back! Use our AI assistant <MessageCircle className="h-4 w-4" /> <ArrowRight className="h-4 w-4" />
            </div>
          ),
          duration: 6000,
          className: "left-0 bottom-4 fixed max-w-[20%]",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Invalid credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-[#1A1F2C]">Login</h1>
          <p className="text-[#403E43]">Enter your credentials to access your account.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <LoginFormFields
            identifier={identifier}
            setIdentifier={setIdentifier}
            password={password}
            setPassword={setPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            isLoading={isLoading}
          />

          <Button 
            type="submit" 
            className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-[#9F9EA1]">
              Or
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleLoginButton />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};