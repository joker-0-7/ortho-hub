"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { UserContext } from "@/app/context/User";
import Link from "next/link";
import PaginationComp from "@/app/components/PaginationComp";
import { getQuestionsCount } from "@/app/functions/user";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
const TableQuestions = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [state] = useContext(UserContext);
  const { toast } = useToast();
  const getQuestions = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/get-questions/${current}/${pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      const data = await res.json();
      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const countData = async () => {
    try {
      const questionsCount = await getQuestionsCount(state?.accessToken);
      setCount(questionsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getQuestions();
  }, [current, pageSize]);
  useEffect(() => {
    countData();
  }, []);
  const onChange = (page) => {
    setCurrent(+page);
  };
  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrent(1);
  };
  const deleteQuestion = async (id) => {
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
        throw new Error(
          `Failed to delete question: ${res.status} ${res.statusText} - ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const data = await res.json();
      await countData();
      await getQuestions();
      toast({
        title: "Success Deleted",
        description: "Question deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting question:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Question deleted Failed",
      });
    }
  };

  return (
    <div className="questions py-5 min-h-all">
      <div className="container mx-auto">
        <div className="title flex justify-between items-center">
          <h1 className="text-xl">questions</h1>
          <Button>
            <Link href="/admin/questions/add">Add Question</Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {question.question}
                </TableCell>
                <TableCell className="text-center flex justify-around items-center">
                  <div className="edit mx-1">
                    <Button
                      onClick={() =>
                        router.push(`/admin/questions/edit/${question._id}`)
                      }
                    >
                      Edit <AiOutlineEdit className="mx-1 text-lg" />
                    </Button>
                  </div>
                  <div className="delete mx-1">
                    <Button
                      className="bg-red-700 hover:bg-red-600 duration-100"
                      onClick={(e) => deleteQuestion(question._id)}
                    >
                      Delete
                      <AiOutlineDelete className="mx-1 text-lg" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="pagination">
          <PaginationComp
            current={current}
            count={count}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};
export default TableQuestions;
