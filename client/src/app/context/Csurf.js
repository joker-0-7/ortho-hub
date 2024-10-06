// "use client";
// import { createContext, useState, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import Loader from "../components/loader/Loader";

// const UserCsurf = createContext();
// const CsurfProvider = ({ children }) => {
//   const [csrfToken, setCsrfToken] = useState("");
//   const pathName = usePathname();
//   const router = useRouter();
//   const [client, setClient] = useState(false);
//   const [state, setState] = useState({
//     user: {},
//     accessToken: "",
//   });

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API}/csrf-token`)
//       .then((res) => res.json())
//       .then((data) => setCsrfToken(data.csrfToken))
//       .then(() => setClient(true));
//   }, []);

//   return client ? (
//     <UserCsurf.Provider value={[state, setState]}>
//       {children}
//     </UserCsurf.Provider>
//   ) : (
//     <Loader />
//   );
// };

// export { UserCsurf, CsurfProvider };
