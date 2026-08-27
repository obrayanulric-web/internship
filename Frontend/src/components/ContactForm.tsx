import React, { useState } from "react";
import { Input } from "./common/Input";
import { Textarea } from "./common/Textarea";
import { Button } from "./common/Button";
import api from "../api/axios";
import axios from "axios";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/Message/", formData);
      console.log(response.data);

      setIsSubmitted(true);

      setFormData({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        message: formData.message,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail;

        if (Array.isArray(detail)) {
          setError(detail[0]?.msg || "Something went wrong");
        } else if (typeof detail === "string") {
          setError(detail);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-none border border-gray-200">
      {isSubmitted ? (
        <div className="py-8 text-center bg-emerald-50 rounded-none border border-emerald-200">
          <h4 className="text-sm font-semibold text-emerald-800">
            Message Sent!
          </h4>
          <p className="text-xs text-emerald-600 mt-1 max-w-xs mx-auto">
            Thank you for reaching out. Our team will contact you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="firstname"
              name="firstname"
              label="First name"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />

            <Input
              id="lastname"
              name="lastname"
              label="Last name"
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            id="email"
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Textarea
            id="message"
            name="message"
            label="Message"
            rows={4}
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <Button type="submit">
            {loading ? "Sending message..." : "Send message"}
          </Button>
        </form>
      )}
    </div>
  );
};
