
import { useState } from "react";
import Navbar from "./Navbar";

export default function HashtagPage() {

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState("Instagram"); // ✅ NEW
  const [copied, setCopied] = useState(false); // ✅ NEW

  const generateHashtags = async () => {
    setLoading(true);
    setCopied(false); // reset copy state
    try {
      const res = await fetch("http://127.0.0.1:8000/hashtags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          text: input,
          style: platform
        })
      });

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setResult("❌ Error");
    }
    setLoading(false);
  };

  // ✅ COPY FUNCTION
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
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
          Hashtag{" "}
          <span style={{
            background: "linear-gradient(to right, #3b82f6, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Generator
          </span>
        </h1>

        <p style={{ color: "#9ca3af", marginTop: "10px" }}>
          Trending hashtags for your content
        </p>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter keyword or topic..."
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

        {/* Buttons */}
        <div style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {["Instagram", "YouTube", "Twitter", "Pinterest"].map((item) => (
            <button
              key={item}
              onClick={() => setPlatform(item)}
              style={{
                padding: "10px 15px",
                borderRadius: "10px",
                border: "1px solid #374151",
                background: platform === item ? "#a855f7" : "#1f2937",
                color: "white",
                cursor: "pointer"
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={generateHashtags}
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
          {loading ? "Generating..." : "Generate Hashtags"}
        </button>

        {/* Result */}
        {result && (
          <div style={{
            marginTop: "30px",
            background: "#1f2937",
            padding: "20px",
            borderRadius: "10px",
            width: "60%"
          }}>

            {/* ✅ COPY BUTTON */}
            <button
              onClick={copyToClipboard}
              style={{
                marginBottom: "15px",
                padding: "8px 15px",
                borderRadius: "8px",
                border: "none",
                background: "#a855f7",
                color: "white",
                cursor: "pointer"
              }}
            >
              {copied ? "Copied ✅" : "Copy All"}
            </button>

            {result.split(" ").map((tag, index) => (
              <span key={index} style={{
                margin: "5px",
                padding: "8px 12px",
                background: "#111827",
                borderRadius: "10px",
                display: "inline-block"
              }}>
                {tag}
              </span>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}