"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "reactstrap";
import Link from "next/link";
import Footer from "./components/footer/Footer";
import MainNav from "./components/MainNav";

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav style={{ zIndex: 222 }} className="relative">
        <MainNav />
      </nav>
      <div className="pt-20 min-h-all">
        <section
          className={`${styles.img} lg:min-h-half max-sm:h-screen relative overflow-hidden`}
        >
          <div
            className={`${styles.overlay} bg-dark bg-opacity-70 min-h-full w-full absolute`}
          ></div>
          <div className={`container mx-auto`}>
            <div
              className={`first-sec lg:min-h-half max-sm:min-h-screen py-5 ${styles.first}`}
            >
              <div className="lg:w-1/2 sm:w-full flex flex-col justify-evenly lg:min-h-half max-sm:min-h-screen">
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
        <hr className="h-1 bg-vDark" />
        <section className="py-5 bg-light min-h-half flex justify-center items-center">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 items-center justify-items-center">
              <p className="text-xl">
                We will show an example of one the exam well known question?
              </p>
              <div>
                <Image
                  src="/assets/question.png"
                  alt="left doc"
                  width={1000}
                  height={1500}
                />
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
                    90-Day Access
                  </h3>
                  <p className="mt-6 text-base text-dark sm:text-lg">
                    Take your FRCS/EBOT exam preparation to the next level!
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
                          Thousands of Exam-based MCQs
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
                        <p className="ml-3 text-dark">Custom Qbank sessions.</p>
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
                          Detailed answer Explanation.
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
                        <p className="ml-3 text-dark">Performance analysis.</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="py-8 px-6 text-center lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12 bg-vDark">
                  <p className="text-lg leading-6 font-medium text-white">
                    90-Day Access
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
