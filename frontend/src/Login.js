import { useState } from "react";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    const adminEmail = localStorage.getItem("adminEmail");
    const adminPassword = localStorage.getItem("adminPassword");

    // 👑 ADMIN LOGIN
    if (email === adminEmail && password === adminPassword) {
      alert("Admin Login 👑");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");
      window.location.href = "/home";
      return;
    }

    // ❌ empty check
    if (!email || !password) {
      alert("Enter email & password ❌");
      return;
    }

    // ❌ wrong email
    if (email !== savedEmail) {
      alert("Invalid Email ❌");
      return;
    }

    // ❌ wrong password
    if (password !== savedPassword) {
      alert("Wrong Password ❌");
      return;
    }

    // ✅ USER LOGIN
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "user");

    alert("Login Successful ✅");

    window.location.href = "/home";
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
          Login
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

        <button onClick={handleLogin} style={btnStyle}>
          Login
        </button>

        <p style={{ color: "#9ca3af", textAlign: "center" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => window.location.href="/signup"}   // ✅ FIXED
            style={{ color: "#3b82f6", cursor: "pointer" }}
          >
            Sign Up
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