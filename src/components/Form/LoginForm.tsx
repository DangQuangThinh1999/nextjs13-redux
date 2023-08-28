"use client";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ICredentials } from "../../types";
import ShowIcon from "@/assets/show.svg";
import HideIcon from "@/assets/hide.svg";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slice/authSlice";
import Image from "next/image";
import CustomButton from "../CustomButton";
import { useState } from "react";
import { loginUI } from "../../../app/api/auth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ICredentials>({
    criteriaMode: "all",
  });
const router = useRouter()
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const onSubmit = async (data: ICredentials) => {
    try {
      setIsLoading(true);
      const response = await loginUI(data);
      dispatch(login({ user: data, tokenAuth: response }));
      router.push("/")
      // You can handle the response data here
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
          Invalid Registration Information !
        </div>
      )}
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
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

      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-4 relative">
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
          autoComplete="off"
          className="pl-2 outline-none border-none"
          type={!show ? "text" : "password"}
          placeholder="Password"
          {...register("password", {
            required: "This input is required.",
          })}
        />
        <div
          className="absolute right-5 top-2"
          onClick={() => setShow((value) => !value)}
        >
          {!show ? (
            <Image
              src={ShowIcon}
              width={6}
              height={6}
              alt={"image"}
              className="h-6 w-6"
            />
          ) : (
            <Image
              src={HideIcon}
              width={6}
              height={6}
              alt={"image"}
              className="h-6 w-6"
            />
          )}
        </div>
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
              "Login"
            )
          }
          width="full"
        />
      </button>
    </form>
  );
};

export default LoginForm;
