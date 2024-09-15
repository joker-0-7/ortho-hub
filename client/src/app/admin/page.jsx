"use client";
import Link from "next/link";
import { Activity, ArrowUpRight, Users } from "lucide-react";
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
import CardComponent from "./components/CardComponent";
import SkeltonScreen from "./components/SkeltonScreen";

export default function Dashboard() {
  const [data, setData] = useState({
    countUsers: 0,
    countQuestions: 0,
    countSubjects: 0,
    activeUsers: 0,
  });
  const [isClient, setIsClient] = useState(false);
  const [state] = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersCount, questionsCount, subjectsCount, activeUsersCount] =
          await Promise.all([
            getUsersCount(state.accessToken),
            getQuestionsCount(state.accessToken),
            getSubjectCount(state.accessToken),
            getActiveUserCount(state.accessToken),
          ]);

        setData({
          countUsers: usersCount.count || 0,
          countQuestions: questionsCount || 0,
          countSubjects: subjectsCount || 0,
          activeUsers: activeUsersCount || 0,
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
    setIsClient(true);
  }, [state?.accessToken]);

  if (!isClient) {
    return <SkeltonScreen />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <CardComponent
            title="Total Questions"
            description="total questions"
            icon={() => (
              <AiOutlineBook className="h-4 w-4 text-muted-foreground" />
            )}
            data={data.countQuestions}
          />
          <CardComponent
            title="Total Users"
            description="count users is active and un active"
            icon={() => <Users className="h-4 w-4 text-muted-foreground" />}
            data={data.countUsers}
          />
          <CardComponent
            title="Active Users"
            description="active users"
            icon={() => <Activity className="h-4 w-4 text-muted-foreground" />}
            data={data.activeUsers}
          />
          <CardComponent
            title="Total Subjects"
            description="subjects count"
            icon={() => (
              <AiFillEdit className="h-4 w-4 text-muted-foreground" />
            )}
            data={data.countSubjects}
          />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Questions</CardTitle>
                <CardDescription>the last 5 Questions</CardDescription>
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
          <Card>
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
