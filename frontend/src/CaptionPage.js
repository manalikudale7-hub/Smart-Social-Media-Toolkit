import { useState } from "react";
import Navbar from "./Navbar";

export default function CaptionPage() {

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("Professional"); // 👈 NEW

  const generateCaption = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/captions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          text: input,
          style: style   // 👈 NEW
        })
      });

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setResult("❌ Error connecting to backend");
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #000000, #0f172a)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}>

        <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>
          Caption{" "}
          <span style={{
            background: "linear-gradient(to right, #a855f7, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Generator
          </span>
        </h1>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your post..."
          style={{
            width: "60%",
            padding: "15px",
            marginTop: "20px",
            borderRadius: "10px",
            border: "1px solid #374151",
            background: "#111827",
            color: "white"
          }}
        />

        {/* ✅ STYLE BUTTONS */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          {["Professional", "Casual", "Funny", "Romantic"].map((item) => (
            <button
              key={item}
              onClick={() => setStyle(item)}   // 👈 IMPORTANT
              style={{
                padding: "10px 15px",
                borderRadius: "10px",
                border: "1px solid #374151",
                background: style === item ? "#a855f7" : "#1f2937",
                color: "white",
                cursor: "pointer"
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={generateCaption}
          style={{
            marginTop: "20px",
            padding: "12px 30px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(to right, #3b82f6, #a855f7)",
            color: "white",
            cursor: "pointer"
          }}
        >
          {loading ? "Generating..." : "Generate Captions"}
        </button>

        {result && (
  <div style={{
    marginTop: "30px",
    background: "#1f2937",
    padding: "20px",
    borderRadius: "10px",
    width: "60%"
  }}>

    {/* ✅ Clean List */}
    {result
      .replace(/["]/g, "")
      .split("\n")
      .filter(line => line.trim() !== "")   // 👈 empty lines remove
      .map((line, index) => (
        <p key={index} style={{ marginBottom: "10px" }}>
          {line}
        </p>
    ))}

    {/* 🔥 Divider */}
    <hr style={{ margin: "20px 0", borderColor: "#374151" }} />

    {/* ✅ Full Paragraph */}
    <p style={{ color: "#9ca3af", fontSize: "14px" }}>
    
    </p>

  </div>
)}
            
      
      </div>
    </div>
  );
}