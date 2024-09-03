// "use client";
// import React, { useState, useContext, useEffect } from "react";
// import { UserContext } from "./User";
// import { useRouter, usePathname } from "next/navigation";
// import Loader from "../components/loader/Loader";

// function UserRouter({ children }) {
//   const [ok, setOk] = useState(false);
//   const pathName = usePathname();
//   const router = useRouter();
//   const [state, setState] = useContext(UserContext);
//   useEffect(() => {
//     if (!pathName.split("/").includes("register")) {
//       if (!state || !state.accessToken) {
//         router.push("/user/login");
//       }
//     }
//   }, [state, router]);
//   useEffect(() => {
//     const auth = JSON.parse(window.localStorage.getItem("auth"));
//     if (auth && auth.accessToken && !state?.accessToken) {
//       setState(auth);
//     }
//     if (
//       pathName.split("/").includes("login") ||
//       pathName.split("/").includes("register") ||
//       pathName.split("/").includes("un-authorize") ||
//       pathName.split("/").includes("payment") ||
//       pathName.split("/").includes("free-trial")
//     ) {
//       setOk(true);
//     } else {
//       if (state && state.accessToken) {
//         getCurrentUser();
//         setOk(true);
//       } else {
//         if (pathName.split("/").includes("admin")) {
//           router.push("/admin/login");
//         } else {
//           router.push("/user/login");
//         }
//       }
//     }
//   }, [pathName, state, router, setState]);
//   const getCurrentUser = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API}/users/current`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${state.accessToken}`,
//           },
//         }
//       );
//       if (!response.ok) {
//         const res = await response.json();
//         if (response.status === 401) {
//           setState({ user: {}, accessToken: "" });
//           window.localStorage.removeItem("auth");
//           return router.push("/user/login");
//         }
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     } catch (error) {
//       return router.push("/user/login");
//     }
//   };
//   return !ok ? <Loader /> : <>{children}</>;
// }

// export default UserRouter;

"use client";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./User";
import { useRouter, usePathname } from "next/navigation";
import Loader from "../components/loader/Loader";

function UserRouter({ children }) {
  const [ok, setOk] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"));
    if (auth && auth.accessToken && !state?.accessToken) {
      setState(auth);
    }
    const allowedPaths = [
      "login",
      "register",
      "un-authorize",
      "payment",
      "free-trial",
    ];
    if (allowedPaths.some((path) => pathName.split("/").includes(path))) {
      setOk(true);
    } else {
      if (state && state.accessToken) {
        getCurrentUser();
        setOk(true);
      } else {
        if (pathName.split("/").includes("admin")) {
          router.push("/admin/login");
        } else {
          router.push("/user/login");
        }
      }
    }
  }, [pathName, state, router, setState]);

  const getCurrentUser = async () => {
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
        if (response.status === 401) {
          setState({ user: {}, accessToken: "" });
          window.localStorage.removeItem("auth");
          return router.push("/user/login");
        }
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      return router.push("/user/login");
    }
  };

  return !ok ? <Loader /> : <>{children}</>;
}

export default UserRouter;
