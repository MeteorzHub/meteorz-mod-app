import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { username, age, reason } = req.body;
  if (!username || !age || !reason) return res.status(400).json({ error: "Missing fields" });

  const { data, error } = await supabase.from("applications").insert([{ username, age, reason }]).select();
  if (error) return res.status(500).json({ error: error.message });

  const app = data[0];
  try {
    await fetch(process.env.NEXT_PUBLIC_BOT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(app)
    });
  } catch (err) { console.error(err); }

  res.status(200).json({ success: true });
}
