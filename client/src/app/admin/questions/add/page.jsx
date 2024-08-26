"use client";
import React, { useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import "react-quill/dist/quill.snow.css";
import ModalConfirm from "../../components/ModalSources";
import { UserContext } from "@/app/context/User";
import ModalSubject from "../../components/ModalSubjects";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

function Page() {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const [question, setQuestion] = useState({
    sources: [],
    question: "",
    answers: ["", ""],
    correct: "",
    image: "",
    explanation: "",
    subjects: [],
    isFree: false,
  });
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(false);
  const [state] = useContext(UserContext);
  const handleChangeAnswer = (e, answerIndex) => {
    const { value } = e.target;
    setQuestion((prevQuizzes) => {
      const updatedQuizzes = { ...prevQuizzes };
      updatedQuizzes.answers[answerIndex] = value;
      return updatedQuizzes;
    });
  };
  const uploadFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setDisable(true);
    let formData = new FormData();
    formData.append("img", image);
    formData.append("sources", JSON.stringify(question.sources));
    formData.append("question", question.question);
    formData.append("answers", JSON.stringify(question.answers));
    formData.append("correct", question.correct);
    formData.append("explanation", question.explanation);
    formData.append("subjects", JSON.stringify(question.subjects));
    formData.append("isFree", question.isFree);
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/add-question`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      //   .then(() => router.push("/admin/questions"))
      .catch((err) => console.error(err));
    setDisable(false);
  };
  return (
    <div className="container py-10">
      <div className="submit text-right my-3 flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            checked={question.isFree}
            onCheckedChange={() =>
              setQuestion({ ...question, isFree: !question.isFree })
            }
          />
          <Label htmlFor="airplane-mode">is it free ?</Label>
        </div>
        <Button onClick={handleSubmit} disabled={disable}>
          {disable ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </div>
      <hr className="my-3" />
      <div>
        <div className="question min-h-52 flex justify-between gap-5 mb-5">
          <div className="input w-1/2">
            <Input
              size="large"
              placeholder="Question"
              className="mb-5 bg-gray-100"
              value={question.question}
              onChange={(e) => {
                setQuestion((prevQuizzes) => {
                  const updatedQuizzes = { ...prevQuizzes };
                  updatedQuizzes.question = e.target.value;
                  return updatedQuizzes;
                });
              }}
            />
          </div>
          <div className="image bg-sky-200 border-sky-500 border-2 border-dashed w-1/2 min-h-52 rounded-sm flex justify-center items-center">
            <label htmlFor="upload">Upload image</label>
            <Input
              type="file"
              onChange={uploadFile}
              className="hidden"
              accept="image/*"
              id="upload"
            />
          </div>
        </div>
        <div className="options flex justify-between gap-5 mb-5">
          <div className="chose w-1/2">
            <div className="inputs grid grid-cols-1 gap-3">
              <Input
                type="text"
                placeholder="Correct Answer"
                className="bg-gray-100"
                value={question.correct}
                onChange={(e) => {
                  handleChangeAnswer(e, 0);
                  setQuestion((prevQuizzes) => {
                    const updatedQuizzes = { ...prevQuizzes };
                    updatedQuizzes.correct = e.target.value;
                    return updatedQuizzes;
                  });
                }}
              />
              {question &&
                question.answers &&
                question.answers.map((_ans, i) => {
                  return (
                    <Input
                      key={i}
                      type="text"
                      placeholder="answer"
                      className="bg-gray-100"
                      value={question.answers[i + 1]}
                      onChange={(e) => handleChangeAnswer(e, i + 1)}
                    />
                  );
                })}
            </div>
          </div>
          <div className="adv w-1/2 grid grid-cols-1 gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Sources</Button>
              </AlertDialogTrigger>
              <ModalConfirm
                question={question}
                state={state}
                setQuestion={setQuestion}
              />
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Subjects</Button>
              </AlertDialogTrigger>
              <ModalSubject
                question={question}
                state={state}
                setQuestion={setQuestion}
              />
            </AlertDialog>
          </div>
        </div>
        <div className="explanation">
          <ReactQuill
            theme="snow"
            value={question?.explanation}
            onChange={(e) => setQuestion({ ...question, explanation: e })}
            placeholder="Explanation"
            modules={{
              toolbar: {
                container: [
                  ["bold", "italic", "underline", "strike"],
                  ["blockquote", "code-block"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
                ],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
