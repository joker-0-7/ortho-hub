import React from "react";
import { Input } from "@/components/ui/input";

const AnswerInputs = ({
  answers,
  handleChangeAnswer,
  correctAnswer,
  setCorrectAnswer,
}) => {
  return (
    <div className="chose w-1/2">
      <div className="inputs grid grid-cols-1 gap-3">
        <Input
          type="text"
          placeholder="Correct Answer"
          className="bg-gray-100"
          value={correctAnswer}
          onChange={(e) => {
            handleChangeAnswer(e, 0);
            setCorrectAnswer(e.target.value);
          }}
        />
        {answers.map((_, i) => (
          <Input
            key={i}
            type="text"
            placeholder="Answer"
            className="bg-gray-100"
            value={answers[i + 1]}
            onChange={(e) => handleChangeAnswer(e, i + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default AnswerInputs;
