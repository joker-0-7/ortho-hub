import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-light rounded-lg shadow dark:bg-gray-800 py-3">
      <div className="container mx-auto">
        <hr className="bg-gray-300 h-[2px]" />
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date(Date.now()).getFullYear()}
            <Link href="/" className="hover:underline" />
            OrthoMCQHub . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <Link href="/" className="hover:underline me-4 md:me-6" />
              About
            </li>
            <li>
              <Link href="/" className="hover:underline me-4 md:me-6" />
              Privacy Policy
            </li>
            <li>
              <Link href="/" className="hover:underline me-4 md:me-6" />
              Licensing
            </li>
            <li>
              <Link href="/" className="hover:underline" />
              Contact
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
