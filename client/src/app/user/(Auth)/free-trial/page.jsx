"use client";
import { UserContext } from "@/app/context/User";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Page() {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (state?.user && state?.accessToken) router.push("/user");
  }, []);
  const freeTrial = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/free-trial`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      setState({
        user: res.user,
        accessToken: res.accessToken,
      });
      window.localStorage.setItem("auth", JSON.stringify(res));
      router.push(`/user`);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  return (
    <section className="w-full min-h-all ">
      <div className="container px-4 md:px-6 min-h-screen flex justify-center items-center">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Try Our Question Bank for Free
              </h1>
              <h2 className="text-2xl font-medium tracking-tighter sm:text-3xl xl:text-4xl/none">
                You can start your free trial now with one click
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                This is the trial version of our system, and not all features
                are available. Some pages contain trial information to
                demonstrate how the system works. To take full advantage of all
                the system’s features, you can subscribe to our website, which
                will allow you to benefit from all these features.
              </p>
            </div>
            <Button
              onClick={freeTrial}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Start Free Trial
            </Button>
          </div>
          <Image
            src="/assets/illustrator/free-trial.jpg"
            width={400}
            height={500}
            alt="Free Trial"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          />
        </div>
      </div>
    </section>
  );
}
