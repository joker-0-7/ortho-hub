import React from "react";

function Section({ title, text, reverse, mode, styles, style }) {
  return (
    <section
      className={`py-5 bg-${mode} min-h-half flex justify-center items-center`}
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center justify-items-center">
          <div
            className={`w-full ${styles[style]} h-half ${
              reverse ? "rounded-s-3xl" : "rounded-e-3xl"
            } shadow-sm max-sm:h-[200px] ${reverse && "lg:order-2"}`}
          ></div>
          <div
            className={`lg:w-1/2 sm:w-full lg:py-0 max-sm:py-3 ${
              reverse && "lg:order-1"
            }`}
          >
            <h1 className="text-xl font-bold text-main ">{title}</h1>
            <p
              className={`${
                mode === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section;
