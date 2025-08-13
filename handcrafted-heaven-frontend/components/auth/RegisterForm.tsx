"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useModalStore } from "@/context/ModalContext";
import { z } from "zod";

// Define the validation schema using Zod
const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
    role: z.enum(["CUSTOMER", "SELLER"], {
      message: "Please select a valid role.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// Define the types for our form data and errors
type FormData = z.infer<typeof registerSchema>;
type FormErrors = {
  [key: string]: string[] | undefined;
};

// Define the props type for the component
interface RegisterFormProps {
  onSuccess: () => void;
}

// RegisterForm Component
export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register } = useAuth();
  const { openModal } = useModalStore();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "CUSTOMER",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Type the event to ensure we are handling the correct element types
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error for the field being changed
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  // Type the form event
  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Client-side validation with Zod
    const validationResult = registerSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      // Display a toast for the first error found
      if (fieldErrors.name) toast.error(fieldErrors.name[0]);
      else if (fieldErrors.email) toast.error(fieldErrors.email[0]);
      else if (fieldErrors.password) toast.error(fieldErrors.password[0]);
      else if (fieldErrors.confirmPassword)
        toast.error(fieldErrors.confirmPassword[0]);
      else if (fieldErrors.role) toast.error(fieldErrors.role[0]);
      return;
    }

    try {
      await register(formData);
      // The register function handles success toast notifications.
      // After successful registration and state update, we can close the modal or redirect.
      onSuccess(); // Calling the onSuccess prop
    } catch (error) {
      // The register function in the context handles toast notifications for errors.
      console.error("Registration failed from form:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.name
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            value={formData.name}
            onChange={handleChange}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby="name-error"
          />
          {errors.name && (
            <p id="name-error" className="text-red-500 text-sm mt-1">
              {errors.name[0]}
            </p>
          )}
        </div>
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
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            value={formData.confirmPassword}
            onChange={handleChange}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            aria-describedby="confirmPassword-error"
          />
          {errors.confirmPassword && (
            <p id="confirmPassword-error" className="text-red-500 text-sm mt-1">
              {errors.confirmPassword[0]}
            </p>
          )}
        </div>
        <div>
          <select
            name="role"
            className={`w-full border p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 transition-colors ${
              errors.role
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            value={formData.role}
            onChange={handleChange}
            aria-invalid={errors.role ? "true" : "false"}
            aria-describedby="role-error"
          >
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="SELLER">SELLER</option>
          </select>
          {errors.role && (
            <p id="role-error" className="text-red-500 text-sm mt-1">
              {errors.role[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Register
        </button>
      </form>

      <div className="flex justify-center text-sm mt-6">
        <button
          type="button"
          onClick={() => openModal("login")}
          className="text-blue-600 font-semibold hover:underline focus:outline-none"
        >
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
}
