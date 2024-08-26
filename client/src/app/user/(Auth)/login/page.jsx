"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./page.module.css";
import FormAuth from "@/app/components/form-auth/FormAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { UserContext } from "@/app/context/User";
import { toast } from "react-toastify";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const msg = searchParams.get("msg");
  const [state, setState] = useContext(UserContext);
  const [disable, setDisable] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (state && state.accessToken && state.user.isVerified)
      return router.push("/user");
    if (state && state.accessToken && !state.user.isVerified)
      return router.push(`/user/payment/${state.user._id}`);
  }, [state, router]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setDisable(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message);
      }
      const data = res.auth;

      setState({
        user: data.user,
        accessToken: data.accessToken,
      });
      window.localStorage.setItem("auth", JSON.stringify(data));

      if (!data.user.isVerified) {
        console.log("payment");
        router.push(`/user/payment/${data.user._id}`);
      } else {
        console.log("no payment");
        router.push(`/user`);
      }
    } catch (err) {
      console.log(err);

      toast.error(err.message);
      console.error("Fetch error:", err);
    }
    setDisable(false);
  };
  const freeTrial = async () => {
    console.log("free");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/free-trial`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      setState({
        user: res.user,
        accessToken: res.accessToken,
      });
      window.localStorage.setItem("auth", JSON.stringify(res));
      router.push(`/user`);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  return (
    <div className="login">
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <FormAuth
          style={style}
          page="login"
          user={user}
          msg={msg}
          handleChange={handleChange}
          freeTrial={freeTrial}
          handleSubmit={handleSubmit}
          disable={disable}
        />
      </div>
    </div>
  );
}

export default Page;
