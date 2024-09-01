"use client";

import { useFormState } from 'react-dom';

import requestPasswordResetAction from '@/components/auth/PasswordResetAction';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import Button from '@/components/Button';

type InputErrorsT = {
  email?: string[];
};

type NoErrorFormStateT = {
  error: false;
  message?: string;
};

type ErrorFormStateT = {
  error: true;
  message: string;
  inputErrors?: InputErrorsT;
};

export type RequestPasswordResetFormStateT = NoErrorFormStateT | ErrorFormStateT;

const initialState: NoErrorFormStateT = {
  error: false,
};

export default function ForgetPassword() {
  const [state, formAction] = useFormState<RequestPasswordResetFormStateT, FormData>(
    requestPasswordResetAction,
    initialState
  );

  if (!state.error && state.message === 'Success') {
    return (
      <div className="bg-zinc-100 rounded-sm px-4 py-8 mb-8">
        <h2 className="font-bold text-lg mb-4">Check your email</h2>
        <p>
          We sent you an email with a link. Open this link to reset your password. Be careful, it expires soon.
        </p>
      </div>
    );
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-white shrink-0">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-[133px] w-full justify-center items-center xl:justify-start bg-white sm:p-5">
        <div className="max-lg:hidden relative rounded-3xl overflow-hidden max-w-full md:max-w-[50%] lg:max-w-[50%]">
          {/* Image Section */}
          <Image
            src="/assets/signIn-banner.png"
            alt="DNBL Fashion"
            width={700}
            height={984}
            className="max-w-full w-auto object-cover bg-blend-multiply"
          />
          <div className="absolute inset-0 bg-sign-in-layer"></div>
          <Image
            src="/assets/white-logo.png"
            alt="DNBL Fashion"
            width={196}
            height={88}
            className="max-xl:w-[26%] absolute top-7 left-4 md:left-[28px] z-10"
          />
        </div>

        <div className="flex-1 w-full max-w-full md:max-w-[400px] px-4 md:px-0">
          <h1 className="heading">Forgot Password</h1>
          <p className="headline">Provide your email to receive a reset code.</p>

          <form action={formAction} className="my-8">
            <div className="mb-6">
              <label htmlFor="email" className="label-heading">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full p-4 border ${
                    state.error && state.inputErrors?.email ? "border-error" : "border-gold-border"
                  } rounded-md text-[#101928] placeholder:text-[#98A2B3] text-[14px] leading-[20.3px] focus:outline-none focus:ring-1 focus:ring-btn-gold`}
                  placeholder="Enter your email"
                  required
                />
                <span className="absolute inset-y-0 right-0 pr-[18px] flex items-center">
                  <Mail className="text-gray-light w-5 h-5" />
                </span>
              </div>
              {state.error && state.inputErrors?.email && (
                <p className="mt-2 text-error text-sm">{state.inputErrors.email[0]}</p>
              )}
            </div>

          <Button label='submit'/>
          </form>

          {state.error && state.message && (
            <div className="mt-4 text-red-600" aria-live="polite">
              {state.message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
