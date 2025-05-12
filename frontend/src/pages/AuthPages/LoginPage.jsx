import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api";
import '../../Styles/AuthStyle/Auth.css';


export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/Auth/login", {
        email: form.email,
        password: form.password,
      });

      const { token } = res.data;
      localStorage.setItem("token", token);
      login(); 

      
      window.location.href = "/profile";
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
        
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Log in</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />  

          <div className="forgot-password">
              <a href="#">Forgot password?</a>
          </div>

          <div className="checkbox-row">
            <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={form.rememberMe}
              onChange={handleChange}
            />
              Keep me logged in for 30 days
            </label>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn-primary">Sign in</button>

          <div className="divider"><span>OR</span></div>

          <button className="btn-social google"><i className="fa-brands fa-google"></i>Sign in with Google</button>
          <button className="btn-social apple"><i className="fa-brands fa-apple"></i>Sign in with Apple</button>
          <button className="btn-social facebook"><i className="fa-brands fa-facebook"></i>Sign in with Facebook</button>

          <p className="signup-link">
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </form>
    </div>
  );
}