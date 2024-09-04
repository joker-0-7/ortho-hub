"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context/User";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      if (state?.accessToken) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API}/users/current`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.accessToken}`,
              },
            }
          );

          if (response.status === 401) {
            router.push("/user/un-authorize");
            return;
          }

          if (response.ok) {
            const data = await response.json();
            if (data.user && data.user.role === "admin") {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
              router.push("/user/un-authorize");
            }
          } else {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Fetch error:", error);
          router.push("/user/un-authorize");
        }
      } else {
        router.push("/user/un-authorize");
      }
      setLoading(false);
    };

    checkAdmin();
  }, [state, router, setState]);

  return (
    <AdminContext.Provider value={{ isAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
};
