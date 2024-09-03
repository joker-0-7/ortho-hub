"use client";
import { createContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loader from "../components/loader/Loader";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const pathName = usePathname();
  const router = useRouter();
  const [client, setClient] = useState(false);
  const [state, setState] = useState({
    user: {},
    accessToken: "",
  });

  const getState = () => {
    const storedAuth = window.localStorage.getItem("auth");
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setState(parsedAuth);
      } catch (error) {
        console.error("Error parsing auth data from localStorage", error);
      }
    }
  };

  useEffect(() => {
    getState();
    setClient(true);
  }, []);
  // useEffect(() => {
  //   if (!state.user.isVerified && state.user.role !== "free")
  //     return router.push(`/user/payment/${state.user._id}`);
  // }, []);
  const fetchWithAuth = async () => {
    if (!state.accessToken) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/current`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const res = await response.json();
        if (
          response.status === 401 &&
          !window.location.pathname.split("/").includes("login")
        ) {
          setState({ user: {}, accessToken: "" });
          window.localStorage.removeItem("auth");

          if (window.location.pathname.split("/").includes("admin")) {
            router.push("/admin/login");
          } else {
            router.push("/user/login");
          }
        }

        throw new Error("Network response was not ok");
      }

      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const excludedPaths = ["login", "register", "payment", "free-trial"];

    const isExcludedPath = excludedPaths.some((excludedPath) =>
      pathName.includes(excludedPath)
    );

    if (client && state.accessToken && !isExcludedPath) {
      fetchWithAuth()
        .then((data) => {})
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [client, state, pathName]);

  return client ? (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  ) : (
    <Loader />
  );
};

export { UserContext, UserProvider };
