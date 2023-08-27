"use client";
import RegisterForm from "@/components/Form/RegisterForm";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import bitcoinSrc from "@/assets/bitcoin.png";
export default function Register() {
  const router = useRouter();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (isAuthenticated === true) router.push("/");
  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <Image src={bitcoinSrc} alt="bitcoind" />
      </div>
      <div className="flex flex-col md:w-1/2 justify-center py-10 items-center bg-white">
        <RegisterForm />
      </div>
    </div>
  );
}
