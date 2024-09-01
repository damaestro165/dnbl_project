"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Button from "./Button";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from 'next/navigation';
import * as z from "zod";
import GoogleSignInError from "./auth/AuthError";

// Define Zod schema for form validation
const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters")
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, "Password must contain both letters and numbers"),
});

// TypeScript types inferred from Zod schema
type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [signInError, setSignInError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = LoginSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = validation.error.format();
      setErrors({
        email: fieldErrors.email?._errors[0] || "",
        password: fieldErrors.password?._errors[0] || "",
      });
      return;
    }

    setLoading(true);

    const signInResponse = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (signInResponse && !signInResponse.ok) {
      setSignInError(signInResponse.error || 'Something went wrong.');
      setLoading(false);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="flex-1 w-full max-w-full md:max-w-[400px]">
      <h1 className="heading">Log In</h1>
      <p className="headline">Enter your credentials to access your account</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="label-heading">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full p-4 border ${
                errors.email ? "border-error" : "border-gold-border"
              } rounded-md text-[#101928] placeholder:text-[#98A2B3] text-[14px] leading-[20.3px] focus:outline-none focus:ring-1 focus:ring-btn-gold`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <span className="absolute inset-y-0 right-0 pr-[18px] flex items-center">
              <Mail className="text-gray-light w-5 h-5" />
            </span>
          </div>
          {errors.email && (
            <p className="mt-2 text-error text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm md:text-base lg:text-lg font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className={`w-full p-4 border ${
                errors.password ? "border-error" : "border-gold-border"
              } rounded-md text-[#101928] placeholder:text-[#98A2B3] text-[14px] leading-[20.3px] focus:outline-none focus:ring-1 focus:ring-btn-gold`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-[18px] flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="text-gray-light w-5 h-5" />
              ) : (
                <Eye className="text-gray-light w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-error text-sm">{errors.password}</p>
          )}
        </div>

        {signInError && (
          <div className="text-red-600 mb-2">
            {signInError}
          </div>
        )}

        <Button loading={loading} label={loading ? "Loging ..." : "Log into Account"}  />
      </form>

      <div className="my-6 flex items-center justify-center gap-2">
        <hr className="h-[1px] w-full bg-[#F0F2F5]" />
        <span className="font-libre-franklin font-normal text-sm text-gray-light text-center inline-block">
          Or
        </span>
        <hr className="h-[1px] w-full bg-[#F0F2F5]" />
      </div>

      <div className="flex flex-col gap-3 justify-center mb-6">
        <button onClick={() => signIn('google', { callbackUrl })} className="flex justify-center items-center gap-4 p-4 border-[1.5px] border-gray-border rounded-[6px] text-[#344054] hover:text-white hover:bg-btn-gold">
          <FcGoogle className="shrink-0 text-xl" />
          <span className="inline-block font-libre-franklin text-base font-semibold transition duration-200 ease-in-out transform">
            Continue with Google
          </span>
        </button>
        <GoogleSignInError />

        {/* <button className="flex justify-center items-center gap-4 p-4 border-[1.5px] border-gray-border rounded-[6px] text-[#344054] hover:text-white hover:bg-btn-gold">
          <FcGoogle className="shrink-0 text-xl" />
          <p className="inline-block font-libre-franklin text-base font-semibold transition duration-200 ease-in-out transform">
            Continue with Facebook
          </p>
        </button> */}
      </div>

      <p className="flex gap-1 justify-center items-center font-libre-franklin font-normal text-sm text-gray-light">
        Are you new here?{" "}
        <Link href="/sign-up" className="py-1 px-2 font-medium text-gold-text hover:underline">
          Create Account
        </Link>
      </p>
    </div>
  );
}
