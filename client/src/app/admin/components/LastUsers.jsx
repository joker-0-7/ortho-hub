import { UserContext } from "@/app/context/User";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React, { useContext, useEffect, useState } from "react";

function LastUsers() {
  const [users, setUsers] = useState([]);
  const [state] = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/users/last-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <>
      {users.map((user) => {
        return (
          <div className="flex items-center gap-4" key={user._id}>
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarFallback>
                {`${user?.firstName?.[0].toUpperCase() || ""}${
                  user?.lastName?.[0].toUpperCase() || ""
                }`}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {`${user.firstName} ${user.lastName}`}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="ml-auto font-medium">
              {user.isVerified ? "Active" : "Not Active"}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default LastUsers;
