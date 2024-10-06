"use client";
import { useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UserContext } from "@/app/context/User";
import { BsCurrencyPound } from "react-icons/bs";
import style from "./page.module.css";
const PaymentPage = ({ params }) => {
  const router = useRouter();
  const userID = params.id;
  const [state, setState] = useContext(UserContext);

  const createOrder = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/users/create-order`,
      { method: "POST" }
    );
    const data = await res.json();
    return data.id;
  };

  const handleApprove = async (data) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/users/capture-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderID: data.orderID, userID: userID }),
      }
    );
    const details = await res.json();
    if (details.success) {
      const authData = JSON.parse(window.localStorage.getItem("auth"));
      authData.user = details.user;
      window.localStorage.setItem("auth", JSON.stringify(authData));
      setState({ ...state, user: details.user });
      toast.success("Your account has been activate successfully");
      router.push("/user");
    }
  };

  useEffect(() => {
    const loadPayPalScript = async () => {
      const renderPayPalButtons = () => {
        window.paypal
          .Buttons({
            style: {
              color: "blue",
              shape: "pill",
              label: "pay",
              height: 45,
            },
            funding: {
              disallowed: [window.paypal.FUNDING.CARD],
            },
            createOrder: createOrder,
            onApprove: handleApprove,
          })
          .render("#paypal-button-container");
      };

      if (!window.paypal) {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_ID}&currency=GBP`;
        script.addEventListener("load", renderPayPalButtons);
        document.body.appendChild(script);
      } else {
        renderPayPalButtons();
      }
    };

    loadPayPalScript();

    return () => {
      if (window.paypal && window.paypal.Buttons) {
        window.paypal.Buttons().close();
      }
    };
  }, []);

  return (
    <div className="pt-20 min-h-all">
      <div className="container mx-auto">
        <div className="flex justify-center items-center min-h-all">
          <Card className="py-3 px-6 lg:min-w-fit max-sm:min-w-full min-h-half flex justify-around flex-col items-center text-center">
            <CardHeader>
              <CardTitle>QBank</CardTitle>
              <CardDescription className="relative ">
                <del> 90-day access </del>
                {/* <span
                  className={`absolute ${style.iconLine} bg-red-500`}
                ></span>{" "} */}
              </CardDescription>
              <CardDescription className="text-red-500">
                120-day access
              </CardDescription>
              <CardDescription className="text-3xl relative font-bold w-fit mx-auto text-vDark my-3">
                <span className="relative block mx-auto">
                  90.00
                  <span
                    className={`absolute ${style.iconLine} bg-red-500`}
                  ></span>
                </span>{" "}
                <span className="absolute -left-7 -top-2 ">
                  <BsCurrencyPound />
                </span>{" "}
                <span className="text-red-500 "> 68.00 </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-left">
                <li>full QBank access</li>
                <li>one-time reset option</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between flex-col gap-3">
              <div id="paypal-button-container"></div>
              <p>
                if you need other payment methods,{" "}
                <a
                  href={process.env.NEXT_PUBLIC_TELEGRAM}
                  target="_blank"
                  className="text-main "
                >
                  contact us
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
