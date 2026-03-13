import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Home",
    path: "/home",
    icon: "https://lottie.host/474fef38-a9dc-47ed-84c6-29b405d8c9a5/uitEQkvYjO.lottie",
  },
  {
    name: "Profile",
    path: "/profile",
    icon: "https://lottie.host/013c99c7-3ddc-4bde-a263-4e0cf11d8432/A2AYTfuE6u.lottie",
  },
  {
    name: "Register",
    path: "/regester",
    icon: "https://lottie.host/4431a78b-89cd-4309-9bbb-5693b4beda4f/bBA1yjP4bT.lottie",
  },
  {
    name: "Login",
    path: "/login",
    icon: "https://lottie.host/4431a78b-89cd-4309-9bbb-5693b4beda4f/bBA1yjP4bT.lottie",
  },
];

const Navbar = () => {
  return (
    <div className="flex justify-center gap-8  text-black p-4">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center transition transform hover:scale-110 ${
              isActive ? "text-blue-400" : ""
            }`
          }
        >
          <DotLottieReact src={item.icon} autoplay loop className="w-15 h-15" />

          <span className="text-sm mt-1">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;
