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
            <Link href="/" className="hover:underline">
              OrthoMCQHub . All Rights Reserved.
            </Link>
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <Link href="/about-us" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:underline me-4 md:me-6"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/refund-policy"
                className="hover:underline me-4 md:me-6"
              >
                Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
