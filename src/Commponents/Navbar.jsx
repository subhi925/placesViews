import React from 'react'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { Link, useNavigate } from "react-router-dom"; // Router links & navigation

const Navbar = () => {
  return (
    <div className="inline-grid grid-cols-6 gap-4">
      <span className="box-border size-20  p-1 m-2">
        <Link to="/home" className="flex flex-col items-center">
          {" "}
          <DotLottieReact
            src="https://lottie.host/474fef38-a9dc-47ed-84c6-29b405d8c9a5/uitEQkvYjO.lottie"
            loop
            autoplay
          />
          Home
        </Link>
      </span>
      <span className="box-border size-20  p-1 m-2">
        <Link to="/about" className="flex flex-col items-center">
          02
        </Link>
      </span>
      <span className="box-border size-20  p-1 m-2">
        <Link to="/contact" className="flex flex-col items-center">
          03
        </Link>
      </span>
      <span className="box-border size-20  p-1 m-2">
        <Link to="/Regester" className="flex flex-col items-center">
          {" "}
          <DotLottieReact
            src="https://lottie.host/4431a78b-89cd-4309-9bbb-5693b4beda4f/bBA1yjP4bT.lottie"
            loop
            autoplay
          />
          Register
        </Link>
      </span>
      <span className="box-border size-20  p-1 m-2">
        <Link to="/login" className="flex flex-col items-center">
          05
        </Link>
      </span>
      <span className="box-border size-20 border-4 p-1 m-2">
        <Link to="/logout">06</Link>
      </span>
    </div>
  );
}

export default Navbar
