import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../fire";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      path: "/home",
      icon: "https://lottie.host/474fef38-a9dc-47ed-84c6-29b405d8c9a5/uitEQkvYjO.lottie",
      show: true,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "https://lottie.host/013c99c7-3ddc-4bde-a263-4e0cf11d8432/A2AYTfuE6u.lottie",
      show: user,
    },

    {
      name: "Register",
      path: "/regester",
      icon: "https://lottie.host/4431a78b-89cd-4309-9bbb-5693b4beda4f/bBA1yjP4bT.lottie",
      show: !user,
    },
    {
      name: "Login",
      path: "/login",
      icon: "https://lottie.host/4431a78b-89cd-4309-9bbb-5693b4beda4f/bBA1yjP4bT.lottie",
      show: !user,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "https://lottie.host/1f13a6f3-0d56-49f2-a20b-5df9c55d223b/0SlFsj2PP6.lottie",
      show: user,
    }
  ];
  //-- Handle Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Signout Error", error); // Log error if any
    }
  };
  const filteredNavItems = navItems.filter((item) => item.show);

  if (loading) {
    return <div className="p-4 h-40"></div>; // Placeholder while loading
  }
  return (
    <div className="flex justify-center gap-8  text-black p-4">
      {filteredNavItems.map((item) =>
        item.name === "Logout" ? (
          <div
            key={item.name}
            onClick={() => handleLogout()}
            className="flex flex-col items-center cursor-pointer transition transform hover:scale-110"
          >
            {" "}
            <DotLottieReact
              src={item.icon}
              loop
              autoplay
              className="w-15 h-15"
            />
            <span className="text-sm mt-1">{item.name}</span>
          </div>
        ) : (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center transition transform hover:scale-110 ${
                isActive ? "text-blue-400" : ""
              }`
            }
          >
            <DotLottieReact
              src={item.icon}
              autoplay
              loop
              className="w-15 h-15"
            />

            <span className="text-sm mt-1">{item.name}</span>
          </NavLink>
        ),
      )}
    </div>
  );
};

export default Navbar;
