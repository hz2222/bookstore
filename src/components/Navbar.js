"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "example@email.com" && password === "password") {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      localStorage.setItem("isLoggedin", "true");
    } else {
      alert("Hibás email vagy jelszó!");
    }
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedin");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className="w-full flex flex-col ">
      <div className="w-full bg-[#FF9606] px-8 md:px-28 flex gap-2 items-center justify-end">
        <div className="flex gap-2">
          <Image src={"/insta.png"} width={14} height={10} />
          <Image src={"/facebook.png"} width={14} height={10} />
          <Image src={"/twitter.png"} width={14} height={10} />
        </div>
        {isLoggedin ? (
          <div
            onClick={logOut}
            className="flex gap-1 h-full p-2 cursor-pointer bg-gray-100"
          >
            <Image src={"/lock.png"} width={14} height={10} />
            <p className="font-semibold text-black text-sm">LOG OUT</p>
          </div>
        ) : (
          <div
            onClick={toggleLoginModal}
            className="flex gap-1 h-full bg-gray-100 p-2 cursor-pointer"
          >
            <Image src={"/lock.png"} width={14} height={10} />
            <p className="font-semibold text-black text-sm">LOGIN</p>
          </div>
        )}
      </div>
      <div className="w-full bg-white p-4 px-8 md:px-28 flex items-center justify-between">
        
        <Link href="/" className="text-black text-3xl font-semibold">
            LIBRARY
          </Link>
        <div className="md:flex gap-8 items-center justify-between hidden">
          <Link href="/" className="text-sm text-black font-semibold">
            HOMES
          </Link>
          <Link href="/" className="text-sm text-black font-semibold">
            FEATURES
          </Link>
          <Link href="/" className="text-sm text-black font-semibold">
            PAGES
          </Link>
          <Link href="/" className="text-sm text-black font-semibold">
            SHOP
          </Link>
          <Link href="/" className="text-sm text-black font-semibold">
            EVENT
          </Link>
          <Link href="/" className="text-sm text-black font-semibold">
            BLOG
          </Link>
        </div>
        <div className="flex gap-4">
          {isLoggedin ? (
            <>
              <Link href={"/Favourites"}>
                {" "}
                <Image src={"/star.png"} width={30} height={30} />
              </Link>

              <Image src={"/user.png"} width={30} height={30} />
            </>
          ) : null}
        </div>
      </div>
      {showLoginModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg flex flex-col">
            <h2 className="text-2xl text-black font-bold mb-4">Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md p-2 mb-2 text-black"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md p-2 mb-4 text-black"
            />
            <button
              onClick={handleLogin}
              className="bg-[#FF9606] text-white px-4 py-2 mb-2 rounded-md"
            >
              Login
            </button>
            <button onClick={toggleLoginModal} className="ml-2 text-gray-600">
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
