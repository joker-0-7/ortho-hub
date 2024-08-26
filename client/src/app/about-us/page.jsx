"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { links, linksUser } from "../data/links";

export default function Page() {
  const router = useRouter();
  const [state, setState] = useState("");
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
      <div className="w-full bg-background">
        <section className="container mx-auto py-12 md:py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                About OrthoMCQHub
              </h2>
              <p className="text-muted-foreground">
                OrthoMCQHub was founded out of a genuine need to revolutionize
                the way Orthopedists prepare for their FRCS/EBOT exam. Our
                founders, a team of seasoned medical professionals and
                educators, recognized that traditional methods often fell short
                in preparing for the challenges of the FRCS/EBOT exam. They
                envisioned a platform that not only provides high-quality
                practice exams but also offers personalized guidance and
                support. After countless hours of research, development, and
                validation, OrthoMCQHub was born. Today, we stand as the go-to
                solution for FRCS/EBOT preparation.
              </p>
              <p className="text-muted-foreground">
                We built OrthoMCQHub to be the most clear, cohesive, and high
                yield resource available. We&apos;ve spent considerable time
                consulting and collaborating with specialists and content
                writers, reviewing thousands of question bank questions, and
                pouring countless hours of work into the overall organization
                and delivery of the content. Moving forward, we are constantly
                working to improve and expand our offerings to better serve the
                needs of Orthopedists preparing for the FRCS/EBOT exam.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/assets/about-us.jpg"
                alt="About OrthoMCQHub"
                width={500}
                height={500}
                className="rounded-lg object-cover"
                style={{ aspectRatio: "500/500", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
