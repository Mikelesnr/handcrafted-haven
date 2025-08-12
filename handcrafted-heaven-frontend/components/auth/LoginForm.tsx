import { useState } from "react";
import toast from "react-hot-toast";
import { useModalStore } from "@/context/ModalContext";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { openModal, closeModal } = useModalStore();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      toast.success("✅ Logged in successfully");
      onSuccess();
    } catch (error) {
      console.error("Login failed", error);
      toast.error("⚠️ Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Login
      </button>

      <div className="flex justify-between text-sm text-blue-600 mt-2">
        <button
          type="button"
          onClick={() => openModal("register")}
          className="hover:underline"
        >
          Don’t have an account? Sign up
        </button>
        <Link
          href="/auth/forgot-password"
          className="hover:underline"
          onClick={closeModal}
        >
          Forgot password?
        </Link>
      </div>
    </form>
  );
}
