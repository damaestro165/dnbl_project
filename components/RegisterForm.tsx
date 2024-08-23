"use client";

import { useState } from "react";
import { User, Eye, EyeOff, Mail } from "lucide-react";
import Link from "next/link";

import Button from "./Button";

export default function RegisterForm() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const validateEmail = (email: string) => {
		return /\S+@\S+\.\S+/.test(email);
	};

	const validatePassword = (password: string) => {
		if (password.length < 6) return "Password must be at least 6 characters";
		if (!/^(?=.*[a-zA-Z])(?=.*\d)/.test(password))
			return "Password must contain both letters and numbers";
		return "";
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		const { value } = e.target;
		switch (field) {
			case "firstName":
				setFirstName(value);
				setErrors((prev) => ({
					...prev,
					firstName: value ? "" : "First name is required",
				}));
				break;
			case "lastName":
				setLastName(value);
				setErrors((prev) => ({
					...prev,
					lastName: value ? "" : "Last name is required",
				}));
				break;
			case "email":
				setEmail(value);
				setErrors((prev) => ({
					...prev,
					email: value
						? validateEmail(value)
							? ""
							: "Invalid email format"
						: "Email is required",
				}));
				break;
			case "password":
				setPassword(value);
				setErrors((prev) => ({
					...prev,
					password: value ? validatePassword(value) : "Password is required",
				}));
				break;
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors = {
			firstName: firstName ? "" : "First name is required",
			lastName: lastName ? "" : "Last name is required",
			email: email
				? validateEmail(email)
					? ""
					: "Invalid email format"
				: "Email is required",
			password: password ? validatePassword(password) : "Password is required",
		};

		setErrors(newErrors);

		if (!Object.values(newErrors).some((error) => error)) {
			// Submit form
			console.log("Form submitted");
		}
	};

	return (
		<div className="flex-1 w-full max-w-full md:max-w-[400px] px-4 md:px-0">
			{/* Heading */}
			<h1 className="heading">Sign Up</h1>

			{/* Headline */}
			<p className="headline">Enter your credentials to create an account</p>

			{/* Form */}
			<form onSubmit={handleSubmit}>
				<div className="mb-6">
					{/* First Name field */}
					<label htmlFor="firstName" className="label-heading">
						First Name <span className="text-error">*</span>
					</label>
					<div className="relative">
						<input
							type="text"
							id="firstName"
							className={`w-full p-4 border ${
								errors.firstName ? "border-error" : "border-gold-border"
							} rounded-md text-[#101928] placeholder:text-[#98A2B3] text-[14px] leading-[20.3px] focus:outline-none focus:ring-1 focus:ring-btn-gold`}
							placeholder="Enter your first name"
							value={firstName}
							onChange={(e) => handleInputChange(e, "firstName")}
						/>
						<span className="absolute inset-y-0 right-0 pr-[18px] flex items-center">
							<User className="text-gray-light w-5 h-5" />
						</span>
					</div>
					{errors.firstName && (
						<p className="mt-2 text-error text-sm">{errors.firstName}</p>
					)}
				</div>

				<div className="mb-6">
					{/* Last Name field */}
					<label htmlFor="lastName" className="label-heading">
						Last Name <span className="text-error">*</span>
					</label>
					<div className="relative">
						<input
							type="text"
							id="lastName"
							className={`w-full p-4 border ${
								errors.lastName ? "border-error" : "border-gold-border"
							} rounded-md text-[#101928] placeholder:text-[#98A2B3] text-[14px] leading-[20.3px] focus:outline-none focus:ring-1 focus:ring-btn-gold`}
							placeholder="Enter your last name"
							value={lastName}
							onChange={(e) => handleInputChange(e, "lastName")}
						/>
						<span className="absolute inset-y-0 right-0 pr-[18px] flex items-center">
							<User className="text-gray-light w-5 h-5" />
						</span>
					</div>
					{errors.lastName && (
						<p className="mt-2 text-error text-sm">{errors.lastName}</p>
					)}
				</div>

				<div className="mb-6">
					{/* Email field */}
					<label htmlFor="email" className="label-heading">
						Email Address <span className="text-error">*</span>
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
							onChange={(e) => handleInputChange(e, "email")}
						/>
						<span className="absolute inset-y-0 right-0 pr-[18px] flex items-center">
							<Mail className="text-gray-light w-5 h-5" />
						</span>
					</div>
					{errors.email && (
						<p className="mt-2 text-error text-sm">{errors.email}</p>
					)}
				</div>

				<div className="mb-8">
					{/* Password field */}
					<label
						htmlFor="password"
						className="block text-sm md:text-base lg:text-lg font-medium text-gray-700 mb-1"
					>
						Password <span className="text-error">*</span>
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
							onChange={(e) => handleInputChange(e, "password")}
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

				{/* Submit form */}
				<Button label="Create Account" />
			</form>

			<p className="flex gap-1 justify-center items-center font-libre-franklin font-normal text-sm text-gray-light mt-6">
				Already have an account?
				<Link
					href="/sign-in"
					className="py-1 px-2 font-medium text-gold-text hover:underline"
				>
					Log in
				</Link>
			</p>
		</div>
	);
}
