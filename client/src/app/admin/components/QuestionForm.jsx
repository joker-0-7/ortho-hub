import React from "react";
import { Input } from "@/components/ui/input";

const QuestionForm = ({ question, setQuestion }) => {
  return (
    <div className="question min-h-52 flex justify-between gap-5 mb-5">
      <div className="input w-1/2">
        <Input
          size="large"
          placeholder="Question"
          className="mb-5 bg-gray-100"
          value={question.question}
          onChange={(e) =>
            setQuestion((prev) => ({ ...prev, question: e.target.value }))
          }
        />
      </div>
      <div className="image bg-sky-200 border-sky-500 border-2 border-dashed w-1/2 min-h-52 rounded-sm flex justify-center items-center">
        <label htmlFor="upload">Upload image</label>
        <Input
          type="file"
          onChange={(e) =>
            setQuestion((prev) => ({ ...prev, image: e.target.files[0] }))
          }
          className="hidden"
          accept="image/*"
          id="upload"
        />
      </div>
    </div>
  );
};

export default QuestionForm;
