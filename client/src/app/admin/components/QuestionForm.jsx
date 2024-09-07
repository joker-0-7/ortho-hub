import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const QuestionForm = ({ dispatch, question }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).filter(Boolean);
    dispatch({
      type: "SET_QUESTION",
      payload: { images: [...question.images, ...files] },
    });
  };

  const handleRemoveImage = (index) => {
    dispatch({
      type: "SET_QUESTION",
      payload: { images: question.images.filter((_, i) => i !== index) },
    });
  };

  const handleQuestionChange = (e) => {
    dispatch({
      type: "SET_QUESTION",
      payload: { question: e.target.value },
    });
  };

  const renderImageSrc = (image) => {
    if (!image) return null;
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return `${process.env.NEXT_PUBLIC_API}/public/images/${question._id}/${image}`;
  };

  return (
    <div className="question min-h-52 flex flex-col gap-5 mb-5">
      <div className="input">
        <Input
          size="large"
          placeholder="Question"
          className="mb-5 bg-gray-100"
          value={question.question}
          onChange={handleQuestionChange}
        />
      </div>
      <div className="image-upload ">
        <label
          htmlFor="upload"
          className="cursor-pointer bg-sky-200 border-sky-500 border-2 border-dashed min-h-52 rounded-sm p-4 flex justify-center items-center"
        >
          Upload image
        </label>
        <Input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          id="upload"
        />
      </div>
      <div className="image-preview grid grid-cols-3 gap-3">
        {question.images &&
          question.images.filter(Boolean).map((image, index) => (
            <div key={index} className="relative w-32 h-32">
              <Image
                src={renderImageSrc(image)}
                layout="fill"
                objectFit="cover"
                alt={`Uploaded ${index}`}
                className="rounded"
              />
              <Button
                className="absolute top-1 right-1 text-light hover:bg-red-500 hover:scale-105 duration-200"
                onClick={() => handleRemoveImage(index)}
              >
                X
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuestionForm;
