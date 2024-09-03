"use client";
import styles from "./page.module.css";
import { Button } from "reactstrap";
import Link from "next/link";
import Footer from "./components/footer/Footer";
import MainNav from "./components/MainNav";
import dynamic from "next/dynamic";
import Loader from "./components/loader/Loader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const Section = dynamic(() => import("./components/Section"), {
    ssr: false,
    loading: () => <Loader />,
  });
  useEffect(() => {
    const state = JSON.parse(window.localStorage.getItem("auth"));
    if (state?.user && state?.accessToken) router.push("/user");
  }, []);
  return (
    <main className="min-h-screen">
      <nav style={{ zIndex: 222 }} className="relative">
        <MainNav />
      </nav>
      <div className="pt-20 min-h-all">
        <section
          className={`${styles.img} lg:min-h-all max-sm:h-all relative overflow-hidden`}
        >
          <div
            className={`${styles.overlay} bg-dark bg-opacity-70 min-h-full w-full absolute`}
          ></div>
          <div className="container mx-auto">
            <div
              className={`first-sec lg:min-h-all max-sm:min-h-all py-5 ${styles.first}`}
            >
              <div className="sm:w-full flex flex-col justify-evenly lg:min-h-all max-sm:min-h-all text-center">
                <div className="flex justify-evenly items-center lg:min-h-[74vh] max-sm:min-h-all flex-col">
                  <div className="title">
                    <h1 className="lg:text-6xl max-sm:text-4xl font-bold text-light">
                      Welcome to <span className="text-main">OrthoMCQHub</span>
                    </h1>
                  </div>
                  <div className="description text-2xl text-light lg:w-5/6 max-sm:w-full">
                    <p>
                      We are delighted to introduce our comprehensive FRCS/EBOT
                      exam preparation system, now available online through our
                      OrthoMCQHub website. OrthoMCQHub is dedicated to providing
                      you with the most effective preparation system for your
                      real exam. To achieve this, we have done our best to
                      develop a question bank filled with ideal practice
                      questions. Each question is paired with detailed,
                      evidence-based explanations of the correct answer,
                      specifically designed to help you pass your exam on the
                      first attempt.
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Button className="bg-main text-light px-5 py-2 rounded-lg border-2 border-main">
                      <Link href="/user/free-trial">Start Free Trial!!</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>
          <Section
            styles={styles}
            style="primary"
            mode="light"
            title="Our primary goal is your success."
            text="
           We offer unique, never-before-seen questions that cover almost
              every topic you might encounter in your exam. It is well known
              that the FRCS/EBOT exams not only test your knowledge but also
              require good clinical judgment, making them challenging to pass.
              We are here to guide you confidently through each step of your
              preparation journey.
          "
          />
        </div>
        <div>
          <Section
            styles={styles}
            style="detailed"
            mode="dark"
            reverse={true}
            title="Detailed Answer Explanations:"
            text="
                When you finish a question, you'll gain access to an
                  in-depth explanation that clarifies the problem and explains
                  why specific answer options are correct or incorrect. Our
                  step-by-step explanations will help teach the critical
                  thinking skills necessary to master your exam
          "
          />
        </div>
        <div>
          <Section
            styles={styles}
            style="track"
            mode="light"
            title="Track your performance:"
            text="
                  Create custom tests and quizzes from our thousands of practice
                  questions to get comfortable with what you’ll experience on
                  exam day. Our licensed authors continuously update the
                  material to ensure alignment with the latest content outline.
          "
          />
        </div>
        <section className="py-5 bg-dark min-h-[90vh] flex justify-center items-center">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 max-sm:grid-cols-1 items-center justify-items-center">
              <div className="my-3">
                <h1 className="lg:text-6xl max-sm:text-4xl my-5 font-bold text-light ">
                  All the answers, right here.
                </h1>
                <p className="text-xl text-light">
                  OrthoMCQHub is a collection of meticulously prepared
                  high-quality Multiple Choice Questions (MCQs) to assist in
                  successfully passing orthopaedic exams. such as:
                </p>
                <ul
                  className="list-disc text-light"
                  style={{ listStyle: "inside" }}
                >
                  <li>UK and International FRCS Exams</li>
                  <li>EBOT Fellowship Exam</li>
                  <li>SICOT Diploma Exam</li>
                  <li>Prometric Exam</li>
                </ul>
              </div>
              <div>
                <Image
                  src="/assets/question.png"
                  alt="left doc"
                  width={1000}
                  className="scale-110 duration-200"
                  height={1500}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-light" id="pricing">
          <div className="p-10">
            <div className="relative max-w-7xl mx-auto">
              <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                <div className="flex-1 px-6 py-8 lg:p-12 bg-dark">
                  <h3 className="text-2xl font-extrabold text-light sm:text-3xl">
                    90-Day Access
                  </h3>
                  <p className="mt-6 text-base text-light sm:text-lg">
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
                        <p className="ml-3 text-light">
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
                        <p className="ml-3 text-light">
                          Custom Qbank sessions.
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
                        <p className="ml-3 text-light">
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
                        <p className="ml-3 text-light">Performance analysis.</p>
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
                        Join us now
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
