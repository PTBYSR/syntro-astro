'use client';

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ⚙️ Initialize Supabase client
const supabaseUrl = "https://noxahoylqoigyqyjorwa.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5veGFob3lscW9pZ3lxeWpvcndhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDIxOTQsImV4cCI6MjA3NjE3ODE5NH0.ueZfCZFhv8H314lCEGTZXN8yuT4g9fmgzKGhjjVZzt4";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DemoForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    work_email: "",
    company_name: "",
    company_size: "1–10 employees",
    message: "",
  });
  const [status, setStatus] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  // 🔧 handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 handle submission
  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("🟢 Form submitted with data:", formData);

  setLoading(true);
  setStatus({ message: "Submitting...", type: "info" });

  try {
    console.log("📤 Sending data to Supabase...");

    const { data, error } = await supabase.from("demo_requests").insert([formData]);

    console.log("📥 Supabase insert response:", { data, error });

    if (error) {
      console.error("❌ Supabase insert failed:", error);
      setStatus({ message: "❌ " + error.message, type: "error" });
      setLoading(false);
      return;
    }

    console.log("✅ Data successfully inserted into Supabase:", data);

    // --- Optional email notification ---
    console.log("📧 Sending confirmation email via /api/sendDemoEmail...");
    const emailResponse = await fetch("/api/sendDemoEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: formData.full_name,
        work_email: formData.work_email,
      }),
    });

    console.log("📨 Email API response status:", emailResponse.status);

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.warn("⚠️ Email API returned an error:", errorText);
    } else {
      console.log("✅ Confirmation email sent successfully.");
    }

    setStatus({
      message: "✅ Demo request submitted successfully!",
      type: "success",
    });

    // --- Reset form fields ---
    setFormData({
      full_name: "",
      work_email: "",
      company_name: "",
      company_size: "1–10 employees",
      message: "",
    });

    console.log("🧹 Form data reset complete.");

  } catch (err) {
    console.error("🔥 Unexpected error occurred during submission:", err);
    setStatus({ message: "❌ Unexpected error: " + err.message, type: "error" });
  } finally {
    console.log("⏹ Submission process finished.");
    setLoading(false);
  }
};


  return (
    <section id="demo" className=" py-24">
        
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 md:gap-10 gap-20  px-6 md:px-12 lg:px-16 items-center">
        {/* LEFT SIDE */}
        {/* LEFT SIDE */}
        <div className="rounded-3xl md:p-12 flex flex-col justify-center text-left">
          <p className="text-sm text-white mb-4">Schedule a demo</p>
          <h2 className="text-4xl mb-6 leading-tight text-white">
            Elevate customer service with intelligent AI automation.
          </h2>
          <p className="text-white mb-10">
            Connect with our team to discover how Sakura delivers exceptional conversational experiences that delight your customers and scale your support operations.
          </p>

          {/* Benefits List */}
          <div className="space-y-8">
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-main-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-white mb-2">Rapid deployment</h3>
                <p className="text-xs text-white">
                  Deploy AI concierges swiftly and connect them to your tech stack effortlessly, achieving measurable impact in weeks instead of quarters.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-main-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <h3 className=" text-white mb-2">Take full control of our AI agents</h3>
                <p className="text-xs text-white">
                  Understand exactly how your AI makes decisions with full explainability, enabling continuous refinement and optimization of agent performance.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-main-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <h3 className=" text-white mb-2">Enterprise reliability</h3>
                <p className="text-xs text-white">
                  Built-in safeguards guarantee consistent, compliant AI interactions that maintain your brand standards across millions of customer conversations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-3xl shadow-xl p-6 py-10  md:p-10">
          <h3 className="text-4xl text-base-900 mb-5">Request a Demo</h3>
          <p className="text-slate-500 text-sm mb-6">
            Fill out the form below and we’ll reach out within 24 hours to
            schedule how we can help.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Jane Doe"
                required
                className="w-full border border-slate-300 focus:border-main-400 focus:ring-main-400 rounded-xl px-4 py-3 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Work Email
              </label>
              <input
                type="email"
                name="work_email"
                value={formData.work_email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
                className="w-full border border-slate-300 focus:border-main-400 focus:ring-main-400 rounded-xl px-4 py-3 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Company Inc."
                required
                className="w-full border border-slate-300 focus:border-main-400 focus:ring-main-400 rounded-xl px-4 py-3 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Monthly Support Tickets
              </label>
              <select
              required
                name="company_size"
                value={formData.company_size}
                onChange={handleChange}
                className="w-full border border-slate-300 focus:border-main-400 focus:ring-main-400 rounded-xl px-4 py-3 text-sm outline-none bg-white"
              >
                <option>less than 100</option>
                <option>101 - 1,000</option>
                <option>1,001 - 10,000</option>
                <option>above 10,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                placeholder="Tell us what you’d like to explore…"
                className="w-full border border-slate-300 focus:border-main-400 focus:ring-main-400 rounded-xl px-4 py-3 text-sm outline-none resize-none"
              ></textarea>
            </div>

            <div className="items-center w-full flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`w-fit px-7 bg-main-400 hover:bg-main-500 text-white font-medium rounded-3xl py-3 transition-all duration-200 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>

          {status.message && (
            <p
              className={`text-center mt-4 text-sm ${
                status.type === "error"
                  ? "text-red-500"
                  : status.type === "success"
                  ? "text-green-600"
                  : "text-slate-600"
              }`}
            >
              {status.message}
            </p>
          )}

          <p className="text-xs text-slate-400 text-center mt-2">
            By submitting, you agree to our privacy policy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoForm;
