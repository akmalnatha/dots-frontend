import { MouseEventHandler } from "react";

interface QuestionNumberProps {
  number: number;
  currentNumber: number;
  answered: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function QuestionNumber({
  number,
  currentNumber,
  answered,
  onClick,
}: QuestionNumberProps) {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center rounded-md border text-lg
          ${
            currentNumber === number
              ? "bg-green-accent border-green-accent text-white" 
              : answered
              ? "bg-green-accent bg-opacity-30 border-green-accent border-opacity-10 text-green-accent active:bg-opacity-50 active:border-opacity-30"
              : "bg-white border-gray-light hover:border-green-accent active:border-green-dark text-gray-light hover:text-green-accent active:text-green-dark"
          } text-sm md:text-base leading-none cursor-pointer`}
    >
      {number}
    </button>
  );
}