"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AiOutlineEdit } from "react-icons/ai";
import DeleteButton from "./DeleteButton";
import Moment from "react-moment";
import { useRouter } from "next/navigation";
function TableContainer({
  deleteFunction,
  dataHead,
  dataBody,
  page,
  changeStatus,
}) {
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {dataHead &&
            dataHead.map((name) => (
              <TableHead key={name._id} className="text-center">
                {name}
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataBody.map((data) => (
          <TableRow key={data._id}>
            <TableCell
              className={`font-medium ${page === "users" && "text-center"} `}
            >
              {data.question ||
                `${data.firstName} ${data.lastName}` ||
                data.name}
            </TableCell>
            {page === "users" && (
              <>
                <TableCell className="font-medium text-center">
                  {data.email}
                </TableCell>
                <TableCell className="font-medium text-center">
                  <div className="checkbox-apple">
                    <input
                      className="yep"
                      id={`user-${data._id}`}
                      type="checkbox"
                      onChange={() => changeStatus(data._id, data.isVerified)}
                      checked={data.isVerified}
                    />
                    <label htmlFor={`user-${data._id}`} />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-center lowercase">
                  {data.createdAt ? (
                    <Moment fromNow className="lowercase">
                      {data.createdAt}
                    </Moment>
                  ) : (
                    "Not Available"
                  )}
                </TableCell>
              </>
            )}
            <TableCell className="text-center flex justify-around items-center">
              <Button
                onClick={() => router.push(`/admin/${page}/edit/${data._id}`)}
              >
                Edit <AiOutlineEdit className="mx-1 text-lg" />
              </Button>

              <DeleteButton
                handleDelete={() => deleteFunction(data._id)}
                title={
                  data.question ||
                  `${data.firstName} ${data.lastName}` ||
                  data.name
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableContainer;
