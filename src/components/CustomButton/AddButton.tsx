"use client";
import { setIsOpenModal } from "@/redux/slice/modalSlice";
import React from "react";
import { useDispatch } from "react-redux";

interface IAddButton {
  text: string;
}

const AddButton: React.FC<IAddButton> = ({ text }) => {
  const dispatch = useDispatch();
  const handleAddProduct = () => {
    dispatch(setIsOpenModal());
  };
  return (
    <button
      onClick={handleAddProduct}
      className="rounded-md px-3.5  m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 h-10"
    >
      <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
      <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease ">
        {text}
      </span>
    </button>
  );
};

export default AddButton;
