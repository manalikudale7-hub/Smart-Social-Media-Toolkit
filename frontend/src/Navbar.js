import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div style={{
      width: "100%",
      background: "#0b0f1a",
      borderBottom: "1px solid #1f2937",
      display: "flex",
      justifyContent: "center"
    }}>

      <div style={{
        width: "90%",
        maxWidth: "1200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 0"
      }}>

        {/* Logo */}
        <h2
          onClick={() => navigate("/")}
          style={{ color: "white", cursor: "pointer" }}
        >
          ✨ Social
        </h2>

        {/* Menu */}
        <div style={{
          display: "flex",
          gap: "30px",
          color: "#9ca3af"
        }}>
          <span onClick={() => navigate("/home")}>Home</span>
          <span onClick={() => navigate("/hashtags")}>Hashtags</span>
          <span onClick={() => navigate("/captions")}>Captions</span>
          <span onClick={() => navigate("/videos")}>Videos</span>
        </div>

        {/* Button */}
        {isLoggedIn ? (
          <button onClick={handleLogout} style={btnStyle}>
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/login")} style={btnStyle}>
            Sign In
          </button>
        )}

      </div>
    </div>
  );
}

const btnStyle = {
  padding: "10px 20px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(to right, #3b82f6, #a855f7)",
  color: "white",
  cursor: "pointer"
};