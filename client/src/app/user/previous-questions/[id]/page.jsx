"use client"; // تجعل هذا المكون يعمل على الـ Client-side

import { UserContext } from "@/app/context/User";
import React, { useContext, useEffect, useState } from "react";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";

function Page({ params }) {
  const [exam, setExam] = useState({});
  const [state] = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_API}/users/previous-question/${params.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.accessToken}`,
            },
          }
        );

        if (!data.ok) {
          throw new Error(`HTTP error! status: ${data.status}`);
        }

        const response = await data.json();
        setExam(response);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getData();
  }, [params.id, state.accessToken]);

  return (
    <div className="question-prev pt-20">
      <div className="container mx-auto">
        <div
          className="lg:grid lg:grid-cols-1 gap-8 lg:p-8 max-sm:p-2 sm:flex sm:flex-col"
          style={{ minHeight: "inherit" }}
        >
          <div className="rounded-lg border bg-gray-50 lg:p-6 max-sm:p-2 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex flex-col justify-between h-5/6">
              <div>
                <p className="mb-6 text-gray-500 dark:text-gray-400 pt-2">
                  {exam?.questionId?.question}
                </p>
                <div className="space-y-2">
                  {exam.questionId?.answers.sort().map((ans, i) => (
                    <div
                      key={i}
                      className={`flex items-center space-x-2 mb-3 border-1 border-gray-700 px-1 py-2 rounded-sm relative ${
                        ans === exam?.questionId.correct
                          ? "bg-green-200"
                          : "bg-red-200"
                      } ${ans === exam.answer && "border-4 border-main"}`}
                    >
                      <label
                        htmlFor={`${ans}_${i}`}
                        className="flex items-center w-full text-left"
                      >
                        <input
                          id={`${ans}_${i}`}
                          style={{ width: "50px" }}
                          hidden={true}
                          value={ans}
                          type="radio"
                        />
                        <span className={`ml-2 text-left`}>
                          {ans != "" ? ans : false}
                        </span>
                      </label>
                    </div>
                  ))}
                  {exam?.questionId?.explanation && (
                    <div className="explanation">
                      <hr />
                      <h1 className="font-bold text-xl">Explanation</h1>
                      {parse(exam?.questionId?.explanation)}
                    </div>
                  )}
                </div>
              </div>
              <hr className="my-5" />
              <div className="text-left">
                <Button onClick={() => window.history.back()}>Back</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
