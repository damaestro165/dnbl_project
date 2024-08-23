"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

import Button from "./Button";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({ email: "", password: "" });

	const validateEmail = (email: string) => {
		return /\S+@\S+\.\S+/.test(email);
	};

	const validatePassword = (password: string) => {
		if (password.length < 6) return "Password must be at least 6 characters";
		if (!/^(?=.*[a-zA-Z])(?=.*\d)/.test(password))
			return "Password must contain both letters and numbers";
		return "";
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newEmail = e.target.value;
		setEmail(newEmail);
		setErrors((prevErrors) => ({
			...prevErrors,
			email: newEmail
				? validateEmail(newEmail)
					? ""
					: "Invalid email format"
				: "Email is required",
		}));
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = e.target.value;
		setPassword(newPassword);
		setErrors((prevErrors) => ({
			...prevErrors,
			password: newPassword
				? validatePassword(newPassword)
				: "Password is required",
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors = {
			email: email
				? validateEmail(email)
					? ""
					: "Invalid email format"
				: "Email is required",
			password: password ? validatePassword(password) : "Password is required",
		};

		setErrors(newErrors);

		if (!newErrors.email && !newErrors.password) {
			// Submit form
			console.log("Form submitted");
		}
	};

	return (
		<div className="flex-1 w-full max-w-full md:max-w-[400px]">
			{/* Heading */}
			<h1 className="heading">Log In</h1>

			{/* Headline */}
			<p className="headline">Enter your credentials to access your account</p>

			{/* Form */}
			<form onSubmit={handleSubmit}>
				<div className="mb-6">
					{/* Email field */}
					<label htmlFor="email" className="label-heading">
						Email Address
					</label>
					<div className="relative">
						<input
							type="email"
							id="email"
							className={`w-full p-4 border ${
								errors.email ? "border-error" : "border-gold-border"
							} rounded-md text-[#101928] placeholder:text-[#98A2B3] text-[14px] leading-[20.3px] focus:outline-none focus:ring-1 focus:ring-btn-gold`}
							placeholder="Enter your email"
							value={email}
							onChange={handleEmailChange}
						/>
						<span className="absolute inset-y-0 right-0 pr-[18px] flex items-center">
							<Mail className="text-gray-light w-5 h-5" />
						</span>
					</div>
					{errors.email && (
						<p className="mt-2 text-error text-sm">{errors.email}</p>
					)}
				</div>

				{/* Password field */}
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
							className={`w-full p-4 border ${
								errors.password ? "border-error" : "border-gold-border"
							} rounded-md text-[#101928] placeholder:text-[#98A2B3] text-[14px] leading-[20.3px] focus:outline-none focus:ring-1 focus:ring-btn-gold`}
							placeholder="Enter your password"
							value={password}
							onChange={handlePasswordChange}
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

				{/* Remember me and forget password */}
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
					<label className="flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							className=" w-5 h-5 border-[1.5px] border-[#D0D5DD] rounded cursor-pointer"
						/>
						<span className="text-sm text-dark-blue font-libre-franklin font-medium">
							Remember me for 30 days
						</span>
					</label>

					<Link
						href="/forget-password"
						className="text-sm text-gold-text font-libre-franklin font-medium hover:underline mt-4 md:mt-0"
					>
						Forgot Password?
					</Link>
				</div>

				{/* Submit form */}
				<Button label="Log into Account" />
			</form>

			<div className="my-6 flex items-center justify-center gap-2">
				<hr className="h-[1px] w-full bg-[#F0F2F5]" />{" "}
				<span className="font-libre-franklin font-normal text-sm text-gray-light text-center inline-block">
					Or
				</span>{" "}
				<hr className="h-[1px] w-full bg-[#F0F2F5]" />
			</div>

			<div className="flex flex-col gap-3 justify-center mb-6">
				<button className="flex justify-center items-center gap-4 p-4 border-[1.5px] border-gray-border rounded-[6px] text-[#344054] hover:text-white hover:bg-btn-gold">
					<FcGoogle className="shrink-0 text-xl" />
					<span className="inline-block font-libre-franklin text-base font-semibold  transition duration-200 ease-in-out transform">
						Continue with Google
					</span>
				</button>

				<button className="flex justify-center items-center gap-4 p-4 border-[1.5px] border-gray-border rounded-[6px] text-[#344054] hover:text-white hover:bg-btn-gold">
					<FcGoogle className="shrink-0 text-xl" />
					<p className="inline-block font-libre-franklin text-base font-semibold transition duration-200 ease-in-out transform">
						Continue with Facebook
					</p>
				</button>
			</div>

			<p className="flex gap-1 justify-center items-center font-libre-franklin font-normal text-sm text-gray-light">
				Are you new here?{" "}
				<Link
					href="/sign-up"
					className="py-1 px-2 font-medium text-gold-text hover:underline"
				>
					Create Account
				</Link>
			</p>
		</div>
	);
}
