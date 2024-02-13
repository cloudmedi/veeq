// @ts-nocheck
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function NotFound() {
  const router = useRouter();
  const { userLang } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    let timer = null;

    timer = setTimeout(() => {
      router.push(`/library?lang=${userLang}`);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="global w-screen h-screen flex flex-col justify-center items-center">
      <h2 className={"mb-4 text-4xl tracking-tight font-extrabold text-white"}>
        404
      </h2>
      <p>Could not find requested resource</p>
      <p>You'll redirect to home page.</p>
    </div>
  );
}
