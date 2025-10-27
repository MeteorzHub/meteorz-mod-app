import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ username: "", age: "", reason: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "✅ Submitted!" : "❌ Error");
  };

  return (
    <main style={{ maxWidth: 500, margin: "100px auto", textAlign: "center" }}>
      <h1>Discord Moderator Application</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input placeholder="Discord Username" required onChange={e => setForm({ ...form, username: e.target.value })}/>
        <input type="number" placeholder="Your Age" required onChange={e => setForm({ ...form, age: e.target.value })}/>
        <textarea placeholder="Why do you want to be a mod?" required onChange={e => setForm({ ...form, reason: e.target.value })}/>
        <button type="submit">Submit</button>
      </form>
      <p>{status}</p>
    </main>
  );
  }
