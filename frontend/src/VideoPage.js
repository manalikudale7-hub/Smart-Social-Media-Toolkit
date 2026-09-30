import Navbar from "./Navbar";
import { useState } from "react";

export default function VideoPage() {

  const [videoUrl, setVideoUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [type, setType] = useState("short"); // 👈 NEW

  const handleGenerate = async () => {
    try {
      const text = document.querySelector("input").value;

      const res = await fetch("http://127.0.0.1:8000/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text, type }) // 👈 send type
      });

      const data = await res.json();

      setVideoUrl(data.video_url);
      setCaption(data.caption);

    } catch (err) {
      console.log(err);
    }
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
          Video{" "}
          <span style={{
            background: "linear-gradient(to right, #3b82f6, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Generator
          </span>
        </h1>

        <p style={{ color: "#9ca3af", marginTop: "10px" }}>
          Generate videos with captions & download
        </p>

        {/* INPUT */}
        <input
          placeholder="Describe your video idea..."
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

        {/* 👇 VIDEO TYPE BUTTONS */}
        <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
          <button onClick={() => setType("short")} style={{
            padding: "10px",
            background: type === "short" ? "#2563eb" : "#1f2937",
            color: "white",
            borderRadius: "8px"
          }}>
            Short Video
          </button>

          <button onClick={() => setType("long")} style={{
            padding: "10px",
            background: type === "long" ? "#2563eb" : "#1f2937",
            color: "white",
            borderRadius: "8px"
          }}>
            Long Video
          </button>
        </div>

        {/* GENERATE */}
        <button
          onClick={handleGenerate}
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
          Generate Video
        </button>

        {/* VIDEO */}
        {videoUrl && (
          <>
            <video
              key={videoUrl}
              src={videoUrl}
              controls
              style={{
                marginTop: "30px",
                width: type === "short" ? "300px" : "60%",  // 👈 FIXED SIZE
                height: type === "short" ? "500px" : "auto",
                objectFit: "cover",
                borderRadius: "10px"
              }}
            />

            {/* CAPTION */}
            <p style={{
              marginTop: "15px",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center"
            }}>
              {caption}
            </p>

            {/* DOWNLOAD */}
            <a
              href={videoUrl}
              download
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                borderRadius: "10px",
                background: "#2563eb",
                color: "white",
                textDecoration: "none"
              }}
            >
              Download Video
            </a>
          </>
        )}

      </div>
    </div>
  );
}