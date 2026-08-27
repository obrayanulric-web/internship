import React, { useState } from "react";
import {
  Building2,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Maximize,
  Image,
  PlusCircle,
} from "lucide-react";
import { Input } from "./common/Input";
import { Button } from "./common/Button";
import api from "../api/axios";
import axios from "axios";

export const CreatePropertyForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    city: "Douala",
    currency: "XAF",
    price: "",
    purpose: "sale",
    type: "Apartment",
    bedrooms: "1",
    bathrooms: "1",
    pricePeriod: "month",
    areaSqM: 0,
    imageUrl: "",
    description: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/Property", formData);
      console.log(response.data);

      setIsSubmitted(true);
      setFormData({
        title: "",
        location: "",
        city: "Douala",
        currency: "XAF",
        price: "",
        purpose: "sale",
        type: "Apartment",
        bedrooms: "1",
        bathrooms: "1",
        pricePeriod: "month",
        areaSqM: 0,
        imageUrl: "",
        description: "",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail;

        console.log("Backend validation error:", detail);

        if (Array.isArray(detail)) {
          setError(
            detail
              .map((item) => {
                const field = item.loc?.[item.loc.length - 1];
                return `${field}: ${item.msg}`;
              })
              .join(", "),
          );
        } else if (typeof detail === "string") {
          setError(detail);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full max-w-2xl p-6 sm:p-8 bg-white rounded-none! border-0 shadow-none">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          List a new property
        </h2>
        <p className="mt-1 text-xs text-gray-500 leading-relaxed">
          Fill in the details below to showcase your property to buyers and
          renters on FindHome.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-4 bg-emerald-50 rounded-none! border border-emerald-200 text-center">
          <p className="text-xs font-semibold text-emerald-800">
            Property Listed Successfully!
          </p>
          <p className="text-[11px] text-emerald-600 mt-0.5">
            Your listing is now live for buyers to explore.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
          <Input
            id="title"
            type="text"
            name="title"
            label="Property Title"
            icon={<Building2 className="w-4 h-4" />}
            placeholder="e.g. Modern Luxury Villa with Pool"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="location"
              type="text"
              name="location"
              label="Address / Neighborhood"
              icon={<MapPin className="w-4 h-4" />}
              placeholder="e.g. Bonapriso"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <div className="rounded-none">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-none text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0f382c] focus:bg-white transition"
              >
                <option value="Douala">Douala</option>
                <option value="Yaounde">Yaoundé</option>
                <option value="Kribi">Kribi</option>
                <option value="Limbe">Limbé</option>
                <option value="Bamenda">Bamenda</option>
                <option value="Bafoussam">Bafoussam</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              id="price"
              type="number"
              name="price"
              label="Price (XAF)"
              icon={<DollarSign className="w-4 h-4" />}
              placeholder="e.g. 250000"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <Input
              id="currency"
              type="text"
              name="currency"
              label="currency (XAF)"
              icon={<DollarSign className="w-4 h-4" />}
              placeholder="e.g. 250000"
              value={formData.currency}
              onChange={handleChange}
              required
            />
            <div className="rounded-none">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Price Period
              </label>
              <select
                name="pricePeriod"
                value={formData.pricePeriod}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-none text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0f382c] focus:bg-white transition"
              >
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
              </select>
            </div>

            <div className="rounded-none">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Purpose
              </label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-none text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0f382c] focus:bg-white transition"
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            <div className="rounded-none">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Property Type
              </label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Duplex">Duplex</option>
                <option value="Studio">Studio</option>
                <option value="House">House</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              id="bedrooms"
              type="number"
              name="bedrooms"
              label="Bedrooms"
              icon={<Bed className="w-4 h-4" />}
              placeholder="1"
              value={formData.bedrooms}
              onChange={handleChange}
              required
            />

            <Input
              id="bathrooms"
              type="number"
              name="bathrooms"
              label="Bathrooms"
              icon={<Bath className="w-4 h-4" />}
              placeholder="1"
              value={formData.bathrooms}
              onChange={handleChange}
              required
            />

            <Input
              id="areaSqM"
              type="number"
              name="areaSqM"
              label="Area (m²)"
              icon={<Maximize className="w-4 h-4" />}
              placeholder="e.g. 150"
              value={formData.areaSqM}
              onChange={handleChange}
            />
          </div>
          <Input
            id="imageUrl"
            type="url"
            name="imageUrl"
            label="Image URL"
            icon={<Image className="w-4 h-4" />}
            placeholder="https://images.unsplash.com/..."
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />

          <div className="rounded-none">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <div className="relative rounded-none">
              <textarea
                name="description"
                rows={4}
                placeholder="Describe key features, amenities, and surroundings..."
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-none text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0f382c] focus:bg-white transition resize-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit">
              <PlusCircle className="w-4 h-4 mr-2 inline" />
              {loading ? "Publishing..." : "Publish Listing"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
