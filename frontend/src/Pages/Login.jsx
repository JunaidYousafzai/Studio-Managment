"use client";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { cn } from "../../lib/utils";
import axios from "axios";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContextProvider";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 0 8px rgba(139,92,246,0.7)" },
  tap: { scale: 0.95 },
};

export default function LoginPage() {

  const { login } = useAuth(); 
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/auth/login`, userInfo)
      .then((response) => {
        alert(response.data.message);
        const { token } = response.data;
        const { email, username } = response.data.user;

        login({ username, email, token });

        navigate("/"); 
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Login failed");
        console.error("Login error:", error);
      });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container md:border-1 hover:border-pink-600 mt-5 shadow-input mx-auto w-full max-w-md rounded-none p-4 md:rounded-2xl md:p-8 bg-black"
    >
      <h2 className="text-xl font-bold text-neutral-200">Welcome to Task App</h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-300">
        Login to Task
      </p>
      <form className="my-8" onSubmit={handleLogin}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            name="email"
            value={userInfo.email}
            onChange={handleInput}
            id="email"
            placeholder="abc@gmail.com"
            type="email"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            value={userInfo.password}
            onChange={handleInput}
            id="password"
            placeholder="••••••••"
            type="password"
          />
        </LabelInputContainer>

        <motion.button
          type="submit"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br to-neutral-600 font-medium text-white shadow bg-zinc-800 from-zinc-900"
        >
          Login &rarr;
          <BottomGradient />
        </motion.button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent to-transparent via-neutral-700" />
        <NavLink to="/register" className="block font-medium text-white text-center">
          Don't have an account?
        </NavLink>
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent to-transparent via-neutral-700" />
      </form>
    </motion.div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-indigo-100 via-purple-400 to-pink-600 opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-indigo-100 via-purple-400 to-pink-600 opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
);
