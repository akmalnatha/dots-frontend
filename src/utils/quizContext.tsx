import React, { ReactNode, createContext, useState, useEffect } from "react";

export type QuizContextType = {
  quizId: string;
  setQuizId: React.Dispatch<React.SetStateAction<string>>;
};

// Provide a default context value
const defaultQuizContext: QuizContextType = {
  quizId: "",
  setQuizId: () => {}, // Default function to avoid undefined
};

const QuizContext = createContext<QuizContextType>(defaultQuizContext);

const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizId, setQuizId] = useState(() => {
    return localStorage.getItem("quizId") || "";
  });

  useEffect(() => {
    if (quizId) {
      localStorage.setItem("quizId", quizId);
    }
  }, [quizId]);

  return (
    <QuizContext.Provider value={{ quizId, setQuizId }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };