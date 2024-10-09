"use client";
import React, { useState } from "react";
import style from "./page.module.css";
import FormAuth from "@/app/components/form-auth/FormAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Page() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const [activationToken, setActivationToken] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [disable, setDisable] = useState(false);
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    if (user.password !== user.confirmPassword) {
      toast.error("The passwords do not match");
      return;
    }
    try {
      setDisable(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const res = await response.json();

      if (response.ok) {
        setActivationToken(res.activationToken);
        toast.success(res.message);
        setMsg(res.message);
        setSuccess(true);
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setDisable(false);
    }
  };

  const confirmEmail = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API}/users/activation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activation_token: activationToken,
        activation_code: activationCode,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          router.push(
            `/user/login?msg=${encodeURIComponent(
              "Your account has been successfully created, Login Now"
            )}`
          );
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => console.error(err));
  };
  const changeType = () => {
    setShow(!show);
  };
  return (
    <div className="register">
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <FormAuth
          style={style}
          page="register"
          msg={msg}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          user={user}
          show={show}
          changeType={changeType}
          success={success}
          setActivationCode={setActivationCode}
          confirmEmail={confirmEmail}
          disable={disable}
        />
      </div>
    </div>
  );
}

export default Page;
