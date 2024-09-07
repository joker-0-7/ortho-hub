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
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "@/app/context/User";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Source must be at least 2 characters.",
  }),
});

export default function InputForm() {
  const [state] = useContext(UserContext);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/questions/source`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      if (result.success) {
        toast.success(result.msg);
        form.reset();
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.msg || "Error add source");
    }
  }

  return (
    <div className="add-source">
      <div className="container mx-auto">
        <section className="h-screen flex justify-center items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6 shadow-md p-3 rounded-md"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is source public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </section>
      </div>
    </div>
  );
}
