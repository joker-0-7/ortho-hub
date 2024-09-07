"use client";
import React, { useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import Loader from "../components/loader/Loader";
import { AdminContext } from "./AdminContext";

function UserRouter({ children }) {
  const { isAdmin, loading } = useContext(AdminContext);
  const pathName = usePathname();
  const router = useRouter();
  if (loading) {
    return <Loader />;
  }

  if (pathName.split("/").includes("admin") && !isAdmin) {
    router.push("/user/un-authorize");
    return null;
  }

  return <>{children}</>;
}

export default UserRouter;
