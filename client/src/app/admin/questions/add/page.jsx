// "use client";
// import React, { useContext, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import dynamic from "next/dynamic";
// import { Button } from "@/components/ui/button";
// import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import "react-quill/dist/quill.snow.css";
// import ModalConfirm from "../../components/ModalSources";
// import { UserContext } from "@/app/context/User";
// import ModalSubject from "../../components/ModalSubjects";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";
// import { toast } from "react-toastify";

// function Page() {
//   const ReactQuill = useMemo(
//     () => dynamic(() => import("react-quill"), { ssr: false }),
//     []
//   );
//   const [question, setQuestion] = useState({
//     sources: [],
//     question: "",
//     answers: ["", ""],
//     correct: "",
//     image: "",
//     explanation: "",
//     subjects: [],
//     isFree: false,
//   });
//   const [image, setImage] = useState("");
//   const [disable, setDisable] = useState(false);
//   const router = useRouter();
//   const [state] = useContext(UserContext);
//   const handleChangeAnswer = (e, answerIndex) => {
//     const { value } = e.target;
//     setQuestion((prevQuizzes) => {
//       const updatedQuizzes = { ...prevQuizzes };
//       updatedQuizzes.answers[answerIndex] = value;
//       return updatedQuizzes;
//     });
//   };
//   const uploadFile = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     setDisable(true);
//     let formData = new FormData();
//     formData.append("img", image);
//     formData.append("sources", JSON.stringify(question.sources));
//     formData.append("question", question.question);
//     formData.append("answers", JSON.stringify(question.answers));
//     formData.append("correct", question.correct);
//     formData.append("explanation", question.explanation);
//     formData.append("subjects", JSON.stringify(question.subjects));
//     formData.append("isFree", question.isFree);
//     const data = await fetch(`${process.env.NEXT_PUBLIC_API}/add-question`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${state.accessToken}`,
//       },
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then(() => {
//         router.push("/admin/questions");
//         toast.success("Done Add Question");
//       })
//       .catch((err) => {
//         console.error(err);
//         toast.error("Error... try again later");
//       });
//     setDisable(false);
//   };
//   return (
//     <div className="container py-10">
//       <div className="submit text-right my-3 flex justify-between items-center w-full">
//         <div className="flex items-center space-x-2">
//           <Switch
//             id="airplane-mode"
//             checked={question.isFree}
//             onCheckedChange={() =>
//               setQuestion({ ...question, isFree: !question.isFree })
//             }
//           />
//           <Label htmlFor="airplane-mode">is it free ?</Label>
//         </div>
//         <Button onClick={handleSubmit} disabled={disable}>
//           {disable ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Please wait
//             </>
//           ) : (
//             <span>Submit</span>
//           )}
//         </Button>
//       </div>
//       <hr className="my-3" />
//       <div>
//         <div className="question min-h-52 flex justify-between gap-5 mb-5">
//           <div className="input w-1/2">
//             <Input
//               size="large"
//               placeholder="Question"
//               className="mb-5 bg-gray-100"
//               value={question.question}
//               onChange={(e) => {
//                 setQuestion((prevQuizzes) => {
//                   const updatedQuizzes = { ...prevQuizzes };
//                   updatedQuizzes.question = e.target.value;
//                   return updatedQuizzes;
//                 });
//               }}
//             />
//           </div>
//           <div className="image bg-sky-200 border-sky-500 border-2 border-dashed w-1/2 min-h-52 rounded-sm flex justify-center items-center">
//             <label htmlFor="upload">Upload image</label>
//             <Input
//               type="file"
//               onChange={uploadFile}
//               className="hidden"
//               accept="image/*"
//               id="upload"
//             />
//           </div>
//         </div>
//         <div className="options flex justify-between gap-5 mb-5">
//           <div className="chose w-1/2">
//             <div className="inputs grid grid-cols-1 gap-3">
//               <Input
//                 type="text"
//                 placeholder="Correct Answer"
//                 className="bg-gray-100"
//                 value={question.correct}
//                 onChange={(e) => {
//                   handleChangeAnswer(e, 0);
//                   setQuestion((prevQuizzes) => {
//                     const updatedQuizzes = { ...prevQuizzes };
//                     updatedQuizzes.correct = e.target.value;
//                     return updatedQuizzes;
//                   });
//                 }}
//               />
//               {question &&
//                 question.answers &&
//                 question.answers.map((_ans, i) => {
//                   return (
//                     <Input
//                       key={i}
//                       type="text"
//                       placeholder="answer"
//                       className="bg-gray-100"
//                       value={question.answers[i + 1]}
//                       onChange={(e) => handleChangeAnswer(e, i + 1)}
//                     />
//                   );
//                 })}
//             </div>
//           </div>
//           <div className="adv w-1/2 grid grid-cols-1 gap-3">
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Button variant="outline">Sources</Button>
//               </AlertDialogTrigger>
//               <ModalConfirm
//                 question={question}
//                 state={state}
//                 setQuestion={setQuestion}
//               />
//             </AlertDialog>

//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Button variant="outline">Subjects</Button>
//               </AlertDialogTrigger>
//               <ModalSubject
//                 question={question}
//                 state={state}
//                 setQuestion={setQuestion}
//               />
//             </AlertDialog>
//           </div>
//         </div>
//         <div className="explanation">
//           <ReactQuill
//             theme="snow"
//             value={question?.explanation}
//             onChange={(e) => setQuestion({ ...question, explanation: e })}
//             placeholder="Explanation"
//             modules={{
//               toolbar: {
//                 container: [
//                   ["bold", "italic", "underline", "strike"],
//                   ["blockquote", "code-block"],
//                   [{ list: "ordered" }, { list: "bullet" }],
//                   ["link", "image"],
//                   ["clean"],
//                 ],
//               },
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;
"use client";
import React, { useContext, useReducer } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UserContext } from "@/app/context/User";
import {
  AnswerInputs,
  ModalConfirm,
  ModalSubject,
  QuestionForm,
  ReactQuillEditor,
} from "../../components";

const initialState = {
  sources: [],
  question: "",
  answers: ["", ""],
  correct: "",
  images: [],
  explanation: "",
  subjects: [],
  isFree: false,
  disable: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUESTION":
      return { ...state, ...action.payload };
    case "SET_DISABLE":
      return { ...state, disable: action.payload };
    case "ADD_IMAGES":
      return { ...state, images: [...state.images, ...action.payload] };
    case "REMOVE_IMAGE":
      return {
        ...state,
        images: state.images.filter((_, i) => i !== action.payload),
      };
    default:
      return state;
  }
}

function Page() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userContext] = useContext(UserContext);
  const router = useRouter();

  const handleChangeAnswer = (e, answerIndex) => {
    const { value } = e.target;
    const updatedAnswers = state.answers.map((answer, i) =>
      i === answerIndex ? value : answer
    );

    if (updatedAnswers[updatedAnswers.length - 1] !== "") {
      updatedAnswers.push("");
    }

    dispatch({
      type: "SET_QUESTION",
      payload: {
        answers: updatedAnswers,
      },
    });
  };

  const handleSubmit = async (e) => {
    dispatch({ type: "SET_DISABLE", payload: true });

    let formData = new FormData();
    state.images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("sources", JSON.stringify(state.sources));
    formData.append("question", state.question);
    formData.append("answers", JSON.stringify(state.answers));
    formData.append("correct", state.correct);
    formData.append("explanation", state.explanation);
    formData.append("isFree", state.isFree);
    formData.append("subjects", JSON.stringify(state.subjects));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/add-question`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userContext.accessToken}`,
        },
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to add question");
      }
      router.push("/admin/questions");
      toast.success("Question added successfully");
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err.message}`);
    }

    dispatch({ type: "SET_DISABLE", payload: false });
  };

  return (
    <div className="container py-10">
      <div className="submit text-right my-3 flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            checked={state.isFree}
            onCheckedChange={() =>
              dispatch({
                type: "SET_QUESTION",
                payload: { isFree: !state.isFree },
              })
            }
          />
          <Label htmlFor="airplane-mode">is it free?</Label>
        </div>
        <Button onClick={handleSubmit} disabled={state.disable}>
          {state.disable ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </div>
      <QuestionForm dispatch={dispatch} question={state} />
      <div className="options flex justify-between gap-5 mb-5">
        <AnswerInputs
          answers={state.answers}
          handleChangeAnswer={handleChangeAnswer}
          correctAnswer={state.correct}
          setCorrectAnswer={(value) =>
            dispatch({ type: "SET_QUESTION", payload: { correct: value } })
          }
        />
        <div className="adv w-1/2 grid grid-cols-1 gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Sources</Button>
            </AlertDialogTrigger>
            <ModalConfirm
              question={state}
              state={userContext}
              setQuestion={(newData) =>
                dispatch({ type: "SET_QUESTION", payload: newData })
              }
            />
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Subjects</Button>
            </AlertDialogTrigger>
            <ModalSubject
              question={state}
              state={userContext}
              setQuestion={(newData) =>
                dispatch({ type: "SET_QUESTION", payload: newData })
              }
            />
          </AlertDialog>
        </div>
      </div>
      <div className="explanation">
        <ReactQuillEditor
          value={state.explanation}
          onChange={(e) =>
            dispatch({ type: "SET_QUESTION", payload: { explanation: e } })
          }
        />
      </div>
    </div>
  );
}

export default Page;
