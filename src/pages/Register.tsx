import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";

export default function Register() {
  const navigate = useNavigate();
  return (
    <AuthForm
      mode="register"
      onAuthSuccess={() => navigate("/")}
      switchMode={() => navigate("/login")}
    />
  );
} 