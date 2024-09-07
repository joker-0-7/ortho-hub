import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

function ModalSubject({ state, question, setQuestion }) {
  const [subjects, setSubjects] = useState([]);
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
    getSubjects();
  }, []);

  const handleCheckboxChange = (option) => {
    const isSelected = question.subjects.includes(option);
    if (isSelected) {
      setQuestion({
        ...question,
        subjects: question.subjects.filter((item) => item !== option),
      });
    } else {
      setQuestion({ ...question, subjects: [...question.subjects, option] });
    }
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Chose subjects</AlertDialogTitle>
        <AlertDialogDescription>
          <div className="grid lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
            {subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <div className="flex items-center space-x-2" key={index}>
                  <Checkbox
                    id={subject.name}
                    onCheckedChange={() => handleCheckboxChange(subject.name)}
                    checked={
                      question.subjects.includes(subject.name) ? true : false
                    }
                  />
                  <Label
                    htmlFor={subject.name}
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
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default ModalSubject;
