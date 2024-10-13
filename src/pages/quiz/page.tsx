import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Button from "../../components/button";
import QuestionNumber from "../../components/question_number";
import { useContext, useEffect, useState } from "react";
import { decodeHtmlEntities, formatTime, hashAnswer } from "../../utils/utils";
import { QuizContext } from "../../utils/quizContext";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [questionsData, setQuestionsData] = useState<string[]>([]);
  const [typesData, setTypesData] = useState<string[]>([]);
  const [optionsData, setOptionsData] = useState<string[][]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [activeButton, setActiveButton] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(0); 
  const { quizId } = useContext(QuizContext);

  const navigate = useNavigate();
  let correctAnswersCount = 0;
  let incorrectAnswersCount = 0;
  let answeredCount = 0;

  let timer: NodeJS.Timeout | null = null;

  const handleOptionClick = (index: number) => {
    setActiveButton((prevState) => {
      const newActiveButton = [...prevState];
      newActiveButton[currentQuestion] = index;
      return newActiveButton;
    });

    const storageKey = `${quizId}`;
    const storedQuiz = localStorage.getItem(storageKey);

    if (storedQuiz) {
      const testData = JSON.parse(storedQuiz);
      const selectedAnswer = optionsData[currentQuestion][index];

      testData.questions[currentQuestion].answer = selectedAnswer;

      localStorage.setItem(storageKey, JSON.stringify(testData));
    }
  };

  const getData = () => {
    try {
      if (!quizId) {
        console.error("No quizId available");
        return;
      }

      const storageKey = `${quizId}`;
      const storedQuiz = localStorage.getItem(storageKey);

      if (storedQuiz) {
        const testData = JSON.parse(storedQuiz);

        const questionTexts = testData.questions.map((q: any) =>
          decodeHtmlEntities(q.question)
        );
        const types = testData.questions.map((q: any) => q.type);

        const decodedOptions = testData.questions.map((question: any) => {
          return question.options.map((option: string) =>
            decodeHtmlEntities(option)
          );
        });

        const newActiveButton = testData.questions.map((question: any) => {
          if (question.answer !== "") {
            const indexOption = question.options.findIndex(
              (option: string) => option == question.answer
            );
            return indexOption !== -1 ? indexOption : null;
          }
          return null;
        });

        setQuestionsData(questionTexts);
        setTypesData(types);
        setOptionsData(decodedOptions);
        setActiveButton(newActiveButton);

        if (testData.time_remaining !== undefined) {
          setTimeRemaining(testData.time_remaining);
        } else {
          console.error("time_remaining not found in stored quiz data.");
        }
      } else {
        console.error("No quiz data found in localStorage.");
      }
    } catch (error) {
      console.error("Error fetching quiz data from localStorage:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    timer = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev > 0 ? prev - 1 : 0;
  
        if (newTime == 0) {
          handleFinish(); // Call handleFinish when time reaches 0
        }
  
        if (quizId) {
          const storageKey = `${quizId}`;
          const storedQuiz = localStorage.getItem(storageKey);
  
          if (storedQuiz) {
            const testData = JSON.parse(storedQuiz);
            testData.time_remaining = newTime;
            localStorage.setItem(storageKey, JSON.stringify(testData));
          }
        }
  
        return newTime;
      });
    }, 1000);
  
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);
  

  const handleFinish = async () => {
    const storageKey = `${quizId}`;
    const storedQuiz = localStorage.getItem(storageKey);

    if (storedQuiz) {
      const testData = JSON.parse(storedQuiz);

      for (let i = 0; i < testData.questions.length; i++) {
        const userAnswer = testData.questions[i].answer;
        const correctAnswerHash = testData.questions[i].correct_answer_hash;

        if (userAnswer) {
          const userAnswerHash = await hashAnswer(userAnswer);
  
          if (userAnswerHash === correctAnswerHash) {
            correctAnswersCount++;
          } else {
            incorrectAnswersCount++;
          }
          answeredCount++;
        }
      }

      testData.correct = correctAnswersCount;
      testData.incorrect= incorrectAnswersCount;
      testData.answered = answeredCount;
      testData.finished = true; 
      if (timer) {
        clearInterval(timer);
      }
      localStorage.setItem(storageKey, JSON.stringify(testData));

      navigate("/");
    }
  };

  return (
    <div className="p-4 lg:p-6 w-screen h-screen max-h-screen flex flex-col gap-6 lg:gap-8 bg-[#F9F9F9] font-figtree">
      <div className="grow flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
        <div className="grow flex flex-col gap-4 lg:gap-6">
          <div className="w-full grow bg-white rounded-xl flex p-3 lg:p-4 gap-4 lg:gap-6 items-center">
            <Button
              color="light"
              size="small"
              icon={<FaArrowLeftLong />}
              disable={currentQuestion === 0}
              onClick={() =>
                setCurrentQuestion((prev) => Math.max(prev - 1, 0))
              }
            />
            <div className="grow h-full flex items-center justify-center">
              <p className="text-xl md:text-3xl lg:text-4xl text-center">
                {questionsData[currentQuestion] || "Loading..."}
              </p>
            </div>
            <Button
              color="primary"
              size="small"
              icon={<FaArrowRightLong />}
              disable={currentQuestion == questionsData.length - 1}
              onClick={() =>
                setCurrentQuestion((prev) =>
                  Math.min(prev + 1, questionsData.length - 1)
                )
              }
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-4 lg:gap-6">
            {optionsData[currentQuestion]?.map((option, index) => (
              <Button
                key={index}
                text={option}
                color="answer"
                size="small"
                options={
                  typesData[currentQuestion] == "multiple"
                    ? String.fromCharCode(65 + index)
                    : undefined
                }
                isActive={activeButton[currentQuestion] == index}
                fitContent={false}
                onClick={() => handleOptionClick(index)}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-auto shrink-0 flex flex-row-reverse lg:flex-col gap-4 lg:gap-6">
          <div className="w-fit lg:w-full py-2 px-4 lg:p-4 rounded-xl flex flex-col justify-center gap-0 lg:gap-2 bg-white text-center lg:text-start">
            <p className="text-sm lg:text-base">Sisa Waktu:</p>
            <p className="text-xl lg:text-4xl">{formatTime(timeRemaining)}</p>
          </div>
          <div className="bg-white grow overflow-auto lg:flex flex-col rounded-xl">
            <div className="w-fit p-4 grid grid-flow-col lg:grid-flow-row lg:grid-cols-5 auto-cols-min auto-rows-min gap-3 lg:gap-4">
              {questionsData.map((_, index) => (
                <QuestionNumber
                  key={index}
                  number={index + 1}
                  currentNumber={currentQuestion + 1}
                  answered={activeButton[index] != null}
                  onClick={() => setCurrentQuestion(index)}
                />
              ))}
            </div>
            <div className="w-full pb-4 px-4 pt-0 hidden lg:block">
              <Button text="Selesai" size="small" fitContent={false} onClick={handleFinish}/>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:hidden">
        <Button text="Selesai" size="medium" fitContent={false} onClick={handleFinish}/>
      </div>
    </div>
  );
};

export default Quiz;
