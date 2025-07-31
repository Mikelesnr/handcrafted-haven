import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/context/ModalContext";

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  const { openModal } = useModalStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "CUSTOMER",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", formData);
      toast.success("✅ Account created! Check your email for verification.");
      onSuccess();
      router.push("/verify-email");
    } catch (error) {
      toast.error("⚠️ Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full border p-2 rounded"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="w-full border p-2 rounded"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <select
        name="role"
        className="w-full border p-2 rounded"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="CUSTOMER">CUSTOMER</option>
        <option value="SELLER">SELLER</option>
      </select>

      <button
        onClick={handleRegister}
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Register
      </button>

      <div className="text-sm text-blue-600 text-center mt-2">
        <button
          type="button"
          onClick={() => openModal("login")}
          className="hover:underline"
        >
          Already have an account? Log in
        </button>
      </div>
    </form>
  );
}
