import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register", inputs);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleRegister} className="myform">
        <h3>Form Registration</h3>
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          required
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          required
        />
        <label htmlFor="password_confirmation">confirm password</label>
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          onChange={handleChange}
          required
        />
        <small>
          sudah punya akun? <a href="/login">login</a>
        </small>
        <button type="submit">register</button>
      </form>
    </div>
  );
};

export default Register;
