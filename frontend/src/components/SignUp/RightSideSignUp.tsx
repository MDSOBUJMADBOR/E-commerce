
"use client";

import Link from "next/link";
import { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean; 
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
}

const RightSideSignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms & Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Form data Console Log
    console.log("Form Submitted Data:", formData);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social Sign-up Handlers
  const googleSignUp = () => {
    alert("google");
  };

  const facebookSignUp = () => {
    alert("facebook");
  };

  const appleSignUp = () => {
    alert("apple");
  };

  return (
    <div className="w-full lg:w-1/2 bg-white px-5 py-6 min-h-full sm:px-8 lg:px-10 flex flex-col justify-center items-center">
      <div className="w-full ">
        
        {/* Header Icon & Title */}
        <div className="mb-5 text-center flex flex-col items-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-[#00a651]">
            <UserPlusBigIcon />
          </div>

          <h2 className="text-2xl font-bold text-[#26364a]">
            Create Your Account
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#64748b]">
            Join <span className="font-semibold text-[#00a651]">ShopEasy</span> and start shopping today!
          </p>
        </div>

        {isSuccess ? (
          <div className="py-10 text-center">
            <h3 className="text-xl font-bold text-[#26364a]">Account Created!</h3>
            <p className="mt-2 text-sm text-gray-500">Welcome to ShopEasy.</p>
            <Link href="/">
              <button className="mt-6 font-semibold text-[#00a651] cursor-pointer">← Back to Home</button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 ">
            {/* Full Name */}
            <InputField
              label="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              error={errors.fullName}
              icon={<UserIcon />}
            />

            {/* Email */}
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              error={errors.email}
              icon={<MailIcon />}
            />

            {/* Password */}
            <PasswordField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              error={errors.password}
            />

            {/* Confirm Password */}
            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              error={errors.confirmPassword}
            />

            {/* Terms */}
            <div className="pt-1">
              <div className="flex items-center gap-2">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-[#00a651] focus:ring-[#00a651]"
                />
                <label htmlFor="agreeTerms" className="text-xs text-[#64748b]">
                  I agree to the{" "}
                  <Link href="/terms" className="font-semibold text-[#00a651]">Terms & Conditions</Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-semibold text-[#00a651]">Privacy Policy</Link>
                </label>
              </div>
              {errors.agreeTerms && <p className="mt-1 text-xs text-red-500">{errors.agreeTerms}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#00a651] py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#009447]"
            >
              <UserPlusIcon />
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-[#94a3b8]">or sign up with</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <SocialButton onClick={googleSignUp} provider="Google" icon={<GoogleIcon />} />
              <SocialButton onClick={facebookSignUp} provider="Facebook" icon={<FacebookIcon />} />
              <SocialButton onClick={appleSignUp} provider="Apple" icon={<AppleIcon />} />
            </div>

            {/* Sign In Link */}
            <p className="pt-2 text-center text-xs text-[#64748b]">
              Already have an account?{" "}
              <Link href="/signin" className="font-semibold text-[#00a651]">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default RightSideSignUp;

/* Helper Component Functions & SVG Icons */

function InputField({ label, name, type, value, placeholder, error, icon, onChange }: any) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-xs font-semibold text-[#26364a]">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#718096]">
          {icon}
        </div>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-9 sm:h-10 w-full rounded-lg border bg-white pl-9 pr-3 text-xs text-[#26364a] outline-none ${
            error ? "border-red-400" : "border-[#dce2e8] focus:border-[#00a651]"
          }`}
        />
      </div>
      {error && <p className="mt-0.5 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

function PasswordField({ label, name, value, placeholder, showPassword, setShowPassword, error, onChange }: any) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-xs font-semibold text-[#26364a]">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#718096]">
          <LockIcon />
        </div>
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-9 sm:h-10 w-full rounded-lg border bg-white pl-9 pr-9 text-xs text-[#26364a] outline-none ${
            error ? "border-red-400" : "border-[#dce2e8] focus:border-[#00a651]"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718096]"
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {error && <p className="mt-0.5 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

function SocialButton({
  provider,
  icon,
  onClick,
}: {
  provider: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#dce2e8] bg-white px-2 text-xs font-medium text-[#26364a] hover:bg-gray-50"
    >
      {icon}
      <span>{provider}</span>
    </button>
  );
}

function UserPlusBigIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3.5 19c.7-3 2.5-4.5 5.5-4.5 2 0 3.5.7 4.5 2" />
      <path d="M18 10v6M15 13h6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path strokeLinecap="round" d="M5.5 20c.8-3.4 3-5 6.5-5s5.7 1.6 6.5 5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m3 3 18 18" />
      <path d="M10.6 6.2A10.7 10.7 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3.1 3.7" />
      <path d="M6.2 6.2C3.8 8 2.5 12 2.5 12s3.5 6 9.5 6c1.3 0 2.5-.3 3.5-.8" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.7-3 2.5-4.5 5.5-4.5 2 0 3.5.7 4.5 2" />
      <path d="M18 11v6M15 14h6" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-4 w-4" fill="#1877F2" viewBox="0 0 24 24">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.414c0-3.026 1.792-4.7 4.533-4.7 1.312 0 2.686.236 2.686.236v2.98h-1.516c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08ZM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.34 4.5-3.74 4.25Z" />
    </svg>
  );
}