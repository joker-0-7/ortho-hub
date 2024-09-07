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

function ModalConfirm({ state, question, setQuestion }) {
  const [sources, setSources] = useState([]);
  const getSources = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/questions/sources`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      const data = await res.json();
      setSources(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSources();
  }, []);

  const handleCheckboxChange = (option) => {
    const isSelected = question.sources.includes(option);
    if (isSelected) {
      setQuestion({
        ...question,
        sources: question.sources.filter((item) => item !== option),
      });
    } else {
      setQuestion({ ...question, sources: [...question.sources, option] });
    }
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Chose Sources</AlertDialogTitle>
        <AlertDialogDescription>
          <div className="grid lg:grid-cols-2 max-sm:grid-cols-1">
            {sources.length > 0 ? (
              sources.map((source, index) => (
                <div className="flex items-center space-x-2" key={index}>
                  <Checkbox
                    id={source.name}
                    onCheckedChange={() => handleCheckboxChange(source.name)}
                    checked={
                      question.sources.includes(source.name) ? true : false
                    }
                  />
                  <Label
                    htmlFor={source.name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {source.name}
                  </Label>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-sm text-gray-500">No sources available</p>
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

export default ModalConfirm;
