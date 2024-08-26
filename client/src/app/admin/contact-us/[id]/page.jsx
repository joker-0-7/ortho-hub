"use client";
import { UserContext } from "@/app/context/User";
import React, { useContext, useEffect, useState } from "react";

function Page({ params }) {
  const id = params.id;
  const [message, setMessages] = useState({});
  const [state] = useContext(UserContext);
  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/contact-us/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex min-h-screen relative items-center justify-center w-full">
      <div className="absolute top-8">Contact us</div>
      <div className="rounded-xl overflow-hidden relative text-center p-4 group items-center flex flex-col max-w-sm hover:shadow-2xl transition-all duration-500 shadow-xl">
        <div className="text-gray-500 group-hover:scale-105 transition-all">
          <svg
            className="w-16 h-16"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="group-hover:pb-10 transition-all duration-500 delay-200">
          <h1 className="font-semibold text-gray-700">{message.name || ""}</h1>
          <p className="text-gray-500 text-sm">
            {" "}
            <a href={`mailto:${message.email}`} target="_blank">
              {" "}
              {message.email || ""}{" "}
            </a>
          </p>
        </div>
        <div className="flex items-center transition-all duration-500 delay-200 group-hover:bottom-3 -bottom-full absolute gap-2 justify-evenly w-full">
          {message.message || ""}
        </div>
      </div>
    </div>
  );
}

export default Page;
