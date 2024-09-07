"use client";
import { UserContext } from "@/app/context/User";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";

export function DialogSubject({ handleChange, examContext, setExamContext }) {
  const [subjects, setSubjects] = useState([]);
  const [state] = useContext(UserContext);
  const getSubjects = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/questions/subjects`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      const data = await res.json();
      setSubjects(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (state.user.role === "free" && state.user.email === "free@trail.com")
      return setSubjects([{ name: "free trail" }]);
    getSubjects();
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <div className="title">
          <h1>Subjects</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="all-subjects"
            onCheckedChange={(e) => {
              let arr = [];
              examContext.subjects.length > 0
                ? setExamContext({
                    ...examContext,
                    subjects: [],
                  })
                : subjects.map((s) => arr.push(s.name));
              setExamContext({
                ...examContext,
                subjects: [].concat(arr),
              });
            }}
            checked={examContext.subjects.length === subjects.length}
          />
          <Label
            htmlFor="all-subjects"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
          >
            Select All
          </Label>
        </div>
      </div>
      <div
        className={`grid gap-4 py-4 ${
          subjects.length != 0 && "lg:grid-cols-3 sm:grid-cols-2"
        }`}
      >
        {subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <Checkbox
                id={`subject-${subject.name}`}
                onCheckedChange={(e) => {
                  handleChange(subject.name, "subjects");
                }}
                checked={
                  examContext.subjects.includes(subject?.name) ? true : false
                }
              />
              <Label
                htmlFor={`subject-${subject.name}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {subject.name}
              </Label>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-sm text-gray-500">No subjects available</p>
          </div>
        )}
      </div>
    </>
  );
}
