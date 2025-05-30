"use client";
import React, { useState } from "react";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { cn } from "../../lib/utils";
import axios from "axios";
import { useNavigate } from "react-router";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RegisterPage() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/auth/signup`, userInfo)
      .then((response) => {
        alert(response.data.message);
        navigate("/login");
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Registration failed");
        console.error("Register error:", error);
      });
  };

  return (
    <div className="container md:border-1 mt-5 hover:border-pink-600 shadow-input mx-auto w-full max-w-md rounded-none p-4 md:rounded-2xl md:p-8 bg-black">
      <h2 className="text-xl font-bold text-neutral-200">Welcome to Task App</h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-300">Create an account to start using Task App</p>
      <form className="my-8" onSubmit={handleRegister}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            name="username"
            value={userInfo.username}
            onChange={handleInput}
            id="username"
            placeholder="John"
            type="text"
          />
        </LabelInputContainer>

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

        <LabelInputContainer className="mb-8">
          <Label htmlFor="contact">Contact</Label>
          <Input
            name="contact"
            value={userInfo.contact}
            onChange={handleInput}
            id="contact"
            placeholder="03-xxxxxx"
            type="text"
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-zinc-900 to-neutral-600 font-medium text-white shadow"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent to-transparent via-neutral-700" />
      </form>
    </div>
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
