"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import React, { useState } from "react";
import { toast } from "react-toastify";

function Page({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activationCode, setActivationCode] = useState("");
  const [password, setPassword] = useState("");
  const msg = searchParams.get("msg");
  const confirmCode = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/users/confirm-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activation_token: params.token,
          activation_code: activationCode,
          password,
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      toast.error("Error happened, try again");
      return;
    }
    toast.success("your password has been reset successfully");
    router.push("/user/login");
  };
  return (
    <div className="code-password min-h-all flex justify-center items-center">
      <div className="container mx-auto ">
        <div>
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            {msg}
          </div>
        </div>
        <div className="new-password">
          <Input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <div>
            <InputOTP
              className="border-2"
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              onChange={(e) => setActivationCode(e)}
            >
              <InputOTPGroup className="text-center mx-auto ">
                <InputOTPSlot
                  index={0}
                  className="border-2 border-r-0  border-vDark"
                />
                <InputOTPSlot
                  index={1}
                  className="border-2 border-r-0 border-vDark"
                />
                <InputOTPSlot
                  index={2}
                  className="border-2 border-r-0 border-vDark"
                />
                <InputOTPSlot index={3} className="border-2  border-vDark" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div>
            <Button onClick={confirmCode}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
