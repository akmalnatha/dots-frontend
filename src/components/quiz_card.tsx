import { MouseEventHandler } from "react";
import { formatTime } from "../utils/utils";
import Button from "./button";

interface QuizCardProps {
  name: string
  total_question: number;
  answered: number;
  right_answer?: number;
  wrong_answer?: number;
  timeRemaining?: number;
  finished: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
}

export default function QuizCard({
  name,
  total_question,
  answered,
  right_answer,
  wrong_answer,
  timeRemaining = 0,
  finished = true,
  onClick,
  isLoading = false,
}: QuizCardProps) {
  return (
    <div
      className={`w-full p-4 lg:p-6 rounded-xl bg-white`}
    >
      <h3 className="text-xl lg:text-3xl font-bold mb-2">{name}</h3>
      {finished ? 
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          <div className="bg-green-accent bg-opacity-30 text-green-accent w-full p-2 lg:p-3 shadow-md rounded-xl flex flex-col gap-0 lg:gap-2 text-center lg:text-start">
            <p className="text-sm lg:text-base text-black">Jawaban Benar:</p>
            <p className="text-lg lg:text-2xl font-bold">{right_answer}</p>
          </div>
          <div className="bg-red-accent bg-opacity-30 text-red-accent w-full p-2 lg:p-3 shadow-md rounded-xl flex flex-col gap-0 lg:gap-2 text-center lg:text-start">
            <p className="text-sm lg:text-base text-black">Jawaban salah:</p>
            <p className="text-lg lg:text-2xl font-bold">{wrong_answer}</p>
          </div>
          <div className="w-full p-2 lg:p-3 shadow-md rounded-xl flex flex-col gap-0 lg:gap-2 text-center lg:text-start">
            <p className="text-sm lg:text-base">Soal Terjawab:</p>
            <p className="text-lg lg:text-2xl font-bold">{answered}/{total_question}</p>
          </div>
        </div>
        :
        <div className="flex flex-col gap-2 lg:gap-4">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
            <div className="w-full p-2 lg:p-3 shadow-md rounded-xl flex flex-col gap-0 lg:gap-2 text-center lg:text-start">
                <p className="text-sm lg:text-base">Sisa Waktu:</p>
                <p className="text-lg lg:text-2xl font-bold">{formatTime(timeRemaining!)}</p>
            </div>
            <div className="w-full p-2 lg:p-3 shadow-md rounded-xl flex flex-col gap-0 lg:gap-2 text-center lg:text-start">
                <p className="text-sm lg:text-base">Soal Terjawab:</p>
                <p className="text-lg lg:text-2xl font-bold">{answered}/{total_question}</p>
            </div>
            </div>
            <Button
                text={"Resume Kuis"}
                size="small"
                color="light"
                isLoading={isLoading}
                onClick={onClick}
                fitContent={false}
            />
        </div>
      }
    </div>
  );
}