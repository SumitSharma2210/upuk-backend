// api/register.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // For testing; restrict later if needed
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization'
    );
    return res.status(200).end();
  }

  // Set CORS headers for actual POST request
  res.setHeader('Access-Control-Allow-Origin', '*'); // For testing; restrict in production
  res.setHeader('Access-Control-Allow-Credentials', true);

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
