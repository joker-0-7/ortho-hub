"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationComp from "@/app/components/PaginationComp";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { getMessagesCount } from "@/app/functions/user";
import { UserContext } from "@/app/context/User";
import { useRouter } from "next/navigation";
import EmptyPage from "../components/EmptyPage";

function Page() {
  const router = useRouter();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [state] = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrent(1);
  };
  const onChange = (page) => {
    setCurrent(+page);
  };
  const getMessages = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/contact-us/${current}/${pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch users.");
      }
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    const countMessage = getMessagesCount(state.accessToken).then((res) =>
      setCount(res.count)
    );
  }, []);
  useEffect(() => {
    getMessages();
  }, []);
  const deleteMessage = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/contact-us/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete message.");
      }
      getMessages();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="contact py-5">
      <div className="container mx-auto">
        {messages.length == 0 ? (
          <div>
            <EmptyPage />
          </div>
        ) : (
          <>
            <div className="title">
              <h1 className="text-xl">Contact-us</h1>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead className="w-[200px]">Email</TableHead>
                  <TableHead className="w-[200px]">Subject</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message._id}>
                    <TableCell className="font-medium">
                      {message.name}
                    </TableCell>
                    <TableCell className="font-medium lowercase">
                      {message.email}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="checkbox-apple">{message.subject}</div>
                    </TableCell>
                    <TableCell className="text-center flex justify-around items-center">
                      <div className="edit">
                        <Button
                          onClick={() =>
                            router.push(`/admin/contact-us/${message._id}`)
                          }
                        >
                          View <AiOutlineEye className="mx-1 text-lg" />
                        </Button>
                      </div>
                      <div className="delete">
                        <Button
                          className="bg-red-700 hover:bg-red-600 duration-100"
                          onClick={async () =>
                            await deleteMessage(message._id).then(() =>
                              getMessages()
                            )
                          }
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
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
