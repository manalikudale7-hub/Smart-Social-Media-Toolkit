
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function HomePage() {
  return (
    <div style={{
      background: "linear-gradient(to bottom right, #000000, #0f172a)",
      minHeight: "100vh",
      color: "white"
    }}>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div style={{
        textAlign: "center",
        paddingTop: "100px",
        paddingLeft: "20px",
        paddingRight: "20px"
      }}>
        <h1 style={{ fontSize: "60px", fontWeight: "bold" }}>
          Smart Social Media{" "}
          <span style={{
            background: "linear-gradient(to right, #a855f7, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Toolkit
          </span>
        </h1>

        <p style={{
          marginTop: "20px",
          color: "#9ca3af",
          fontSize: "18px"
        }}>
          Generate hashtags, captions, and videos instantly 🚀
        </p>
      </div>

      {/* Feature Cards */}
      <div style={{
  display: "flex",
  justifyContent: "center",
  gap: "40px",
  marginTop: "80px",
  flexWrap: "wrap"
}}>

  {/* Hashtag */}
  <Link to="/Hashtags" style={{ textDecoration: "none" }}>
  <div style={{
    width: "280px",
    background: "#111827",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center"
  }}>
    <h3 style={{ color: "white" }}><b>🔥 Hashtag Generator</b></h3>
    <p style={{ color: "#9ca3af" }}>
      Discover trending hashtags to boost reach and engagement.
    </p>
  </div>
  </Link>

  {/* Caption (Clickable) */}
  <Link to="/captions" style={{ textDecoration: "none" }}>
    <div style={{
      width: "280px",
      background: "#111827",
      padding: "25px",
      borderRadius: "15px",
      textAlign: "center",
      cursor: "pointer"
    }}>
      <h3 style={{ color: "white" }}><b>✨ Caption Generator</b></h3>
      <p style={{ color: "#9ca3af" }}>
        Create scroll-stopping captions with emojis and trending styles.
      </p>
    </div>
  </Link>

  {/* Video */}
  <Link to="/Videos" style={{ textDecoration: "none" }}>
  <div style={{
    width: "280px",
    background: "#111827",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center"
  }}>
    <h3 style={{ color: "white" }}><b>🎬 AI Video Generator</b></h3>
    <p style={{ color: "#9ca3af" }}>
      Generate short videos with voice, captions, and music.
    </p>
  </div>
  </Link>

</div>
      {/* Section 1 */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
        marginTop: "100px",
        padding: "20px",
        flexWrap: "wrap"
      }}>

        <div style={{ maxWidth: "400px" }}>
          <h2 style={{ fontSize: "30px" }}><b>🔥 Trending Hashtags</b></h2>
          <p style={{ color: "#9ca3af", marginTop: "10px" }}>
            Discover trending hashtags. Boost your reach, engagement, 
            and visibility across Instagram, YouTube, and more.
          </p>
        </div>

        <img 
          src= "https://i.pinimg.com/736x/bf/ef/de/bfefde53ac06a8d71423bbdb6faf6250.jpg"
          alt="hashtag"
          style={{
            width: "400px",
            borderRadius: "15px"
          }}
        />

      </div>

      {/* Section 2 */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
        marginTop: "100px",
        padding: "20px",
        flexWrap: "wrap"
      }}>

        <img 
          src="https://i.pinimg.com/736x/87/56/f7/8756f71ef483d94265372636024a5e6f.jpg"
          alt="caption"
          style={{
            width: "400px",
            borderRadius: "15px"
          }}
        />

        <div style={{ maxWidth: "400px" }}>
          <h2 style={{ fontSize: "30px" }}><b>✨ Smart Captions</b></h2>
          <p style={{ color: "#9ca3af", marginTop: "10px" }}>
            Create engaging captions with emojis, tone selection, and trending styles. 
            Perfect for reels, posts, and stories.
          </p>
        </div>

      </div>
      {/* Section 3 - AI Video Generator */}
<div style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "50px",
  marginTop: "100px",
  padding: "20px",
  flexWrap: "wrap"
}}>

  {/* Text */}
  <div style={{ maxWidth: "400px" }}>
    <h2 style={{ fontSize: "30px" }}><b>🎬 Video Generator</b></h2>
    <p style={{ color: "#9ca3af", marginTop: "10px" }}>
      Turn your ideas into stunning short videos.  
      Add voiceovers, captions, and background music automatically.
    </p>
  </div>

  {/* Image */}
  <img 
    src="https://i.pinimg.com/736x/cc/23/4e/cc234e9cfc5df2a95a55090cafed0d3a.jpg"
    alt="video"
    style={{
      width: "400px",
      borderRadius: "15px"
    }}
  />

</div>

    </div>
  );
}