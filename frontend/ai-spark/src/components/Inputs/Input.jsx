import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({
    value,
    onChange,
    label,
    placeholder,
    type
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
            {label && (
                <label className="block mb-1 text-gray-700 font-semibold">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-3 rounded-xl bg-white shadow-inner border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
                />

                {type === "password" && (
                    <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-800"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? <FaRegEye size={22} /> : <FaRegEyeSlash size={22} />}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Input;
