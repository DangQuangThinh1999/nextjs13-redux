"use client";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { IRegisterUser } from "../../types";
import { useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import CustomButton from "../CustomButton";
import { useRouter } from "next/navigation";
import { registerUI } from "../../../app/api/auth";

const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegisterUser>({
    criteriaMode: "all",
  });
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (data: IRegisterUser) => {
    try {
      setIsLoading(true);
      await registerUI(data);
      // You can handle the response data here
      enqueueSnackbar("Account created successfully", { variant: "success" });
      router.push("/auth/login");
    } catch (error) {
      setError(true);
      setIsLoading(false);
      // Handle the error here
    }
  };
  return (
    <form className="wrapperError" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
      <h2 className="text-sm font-normal text-gray-600 mb-7">Welcome Back</h2>
      {error && (
        <div className="text-[#d00000] mb-1">
          username or email already exists !
        </div>
      )}
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
        <input
          className="pl-2 outline-none border-none"
          type="text"
          placeholder="Full name"
          {...register("fullname", {
            required: "Please enter a valid full name.",
            pattern: {
              value: /^[A-Za-z ]+$/,
              message: "Allow only alphabets,unsigned, and hyphens in the name",
            },
          })}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="fullname"
        render={({ messages }) => {
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      />
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
          />
        </svg>
        <input
          className="pl-2 outline-none border-none"
          type="text"
          placeholder="Username"
          {...register("username", {
            required: "This input is required.",
          })}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="username"
        render={({ messages }) => {
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      />
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
          />
        </svg>
        <input
          className="pl-2 outline-none border-none"
          type="text"
          placeholder="Email Address"
          {...register("email", {
            required: "Please enter a valid email address.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "This input is email only.",
            },
          })}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="email"
        render={({ messages }) => {
          return (
            messages &&
            Object.entries(messages).map(([type, message], index) => (
              <p key={type}>{message}</p>
            ))
          );
        }}
      />

      <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <input
          className="pl-2 outline-none border-none"
          type="text"
          placeholder="Password"
          {...register("password", {
            required: "This input is required.",
          })}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ messages }) => {
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      />
      <button type="submit" className="w-full my-5">
        <CustomButton
          text={
            isLoading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="spinner-container">
                  <div className="loading-spinner"></div>
                </div>
                <div>Loading...</div>
              </div>
            ) : (
              "Create New Account"
            )
          }
          width="full"
        />
      </button>
    </form>
  );
};

export default RegisterForm;
