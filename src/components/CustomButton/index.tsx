import Link from "next/link";
import React from "react";

interface ICustomButtonProps {
  text: any;
  link?: string;
  onClick?: () => {};
  width?: string;
}

const CustomButton: React.FC<ICustomButtonProps> = ({
  text,
  link = "",
  onClick,
  width,
}) => {
  const widthStyle = `w-${width}`;
  return (
    <a
      onClick={onClick}
      href={link}
      className={`relative inline-flex items-center
      ${widthStyle}
      justify-center p-4 px-5 py-3 overflow-hidden
      font-medium text-indigo-600 transition 
     duration-300 ease-out rounded-full shadow-xl 
     group hover:ring-1 hover:ring-purple-500`}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
      <span className="relative text-white">{text}</span>
    </a>
  );
};
export default CustomButton;
