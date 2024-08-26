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
import { useContext, useEffect, useState, useCallback } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { UserContext } from "@/app/context/User";
import Moment from "react-moment";
import { useRouter } from "next/navigation";
import { deleteUser, getUsersCount } from "@/app/functions/admin";
import PaginationComp from "@/app/components/PaginationComp";
import "./users.css";
import Loader from "@/app/components/loader/Loader";

const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state] = useContext(UserContext);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();

  useEffect(() => {
    getUsers();
  }, [current, pageSize]);

  useEffect(() => {
    const countUser = getUsersCount(state.accessToken).then((res) =>
      setCount(res.count)
    );
  }, []);
  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrent(1);
  };
  const onChange = (page) => {
    setCurrent(+page);
  };
  const getUsers = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/all/${current}/${pageSize}`,
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
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [state.accessToken]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const changeStatus = useCallback(
    async (id, status) => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/users/change-status/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.accessToken}`,
            },
            body: JSON.stringify({ status: status }),
          }
        );

        if (response.ok) {
          getUsers();
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    },
    [state.accessToken, getUsers]
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="users py-5">
      <div className="container mx-auto">
        <div className="title">
          <h1 className="text-xl">Users</h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="w-[200px]">Status</TableHead>
              <TableHead className="w-[200px]">Active to</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell className="font-medium lowercase">
                  {user.email}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="checkbox-apple">
                    <input
                      className="yep"
                      id={`user-${user._id}`}
                      type="checkbox"
                      onChange={() => changeStatus(user._id, user.isVerified)}
                      checked={user.isVerified}
                    />
                    <label htmlFor={`user-${user._id}`} />
                  </div>
                </TableCell>
                <TableCell className="font-medium lowercase">
                  {user.createdAt ? (
                    <Moment fromNow className="lowercase">
                      {user.createdAt}
                    </Moment>
                  ) : (
                    "Not Available"
                  )}
                </TableCell>
                <TableCell className="text-center flex justify-around items-center">
                  <div className="edit">
                    <Button
                      onClick={() =>
                        router.push(`/admin/users/edit/${user._id}`)
                      }
                    >
                      Edit <AiOutlineEdit className="mx-1 text-lg" />
                    </Button>
                  </div>
                  <div className="delete">
                    <Button
                      className="bg-red-700 hover:bg-red-600 duration-100"
                      onClick={async () =>
                        await deleteUser(user._id).then(() => getUsers())
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
      </div>
    </div>
  );
};

export default TableUsers;
