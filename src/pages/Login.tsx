import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";

export default function Login() {
  const navigate = useNavigate();
  return (
    <AuthForm
      mode="login"
      onAuthSuccess={() => navigate("/")}
      switchMode={() => navigate("/register")}
    />
  );
} 