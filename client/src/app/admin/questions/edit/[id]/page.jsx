"use client";
import React, { useContext, useEffect, useReducer } from "react";
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
} from "@/app/admin/components";

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

function Page({ params }) {
  const id = params.id;
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userContext] = useContext(UserContext);

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
      await fetch(`${process.env.NEXT_PUBLIC_API}/update-question/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userContext.accessToken}`,
        },
        body: formData,
      });
      router.push("/admin/questions");
      toast.success("Done updating question");
    } catch (err) {
      console.error(err);
      toast.error("Error updating question");
    }

    dispatch({ type: "SET_DISABLE", payload: false });
  };

  const getData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/get-question/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userContext.accessToken}`,
          },
        }
      );
      const data = await res.json();
      dispatch({ type: "SET_QUESTION", payload: data });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

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
      <QuestionForm dispatch={dispatch} question={state} page="edit" />
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
