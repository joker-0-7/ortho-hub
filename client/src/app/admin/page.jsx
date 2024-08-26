"use client";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import {
  getActiveUserCount,
  getSubjectCount,
  getUsersCount,
} from "../functions/admin";
import { UserContext } from "../context/User";
import { getQuestionsCount } from "../functions/user";
import LastQuestions from "./components/LastQuestions";
import LastUsers from "./components/LastUsers";
import { AiFillEdit, AiOutlineBook } from "react-icons/ai";

export default function Dashboard() {
  const [countUsers, setCountUsers] = useState(0);
  const [countQuestions, setCountQuestions] = useState(0);
  const [countSubjects, setCountSubjects] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [state] = useContext(UserContext);
  useEffect(() => {
    const countUser = getUsersCount(state.accessToken).then((res) =>
      setCountUsers(res.count)
    );
    const questionsCount = getQuestionsCount(state?.accessToken).then((res) =>
      setCountQuestions(res)
    );
    const subjectCount = getSubjectCount(state?.accessToken).then((res) =>
      setCountSubjects(res)
    );
    const active = getActiveUserCount(state?.accessToken).then((res) =>
      setActiveUsers(res)
    );
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Questions
              </CardTitle>
              <AiOutlineBook className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{countQuestions || 0}</div>
              <p className="text-xs text-muted-foreground">total questions</p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{countUsers || 0}</div>
              <p className="text-xs text-muted-foreground">
                count users is active and un active
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeUsers || 0}</div>
              <p className="text-xs text-muted-foreground">
                count users is active and un active
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subjects
              </CardTitle>
              <AiFillEdit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{countSubjects}</div>
              <p className="text-xs text-muted-foreground">subjects count</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>questions</CardTitle>
                <CardDescription>the last 5 Questions </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/admin/questions">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <LastQuestions />
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Last 5 Users</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <LastUsers />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
