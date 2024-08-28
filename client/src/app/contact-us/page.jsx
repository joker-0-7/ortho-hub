"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MainNav from "../components/MainNav";

function Page() {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/contact-us`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (!response.ok) {
        throw new Error(`${res.message}`);
      }
      toast.success("Thank You For Contact Us");
    } catch (error) {
      toast.error(
        error.message || "sorry, an error has occurred. Try again later"
      );
    }
  };
  return (
    <>
      <nav>
        <MainNav />
      </nav>
      <div className="contact-us">
        <div className="container mx-auto flex justify-center items-center min-h-screen">
          <section className="bg-light dark:bg-gray-900 shadow-md rounded-sm">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-vDark dark:text-white">
                Contact Us
              </h2>
              <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                Have questions about our OrthoMCQHub or need assistance? Whether
                you&apos;re orthopedists , educator, or just curious, we&apos;re
                here to help. Contact us using the form below and we&apos;ll get
                back to you ASAP.
              </p>
              <div>
                <Label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your name
                </Label>
                <Input
                  type="name"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                  className="shadow-sm"
                  placeholder="your name"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  className="shadow-sm"
                  placeholder="example@mail.com"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Subject
                </Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  className="shadow-sm"
                  onChange={handleChange}
                  value={data.subject}
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Your message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  onChange={handleChange}
                  value={data.message}
                  rows={6}
                  className="shadow-sm"
                  placeholder="Let us know how we can help you"
                  defaultValue={""}
                />
              </div>
              <Button onClick={handleSubmit} className="my-5">
                Send message
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Page;
