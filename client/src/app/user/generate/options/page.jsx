"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { DialogSources } from "@/app/components/options-exam/Source";
import { DialogSubject } from "@/app/components/options-exam/Subject";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ExamContext } from "../context";
import { toast } from "react-toastify";
import { UserContext } from "@/app/context/User";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
function Page() {
  const [examContext, setExamContext] = useContext(ExamContext);
  const [disable, setDisable] = useState(false);
  const router = useRouter();
  const [state] = useContext(UserContext);
  const handleChange = (e, change) => {
    const selectedSource = e;
    if (!examContext[change].includes(selectedSource)) {
      setExamContext({
        ...examContext,
        [change]: [...examContext[change], selectedSource],
      });
    } else {
      setExamContext({
        ...examContext,
        [change]: examContext[change].filter(
          (subject) => subject !== selectedSource
        ),
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (examContext.count > 220) {
      toast.error("Count must be smaller than 220");
      return;
    }
    if (examContext.sources < 1) {
      toast.error("Please select a source");
      return;
    }
    if (examContext.subjects < 1) {
      toast.error("Please select a subject");
      return;
    }

    try {
      setDisable(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/questions/create-exam`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.accessToken}`,
          },
          body: JSON.stringify(examContext),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create exam");
      }

      const data = await res.json();

      if (data.length > 0) {
        setExamContext({ ...examContext, questions: data });
        router.push("/user/generate/exam");
      } else {
        toast.error("No questions returned from the server.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the exam.");
    } finally {
      setDisable(false);
    }
  };

  useEffect(() => {
    setExamContext({ ...examContext, questions: [] });
  }, []);
  return (
    <div className="options-exam pb-5 bg-slate-100 pt-20">
      <div className="container mx-auto">
        <section className="flex items-center justify-evenly min-h-all flex-col text-center">
          <div className="title text-center py-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 capitalize">
              Create Your Customized Quiz with {examContext.mode} Mode
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Select your preferred subjects, sources, and advanced options to
              generate a personalized quiz.
            </p>
          </div>
          <div className="shadow-lg p-5 rounded-md min-h-half w-full flex flex-col justify-between bg-slate-50">
            <div className="grid gap-5 grid-cols-1 justify-center items-center ">
              <div className="sources">
                <DialogSources
                  handleChange={handleChange}
                  setExamContext={setExamContext}
                  examContext={examContext}
                />
              </div>
              <div className="subjects">
                <DialogSubject
                  handleChange={handleChange}
                  examContext={examContext}
                  setExamContext={setExamContext}
                />
              </div>
            </div>
            <h1 className="text-left">State</h1>
            <div className="grid gap-5 lg:grid-cols-4 max-sm:grid-cols-1 lg:justify-center max-sm:justify-items-start items-center w-full py-8">
              <div className="flex items-center space-x-2 lg:mx-auto max-sm:m-0">
                <Checkbox
                  id="all-adv"
                  onCheckedChange={(e) => {
                    const isChecked = e;
                    setExamContext({
                      ...examContext,
                      options: {
                        useAndCorrect: isChecked,
                        unUsed: isChecked,
                        useAndInCorrect: isChecked,
                      },
                    });
                  }}
                  checked={
                    examContext?.options?.useAndCorrect &&
                    examContext?.options?.unUsed &&
                    examContext?.options?.useAndInCorrect
                  }
                />
                <Label
                  htmlFor="all-adv"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                >
                  All / none
                </Label>
              </div>
              <div className="flex items-center space-x-2 lg:mx-auto max-sm:m-0">
                <Checkbox
                  id="un-used"
                  onCheckedChange={(e) => {
                    setExamContext({
                      ...examContext,
                      options: {
                        ...examContext.options,
                        unUsed: !examContext.options.unUsed,
                      },
                    });
                  }}
                  checked={examContext?.options?.unUsed}
                />
                <Label
                  htmlFor="un-used"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                >
                  Unused
                </Label>
              </div>
              <div className="flex items-center space-x-2 lg:mx-auto max-sm:m-0">
                <Checkbox
                  id="used-correct"
                  onCheckedChange={(e) => {
                    setExamContext({
                      ...examContext,
                      options: {
                        ...examContext.options,
                        useAndCorrect: !examContext.options.useAndCorrect,
                      },
                    });
                  }}
                  checked={examContext?.options?.useAndCorrect}
                />
                <Label
                  htmlFor="used-correct"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                >
                  Used and correct
                </Label>
              </div>
              <div className="flex items-center space-x-2 lg:mx-auto max-sm:m-0">
                <Checkbox
                  id="used-incorrect"
                  onCheckedChange={(e) => {
                    setExamContext({
                      ...examContext,
                      options: {
                        ...examContext.options,
                        useAndInCorrect: !examContext.options.useAndInCorrect,
                      },
                    });
                  }}
                  checked={examContext?.options?.useAndInCorrect}
                />
                <Label
                  htmlFor="used-incorrect"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                >
                  Used and incorrect
                </Label>
              </div>
            </div>
            <div className="footer w-full">
              <div className="flex lg:flex-row max-sm:flex-col justify-around items-center">
                <div className="count">
                  <div className="flex flex-col">
                    <Label className="my-2"> Number of questions </Label>
                    <Input
                      type="number"
                      placeholder="Count"
                      max={220}
                      defaultValue={examContext.count}
                      onChange={(e) =>
                        setExamContext({
                          ...examContext,
                          count: Number(e.target.value),
                        })
                      }
                    />
                    <span className="text-sm text-gray-500 my-2">
                      (220 max)
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleSubmit}
                  className="my-3"
                  disabled={disable}
                >
                  {disable ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    <span>Generate Exam</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
