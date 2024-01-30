// @ts-nocheck
"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { login } = useSelector((state) => state.loginReducer);

    useEffect(() => {
      if (!login) {
        return redirect("/");
      }
    }, []);

    if (!login) {
      return null;
    }

    return <Component {...props} />;
  };
}
