
import React, { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    skills: "",
    degree: "",
    stream: "",
    college: "",
    graduationYear: "",
    cgpa: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error.message);
        return;
      }

      if (data) {
        setFormData({
          email: data.email || "",
          phone: data.phone_number || "",
          skills: data.skills ? data.skills.join(", ") : "",
          degree: data.degree || "",
          stream: data.stream || "",
          college: data.college_name || "",
          graduationYear: data.graduation_year || "",
          cgpa: data.cgpa || "",
          linkedin: data.linkedin_url || "",
          github: data.github_url || "",
          portfolio: data.portfolio_url || "",
        });
      } else {
        setFormData((prev) => ({ ...prev, email: user.email }));
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save / Update Profile and redirect to dashboard
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const payload = {
      id: user.id,
      email: formData.email,
      phone_number: formData.phone || null,
      skills: formData.skills
        ? formData.skills.split(",").map((s) => s.trim())
        : null,
      degree: formData.degree || null,
      stream: formData.stream || null,
      college_name: formData.college || null,
      graduation_year: formData.graduationYear
        ? parseInt(formData.graduationYear)
        : null,
      cgpa: formData.cgpa ? parseFloat(formData.cgpa) : null,
      linkedin_url: formData.linkedin || null,
      github_url: formData.github || null,
      portfolio_url: formData.portfolio || null,
    };

    const { error } = await supabase
      .from("profiles")
      .upsert(payload, { onConflict: ["id"] })
      .select();

    setLoading(false);

    if (!error) {
      navigate("/dashboard");
    } else {
      console.error("Error saving profile:", error.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          disabled
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={formData.degree}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="stream"
          placeholder="Stream"
          value={formData.stream}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="college"
          placeholder="College Name"
          value={formData.college}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="graduationYear"
          placeholder="Graduation Year"
          value={formData.graduationYear}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          step="0.01"
          name="cgpa"
          placeholder="CGPA"
          value={formData.cgpa}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="url"
          name="github"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="url"
          name="portfolio"
          placeholder="Portfolio URL"
          value={formData.portfolio}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
