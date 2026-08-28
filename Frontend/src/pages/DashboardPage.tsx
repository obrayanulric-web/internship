import React, { useState, useEffect } from "react";
import {
  Building2,
  PlusCircle,
  TrendingUp,
  Trash2,
  DollarSign,
  Search,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Home,
  MessageSquare,
  Mail,
  User,
} from "lucide-react";
import api from "../api/axios";
import axios from "axios";
import type { Property } from "../types/property";
import { CreatePropertyForm } from "../components/CreatePropertyForm";
import { PropertyCard } from "../components/PropertyCard";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";

interface MessageItem {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  message: string;
  createdAt?: string;
}

type TabType = "overview" | "listings" | "add-property" | "messages";

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [properties, setProperties] = useState<Property[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [messageSearchTerm, setMessageSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [deletingMessageId, setDeletingMessageId] = useState<number | null>(null);

  const fetchProperties = async () => {
    try {
      setLoadingProperties(true);
      setError("");
      const response = await api.get("/Property/");
      setProperties(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.detail || "Failed to load dashboard properties."
        );
      } else {
        setError("An unexpected error occurred while fetching properties.");
      }
    } finally {
      setLoadingProperties(false);
    }
  };

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const response = await api.get("/Message/");
      setMessages(response.data);
    } catch {
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchMessages();
  }, []);

  const handleDeleteProperty = async (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      setDeletingId(id);
      await api.delete(`/Property/${id}`);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete property. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      setDeletingMessageId(id);
      await api.delete(`/Message/${id}`);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch {
      alert("Failed to delete message. Please try again.");
    } finally {
      setDeletingMessageId(null);
    }
  };

  const totalListings = properties.length;
  const rentListings = properties.filter((p) => p.purpose === "rent").length;
  const saleListings = properties.filter((p) => p.purpose === "sale").length;
  const totalMessages = messages.length;

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMessages = messages.filter(
    (m) =>
      m.email.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
      m.firstname.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
      m.lastname.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
      m.message.toLowerCase().includes(messageSearchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#fafafa] min-h-screen py-6 md:py-12 rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-none">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8 rounded-none">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Manage property listings, user inquiries, and system stats.
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <Button onClick={() => setActiveTab("add-property")} className="p-3">
              <Plus className="w-4 h-4 mr-2 inline" />
              Add New Property
            </Button>
          </div>
        </div>

        <div className="border-b border-gray-200 bg-white mb-6 md:mb-8 rounded-none overflow-x-auto">
          <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 min-w-max" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === "overview"
                  ? "border-[#0f382c] text-[#0f382c]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Overview
            </button>

            <button
              onClick={() => setActiveTab("listings")}
              className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === "listings"
                  ? "border-[#0f382c] text-[#0f382c]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Building2 className="w-4 h-4" />
              My Listings ({totalListings})
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === "messages"
                  ? "border-[#0f382c] text-[#0f382c]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Messages ({totalMessages})
            </button>

            <button
              onClick={() => setActiveTab("add-property")}
              className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === "add-property"
                  ? "border-[#0f382c] text-[#0f382c]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Create Property
            </button>
          </nav>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6 md:space-y-8 rounded-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 rounded-none">
              <div className="bg-white p-5 sm:p-6 border border-gray-200 rounded-none shadow-none flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Total Listings
                  </p>
                  <h3 className="text-2xl font-black text-gray-900">{totalListings}</h3>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-100 text-[#0f382c]">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 border border-gray-200 rounded-none shadow-none flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Inquiries Received
                  </p>
                  <h3 className="text-2xl font-black text-gray-900">{totalMessages}</h3>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-100 text-[#0f382c]">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 border border-gray-200 rounded-none shadow-none flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Rent / Sale
                  </p>
                  <h3 className="text-2xl font-black text-gray-900">
                    {rentListings} / {saleListings}
                  </h3>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-100 text-[#0f382c]">
                  <Home className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 border border-gray-200 rounded-none shadow-none flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    System Status
                  </p>
                  <h3 className="text-2xl font-black text-emerald-700">Active</h3>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-none p-4 sm:p-6 shadow-none">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                    Recent Submissions
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Your most recently published properties.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("listings")}
                  className="text-xs font-bold text-[#0f382c] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  View All
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {loadingProperties ? (
                <div className="p-8 text-center text-xs text-gray-500">
                  Loading recent properties...
                </div>
              ) : properties.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/50 text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                        <th className="py-3 px-4">Property</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs text-gray-800">
                      {properties.slice(0, 5).map((property) => (
                        <tr key={property.id} className="hover:bg-gray-50/50 transition">
                          <td className="py-3 px-4 font-medium text-gray-900">
                            <div className="flex items-center gap-3">
                              <img
                                src={
                                  property.imageUrl ||
                                  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"
                                }
                                alt={property.title}
                                className="w-10 h-10 object-cover rounded-none border border-gray-200 shrink-0"
                              />
                              <span className="truncate max-w-[150px] sm:max-w-[200px]">
                                {property.title}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {property.location}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700">
                              {property.type} ({property.purpose})
                            </span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-900">
                            {property.price.toLocaleString()} {property.currency}
                            {property.pricePeriod ? `/${property.pricePeriod}` : ""}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteProperty(property.id)}
                              disabled={deletingId === property.id}
                              className="text-red-600 hover:text-red-800 p-1.5 transition disabled:opacity-40 cursor-pointer"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center bg-gray-50 border border-dashed border-gray-200">
                  <p className="text-xs text-gray-500 mb-3">No properties listed yet.</p>
                  <Button onClick={() => setActiveTab("add-property")}>
                    Create Your First Property
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "listings" && (
          <div className="space-y-6 rounded-none">
            <div className="bg-white p-4 border border-gray-200 rounded-none shadow-none flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-80">
                <Input
                  id="dashboard-search"
                  type="text"
                  placeholder="Search listings by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search className="w-4 h-4" />}
                />
              </div>

              <span className="text-xs text-gray-500 self-start sm:self-auto">
                Showing <strong>{filteredProperties.length}</strong> of {properties.length} properties
              </span>
            </div>

            {loadingProperties ? (
              <div className="bg-white p-12 border border-gray-200 text-center text-xs text-gray-500">
                Loading your property listings...
              </div>
            ) : error ? (
              <div className="bg-red-50 p-6 border border-red-200 text-center text-xs text-red-700">
                {error}
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 rounded-none">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="relative group flex flex-col">
                    <PropertyCard property={property} />
                    <div className="mt-2 p-2 bg-white border border-gray-200 flex justify-between items-center rounded-none">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5">
                        Active
                      </span>
                      <button
                        onClick={() => handleDeleteProperty(property.id)}
                        disabled={deletingId === property.id}
                        className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 font-semibold transition disabled:opacity-40 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        {deletingId === property.id ? "Deleting..." : "Delete Listing"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 border border-gray-200 text-center space-y-3 rounded-none">
                <h3 className="text-base font-semibold text-gray-800">No properties found</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  {searchTerm
                    ? "No properties match your search term. Try adjusting your query."
                    : "You haven't added any properties to FindHome yet."}
                </p>
                {!searchTerm && (
                  <Button onClick={() => setActiveTab("add-property")}>
                    Add Property Now
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "messages" && (
          <div className="space-y-6 rounded-none">
            <div className="bg-white p-4 border border-gray-200 rounded-none shadow-none flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-80">
                <Input
                  id="message-search"
                  type="text"
                  placeholder="Search messages by sender or email..."
                  value={messageSearchTerm}
                  onChange={(e) => setMessageSearchTerm(e.target.value)}
                  icon={<Search className="w-4 h-4" />}
                />
              </div>

              <span className="text-xs text-gray-500 self-start sm:self-auto">
                Showing <strong>{filteredMessages.length}</strong> of {messages.length} messages
              </span>
            </div>

            {loadingMessages ? (
              <div className="bg-white p-12 border border-gray-200 text-center text-xs text-gray-500">
                Loading client messages...
              </div>
            ) : filteredMessages.length > 0 ? (
              <div className="space-y-4 rounded-none">
                <div className="hidden md:block bg-white border border-gray-200 overflow-hidden shadow-none">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/50 text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                        <th className="py-3 px-4">Sender</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Message</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs text-gray-800">
                      {filteredMessages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-gray-50/50 transition">
                          <td className="py-4 px-4 font-semibold text-gray-900 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              {msg.firstname} {msg.lastname}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-gray-400" />
                              {msg.email}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-700 max-w-md break-words">
                            {msg.message}
                          </td>
                          <td className="py-4 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              disabled={deletingMessageId === msg.id}
                              className="text-red-600 hover:text-red-800 p-1.5 transition disabled:opacity-40 cursor-pointer inline-flex items-center gap-1 font-semibold"
                              title="Delete Message"
                            >
                              <Trash2 className="w-4 h-4" />
                              {deletingMessageId === msg.id ? "Deleting..." : "Delete"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-white border border-gray-200 p-4 rounded-none space-y-3 shadow-none"
                    >
                      <div className="flex items-start justify-between border-b border-gray-100 pb-2">
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">
                            {msg.firstname} {msg.lastname}
                          </h4>
                          <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3 text-gray-400" />
                            {msg.email}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          disabled={deletingMessageId === msg.id}
                          className="text-red-600 hover:text-red-800 p-1 transition disabled:opacity-40 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-gray-700 leading-relaxed bg-gray-50/70 p-3 border border-gray-100">
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 border border-gray-200 text-center bg-gray-50">
                <p className="text-xs text-gray-500">No messages found matching your search.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "add-property" && (
          <div className="bg-white border border-gray-200 p-3 sm:p-6 rounded-none max-w-3xl mx-auto shadow-none">
            <CreatePropertyForm />
          </div>
        )}

      </div>
    </div>
  );
};