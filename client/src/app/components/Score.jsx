import React from "react";
import PieChart from "./pie/PieChart";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function Score({ answersQuiz, exams, router, submitExam, disable }) {
  const total = Object.values(answersQuiz).filter((val) => val);
  const correct = total.length;
  const score = (correct / exams) * 100;
  return (
    <>
      <div className="score lg:w-1/2 max-sm:w-auto text-center lg:p-10 max-sm:p-0 rounded-md shadow-md flex flex-col items-center justify-between">
        <h1 className="text-xl font-medium text-center my-3"> Score </h1>
        <div className="w-full text-left lg:m-0 max-sm:ml-3">
          <p className="text-gray-500 dark:text-gray-400 py-2 ">
            Total questions is : {exams}
          </p>
          <p className="text-gray-500 dark:text-gray-400 py-2">
            Your correct answer is : {correct}
          </p>
          <p className="text-gray-500 dark:text-gray-400 py-2">
            Your incorrect answer is : {exams - correct}
          </p>
          <p className="text-gray-500 dark:text-gray-400 py-2">
            Your percent is : {score} %
          </p>
        </div>
        <hr className="my-3" />
        <div className="lg:w-96 max-sm:w-full">
          <PieChart
            arrData={[exams - correct, correct]}
            labels={["Incorrect", "Correct"]}
          />
        </div>
      </div>
      <div className="submit">
        <Button
          disabled={disable}
          onClick={async () => {
            await submitExam();
            router.push("/user");
          }}
        >
          {disable ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>Save Score</>
          )}
        </Button>
      </div>
    </>
  );
}

export default Score;
