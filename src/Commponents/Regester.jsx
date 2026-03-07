import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../fire"; // Importing auth from firebase configuration

const Regester = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // State to manage email and password inputs
  const [confirmPassword, setConfirmPassword] = useState(""); // State to manage confirm password input
  const [msg, setMsg] = useState(""); // State to manage error or success messages

  const [disableBtn, setDisableBtn] = useState(false); // State to manage button disable status
  const [loading, setLoading] = useState(false); // State to manage loading status
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  //handle submit function to validate email and password
  const handleSubmit = async (e) => {
    if (loading) return;
    setMsg(""); // Clear previous messages
    e.preventDefault();
    let cleanEmail = email.trim().toLowerCase(); // Trim and convert email to lowercase
    let cleanPassword = password.trim(); // Trim password
    let cleanConfirmPassword = confirmPassword.trim(); // Trim confirm password
    if (!cleanEmail || !cleanPassword || !cleanConfirmPassword) {
      return setMsg("All fields are required");
    }
    if (!emailRegex.test(cleanEmail)) {
      return setMsg("Invalid email format");
    }

    if (!passwordRegex.test(cleanPassword)) {
      return setMsg(
        "Password must be at least 8 characters long and contain at least one letter and one number",
      );

      
    }
    if (cleanPassword !== cleanConfirmPassword) {
      return setMsg("Passwords do not match");
    }
    // checking if the email is already registered
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);
      setDisableBtn(true);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMsg("Email is already registered Go to Login page");
        setDisableBtn(false);
      } else {
        setMsg("Registration failed. Please try again.");
        setDisableBtn(false);
      }
    } finally {
      setLoading(false);
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
      {!loading && !disableBtn ? (
        <button
          data-testid="submit-button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md m-2"
          onClick={handleSubmit}
        >
          Register
        </button>
      ) : (
        loading && (
          <DotLottieReact
            src="https://lottie.host/d3e0946d-8f57-4ae4-bebc-447d1b7da81e/PJYLqsvPxH.lottie"
            loop
            autoplay
          />
        )
      )}
      {!loading && disableBtn && (
        <p data-testid="success-message" className="text-green-500 text-xl m-4">
          Registration successful!
        </p>
      )}
    </div>
  );
};

export default Regester;
