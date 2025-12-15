import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="text-center max-w-2xl relative">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-8 shadow-xl shadow-primary/20 animate-in fade-in zoom-in duration-500">
          <Shield className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-5xl font-bold text-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Admin Portal
        </h1>
        <p className="text-xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Enterprise-grade authentication and management system
        </p>
        <Button
          onClick={() => navigate("/login")}
          size="lg"
          className="h-12 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 text-lg animate-in fade-in slide-in-from-bottom-12 duration-1000"
        >
          Go to Login
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
