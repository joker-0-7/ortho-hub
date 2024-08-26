"use client";
import { deleteUser } from "@/app/functions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page({ params }) {
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    isVerified: "",
    subscriptionEnd: "",
    activationTo: "",
  });
  const id = params.id;
  const fetchUser = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/users/user/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUser(data);
  };
  const updateUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/user/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(`Error updating user: ${data.message || "Unknown error"}`);
        return;
      }

      toast.success("User updated successfully");
      router.push("/admin/users");
    } catch (error) {
      toast.error(`Failed to update user: ${error.message || "Unknown error"}`);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="edit-user min-h-all">
      <div className="container mx-auto min-h-all flex justify-center items-center">
        <section className="bg-light dark:bg-gray-900 shadow-md rounded-md lg:w-1/2 max-sm:w-full">
          <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Update User
            </h2>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="w-full">
                <Label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </Label>
                <Input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={user.firstName}
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="First Name"
                />
              </div>
              <div className="w-full">
                <Label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={user.lastName}
                  placeholder="Last Name"
                />
              </div>
              <div className="w-full">
                <Label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={user.email}
                  placeholder="Email"
                />
              </div>
              <div className="w-full">
                <Label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={user.password}
                  placeholder="Password"
                />
              </div>
              <div className="w-full">
                <Label
                  htmlFor="expirationDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Expiration Date
                </Label>
                <Input
                  type="text"
                  name="subscriptionEnd"
                  id="expirationDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={new Date(user.subscriptionEnd).toLocaleDateString()}
                  disabled
                  placeholder="Expiration Date"
                />
              </div>
              <div>
                <Label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </Label>
                <select
                  value={user.role}
                  name="role"
                  onChange={handleChange}
                  id="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected disabled>
                    Select Role
                  </option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <Label
                  htmlFor="active"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  It Is Active ?
                </Label>
                <select
                  name="isVerified"
                  value={user.isVerified}
                  onChange={handleChange}
                  id="active"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected disabled>
                    Select Role
                  </option>
                  <option value="true">true</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div>
                <Label
                  htmlFor="active"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  activation to
                </Label>
                <select
                  name="activationTo"
                  value={user.activationTo}
                  onChange={handleChange}
                  id="active"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected disabled>
                    Select
                  </option>
                  <option value="1">1 month</option>
                  <option value="2">2 month</option>
                  <option value="3">3 month</option>
                  <option value="4">4 month</option>
                  <option value="5">5 month</option>
                  <option value="6">6 month</option>
                  <option value="7">7 month</option>
                  <option value="8">8 month</option>
                  <option value="9">9 month</option>
                  <option value="10">10 month</option>
                  <option value="11">11 month</option>
                  <option value="12">12 month</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={updateUser}
                type="submit"
                className="text-white  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update
              </Button>
              <Button
                onClick={async () =>
                  await deleteUser(id).then(() => router.push("/admin/users"))
                }
                type="button"
                className="inline-flex items-center hover:text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <svg
                  className="w-5 h-5 mr-1 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
