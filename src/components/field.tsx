"use client";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineSearch } from "react-icons/ai";

function Field({
  id,
  type,
  placeholder,
  value,
  required,
  useLabel,
  labelText,
  guideText,
  labelStyle,
  guideStyle,
  onChange,
  onChangeArea,
  isDisabled = false,
  invalidMessage,
  readOnly,
  min,
  max
}: {
  id?: string;
  type: "field" | "number" | "password" | "search" | "email" | "area";
  placeholder: string;
  value?: number | string | readonly string[] | undefined;
  required?: boolean;
  useLabel?: boolean;
  labelText?: string;
  guideText?: string;
  labelStyle?: string;
  guideStyle?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onChangeArea?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  isDisabled?: boolean;
  invalidMessage?: string;
  readOnly?: boolean;
  min?: number;
  max?: number;
}) {
  const [showPassword, setShowPassword] = useState("password");
  const [icon, setIcon] = useState(<AiFillEyeInvisible></AiFillEyeInvisible>);
  const handleToggle = () => {
    if (showPassword === "password") {
      setIcon(<AiFillEye></AiFillEye>);
      setShowPassword("text");
    } else {
      setIcon(<AiFillEyeInvisible></AiFillEyeInvisible>);
      setShowPassword("password");
    }
  };

  return (
    <>
      {(type == "field" || type == "number") && (
        <div className="w-full font-figtree">
          {useLabel && (
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 lg:items-center mb-1 md:mb-2">
              <label
                htmlFor={id}
                className={`${labelStyle} ${
                  required
                    ? "after:content-['*'] after:ml-1 after:font-medium after:text-[14px] after:text-red-accent"
                    : ""
                }`}
              >
                {labelText}
              </label>
              <p className={guideStyle}>{guideText}</p>
            </div>
          )}
          <div
            className={`w-full flex items-center px-[20px] py-[12px] text-[14px] lg:text-[16px] text-black bg-white border ${
              invalidMessage
                ? "border-red-accent"
                : "border-gray-light hover:border-green-accent focus-within:border-green-accent"
            } rounded-[12px]`}
          >
            <input
              id={id}
              type={type == "field" ? "text" : "number"}
              min={min}
              max={max}
              required={required}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className="grow focus:outline-none w-full cursor-pointer"
              disabled={isDisabled}
              readOnly={readOnly}
            />
          </div>
          {invalidMessage && (
            <p className="text-[12px] mt-1 text-red-accent">{invalidMessage}</p>
          )}
        </div>
      )}
      {type == "password" && (
        <div className="w-full font-figtree">
          {useLabel && (
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 lg:items-center mb-1 md:mb-2">
              <label
                htmlFor={id}
                className={`${labelStyle} ${
                  required
                    ? "after:content-['*'] after:ml-1 after:font-medium after:text-[14px] after:text-red-accent"
                    : ""
                }`}
              >
                {labelText}
              </label>
              <p className={guideStyle}>{guideText}</p>
            </div>
          )}
          <div
            className={`w-full flex gap-[12px] items-center px-[20px] py-[12px] text-[14px] lg:text-[16px] text-black bg-white border ${
              invalidMessage
                ? "border-red-accent"
                : "border-gray-light hover:border-green-accent focus-within:border-green-accent"
            } rounded-[12px] cursor-pointer group`}
          >
            <input
              id={id}
              type={showPassword}
              required={required}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              className="grow focus:outline-none cursor-pointer w-full"
              disabled={isDisabled}
              readOnly={readOnly}
            />
            <div
              className="text-[22px] w-fit text-gray-neutrals group-focus-within:text-black group-hover:text-black"
              onClick={handleToggle}
            >
              {icon}
            </div>
          </div>
          {invalidMessage && (
            <p className="text-[12px] mt-1 text-red-accent">{invalidMessage}</p>
          )}
        </div>
      )}
      {type == "search" && (
        <div className="w-full font-figtree">
          {useLabel && (
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 lg:items-center mb-1 md:mb-2">
              <label
                htmlFor={id}
                className={`${labelStyle} ${
                  required
                    ? "after:content-['*'] after:ml-1 after:font-medium after:text-[14px] after:text-red-accent"
                    : ""
                }`}
              >
                {labelText}
              </label>
              <p className={guideStyle}>{guideText}</p>
            </div>
          )}
          <div
            className={`w-full flex gap-[12px] items-center px-[20px] py-[12px] text-[14px] lg:text-[16px] text-black bg-white border ${
              invalidMessage
                ? "border-red-accent"
                : "border-gray-light hover:border-green-accent focus-within:border-green-accent"
            } rounded-[12px] cursor-pointer group`}
          >
            <div className="text-[22px] w-fit text-gray-neutrals group-focus-within:text-black group-hover:text-black">
              <AiOutlineSearch />
            </div>
            <input
              id={id}
              type="text"
              required={required}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              className="grow focus:outline-none cursor-pointer w-full"
              disabled={isDisabled}
              readOnly={readOnly}
            />
          </div>
          {invalidMessage && (
            <p className="text-[12px] mt-1 text-red-accent">{invalidMessage}</p>
          )}
        </div>
      )}
      {type == "email" && (
        <div className={"w-full font-figtree"}>
          {useLabel && (
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 lg:items-center mb-1 md:mb-2">
              <label
                htmlFor={id}
                className={`${labelStyle} ${
                  required
                    ? "after:content-['*'] after:ml-1 after:font-medium after:text-[14px] after:text-red-accent"
                    : ""
                }`}
              >
                {labelText}
              </label>
              <p className={guideStyle}>{guideText}</p>
            </div>
          )}
          <input
            id={id}
            required={required}
            type="email"
            placeholder={placeholder}
            className={`w-full flex items-center px-[20px] py-[12px] text-[14px] lg:text-[16px] text-black bg-white border ${
              invalidMessage
                ? "border-red-accent"
                : "border-gray-light hover:border-green-accent focus-within:border-green-accent"
            } focus:outline-black rounded-[12px] cursor-pointer`}
            onChange={onChange}
            value={value}
            disabled={isDisabled}
            readOnly={readOnly}
          />
          {invalidMessage && (
            <p className="text-[12px] mt-1 text-red-accent">{invalidMessage}</p>
          )}
        </div>
      )}
      {type == "area" && (
        <div className="w-full font-figtree">
          {useLabel && (
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 lg:items-center mb-1 md:mb-2">
              <label
                htmlFor={id}
                className={`${labelStyle} ${
                  required
                    ? "after:content-['*'] after:ml-1 after:font-medium after:text-[14px] after:text-red-accent"
                    : ""
                }`}
              >
                {labelText}
              </label>
              <p className={guideStyle}>{guideText}</p>
            </div>
          )}
          <div
            className={`w-full flex items-center px-[20px] py-[12px] text-[14px] lg:text-[16px] text-black bg-white border ${
              invalidMessage
                ? "border-red-accent"
                : "border-gray-light hover:border-green-accent focus-within:border-green-accent"
            } focus:outline-black rounded-[12px]`}
          >
            <textarea
              id={id}
              required={required}
              placeholder={placeholder}
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height =
                  e.currentTarget.scrollHeight + "px";
              }}
              style={{ height: "auto", minHeight: "100px" }}
              value={value}
              onChange={onChangeArea}
              className="grow resize-none focus:outline-none cursor-pointer"
              disabled={isDisabled}
              readOnly={readOnly}
            />
          </div>
          {invalidMessage && (
            <p className="text-[12px] mt-1 text-red-accent">{invalidMessage}</p>
          )}
        </div>
      )}
    </>
  );
}

export default Field;
