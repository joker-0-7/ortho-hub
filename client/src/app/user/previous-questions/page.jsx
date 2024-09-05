"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/User";
import { getSolvedQuestions, previousQuestions } from "@/app/functions/user";
import PaginationComp from "@/app/components/PaginationComp";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const [state, setState] = useContext(UserContext);
  const [type, setType] = useState("");
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [previous, setPrevious] = useState([]);
  useEffect(() => {
    const fetchPreviousQuestions = async () => {
      try {
        const data = await previousQuestions(
          state.accessToken,
          type,
          current,
          pageSize
        );
        setPrevious(data);
      } catch (error) {
        console.error("Failed to fetch previous questions:", error);
      }
    };
    fetchPreviousQuestions();
  }, [state.accessToken, type, current, pageSize]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const solvedQuestions = await getSolvedQuestions(state?.accessToken);
        setCount(solvedQuestions.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [state.accessToken]);

  const onChange = (page) => {
    setCurrent(+page);
  };
  const handleFilter = (e) => {
    setType(e);
  };
  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrent(1);
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 pt-20">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 min-h-screen">
          <Tabs defaultValue="all" className="min-h-screen">
            <div className="flex items-center">
              <Select onValueChange={handleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter</SelectLabel>
                    <SelectItem value="all">all</SelectItem>
                    <SelectItem value="correct">correct</SelectItem>
                    <SelectItem value="incorrect">incorrect</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <TabsContent value="all" className="min-h-screen">
              <Card x-chunk="dashboard-06-chunk-0" className="min-h-screen">
                <CardHeader>
                  <CardTitle>Previous Questions</CardTitle>
                  <CardDescription>
                    Manage your previous questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-all">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Correct Answer
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Subject
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    {previous &&
                      previous.length > 0 &&
                      previous.map((prev, i) => {
                        return (
                          <TableBody key={i}>
                            <TableRow>
                              <TableCell className="font-medium lg:w-1/2 max-sm:w-auto">
                                <Link
                                  href={`/user/previous-questions/${prev.questionId._id}`}
                                >
                                  {prev.questionId.question}
                                </Link>
                              </TableCell>
                              <TableCell>
                                {prev.isCorrect ? (
                                  <Badge>Correct</Badge>
                                ) : (
                                  <Badge>Incorrect</Badge>
                                )}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {prev.questionId.correct}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {prev.questionId.subjects.filter(
                                  (s) => s !== ""
                                )}
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableBody>
                        );
                      })}
                  </Table>
                </CardContent>
                <CardFooter>
                  <PaginationComp
                    current={current}
                    count={count}
                    onChange={onChange}
                    onShowSizeChange={onShowSizeChange}
                    pageSize={pageSize}
                  />
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
