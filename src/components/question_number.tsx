interface BigCardProps {
    number: number;
    currentNumber: number;
    answered: boolean;
  }
  
  export default function QuestionNumber({
    number,
    currentNumber,
    answered,
  }: BigCardProps) {
    return (
      <button
        className={`w-10 h-10 flex justify-center items-center rounded-md border
          ${
            answered
              ? "bg-green-light bg-opacity-30 border-green-light border-opacity-10 text-green-main active:bg-opacity-50 active:border-opacity-30"
              : currentNumber == number
              ? "bg-green-main border-green-main text-white"
              : "bg-white border-gray-neutrals hover:border-green-main active:border-green-dark text-gray-neutrals hover:text-green-main active:text-green-dark"
          } text-sm md:text-base leading-none cursor-pointer`}
      >
        {number}
      </button>
    );
  }
  