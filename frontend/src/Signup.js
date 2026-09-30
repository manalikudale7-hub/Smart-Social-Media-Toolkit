import { useState } from "react";

export default function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {

    if (!email.includes("@")) {
      alert("Invalid Email ❌");
      return;
    }

    if (password.length < 5) {
      alert("Password must be at least 5 characters ❌");
      return;
    }

    // ✅ save user
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    // 👑 ADMIN SET (first user only)
    const isAdminExist = localStorage.getItem("adminEmail");

    if (!isAdminExist) {
      localStorage.setItem("adminEmail", email);
      localStorage.setItem("adminPassword", password);
    }

    alert("Signup Successful ✅");

    window.location.href = "/login";
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to bottom right, #000000, #0f172a)"
    }}>

      <div style={{
        width: "350px",
        padding: "30px",
        borderRadius: "12px",
        background: "#111827",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>

        <h2 style={{ color: "white", textAlign: "center" }}>
          Sign Up
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleSignup} style={btnStyle}>
          Sign Up
        </button>

        <p style={{ color: "#9ca3af", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            onClick={() => window.location.href="/login"}
            style={{ color: "#3b82f6", cursor: "pointer" }}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #374151",
  background: "#1f2937",
  color: "white"
};

const btnStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(to right, #3b82f6, #a855f7)",
  color: "white",
  cursor: "pointer"
};