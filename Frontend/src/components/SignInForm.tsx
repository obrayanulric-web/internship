import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Input } from "./common/Input";
import { Button } from "./common/Button";
import api from "../api/axios";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Signing in...");

    try {
      const loginData = new URLSearchParams();
      loginData.append("username", formData.email);
      loginData.append("password", formData.password);

      const response = await api.post("/Auth/login", loginData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const token = response.data.access_token;
      localStorage.setItem("access_token", token);

      const meResponse = await api.get("/Auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("user", JSON.stringify(meResponse.data));
      window.dispatchEvent(new Event("authChange"));

      toast.success("Signed in successfully!", { id: toastId });

      const destination = meResponse.data?.is_admin ? "/admin/dashboard" : "/";
      setTimeout(() => {
        navigate(destination, { replace: true });
      }, 300);
    } catch (err: unknown) {
      console.error(err);
      let errorMessage = "An unexpected error occurred.";
      if (axios.isAxiosError(err)) {
        errorMessage =
          err.response?.data?.detail ||
          "Something went wrong. Please try again.";
      }
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-none border-0 shadow-none">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Sign in to your account
        </h2>
        <p className="mt-1 text-xs text-gray-500 leading-relaxed">
          Welcome back! Enter your details to access your saved properties and profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          type="email"
          name="email"
          label="Email"
          icon={<Mail className="w-4 h-4" />}
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          id="password"
          type="password"
          name="password"
          label="Password"
          icon={<Lock className="w-4 h-4" />}
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="mt-6 text-center text-xs text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-[#0f382c] hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
};