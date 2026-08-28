import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  LogOut,
  Edit3,
  Check,
  Building2,
  Lock,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    toast.success("Successfully logged out.");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/users/me");
        setUser(response.data);
        setFormData({ name: response.data.name, email: response.data.email });
      } catch {
        const rawUser = localStorage.getItem("user");
        if (rawUser) {
          try {
            const parsed = JSON.parse(rawUser);
            setUser(parsed);
            setFormData({ name: parsed.name || "", email: parsed.email || "" });
          } catch {
            handleLogout();
          }
        } else {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const toastId = toast.loading("Updating profile...");

    try {
      const response = await api.put("/users/me", formData);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.dispatchEvent(new Event("authChange"));
      setIsEditing(false);
      
      toast.success("Profile updated successfully!", { id: toastId });
    } catch {
      toast.error("Failed to update profile. Please try again.", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
        <div className="text-xs text-gray-500 uppercase tracking-widest animate-pulse font-semibold">
          Loading User Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen py-8 md:py-12 rounded-none">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-6 md:mb-8 border-b border-gray-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Account Profile
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Manage your personal information and account settings.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 border border-red-200 bg-white text-xs font-bold text-red-600 hover:bg-red-50 transition cursor-pointer self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Admin Dashboard Navigation Bar (Visible only for Admins) */}
        {user?.is_admin && (
          <div className="mb-6 p-4 bg-[#0f382c] text-white flex items-center justify-between rounded-none shadow-none">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">
                  Admin Privileges Granted
                </p>
                <p className="text-[11px] text-gray-300">
                  You have full management access to system listings and users.
                </p>
              </div>
            </div>
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#0f382c] text-xs font-bold hover:bg-gray-100 transition"
            >
              Go to Dashboard
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        <div className="space-y-6">
          {/* User Summary Header */}
          <div className="bg-white border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-none">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#0f382c] text-white flex items-center justify-center text-xl font-black uppercase shrink-0">
                {user?.name ? user.name.charAt(0) : "U"}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  {user?.name}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider border ${
                user?.is_admin
                  ? "bg-purple-50 text-purple-700 border-purple-200"
                  : "bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              {user?.is_admin ? "Administrator" : "Standard User"}
            </span>
          </div>

          {/* User Profile Form */}
          <div className="bg-white border border-gray-200 p-6 shadow-none">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Personal Information
              </h3>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f382c] hover:underline cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <Input
                  id="profile-name"
                  type="text"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  icon={<User className="w-4 h-4 text-gray-400" />}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <Input
                  id="profile-email"
                  type="email"
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  icon={<Mail className="w-4 h-4 text-gray-400" />}
                />
              </div>

              {isEditing && (
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user?.name || "",
                        email: user?.email || "",
                      });
                    }}
                    className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button type="submit" disabled={saving}>
                    <Check className="w-4 h-4 mr-1 inline" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              )}
            </form>
          </div>

          {/* Quick Actions / Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/properties"
              className="bg-white border border-gray-200 p-5 hover:border-[#0f382c] transition group shadow-none"
            >
              <div className="flex items-center justify-between mb-2">
                <Building2 className="w-5 h-5 text-[#0f382c]" />
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">Browse Properties</h4>
              <p className="text-xs text-gray-500 mt-1">
                Explore current market listings and housing options.
              </p>
            </Link>

            <div className="bg-white border border-gray-200 p-5 opacity-70 shadow-none">
              <div className="flex items-center justify-between mb-2">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">Security & Password</h4>
              <p className="text-xs text-gray-500 mt-1">
                Password update management is controlled via authentication services.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};