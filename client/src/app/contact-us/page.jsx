"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { links, linksUser } from "../data/links";
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();
  const [state, setState] = "";
  const [nav, setNav] = useState(false);
  const pathName = usePathname();
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setNav(false);
    }
  };
  const logout = async () => {
    await router.push("/login");
    await window.localStorage.removeItem("auth");
    await setState({ accessToken: null, user: null });
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("auth"));
    if (data && data.user && data.accessToken) router.push("/user");
  }, []);
  return (
    <>
      <nav>
        <div className="w-full text-white nav bg-vDark fixed">
          <div className="container mx-auto flex justify-between items-center h-20 px-4">
            <div>
              <h1 className="text-5xl font-signature ml-2">
                <Link
                  className="link-underline link-underline-black"
                  href="/"
                  rel="noreferrer"
                >
                  <Image
                    width={100}
                    height={100}
                    src="/assets/logo/logo.png"
                    alt="logo"
                  />
                </Link>
              </h1>
            </div>
            <ul className="hidden md:flex">
              {state && state.user && state.accessToken ? (
                <>
                  {linksUser.map(({ id, link, name }) => (
                    <li
                      key={id}
                      className="nav-links px-4 cursor-pointer capitalize font-medium text-light hover:scale-105 hover:text-main duration-200 link-underline"
                    >
                      <Link href={`/user/${link}`}>{name}</Link>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {links.map(({ id, link, name }) => (
                    <li
                      key={id}
                      className="nav-links px-4 cursor-pointer capitalize font-medium text-light hover:scale-105 hover:text-main duration-200 link-underline"
                    >
                      <Link href={`${link}`}>{name}</Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
            {state && state.user && state.accessToken ? (
              <>
                <Button
                  className="bg-main text-light px-5 py-2 mx-2 rounded-lg border-2 border-main"
                  onClick={logout}
                >
                  Log out
                </Button>
                <Button className="bg-transparent text-main px-5 py-2 rounded-lg border-main border-2 hover:bg-main hover:text-light duration-200">
                  <Link href="/user">Dashboard</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <Button className="bg-main text-light px-5 py-2 mx-2 rounded-lg border-2 border-main">
                  <Link href="/user/register">Register</Link>
                </Button>
                <Button className="bg-transparent text-main px-5 py-2 rounded-lg border-main border-2 hover:bg-main hover:text-light duration-200">
                  <Link href="/user/login">Free Trial</Link>
                </Button>
              </div>
            )}
            <div
              onClick={() => setNav(!nav)}
              className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
            >
              {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>
            {nav && (
              <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
                {state && state.user && state.accessToken ? (
                  <>
                    {linksUser.map(({ id, link }) => (
                      <li
                        key={id}
                        className="px-4 cursor-pointer capitalize py-6 text-4xl"
                      >
                        <Link
                          onClick={() => setNav(!nav)}
                          href={`/user/${link}`}
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </>
                ) : (
                  <>
                    {links.map(({ id, link }) => (
                      <li
                        key={id}
                        className="px-4 cursor-pointer capitalize py-6 text-4xl"
                      >
                        <Link onClick={() => setNav(!nav)} href={`${link}`}>
                          {link}
                        </Link>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </nav>
      <div className="contact-us">
        <div className="container mx-auto flex justify-center items-center min-h-screen">
          <section className="bg-light dark:bg-gray-900 shadow-md rounded-sm">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-vDark dark:text-white">
                Contact Us
              </h2>
              <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                Got a technical issue? Want to send feedback about a beta
                feature? Need details about our Business plan? Let us know.
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
                  placeholder="Let us know how we can help you"
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
                  placeholder="Leave a comment..."
                  defaultValue={""}
                />
              </div>
              <Button onClick={handleSubmit} className="py-5">
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
