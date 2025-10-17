"use client";

import { setToken } from "@/_utils/cookies";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { loginApi, signupApi } from "@/network/Api";
import { LuUserRound } from "react-icons/lu";
import { useFormik } from "formik";
import * as Yup from "yup";

const Auth = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: isSignup ? Yup.string().required("Name is required") : Yup.string(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(3, "Password must be at least 3 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setError("");
      setLoading(true);

      try {
        if (isSignup) {
          const { data } = await signupApi(values);
          console.log(data);

          setToken(data.token);
        } else {
          const { data } = await loginApi({
            email: values.email,
            password: values.password,
          });
          console.log(data);

          setToken(data.token);
        }
        router.push("/");
      } catch (error: any) {
        setError(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-50 text-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="relative w-16 h-16 overflow-hidden border border-gray-300 rounded-full bg-gray-100">
            <LuUserRound className="h-full w-full text-[#6B7280] p-1" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            {isSignup ? "Sign up" : "Sign in"}
          </h1>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          autoComplete={isSignup ? "off" : "on"}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading
              ? isSignup
                ? "Signing up..."
                : "Signing in..."
              : isSignup
              ? "Sign up"
              : "Sign in"}
          </button>

          <div className="text-center text-sm">
            {isSignup ? (
              <>
                <span className="text-gray-500">Already have an account? </span>
                <button
                  type="button"
                  className="text-blue-600 hover:underline font-medium"
                  onClick={() => setIsSignup(false)}
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                <span className="text-gray-500">Don't have an account? </span>
                <button
                  type="button"
                  className="text-blue-600 hover:underline font-medium"
                  onClick={() => setIsSignup(true)}
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
