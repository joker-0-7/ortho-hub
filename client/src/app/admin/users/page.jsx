"use client";
import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "@/app/context/User";
import { deleteUser, getUsersCount } from "@/app/functions/admin";
import PaginationComp from "@/app/components/PaginationComp";
import "./users.css";
import Loader from "@/app/components/loader/Loader";
import TableContainer from "../components/TableContainer";

const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state] = useContext(UserContext);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
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
    <div className="users py-5 min-h-all">
      <div className="container mx-auto">
        <div className="title">
          <h1 className="text-xl">Users</h1>
        </div>
        <TableContainer
          dataHead={["Name", "Email", "Status", "Active to", "Actions"]}
          dataBody={users}
          deleteFunction={deleteUser}
          page="users"
          changeStatus={changeStatus}
        />
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
