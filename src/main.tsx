import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { QuizProvider } from "./utils/quizContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <>
    <QuizProvider>
      <ToastContainer />
      <App />
    </QuizProvider>
  </>
  // </StrictMode>
);
