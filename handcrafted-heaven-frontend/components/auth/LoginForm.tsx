"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { useModalStore } from "@/context/ModalContext";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";

// Define the validation schema using Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }), // Password is only required, length can be validated on the backend
});

// Define the types for our form data and errors
type FormData = z.infer<typeof loginSchema>;
type FormErrors = {
  [key: string]: string[] | undefined;
};

// Define the props type for the component
interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { openModal, closeModal } = useModalStore();
  const { login } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error for the field being changed
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrors({});

    const validationResult = loginSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      // Display a toast for the first error found
      if (fieldErrors.email) toast.error(fieldErrors.email[0]);
      else if (fieldErrors.password) toast.error(fieldErrors.password[0]);
      return;
    }

    try {
      await login(formData.email, formData.password);
      onSuccess();
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.email
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            value={formData.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby="email-error"
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1">
              {errors.email[0]}
            </p>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.password
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            value={formData.password}
            onChange={handleChange}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby="password-error"
          />
          {errors.password && (
            <p id="password-error" className="text-red-500 text-sm mt-1">
              {errors.password[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>

      <div className="flex justify-between text-sm mt-6">
        <button
          type="button"
          onClick={() => openModal("register")}
          className="text-blue-600 font-semibold hover:underline focus:outline-none"
        >
          Don’t have an account? Sign up
        </button>
        <Link
          href="/auth/forgot-password"
          className="text-blue-600 font-semibold hover:underline focus:outline-none"
          onClick={closeModal}
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
