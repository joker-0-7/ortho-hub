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
import { Loader2 } from "lucide-react";

const TableQuestions = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [state] = useContext(UserContext);
  const { toast } = useToast();

  const fetchQuestions = async () => {
    if (!state?.accessToken) return;

    setLoading(true);
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
      console.error("Error fetching questions:", error);
    }
    setLoading(false);
  };

  const fetchQuestionCount = async () => {
    try {
      const questionsCount = await getQuestionsCount(state?.accessToken);
      setCount(questionsCount);
    } catch (error) {
      console.error("Error fetching question count:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
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

    setLoading(true);
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
    setLoading(false);
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
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Loading...
          </div>
        ) : (
          <>
            <Table className="min-h-all">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question._id}>
                    <TableCell className="font-medium">
                      {question.question}
                    </TableCell>
                    <TableCell className="text-center flex justify-around items-center">
                      <Button
                        onClick={() =>
                          router.push(`/admin/questions/edit/${question._id}`)
                        }
                      >
                        Edit <AiOutlineEdit className="mx-1 text-lg" />
                      </Button>
                      <Button
                        className="bg-red-700 hover:bg-red-600 duration-100 mx-2"
                        onClick={() => handleDelete(question._id)}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                          </>
                        ) : (
                          <>
                            Delete
                            <AiOutlineDelete className="mx-1 text-lg" />
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <PaginationComp
              current={current}
              count={count}
              onChange={handlePageChange}
              onShowSizeChange={handlePageSizeChange}
              pageSize={pageSize}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TableQuestions;
