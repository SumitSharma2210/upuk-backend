import supabase from "../services/supabase.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { data, error } = await supabase.from("registrations").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
}
