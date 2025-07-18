// pages/api/test.js
import supabase from "../services/supabase.js";

export default async function handler(req, res) {
  // Handle preflight (OPTIONS) if needed
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*"); // or restrict
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization"
    );
    return res.status(200).end();
  }

  // CORS headers for actual GET request
  res.setHeader("Access-Control-Allow-Origin", "*"); // or restrict to your frontend origin
  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { data, error } = await supabase.from("registrations").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
}
