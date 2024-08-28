import React from "react";
import MainNav from "../components/MainNav";

function page() {
  return (
    <div className="courses min-h-screen bg-light">
      <MainNav />
      <div className="container mx-auto flex justify-center items-center min-h-all flex-col">
        <h1 className="text-4xl font-black text-vDark">Not Available Now</h1>
        <p className="text-gray-500 dark:text-gray-400 py-2">
          Will be available soon
        </p>
      </div>
    </div>
  );
}

export default page;
