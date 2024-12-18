import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../actions/authActions";
import { Eye, EyeOff } from "lucide-react";

// Create Axios instance
const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role_id: "2", // Default to customer role
    }
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedRole = watch("role_id");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const passwordValidationRules = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    validate: {
      hasNumber: (value) => /\d/.test(value) || "Password must include a number",
      hasLowercase: (value) => /[a-z]/.test(value) || "Password must include a lowercase letter",
      hasUppercase: (value) => /[A-Z]/.test(value) || "Password must include an uppercase letter",
      hasSpecialChar: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must include a special character",
    }
  };

  const turkishPhoneRegex = /^(05)([0-9]{9})$/;
  const turkishTaxIdRegex = /^T\d{4}V\d{6}$/;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const signupToastId = toast.info("Signing up...", { autoClose: false });

    try {
      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
      };

      if (data.role_id === "3") { // Assuming '3' is the store role ID
        formData.store = {
          name: data.storeName,
          phone: data.storePhone,
          taxId: data.storeTaxId,
          bankAccount: data.storeBankAccount,
        };
      }

      await dispatch(registerUser(formData));

      // Dismiss loading toast
      toast.dismiss(signupToastId);

      // Success toast with email activation warning
      toast.warning(
        "Registration successful! Please check your email to activate your account.",
        {
          autoClose: 5000,
        }
      );

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(signupToastId);

      // Error toast
      toast.error(error.message || "Registration failed");
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Full Name
          </label>
          <input
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="role_id" className="block mb-1">
            Select Role
          </label>
          <select
            id="role_id"
            {...register("role_id", { required: "Role is required" })}
            className="w-full px-3 py-2 border rounded"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.role_id && (
            <span className="text-red-500">{errors.role_id.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              {...register("password", passwordValidationRules)}
              className="w-full px-3 py-2 border rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={confirmPasswordVisible ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => 
                  value === getValues("password") || "Passwords do not match"
              })}
              className="w-full px-3 py-2 border rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword.message}</span>
          )}
        </div>

        {selectedRole === "3" && (
          <>
            <div>
              <label htmlFor="storeName" className="block mb-1">
                Store Name
              </label>
              <input
                id="storeName"
                {...register("storeName", {
                  required: "Store name is required",
                  minLength: {
                    value: 3,
                    message: "Store name must be at least 3 characters",
                  },
                })}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.storeName && (
                <span className="text-red-500">{errors.storeName.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="storePhone" className="block mb-1">
                Store Phone
              </label>
              <input
                id="storePhone"
                {...register("storePhone", {
                  required: "Store phone is required",
                  pattern: {
                    value: turkishPhoneRegex,
                    message: "Invalid Turkish phone number (format: 05XXXXXXXXX)",
                  },
                })}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.storePhone && (
                <span className="text-red-500">{errors.storePhone.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="storeTaxId" className="block mb-1">
                Store Tax ID
              </label>
              <input
                id="storeTaxId"
                {...register("storeTaxId", {
                  required: "Store tax ID is required",
                  pattern: {
                    value: turkishTaxIdRegex,
                    message: "Invalid tax ID (format: TXXXXVXXXXXX)",
                  },
                })}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.storeTaxId && (
                <span className="text-red-500">{errors.storeTaxId.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="storeBankAccount" className="block mb-1">
                Store Bank Account (IBAN)
              </label>
              <input
                id="storeBankAccount"
                {...register("storeBankAccount", {
                  required: "Bank account is required",
                  pattern: {
                    value: /^TR\d{2}\s?(\d{4}\s?){5}$/,
                    message: "Invalid IBAN address",
                  },
                })}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.storeBankAccount && (
                <span className="text-red-500">{errors.storeBankAccount.message}</span>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button 
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:text-blue-700 hover:underline focus:outline-none"
            >
              Log in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
