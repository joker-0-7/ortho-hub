"use client";
import React, { useEffect, useState, useContext } from "react";
import { useTimer } from "@/app/utils/useTimer";
import { useRouter } from "next/navigation";
import QuestionNavigation from "@/app/components/exam/QuestionNavigation";
import QuestionDisplay from "@/app/components/exam/QuestionDisplay";
import { ExamContext } from "../context";
import { UserContext } from "@/app/context/User";
import Score from "@/app/components/Score";
function Page() {
  const [exams, setExams] = useState([]);
  const [state] = useContext(UserContext);
  const [showAns, setShowAns] = useState(false);
  const [exam, setExam] = useContext(ExamContext);
  const [answersQuiz, setAnswersQuiz] = useState([]);
  const [exclude, setExclude] = useState(false);
  const [excludesAns, setExcludesAns] = useState([]);
  const [handleAns, setHandleAns] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [flags, setFlags] = useState([]);
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const time = useTimer(Number(exam?.questions?.length) * 60);
  useEffect(() => {
    setExams(exam.questions || []);
  }, [exam]);
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    setShowAns(false);
  }, [index]);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage =
        "Are you sure you want to leave? Your progress will be lost.";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    const handlePopState = (event) => {
      const confirmationMessage =
        "Are you sure you want to leave? Your progress will be lost.";
      if (!window.confirm(confirmationMessage)) {
        event.preventDefault();
        window.history.pushState(null, null, window.location.pathname);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const nextBtn = () => {
    setIndex((num) => (num <= exams.length ? num + 1 : num));
  };
  const handleExcludes = (e) => {
    if (excludesAns.includes(e)) {
      setExcludesAns(excludesAns.filter((item) => item !== e));
    } else {
      setExcludesAns([...excludesAns, e]);
    }
  };
  const checkAnswer = (answerUser, correctAnswer) =>
    answerUser === correctAnswer;
  const handleChange = (e) =>
    setUserAnswers({ ...userAnswers, [exams[index]._id]: e.target.value });
  const addFlag = (i) => {
    setFlags((prevFlags) =>
      prevFlags.includes(i)
        ? prevFlags.filter((item) => item !== i)
        : [...prevFlags, i]
    );
  };
  const ansFun = async (e, quizId, i) => {
    const isCorrect = checkAnswer(userAnswers[quizId], exams[i].correct);
    if (isCorrect) {
      setAnswersQuiz((prevAnswersQuiz) => ({
        ...prevAnswersQuiz,
        [quizId]: true,
      }));
      setCorrect(correct + 1);
      if (exam.mode === "tutor" && e.target.innerHTML === "Next")
        return setShowAns(true);
      else {
        nextBtn();
        setShowAns(false);
      }
    } else {
      setAnswersQuiz((prevAnswersQuiz) => ({
        ...prevAnswersQuiz,
        [quizId]: false,
      }));
      if (exam.mode !== "exam") {
        setShowAns(true);
      } else {
        nextBtn();
      }
      if (e.target.innerHTML === "Next Question") {
        nextBtn();
        setShowAns(false);
      }
      if (e.target.innerHTML === "Show Result") {
        nextBtn();
      }
    }
    setHandleAns((prevHandleAns) => {
      const existingAnswerIndex = prevHandleAns.findIndex(
        (ans) => ans.quizId === quizId
      );
      const newAnswer = { quizId: quizId, userAnswer: userAnswers[quizId] };
      if (existingAnswerIndex >= 0) {
        const updatedHandleAns = [...prevHandleAns];
        updatedHandleAns[existingAnswerIndex] = newAnswer;
        return updatedHandleAns;
      } else {
        return [...prevHandleAns, newAnswer];
      }
    });
    console.log(handleAns);
  };
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (seconds === 0 && minutes === 0) {
      submitExam();
      setIndex(exams.length);
    }
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const checkedAns = (questionId) => {
    const checkedAnsBefore = handleAns.filter((e) => e.quizId === questionId);
    if (checkedAnsBefore.length > 0) {
      return checkedAnsBefore[0].userAnswer;
    } else return null;
  };
  const submitExam = async () => {
    setDisable(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/questions/submit-exam`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.accessToken}`,
        },
        body: JSON.stringify({
          userId: state.user._id,
          solvedQuestions: handleAns.map((sq) => ({
            quizId: sq.quizId,
            userAnswer: sq.userAnswer,
            isCorrect:
              sq.userAnswer === exams.find((q) => q._id === sq.quizId).correct,
          })),
        }),
      }
    );
    if (res.ok) {
      const result = await res.json();
      console.log("Exam submitted successfully:", result);
    } else {
      console.error("Failed to submit exam:", await res.text());
    }
    setDisable(false);
  };
  return (
    <div className="quiz min-h-all pt-20">
      <div className="min-h-all">
        {index < exams.length ? (
          <div
            className="lg:grid lg:grid-cols-[100px_1fr] gap-8 lg:p-8 max-sm:p-2 sm:flex sm:flex-col"
            style={{ minHeight: "inherit" }}
          >
            <QuestionNavigation
              exams={exams}
              flags={flags}
              setIndex={setIndex}
              addFlag={addFlag}
              index={index}
            />
            <QuestionDisplay
              answersQuiz={answersQuiz}
              setAnswersQuiz={setAnswersQuiz}
              exam={exams[index]}
              examContext={exam}
              examsCount={exams.length}
              setIndex={setIndex}
              handleExcludes={handleExcludes}
              index={index}
              excludesAns={excludesAns}
              setExclude={setExclude}
              exams={exams}
              checkedAns={checkedAns}
              flags={flags}
              userAnswers={userAnswers}
              handleAns={handleAns}
              handleChange={handleChange}
              ansFun={ansFun}
              showAns={showAns}
              addFlag={addFlag}
              formatTime={formatTime}
              time={time}
              disable={disable}
              submitExam={submitExam}
            />
          </div>
        ) : (
          <div className="flex justify-around items-center min-h-all p-8 flex-col ">
            <Score
              correct={correct}
              answersQuiz={answersQuiz}
              exams={exams.length}
              router={router}
              submitExam={submitExam}
              disable={disable}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
