"use client";
import React, { useContext, useEffect, useState } from "react";
import CardComponent from "../components/card/CardComponent";
import {
  AiOutlineBook,
  AiOutlineCheck,
  AiOutlinePercentage,
} from "react-icons/ai";
import PieChart from "../components/pie/PieChart";
import { UserContext } from "../context/User";
import { getQuestionsCount, getSolvedQuestions } from "../functions/user";

function Page() {
  const questionsUser = ["Correct Questions", "Incorrect Questions"];
  const questionsSite = ["Used Questions", "Remaining Questions"];
  const [state, setState] = useContext(UserContext);
  const [result, setResult] = useState({
    questionsTaken: 0,
    questionsRemaining: 0,
    questionsCorrect: 0,
    questionsIncorrect: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsCount = await getQuestionsCount(state?.accessToken);
        const solvedQuestions = await getSolvedQuestions(state?.accessToken);

        setResult((prevResult) => ({
          ...prevResult,
          questionsRemaining: questionsCount,
          questionsTaken: solvedQuestions?.length,
          questionsCorrect: solvedQuestions?.filter((q) => q.isCorrect).length,
          questionsIncorrect: solvedQuestions?.filter((q) => !q.isCorrect)
            .length,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [state.accessToken]);

  const arrQuestionsSite = [result.questionsTaken, result.questionsRemaining];

  const arrQuestionsUser = [result.questionsCorrect, result.questionsIncorrect];

  return (
    <div className="page-user pt-24">
      <div className="container mx-auto">
        <div className="title">
          <h1 className="text-xl font-bold">
            welcome, <span className="text-main">{state?.user?.firstName}</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Explore your academic progress and stay informed.
          </p>
        </div>
        <section className="py-4">
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 text-center gap-3">
            <div className="card hover:scale-105 duration-200 hover:shadow-md">
              <CardComponent
                title="QUESTIONS TAKEN"
                value={result.questionsTaken}
                Icon={<AiOutlineBook className="text-center mx-auto text-xl" />}
                description="total number of answered questions"
              />
            </div>
            <div className="card hover:scale-105 duration-200 hover:shadow-md">
              <CardComponent
                title="QUESTIONS CORRECT"
                value={result.questionsCorrect}
                Icon={
                  <AiOutlineCheck className="text-center mx-auto text-xl" />
                }
                description="total number of correctly answered questions"
              />
            </div>
            <div className="card hover:scale-105 duration-200 hover:shadow-md">
              <CardComponent
                title="PERCENT CORRECT"
                value={0}
                Icon={
                  <AiOutlinePercentage className="text-center mx-auto text-xl" />
                }
                description="the percentage of correctly answered questions"
              />
            </div>
          </div>
        </section>
        <section className="py-4">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 justify-items-center">
            <div className="lg:w-96 max-sm:w-auto">
              <PieChart arrData={arrQuestionsUser} labels={questionsUser} />
            </div>
            <div className="lg:w-96 max-sm:w-auto">
              <PieChart arrData={arrQuestionsSite} labels={questionsSite} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
