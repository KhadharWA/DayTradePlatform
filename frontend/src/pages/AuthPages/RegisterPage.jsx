import React, { useState } from "react";
import '../../Styles/AuthStyle/Auth.css';
import { useAuth } from "../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import api from "../../api";
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
    terms : true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.terms) return alert("You must accept the terms.");
  
    console.log("📤 Sending formData to backend:", formData);
  
    try {
      const response = await api.post("/Account/register", formData);
      console.log("✅ Registration success:", response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("❌ Registration failed:", error);
  
      if (error.response) {
        console.log("📥 Response from backend:", error.response.data);
        alert(error.response.data?.error || "Registration failed (bad request)");
      } else {
        alert("No response from server");
      }
    }
  };



  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-box">
        <h2>Join Us</h2>
        <button type="button" className="google-btn"><i className="fa-brands fa-google"></i>Continue with Google</button>
        <div className="divider">Or</div>

        <input type="text" name="firstName" placeholder="First name" required value={formData.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last name" required value={formData.lastName} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" required value={formData.confirmPassword} onChange={handleChange} />

        <label className="checkbox-row">
          <input type="checkbox" name="termsAndConditions" checked={formData.termsAndConditions} onChange={handleChange} />
          I accept the <a href="#">Terms & Conditions</a> and <a href="#">Risk Disclosure</a>
        </label>

        <button type="submit" className="submit-btn">Create Account</button>

        <div className="switch-auth">
          Have an account? <a href="/login">Sign in</a>
        </div>

        <small className="disclaimer">
          All trading involves risk. Only risk capital you’re prepared to lose.
        </small>
      </form>
    </div>
  );
}