"use client";
import { UserContext } from "@/app/context/User";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";

export function DialogSources({ handleChange, examContext, setExamContext }) {
  const [sources, setSources] = useState([]);
  const [state] = useContext(UserContext);
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
      console.log(error);
    }
  };
  useEffect(() => {
    if (state.user.role === "free" && state.user.email === "free@trail.com")
      return setSources([{ name: "free trail" }]);
    getSources();
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <div className="title">
          <h1>Sources</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="all-sources"
            onCheckedChange={(e) => {
              let arr = [];
              examContext.sources.length > 0
                ? setExamContext({
                    ...examContext,
                    sources: [],
                  })
                : sources.map((s) => arr.push(s.name));
              setExamContext({
                ...examContext,
                sources: [].concat(arr),
              });
            }}
            checked={examContext.sources.length === sources.length}
          />
          <Label
            htmlFor="all-sources"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
          >
            Select All
          </Label>
        </div>
      </div>
      <div
        className={`grid gap-4 py-4 ${
          sources.length != 0 && "lg:grid-cols-3 sm:grid-cols-2"
        }`}
      >
        {sources.length > 0 ? (
          sources.map((source, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <Checkbox
                id={`source-${source.name}`}
                onCheckedChange={(e) => {
                  handleChange(source.name, "sources");
                }}
                checked={
                  examContext.sources.includes(source?.name) ? true : false
                }
              />
              <Label
                htmlFor={`source-${source.name}`}
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
    </>
  );
}
