import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        "http://localhost:5000/api/admin/login",

        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/");

    } catch (error) {

      alert("Invalid Credentials");
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-[#0f172a]">

      <form
        onSubmit={handleSubmit}

        className="bg-[#111827] p-10 rounded-3xl w-[400px]"
      >

        <h2 className="text-3xl text-white font-bold mb-8 text-center">

          Admin Login

        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"

          onChange={handleChange}

          className="w-full p-4 rounded-2xl mb-5 bg-[#1e293b] text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"

          onChange={handleChange}

          className="w-full p-4 rounded-2xl mb-5 bg-[#1e293b] text-white"
        />

        <button
          type="submit"

          className="w-full bg-blue-600 py-4 rounded-2xl text-white font-bold"
        >

          Login

        </button>

      </form>

    </div>
  );
}

export default Login;