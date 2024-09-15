"use client";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/User";
import Link from "next/link";
import PaginationComp from "@/app/components/PaginationComp";
import { getQuestionsCount } from "@/app/functions/user";
import { useToast } from "@/components/ui/use-toast";
import TableContainer from "../components/TableContainer";
import { fetchQuestions } from "@/app/functions/admin";

const TableQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [state] = useContext(UserContext);
  const { toast } = useToast();

  const fetchQuestionCount = async () => {
    try {
      const questionsCount = await getQuestionsCount(state?.accessToken);
      setCount(questionsCount);
    } catch (error) {
      console.error("Error fetching question count:", error);
    }
  };
  useEffect(() => {
    const fetchQuestionsData = async () => {
      try {
        const questionsData = await fetchQuestions(state, current, pageSize);
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestionsData();
  }, [current, pageSize]);
  useEffect(() => {
    fetchQuestionCount();
  }, []);
  const handlePageChange = (page) => {
    setCurrent(page);
  };
  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrent(1);
  };
  const handleDelete = async (id) => {
    if (!state?.accessToken) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/question/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.accessToken}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Unknown error");
      }
      toast({
        title: "Success",
        description: "Question deleted successfully",
      });
      await fetchQuestions();
      await fetchQuestionCount();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete question",
      });
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="questions py-5 min-h-all">
      <div className="container mx-auto">
        <div className="title flex justify-between items-center mb-4">
          <h1 className="text-xl">Questions</h1>
          <Button>
            <Link href="/admin/questions/add">Add Question</Link>
          </Button>
        </div>
        <TableContainer
          dataBody={questions}
          dataHead={["Name", "Actions"]}
          page="questions"
          deleteFunction={handleDelete}
        />
        <PaginationComp
          current={current}
          count={count}
          onChange={handlePageChange}
          onShowSizeChange={handlePageSizeChange}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default TableQuestions;
