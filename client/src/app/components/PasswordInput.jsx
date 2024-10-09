import { Input } from "@/components/ui/input";
import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function PasswordInput({
  show,
  val,
  name,
  placeholder,
  changeType,
  handleChange,
}) {
  return (
    <div className="password relative w-full">
      {name === "password" && (
        <span
          className="absolute -translate-y-1/2 top-1/2 right-3 cursor-pointer w-6 h-6 rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 duration-200 "
          onClick={changeType}
        >
          {show ? <AiFillEye /> : <AiFillEyeInvisible />}
        </span>
      )}
      <Input
        name={name}
        value={val}
        onChange={handleChange}
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
        type={show ? "text" : "password"}
        placeholder={placeholder}
      />
    </div>
  );
}

export default PasswordInput;
