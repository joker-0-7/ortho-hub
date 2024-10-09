"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const FormSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
});

export default function Page() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/send-password/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log(result);
      console.log(response);

      if (!response.ok) {
        setStatus("error");
        return;
      }
      router.push(
        `/user/forget-password/${
          result.activationToken
        }?msg=${encodeURIComponent(
          "we send code to your email,  please check your email"
        )}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="forget-password">
      <div className="container mx-auto flex justify-center items-center min-h-screen">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            {status === "error" && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error happened: </span>
                this email is not registered{" "}
                <Link href="/user/register" className="text-md text-main">
                  {" "}
                  register Now{" "}
                </Link>
                , or
                <Link href="/contact-us" className="text-ms text-main">
                  {" "}
                  contact us{" "}
                </Link>
              </div>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
