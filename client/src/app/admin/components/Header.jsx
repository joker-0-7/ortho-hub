"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Header() {
  const pathName = usePathname();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const searchAny = async (e) => {
    if (query.trim() === "") {
      setResult([]);
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/users/search/${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setResult(data);
  };
  useEffect(() => {
    searchAny();
  }, [query]);
  useEffect(() => {
    setQuery("");
    setResult([]);
  }, [pathName]);

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/admin"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/users"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Users
        </Link>
        <Link
          href="/admin/questions"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Questions
        </Link>
        <Link
          href="/admin/sources"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Sources
        </Link>
        <Link
          href="/admin/subjects"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Subjects
        </Link>
        <Link
          href="/admin/contact-us"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Support
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link href="/admin" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="text-muted-foreground hover:text-foreground"
            >
              Users
            </Link>
            <Link
              href="/admin/questions"
              className="text-muted-foreground hover:text-foreground"
            >
              Questions
            </Link>
            <Link
              href="/admin/sources"
              className="text-muted-foreground hover:text-foreground"
            >
              Sources
            </Link>
            <Link
              href="/admin/subjects"
              className="text-muted-foreground hover:text-foreground"
            >
              Subjects
            </Link>
            <Link
              href="/admin/contact-us"
              className="text-muted-foreground hover:text-foreground"
            >
              Support
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              onChange={(e) => {
                setQuery(e.target.value);
                setResult([]);
              }}
              type="search"
              placeholder="Search questions or users..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
            {result && result.length > 0 && (
              <div className="result absolute left-0 right-0">
                <div className="flex flex-col gap-3 p-4 bg-white rounded-md shadow-md">
                  {result.map((ele, i) => {
                    return (
                      <div key={i}>
                        {ele.firstName ? (
                          <Link href={`/admin/users/edit/${ele._id}`}>
                            <div className="flex items-center gap-2 bg-white hover:bg-light duration-200 rounded-md py-2 px-1">
                              <div className="flex-1">
                                <p className="text-sm text-muted-foreground">
                                  {ele.firstName} {ele.lastName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {ele.email}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <Link href={`/admin/questions/edit/${ele._id}`}>
                            <div className="flex items-center gap-2 bg-white hover:bg-light duration-200 rounded-md py-2 px-1 w-full">
                              <div className="flex-1">
                                <p className="text-sm text-muted-foreground truncate sm:w-[280px] md:w-[180px] lg:w-[280px] pr-2">
                                  {ele.question}
                                </p>
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
