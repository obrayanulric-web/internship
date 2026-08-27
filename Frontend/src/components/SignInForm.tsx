import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Input } from "./common/Input";
import { Button } from "./common/Button";
import api from "../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const loginData = new URLSearchParams();

      loginData.append("username", formData.email);
      loginData.append("password", formData.password);

      const response = await api.post("/Auth/login", loginData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log(response.data);

      // Save JWT token
      localStorage.setItem("access_token", response.data.access_token);

      setIsSubmitted(true);

      setFormData({
        email: "",
        password: "",
      });
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            "Something went wrong. Please try again.",
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
      navigate("/")
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-none! border-0 shadow-none">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Sign in to your account
        </h2>
        <p className="mt-1 text-xs text-gray-500 leading-relaxed">
          Welcome back! Enter your details to access your saved properties and
          profile.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-4 bg-emerald-50 rounded-none! border border-emerald-200 text-center">
          <p className="text-xs font-semibold text-emerald-800">
            Signed In Successfully!
          </p>
          <p className="text-[11px] text-emerald-600 mt-0.5">
            Redirecting to your dashboard...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
              {error}
            </div>
          )}
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

          <Button type="submit">
            {loading ? "Logining in..." : "Login"}
          </Button>
        </form>
      )}

      <div className="mt-6 text-center text-xs text-gray-500">
        Don't have an account?{" "}
        <a
          href="/register"
          className="font-semibold text-[#0f382c] hover:underline"
        >
          Register
        </a>
      </div>
    </div>
  );
};
