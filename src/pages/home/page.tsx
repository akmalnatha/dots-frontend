import { useContext, useEffect, useState } from "react";
import Button from "../../components/button";
import Dropdown from "../../components/dropdown";
import Field from "../../components/field";
import { get, getCategory } from "../../utils/api";
import { getAuth, signOut } from "firebase/auth";
import { hashAnswer, shuffleArray } from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../components/toast";
import { QuizContext } from "../../utils/quizContext";
import QuizCard from "../../components/quiz_card";
import { CiLogout } from "react-icons/ci";
import { app } from "../../utils/firebase";

const auth = getAuth(app);

const Home = () => {
  const [username, setUsername] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [optionsCat, setOptionsCat] = useState<
    { label: string; value: string | number }[]
  >([]);
  let { setQuizId } = useContext(QuizContext);

  const [userQuizzes, setUserQuizzes] = useState<
    { quizData: any; key: string }[]
  >([]);
  const [quizName, setQuizName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<{
    label: string;
    value: string | null;
  } | null>(null);
  const [category, setCategory] = useState<{
    label: string;
    value: number | null;
  } | null>(null);
  const [questionType, setQuestionType] = useState<{
    label: string;
    value: string | null;
  } | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(1);

  const navigate = useNavigate();

  const PostQuizData = async () => {
    try {
      setIsLoading(true);
      let queryParams = `amount=${questionCount}`;
      if (category && category.value)
        queryParams += `&category=${category.value}`;
      if (difficulty && difficulty.value)
        queryParams += `&difficulty=${difficulty.value}`;
      if (questionType && questionType.value)
        queryParams += `&type=${questionType.value}`;

      const response = await get(queryParams);
      console.log(response);
      const questions = response.data.results;

      const testData = {
        name: quizName,
        time_remaining: 60,
        finished: false,
        correct: 0,
        incorrect: 0,
        answered: 0,
        questions: await Promise.all(
          questions.map(async (q: any) => {
            const shuffledOptions = shuffleArray([
              ...q.incorrect_answers,
              q.correct_answer,
            ]);
            return {
              question: q.question,
              difficulty: q.difficulty,
              type: q.type,
              category: q.category,
              answer: "",
              correct_answer_hash: await hashAnswer(q.correct_answer),
              options: shuffledOptions,
            };
          })
        ),
      };

      const user = auth.currentUser;
      const quizUniqueId = uuidv4();
      if (user && user.uid) {
        const storageKey = `${user.uid}_quiz_${quizUniqueId}`;
        setQuizId(storageKey);
        localStorage.setItem(storageKey, JSON.stringify(testData));
        setIsLoading(false);
        navigate("/quiz");
      } else {
        console.log("Save Quiz Failed");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching quiz data:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    PostQuizData();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toastSuccess("Sign out succesful!");
      navigate("/sign-in");
    } catch (error) {
      console.error("Error during sign out:", error);
      toastError("Failed to sign out. Please try again.");
    }
  };

  const handleQuizClick = (quizKey: string) => {
    setQuizId(quizKey); // Set the quizId to the storage key
    navigate("/quiz"); // Redirect to the quiz page
  };

  async function getData() {
    try {
      const response = await getCategory();
      setOptionsCat(response);
      const user = auth.currentUser;
      if (user !== null) {
        const displayName = user.displayName;
        setUsername(displayName);
        const quizzes: any[] = [];
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.startsWith(`${user.uid}_quiz_`)) {
            const quizData = JSON.parse(localStorage.getItem(key)!);
            if (quizData) {
              quizzes.push({ quizData, key }); // Add quiz data to the array
            }
          }
        });

        setUserQuizzes(quizzes);
        console.log(quizzes);
      } else {
        navigate("/sign-in");
      }
    } catch {
      console.log("Get Data Error");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6 lg:p-8 w-screen min-h-screen bg-[#F9F9F9] font-figtree">
      <div className="w-full p-4 lg:p-6 rounded-xl bg-white flex justify-between items-center">
        <div>
          <p className="text-base lg:text-lg">Selamat datang,</p>
          <p className="text-xl lg:text-3xl text-green-main font-bold mt-1 lg:mt-2">
            {username}
          </p>
        </div>
        <Button color="error" icon={<CiLogout />} onClick={handleLogout} />
      </div>
      <div className="w-full p-4 lg:p-6 rounded-xl bg-white mt-4 lg:mt-6">
        <p className="text-2xl lg:text-3xl font-bold">Buat Kuis</p>
        <form
          onSubmit={handleSubmit}
          className="mt-1 lg:mt-2 flex flex-col gap-3 lg:gap-4"
        >
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
            <Field
              type={"field"}
              placeholder={"Nama Kuis"}
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />
            <Dropdown
              placeholder={"Kesulitan"}
              options={[
                { label: "Easy", value: "easy" },
                { label: "Medium", value: "medium" },
                { label: "Hard", value: "hard" },
              ]}
              value={difficulty ? difficulty : undefined}
              onChange={(selectedOption) =>
                setDifficulty({
                  label: selectedOption!.label,
                  value: selectedOption?.value,
                })
              }
            />
            <Dropdown
              placeholder={"Kategori"}
              options={optionsCat}
              value={category ? category : undefined}
              onChange={(selectedOption) =>
                setCategory({
                  label: selectedOption!.label,
                  value: selectedOption?.value,
                })
              }
            />
            <Dropdown
              placeholder={"Tipe"}
              options={[
                { label: "Multiple Choice", value: "multiple" },
                { label: "True / False", value: "boolean" },
              ]}
              value={questionType ? questionType : undefined}
              onChange={(selectedOption) =>
                setQuestionType({
                  label: selectedOption!.label,
                  value: selectedOption?.value,
                })
              }
            />
            <Field
              type={"number"}
              placeholder={"Jumlah Soal"}
              min={1}
              max={50}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
            />
          </div>
          <Button
            text={"Buat Kuis dan Mulai"}
            size="medium"
            type="submit"
            isLoading={isLoading}
            fitContent={false}
          />
        </form>
      </div>
      <div className="mt-4 lg:mt-6 flex flex-col gap-4 lg:gap-6">
        {userQuizzes.length > 0 && (
          userQuizzes.map(({ quizData, key }, index) => (
            <QuizCard
              key={index} // Use the storageKey as a unique key
              name={quizData.name}
              total_question={quizData.questions.length}
              answered={quizData.answered}
              right_answer={quizData.correct}
              wrong_answer={quizData.incorrect}
              timeRemaining={quizData.time_remaining}
              finished={quizData.finished}
              onClick={() => handleQuizClick(key)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
