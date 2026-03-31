"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/shared/ui/Input";
import Button from "@/components/shared/ui/Button";
import Banner from "@/components/shared/marketing/Banner";
import { apiBase } from "@/lib/api";
import type { LoginForm, RegisterForm } from "@/types";

const MyAccount = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  // Login change
  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  // Register change
  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  // Image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setRegisterForm((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Login submit
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${apiBase}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();
      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.data.token);

        // toast.success("Login successful!");
        router.push("/");
      } else {
        // toast.error(res.data.message);
      }
    } catch (err: any) {
    //   toast.error(err.response?.data?.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  // Register submit
  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (registerForm.password !== registerForm.confirmPassword) {
    //   toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (registerForm.password.length < 6) {
    //   toast.error("Password must be at least 6 characters!");
      setLoading(false);
      return;
    }

    if (!registerForm.image) {
    //   toast.error("Upload profile image!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${apiBase}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
        image: registerForm.image,
        }),
      });

      const data = await res.json();
      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.data.token);

        //   toast.success("Registration successful!");
        router.push("/");
      } else {
        // toast.error(res.data.message);
      }
    } catch (err: any) {
    //   toast.error(err.response?.data?.message || "Register error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Banner title="My Account" subTitle="My Account" />

      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
              <button onClick={() => setActiveTab("login")}>
                Login
              </button>
              <button onClick={() => setActiveTab("register")}>
                Register
              </button>
            </div>
          </div>

          {/* LOGIN */}
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit}>
              <Input
                label="Email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
              />

              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
              />

              <Button
                type="submit"
                label={loading ? "Loading..." : "Login"}
              />
            </form>
          )}

          {/* REGISTER */}
          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit}>
              <Input
                label="Username"
                name="username"
                value={registerForm.username}
                onChange={handleRegisterChange}
              />

              <Input
                label="Email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
              />

              <input type="file" onChange={handleImageChange} />

              <Button
                type="submit"
                label={loading ? "Loading..." : "Register"}
              />
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAccount;
