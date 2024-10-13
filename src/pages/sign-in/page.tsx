import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Field from "../../components/field";
import Button from "../../components/button";
import { toastSuccess, toastError } from "../../components/toast";
import { app } from "../../utils/firebase";

const auth = getAuth(app);

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const postSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toastSuccess("Sign in successful!");

      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorCode = error.name;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
        if(errorCode == "FirebaseError"){
          toastError("Please provide correct email and password");
        } else {
          toastError("Sign in failed");
        }
      } else {
        console.error("Unexpected error", error);
        toastError("Sign In Failed, Please Retry!");
      }
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row w-screen h-screen font-figtree">
      <div className="lg:w-1/2 h-2/3 lg:h-full flex flex-col justify-center items-center bg-[#F9F9F9] rounded-t-3xl lg:rounded-t-none">
        <h1 className="text-4xl mb-8 text-green-main font-semibold">Sign In</h1>
        <form
          onSubmit={postSignIn}
          className="w-full max-w-72 flex flex-col items-center gap-4 lg:gap-6"
        >
          <Field
            type={"field"}
            id="email"
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Field
            type={"password"}
            id="password"
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-col items-center gap-2">
            <Button text="Sign In" type="submit" size="small" />
            <p className="text-gray-neutrals text-center text-[14px] lg:text-[16px]">
              Don&apos;t have an account?{" "}
              <span className="text-green-accent font-semibold">
                <a href="/sign-up">Sign Up</a>
              </span>
            </p>
          </div>
        </form>
      </div>
      <div className="lg:w-1/2 h-1/3 lg:h-full flex justify-center items-center p-10">
        <img src="/img/dot-logo.png" alt="DOT Logo" className="" />
        {/* Optional: You can add an image or a logo here */}
      </div>
    </div>
  );
}

export default SignIn;
