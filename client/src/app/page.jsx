"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "reactstrap";
import Link from "next/link";
import Footer from "./components/footer/Footer";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { links, linksUser } from "./data/links";

export default function Home() {
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
    <main className="min-h-screen">
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
      <div className="pt-20 min-h-all">
        <section className={`${styles.img} lg:min-h-half max-sm:h-screen`}>
          <div
            className={`${styles.overlay} bg-dark bg-opacity-70 lg:h-half max-sm:h-screen w-full absolute`}
          ></div>
          <div className={`container mx-auto`}>
            <div
              className={`first-sec lg:h-half max-sm:h-screen py-5 ${styles.first}`}
            >
              <div className="lg:w-1/2 sm:w-full flex flex-col justify-evenly lg:h-half max-sm:h-screen">
                <div className="title">
                  <h1 className="text-xl font-bold text-light">
                    welcome to <span className="text-main">OrthoMCQHub</span>
                  </h1>
                </div>
                <div className="description text-lg text-light">
                  <p>
                    We are delighted to introduce our comprehensive FRCS/EBOT
                    exam preparation system, now available online through our
                    OrthoMCQHub website.
                  </p>
                  <p>
                    OrthoMCQHub is dedicated to providing you with the most
                    effective preparation system for your real exam. To achieve
                    this, we have done our best to develop a question bank
                    filled with ideal practice questions. Each question is
                    paired with detailed, evidence-based explanations of the
                    correct answer, specifically designed to help you pass your
                    exam on the first attempt.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Button className="bg-main text-light px-5 py-2 rounded-lg border-2 border-main">
                    <Link href="/user/login">Login</Link>
                  </Button>
                  <Button className="bg-transparent text-main px-5 py-2 rounded-lg border-main border-2 hover:bg-main hover:text-light duration-200">
                    <Link href="/about-us">learn more</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5 bg-light min-h-half flex justify-center items-center">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center justify-items-center">
              <div className="lg:w-1/2 sm:w-full">
                <Image
                  src="/assets/1.png"
                  alt="left doc"
                  width={1000}
                  height={1500}
                />
              </div>
              <div className="lg:w-1/2 sm:w-full lg:py-0 max-sm:py-3">
                <h1 className="text-xl font-bold text-main ">
                  Our primary goal is your success.
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  We offer unique, never-before-seen questions that cover almost
                  every topic you might encounter in your exam. It is well known
                  that the FRCS/EBOT exams not only test your knowledge but also
                  require good clinical judgment, making them challenging to
                  pass. We are here to guide you confidently through each step
                  of your preparation journey.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="service py-5 bg-dark text-light min-h-half flex justify-center items-center">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center justify-items-center">
              <div className="lg:w-1/2 sm:w-full lg:py-0 max-sm:py-3">
                <h1 className="text-xl font-bold text-main">
                  Detailed Answer Explanations:
                </h1>
                <p className="text-light dark:text-gray-400">
                  When you finish a question, you&apos;ll gain access to an
                  in-depth explanation that clarifies the problem and explains
                  why specific answer options are correct or incorrect. Our
                  step-by-step explanations will help teach the critical
                  thinking skills necessary to master your exam
                </p>
              </div>
              <div className="lg:w-1/2 sm:w-full">
                <Image
                  src="/assets/2.png"
                  alt="left doc"
                  width={1000}
                  height={1500}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-5 bg-light min-h-half flex justify-center items-center">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center justify-items-center">
              <div className="lg:w-1/2 sm:w-full">
                <Image
                  src="/assets/3.png"
                  alt="left doc"
                  width={1000}
                  height={1500}
                />
              </div>
              <div className="lg:w-1/2 sm:w-full lg:py-0 max-sm:py-3">
                <h1 className="text-xl font-bold text-main">
                  Track your performance:
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Create custom tests and quizzes from our thousands of practice
                  questions to get comfortable with what you’ll experience on
                  exam day. Our licensed authors continuously update the
                  material to ensure alignment with the latest content outline.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-dark" id="pricing">
          <div className="p-10">
            <div className="relative max-w-7xl mx-auto">
              <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                <div className="flex-1 px-6 py-8 lg:p-12 bg-light">
                  <h3 className="text-2xl font-extrabold text-dark sm:text-3xl">
                    Lifetime access
                  </h3>
                  <p className="mt-6 text-base text-dark sm:text-lg">
                    Take your Tailwind CSS development to the next level!
                  </p>
                  <div className="mt-8">
                    <div className="flex items-center">
                      <div className="flex-1 border-t-2 border-gray-200" />
                    </div>
                    <ul
                      role="list"
                      className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5"
                    >
                      <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-dark">
                          Inspect Tailwind CSS websites
                        </p>
                      </li>
                      <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-dark">Edit mode in real-time</p>
                      </li>
                      <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-dark">
                          Copy utility classes right into your clipboard
                        </p>
                      </li>
                      <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-dark">
                          Free Chrome extension updates (Firefox coming soon)
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="py-8 px-6 text-center lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12 bg-vDark">
                  <p className="text-lg leading-6 font-medium text-white">
                    Pay once, own it forever
                  </p>
                  <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-white">
                    <span>$90.00</span>
                    <span className="ml-3 text-xl font-medium text-gray-50">
                      USD
                    </span>
                  </div>
                  <div className="mt-6">
                    <div className="rounded-md shadow">
                      <a
                        href="#"
                        className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-main hover:bg-mainD duration-200"
                      >
                        Buy now
                      </a>
                    </div>
                    <p className="text-gray-300 text-sm mt-3">
                      100% money back guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}
