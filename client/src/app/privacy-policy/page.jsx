import React from "react";
import MainNav from "../components/MainNav";
import Footer from "../components/footer/Footer";

function Page() {
  return (
    <div className="privacy-policy min-h-all">
      <nav style={{ zIndex: 222 }} className="relative">
        <MainNav />
      </nav>
      <div className="container py-20">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <div>
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <p>
            We gather information when you visit our website or use any of our
            services, including our mobile applications. The categories of
            personal information we collect include:
          </p>
          <div className="list">
            <ul className="list-outside">
              <li>
                <span className="text-xl font-medium mb-4">Identifiers:</span>
                <span>
                  such as your name, email address, IP address, or account name.
                </span>
              </li>
              <li>
                <span className="text-xl font-medium mb-4">
                  Personal Information:
                </span>
                <span>such as your educational background.</span>
              </li>
              <li>
                <span className="text-xl font-medium mb-4">
                  Professional or Employment-Related Information.
                </span>
              </li>
              <li>
                <span className="text-xl font-medium mb-4">
                  Non-Public Education Information:
                </span>
                <span>
                  such as the schools you attended and your graduation dates.
                </span>
              </li>
              <li>
                <span className="text-xl font-medium mb-4">
                  Commercial Information:
                </span>
                <span>
                  such as the products or services you’ve purchased, considered,
                  or shown interest in, along with your purchasing history or
                  tendencies.
                </span>
              </li>
              <li>
                <span className="text-xl font-medium mb-4">
                  Internet Activity:
                </span>
                <span>
                  such as your browsing history, search history, and details
                  about your interactions with our website, other services, and
                  advertisements.
                </span>
              </li>
              <li>
                <span className="text-xl font-medium mb-4">
                  Geolocation Data:
                </span>
                <span>
                  such as your physical location when accessing our services.
                </span>
              </li>
            </ul>
            <h3 className="text-xl font-medium mb-4">
              This information may be collected through the following methods.
            </h3>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Information You Provide</h2>
          <p>
            When you sign up as a member or request information, we collect
            personally identifiable details through our registration and online
            enrollment forms, including your full name, mailing address, and
            email address.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Information Collected Automatically
          </h2>
          <p>
            When you visit our website, our server automatically logs your IP
            (Internet Protocol) address, browser type, operating system, domain
            name, access times, and referring website addresses.
          </p>
          <p>
            For users engaging with our services, we may gather additional
            information through various technologies. This includes:
          </p>
          <ul className="list-outside">
            <li>Your subscription type and interactions with our Service.</li>
            <li>
              Details of your queries, including the date and time of your
              requests.
            </li>
            <li>
              Any content you post to the Service, such as answer responses,
              notes, flashcards, messages, and forum posts you send and/or
              receive via the Service.
            </li>
            <li>
              Technical data, which may include URL information, cookies, your
              IP address, the types of devices you use to access our Service,
              unique device IDs, device attributes, network and device
              performance, browser type, language and operating system.
            </li>
            <li>
              Location data based on your IP address. OrthoMCQHub may use
              third-party applications to determine your location based on your
              IP address. Your personal or other identifying data (other than
              your IP address) will not be used for this specific purpose.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">
            How We Use Collected Information
          </h2>
          <p>
            We may utilize any collected information, including personal data,
            for the following purposes:
          </p>
          <ul className="list-outside">
            <li>
              To complete, perform, and support the activities for which the
              information was provided.
            </li>
            <li>To enhance the content of our website or services.</li>
            <li>
              To develop new products and services, and to analyze your use of
              the Service, including your interactions with applications,
              products, and services that are available, linked to, or offered
              through the Service.
            </li>
            <li>
              To personalize the content and/or layout of our website for you.
            </li>
            <li>
              To inform you about updates to our website, provided you have
              consented to receive such notifications.
            </li>
            <li>
              To contact you for marketing purposes, provided you have consented
              to receive such communications.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
