"use client";
import CardContentComponent from "@/app/components/card/CardContent";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { ExamContext } from "./context";

function Page() {
  const router = useRouter();
  const [exam, setExam] = useContext(ExamContext);

  const handleModeChange = (e) => {
    setExam({ ...exam, mode: e });
    router.push("/user/generate/options");
  };
  return (
    <div className="page pt-20">
      <div className="container mx-auto min-h-all flex justify-center items-center flex-col">
        <div className="title py-5">
          <h1 className="text-xl font-bold">quiz options</h1>
          <p className="text-gray-500 dark:text-gray-400 py-2">
            Choose the session mode
          </p>
        </div>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-10">
          <div className="card hover:scale-105 duration-200 hover:shadow-md cursor-pointer text-center">
            <CardContentComponent
              onClick={() => {
                handleModeChange("exam");
              }}
              Icon=""
              desc="This mode aims to replicate the real timed exam environment, providing a realistic practice experience under actual exam conditions."
              mode="Exam"
            />
          </div>
          <div className="card hover:scale-105 duration-200 hover:shadow-md cursor-pointer text-center">
            <CardContentComponent
              onClick={() => {
                handleModeChange("tutor");
              }}
              Icon=""
              desc="This mode allows you to move question-by-question, seeing the correct answer and detailed explanation of it after every question."
              mode="Tutor"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
