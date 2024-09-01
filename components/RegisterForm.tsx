"use client";

import { useState } from "react";
import { User, Eye, EyeOff, Mail } from "lucide-react";
import Link from "next/link";
import Button from "./Button";
import signUpAction from "./signUpAction";
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[] | undefined>>({});
   const [strapiErrors, setstrapiErrors] = useState<string>('');
  
function ConfirmationError() {
  return (
    <p>
      It looks like you {"haven't"} confirmed your email yet. Check your email
      client for a confirmation email. Did not find it?{' '}
      <Link href='/confirmation/newrequest' className='underline'>
        Resend the confirmation email.
      </Link>
    </p>
  );
}


  const router = useRouter();

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const plainData = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const result = await signUpAction(plainData);

    if (result.error) {
        setstrapiErrors(result.message);

        setIsLoading(false);
    } else {
        router.push('/confirmation/message');
    }
};


  return (
    <div className="flex-1 w-full max-w-full md:max-w-[400px] px-4 md:px-0">
      <h1 className="heading">Sign Up</h1>
      <p className="headline">Enter your credentials to create an account</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="firstName" className="label-heading">
            First Name <span className="text-error">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={`w-full p-4 border ${
                formErrors.firstName ? "border-error" : "border-gold-border"
              } rounded-md text-[#101928] placeholder:text-[#98A2B3] text-[14px] leading-[20.3px] focus:outline-none focus:ring-1 focus:ring-btn-gold`}
              placeholder="Enter your first name"
              required
            />
            <span className="absolute inset-y-0 right-0 pr-[18px] flex items-center">
              <User className="text-gray-light w-5 h-5" />
            </span>
          </div>
          {formErrors.firstName && (
            <p className="mt-2 text-error text-sm">{formErrors.firstName[0]}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="lastName" className="label-heading">
            Last Name <span className="text-error">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="lastName"
              name="lastName"
              className={`w-full p-4 border ${
                formErrors.lastName ? "border-error" : "border-gold-border"
              } rounded-md text-[#101928] placeholder:text-[#98A2B3] text-[14px] leading-[20.3px] focus:outline-none focus:ring-1 focus:ring-btn-gold`}
              placeholder="Enter your last name"
              required
            />
            <span className="absolute inset-y-0 right-0 pr-[18px] flex items-center">
              <User className="text-gray-light w-5 h-5" />
            </span>
          </div>
          {formErrors.lastName && (
            <p className="mt-2 text-error text-sm">{formErrors.lastName[0]}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="label-heading">
            Email Address <span className="text-error">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full p-4 border ${
                formErrors.email ? "border-error" : "border-gold-border"
              } rounded-md text-[#101928] placeholder:text-[#98A2B3] text-[14px] leading-[20.3px] focus:outline-none focus:ring-1 focus:ring-btn-gold`}
              placeholder="Enter your email"
              required
            />
            <span className="absolute inset-y-0 right-0 pr-[18px] flex items-center">
              <Mail className="text-gray-light w-5 h-5" />
            </span>
          </div>
          {formErrors.email && (
            <p className="mt-2 text-error text-sm">{formErrors.email[0]}</p>
          )}
        </div>

        <div className="mb-8">
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
              name="password"
              className={`w-full p-4 border ${
                formErrors.password ? "border-error" : "border-gold-border"
              } rounded-md text-[#101928] placeholder:text-[#98A2B3] text-[14px] leading-[20.3px] focus:outline-none focus:ring-1 focus:ring-btn-gold`}
              placeholder="Enter your password"
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
          {formErrors.password && (
            <p className="mt-2 text-error text-sm">{formErrors.password[0]}</p>
          )}
        </div>

        <Button
          label={isLoading ? "Creating Account..." : "Create Account"}
          loading={isLoading}
        />

        {formErrors.message && (
          <div className="mt-4 text-red-600" aria-live="polite">
            {formErrors.message}
          </div>
        )}
      </form>
        <p className="text-red-600">{strapiErrors}</p>
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
