import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://YOUR_PROJECT_ID.supabase.co";
const supabaseAnonKey = "YOUR_PUBLIC_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#demoForm");
  const status = document.querySelector("#formStatus");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.classList.remove("hidden");
    status.textContent = "Submitting...";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const { error } = await supabase.from("demo_requests").insert([data]);

    if (!error) {
      await fetch("/api/sendDemoEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: data.full_name,
          work_email: data.work_email,
        }),
      });

      status.textContent = "✅ Demo request submitted successfully!";
      status.classList.add("text-green-600");
      form.reset();
    } else {
      status.textContent = "❌ Something went wrong: " + error.message;
      status.classList.add("text-red-500");
    }
  });
});
