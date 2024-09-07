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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
const TableSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [state] = useContext(UserContext);
  const router = useRouter();
  const { toast } = useToast();
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
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/questions/subject/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          `Failed to delete question: ${res.status} ${res.statusText} - ${
            errorData.message || "Unknown error"
          }`
        );
      }
      const data = await res.json();
      await getSubjects();
      toast({
        title: "Success Deleted",
        description: "Subject deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting subject:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "subject deleted Failed",
      });
    }
  };
  return (
    <div className="subjects py-5">
      <div className="container mx-auto">
        <div className="title flex justify-between items-center">
          <h1 className="text-3xl font-bold">Subjects</h1>
          <Button onClick={() => router.push("/admin/subjects/add")}>
            Create Subject
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell className="text-center flex justify-around items-center">
                  <div className="edit">
                    <Button
                      onClick={() =>
                        router.push(`/admin/subjects/edit/${subject._id}`)
                      }
                    >
                      Edit <AiOutlineEdit className="mx-1 text-lg" />
                    </Button>
                  </div>
                  <div className="delete">
                    <Button
                      className="bg-red-700 hover:bg-red-600 duration-100"
                      onClick={() => handleDelete(subject._id)}
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
      </div>
    </div>
  );
};
export default TableSubject;
