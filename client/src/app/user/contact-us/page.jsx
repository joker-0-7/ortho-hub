"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import style from "./page.module.css";
import { BiLogoGmail } from "react-icons/bi";
import { BsTelegram } from "react-icons/bs";

function page() {
  return (
    <div className="contact-us min-h-all pt-20">
      <div className="container mx-auto min-h-all flex justify-center items-center">
        <div className="card p-4 rounded-md shadow-md">
          <p>
            The hands-down, sharpest and friendliest education support team
            available to you. We love hearing from our customers and care deeply
            about your concerns and questions. We pride ourselves on responding
            to your message fast and in a manner that will leave you excited and
            grateful that you talked to us. You can send us a message about
            anything. Go ahead, try it!
          </p>
          <div className="flex justify-evenly items-center">
            <a
              href={process.env.NEXT_PUBLIC_TELEGRAM}
              target="_blank"
              className={style.telegram}
            >
              <span>Contact us via Telegram</span>
              <span className="mx-2">
                <BsTelegram />
              </span>
            </a>
            <Button className={style.email}>
              <a href={process.env.NEXT_PUBLIC_EMAIL} target="_blank">
                <span>Send us an email</span>
                <span>
                  <BiLogoGmail />
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
