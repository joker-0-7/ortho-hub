"use client";
import { UserContext } from "@/app/context/User";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useContext, useEffect, useState } from "react";

function LastQuestions() {
  const [questions, setQuestions] = useState([]);
  const [state] = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/last-questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden xl:table-column">Question</TableHead>
          <TableHead className="hidden xl:table-column">Subject</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions &&
          questions.length > 0 &&
          questions?.map((question) => {
            return (
              <TableRow key={question._id}>
                <TableCell>
                  <div className="font-medium text-sm">{question.question}</div>
                </TableCell>
                <TableCell className="hidden xl:table-column">
                  {question?.subjects?.filter((s) => s !== "")}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

export default LastQuestions;
