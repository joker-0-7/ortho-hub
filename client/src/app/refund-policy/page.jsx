import React from "react";
import MainNav from "../components/MainNav";
import Footer from "../components/footer/Footer";

function Page() {
  return (
    <div className="privacy-policy min-h-all">
      <nav style={{ zIndex: 222 }} className="relative">
        <MainNav />
      </nav>
      <div className="container py-20 min-h-all">
        <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
        <div>
          <h2 className="text-2xl font-bold mb-4">No Refund Policy</h2>
          <p>
            At OrthoMCQHub, we are committed to providing high-quality services
            and ensuring customer satisfaction. To help you make an informed
            decision, we offer a free trial period for you to test our services
            before committing to a subscription.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Free Trial</h2>
          <p>
            We encourage all potential subscribers to take advantage of our free
            trial period. This allows you to explore our services and determine
            if they meet your needs and expectations.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">No Refunds</h2>
          <p>
            Due to the availability of the free trial, we do not offer refunds
            on any subscriptions. Once a subscription is purchased, it is
            non-refundable. We believe that the free trial period provides ample
            opportunity for you to evaluate our services.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p>
            If you have any questions or concerns about our no-refund policy,
            please contact our customer support team. We are here to assist you
            and address any issues you may encounter.{" "}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
