import React, { useEffect, useState } from "react";

const Regester = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  //handle submit function to validate email and password
  const handleSubmit = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setMsg("Invalid email format");
      setEmail(" ");
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setMsg(
        "Password must be at least 8 characters long and contain at least one letter and one number",
      );
      setPassword(" ");
      return;
    }
    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      setConfirmPassword(" ");
    }
  };
  return (
    <div className="flex flex-col w-100 h-120 bg-gray-300 p-5 m-5 rounded-md shadow-xl ">
      <h1 className="text-3xl font-bold flex">Register New User:</h1>
      <input
        data-testid="email-input"
        type="Email"
        name="em"
        placeholder="Email"
        className="border-3 border-gray-800 rounded-md p-2 m-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        data-testid="password-input"
        type="Password"
        placeholder="Password"
        className="border-3 border-gray-800 rounded-md p-2 m-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="Password"
        data-testid="confirm-password-input"
        placeholder="Confirm Password"
        className="border-3 border-gray-800 rounded-md p-2 m-2"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <p data-testid="error-message" className="text-red-500 text-2xl m-4 ">
        {msg}
      </p>
      <button
        data-testid="submit-button"
        className="bg-blue-500 text-white px-4 py-2 rounded-md m-2"
        onClick={handleSubmit}
      >
        Register
      </button>
    </div>
  );
};

export default Regester;
