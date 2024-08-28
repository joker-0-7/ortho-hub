"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MainNav from "../components/MainNav";

export default function Page() {
  return (
    <>
      <nav>
        <MainNav />
      </nav>
      <div className="w-full bg-background">
        <section className="container mx-auto flex justify-center items-center min-h-screen">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16 justify-center items-center">
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
                src="/assets/about-us.png"
                alt="About OrthoMCQHub"
                width={500}
                height={500}
                className="rounded-lg object-cover"
                style={{ aspectRatio: "500/380" }}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
