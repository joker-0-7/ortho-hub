"use client";
import { UserContext } from "@/app/context/User";
import { resetInformation } from "@/app/functions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

function Page() {
  const [state] = useContext(UserContext);
  const [password, setPassword] = useState("");
  const { confirm } = Modal;
  const updatePassword = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/update-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.accessToken}`,
          },
          body: JSON.stringify({ password: password }),
        }
      );
      const data = await response.json();
      if (data.success) {
        return;
      }
      console.error(data);
    } catch (error) {
      console.error(error);
    }
  };
  const reset = async () => {
    await resetInformation(state.accessToken)
      .then(() => toast.success("success reset"))
      .catch(() =>
        toast.error("You have exceeded the limit, contact us if you need help")
      );
  };
  const showPromiseConfirm = () => {
    confirm({
      title: "This future is allowed once",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure you want to proceed",
      okType: "danger",
      onOk() {
        return new Promise((resolve, reject) => {
          reset().then(resolve).catch(reject);
        }).catch(() => console.log("Oops, errors occurred!"));
      },
      onCancel() {
        console.log("Cancelled");
      },
    });
  };
  return (
    <div className="user-account pt-20">
      <div className="container">
        <section className="flex justify-evenly flex-col min-h-screen">
          <div className="title text-center">
            <h1 className="text-2xl font-bold">Account Setting</h1>
            <p className="text-gray-600">
              You can change your password only, and you don&apos;t need to
              change anything else.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2 sm:grid-cols-1">
            <div className="user-name">
              <h2 className="text-xl font-bold text-gray-900 py-2">
                User Name
              </h2>
              <Input
                value={`${state.user.firstName} ${state.user.lastName}`}
                disabled
              />
            </div>
            <div className="email">
              <h2 className="text-xl font-bold text-gray-900 py-2">Email</h2>
              <Input value={state.user.email} disabled />
            </div>
            <div className="password">
              <h2 className="text-xl font-bold text-gray-900 py-2">Password</h2>
              <Input
                value={password}
                placeholder="Set A New Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="subscription-end">
              <h2 className="text-xl font-bold text-gray-900 py-2">
                Expiration Date
              </h2>
              <Input
                value={new Date(
                  state.user.subscriptionEnd
                ).toLocaleDateString()}
                disabled
              />
            </div>
          </div>
          <div className="buttons">
            <div className="flex lg:flex-row max-sm:flex-col justify-between items-center gap-5">
              <Button
                className="bg-main text-vDark hover:text-light duration-200 lg:w-auto max-sm:w-full"
                onClick={updatePassword}
              >
                Save
              </Button>
              <Button
                className="bg-red-700 hover:bg-red-600 duration-200 lg:w-auto max-sm:w-full"
                onClick={showPromiseConfirm}
              >
                Reset Information
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
