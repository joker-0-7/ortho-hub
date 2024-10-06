"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "antd";
import { useContext, useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";
import {
  AiFillClockCircle,
  AiFillCloseCircle,
  AiFillExclamationCircle,
  AiFillEye,
  AiFillEyeInvisible,
  AiFillFlag,
} from "react-icons/ai";
import { ExamContext } from "@/app/user/generate/context";

const QuestionDisplay = ({
  exam,
  index,
  setIndex,
  handleAns,
  excludesAns,
  handleExcludes,
  handleChange,
  answersQuiz,
  flags,
  ansFun,
  showAns,
  addFlag,
  formatTime,
  time,
  exams,
  checkedAns,
  disable,
  submitExam,
  examsCount,
}) => {
  const [examContext] = useContext(ExamContext);
  const [checked, setChecked] = useState("");
  const { confirm } = Modal;
  const showConfirm = () => {
    const okFun = async () => {
      await submitExam(answersQuiz);
      setIndex(examsCount);
    };

    confirm({
      title: "Do you want to Exit This Exam",
      icon: <AiFillExclamationCircle />,
      content:
        "if you exit the exam, all of your answers will be added to your statistics. Un answered questions will not be saved",
      onOk() {
        okFun();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const isChecked = (questionId, answer) => {
    const checkedAnsBefore = handleAns.find((e) => e.quizId === questionId);
    return checkedAnsBefore ? checkedAnsBefore.userAnswer === answer : null;
  };
  const isLastQuestion = index === exams.length - 1;
  const buttonLabel = isLastQuestion
    ? showAns
      ? "Finish Test"
      : "Next"
    : showAns
    ? "Next Question"
    : "Next";
  const shouldShowExplanation =
    examContext.mode !== "exam" &&
    (showAns || handleAns.some((e) => e.quizId === exam._id));

  return (
    <div className="rounded-lg border bg-gray-50 lg:p-6 max-sm:p-2 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex justify-between md:flex-row max-sm:flex-col-reverse pb-2 items-center ">
        <div className="flex items-center max-sm:w-full lg:w-auto justify-between lg:flex-row max-sm:flex-col">
          <h3 className="text-lg font-semibold lg:mr-8 lg:mb-0 max-sm:mb-2 max-sm:mr-0 ">
            Question {index + 1}
          </h3>
          <span
            className={`cursor-pointer h-9 w-fit flex items-center justify-center transition-all ${
              flags.includes(index) && "bg-amber-300 rounded-full"
            }`}
            onClick={() => addFlag(index)}
          >
            <Button variant="outline">
              <AiFillFlag className="h-5 w-5 mr-2" />
              Flag This Question
            </Button>
            <span className="sr-only">Flag question</span>
          </span>
        </div>
        <div className="flex flex-row-reverse max-sm:justify-between max-sm:items-center max-sm:w-full lg:w-auto">
          <Button
            variant="destructive"
            className="font-semibold text-lg lg:hidden max-sm:block"
            onClick={() => showConfirm()}
          >
            <AiFillCloseCircle />
          </Button>

          <Button
            variant="destructive"
            className="font-semibold text-lg lg:block max-sm:hidden"
            onClick={() => showConfirm()}
          >
            End Exam
          </Button>
          <div className="flex items-center space-x-4 mr-10">
            {(examContext?.mode === "exam" || examContext?.time) && (
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <AiFillClockCircle className="h-4 w-4" />
                <span>{formatTime(time)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col justify-between h-5/6">
        <div>
          <h1 className="mb-6 text-gray-800 dark:text-gray-400 pt-2 text-lg">
            {exam.question}
          </h1>
          <div className="image-preview grid grid-cols-3 gap-3 my-5">
            {exam.images &&
              exam.images.map((uri, index) => (
                <div key={index} className="relative w-32 h-32">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API}/public/images/${exam._id}/${uri}`}
                    layout="fill"
                    objectFit="cover"
                    alt={`Uploaded ${uri}`}
                    className="rounded"
                  />
                </div>
              ))}
          </div>
          <div className="space-y-2">
            {exam.answers
              .filter((ans) => ans != "")
              .sort()
              .map((ans, i) => (
                <div
                  key={i}
                  className={`flex items-center space-x-2 mb-3 border-1 border-gray-700 px-1 py-2 rounded-sm relative ${
                    excludesAns.includes(ans) && "bg-red-100"
                  } ${
                    examContext.mode !== "exam" &&
                    (showAns || checkedAns(exam._id)) &&
                    exam.correct === ans
                      ? "bg-green-200"
                      : (showAns || checkedAns(exam._id)) &&
                        exam.correct !== ans &&
                        "bg-red-200"
                  } ${
                    (isChecked(exam._id, ans) || checked === ans) &&
                    "border-sky-400 shadow-md border-2"
                  }`}
                >
                  <div className="icon absolute right-1">
                    {excludesAns.includes(ans) ? (
                      <span
                        className="cursor-pointer"
                        onClick={() => handleExcludes(ans)}
                      >
                        <AiFillEyeInvisible />
                      </span>
                    ) : (
                      <span
                        className="cursor-pointer"
                        onClick={() => handleExcludes(ans)}
                      >
                        <AiFillEye />
                      </span>
                    )}
                  </div>
                  <label
                    htmlFor={`${ans}_${i}`}
                    className="flex items-center cursor-pointer w-full text-left"
                  >
                    <input
                      id={`${ans}_${i}`}
                      name={`answer_${index}`}
                      style={{ width: "50px" }}
                      onClick={(e) => {
                        setChecked(ans);
                        handleChange(e);
                      }}
                      hidden={true}
                      value={ans}
                      disabled={
                        examContext.mode !== "exam" &&
                        (showAns ||
                          handleAns.filter((e) => e.quizId === exam._id)
                            .length > 0)
                      }
                      type="radio"
                    />
                    <span className={`ml-2 text-left`}>
                      {ans != "" ? ans : false}
                    </span>
                  </label>
                </div>
              ))}
            {shouldShowExplanation && (
              <div className="explanation">
                <hr />
                <h1 className="font-bold text-xl">Explanation</h1>
                {parse(exam?.explanation)}
                <hr className="my-3" />
                If you have a different answer to this question, please reach
                out to us with supporting evidence.{" "}
                <a
                  href={process.env.NEXT_PUBLIC_TELEGRAM}
                  target="_blank"
                  className="text-main "
                >
                  contact us
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="flex mt-4 lg:items-center justify-between gap-5 max-sm:items-start">
          <div>
            <Button
              disabled={index <= 0}
              className="bg-gray-900 me-6"
              onClick={() => (index > 0 ? setIndex(index - 1) : false)}
            >
              Previous
            </Button>
          </div>
          <div className="flex lg:flex-row max-sm:flex-col-reverse items-center justify-center">
            {index < exams.length - 1 && (
              <span
                className="font-bold cursor-pointer hover:text-gray-500 transition-colors lg:mr-5 lg:mt-0 max-sm:mt-3 max-sm:mr-0"
                onClick={() => setIndex(index + 1)}
              >
                Skip
              </span>
            )}
            {
              <Button
                onClick={(e) => ansFun(e, exam._id, index)}
                disabled={disable}
              >
                {buttonLabel}
              </Button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
