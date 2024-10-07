"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { links } from "@/app/data/links";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const MainNav = () => {
  const [nav, setNav] = useState(false);
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setNav(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="w-full text-white nav bg-vDark fixed" style={{ zIndex: 2 }}>
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
          {links.map(({ id, link, name }) => (
            <li
              key={id}
              className="nav-links px-4 cursor-pointer capitalize font-medium text-light hover:scale-105 hover:text-main duration-200 link-underline"
            >
              <Link href={`${link}`}>{name}</Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center justify-between">
          <Link href="/user/login">
            <Button className="bg-main text-light px-5 py-2 mx-2 rounded-lg border-2 border-main">
              Login
            </Button>
          </Link>
          <Link href="/user/register">
            <Button className="bg-transparent text-main px-5 py-2 rounded-lg border-main border-2 hover:bg-main hover:text-light duration-200">
              Register
            </Button>
          </Link>
        </div>
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
        {nav && (
          <>
            <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
              {links.map(({ id, link, name }) => (
                <li
                  key={id}
                  className="px-4 cursor-pointer capitalize py-6 text-2xl"
                >
                  <Link onClick={() => setNav(!nav)} href={`${link}`}>
                    {name}
                  </Link>
                </li>
              ))}
              <div
                className="flex items-center justify-between w-full px-9"
                style={{ zIndex: 99 }}
              >
                <Link href="/user/login">
                  <Button className="bg-main text-light px-5 py-2 mx-2 rounded-lg border-2 border-main">
                    Login
                  </Button>
                </Link>
                <Link href="/user/register">
                  <Button className="bg-transparent text-main px-5 py-2 rounded-lg border-main border-2 hover:bg-main hover:text-light duration-200">
                    Register
                  </Button>
                </Link>
              </div>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default MainNav;
