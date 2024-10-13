import { FormEventHandler, MouseEventHandler, ReactNode } from "react";

export default function Button({
  text,
  options,
  type = "button",
  onClick,
  onSubmit,
  isLoading = false,
  color = "primary",
  icon = undefined,
  iconPosition = "right",
  size = "medium",
  disable = false,
  fitContent = true,
  isActive = false,
}: {
  text?: string | ReactNode;
  options?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  onSubmit?: FormEventHandler<HTMLButtonElement> | undefined;
  isLoading?: boolean;
  color?: "primary" | "warning" | "error" | "light" | "answer";
  icon?: React.ReactNode | undefined;
  iconPosition?: "right" | "left";
  size?: "large" | "medium" | "small";
  disable?: boolean;
  fitContent?: boolean;
  isActive?: boolean;
}) {
  return (
    <button
      disabled={disable || isLoading}
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
      className={`${
        size == "large"
          ? `text-xl md:text-2xl ${text ? "px-4 md:px-12 py-4 lg:px-14 lg:py-5" : "p-3 md:p-4 lg:p-5"} `
          : size == "medium"
          ? `text-base md:text-xl ${text ? "px-4 md:px-10 py-3 lg:px-12 lg:py-4" : "p-2 md:p-3 lg:p-4"}`
          : `text-sm md:text-base lg:text-xl ${text ? "px-4 md:px-8 py-[10px] lg:px-10 lg:py-[14px]" : "p-[10px] lg:p-[14px]"}`
      } ${
        disable
          ? `cursor-not-allowed bg-gray-light text-gray-neutrals`
          : color == "primary"
          ? "bg-green-accent text-white"
          : color == "warning"
          ? "bg-yellow-accent text-white"
          : color == "error"
          ? "bg-red-accent text-white"
          : color == "light"
          ? "bg-green-light bg-opacity-40 text-green-accent"
          : isActive
          ? "bg-green-main text-white"
          : "bg-white text-black"
      } ${fitContent ? "w-fit shrink-0" : "w-full"} ${
        !isLoading && !isActive && !disable? "hover:scale-[1.02] active:scale-[0.98]" : ""
      } group rounded-xl overflow-hidden ease-in-out duration-200`}
    >
      {isLoading ? (
        <div
          className={`${
            disable ? "text-gray-neutrals" : "text-white"
          } animate-spin flex items-center justify-center overflow-hidden`}
        >
          <svg
            className={`${
              size == "small"
                ? "h-5 w-5 md:h-6 md:w-6"
                : size == "medium"
                ? "h-6 w-6 md:h-7 md:w-7"
                : "h-7 w-7 lg:h-8 lg:w-8"
            } overflow-hidden`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <div
          className={` ${iconPosition == "right" ? "" : "flex-row-reverse"} ${
            (text == undefined || icon == undefined) && color != "answer"
              ? ""
              : "flex items-center justify-center gap-4"
          }`}
        >
          {color == "answer" && options && (
            <div
              className={`flex items-center justify-center rounded-full shrink-0 ${
                size == "large"
                  ? "text-lg md:text-xl w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
                  : size == "medium"
                  ? "text-base md:text-lg w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                  : "text-sm md:text-base w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
              } ${
                !isActive
                  ? "bg-green-light bg-opacity-40 text-green-main"
                  : "bg-white text-green-main"
              }`}
            >
              {options}
            </div>
          )}
          <p>{text}</p>
          {icon && (
            <div
              className={`${
                size == "large"
                  ? "text-xl md:text-2xl"
                  : size == "medium"
                  ? "text-base md:text-xl"
                  : "text-sm md:text-base"
              }`}
            >
              {icon}
            </div>
          )}
        </div>
      )}
    </button>
  );
}
