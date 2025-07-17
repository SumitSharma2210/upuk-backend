// api/register.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { full_name, email, phone, Category, institution } = req.body;

  if (!full_name || !email) {
    return res.status(400).json({ error: "Full name and email are required" });
  }

  const { data, error } = await supabase.from("registrations").insert([
    { full_name, email, phone, Category, institution }
  ]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({ message: "Registration successful", data });
}
