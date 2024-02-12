// @ts-nocheck
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Verify = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const { userLang } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    let timer = null;
    if (searchParams.get("isVerify")) {
      let isVerify = searchParams.get("isVerify");
      if (isVerify === "true") {
        setTitle("Your account is verified.");
        timer = setTimeout(() => {
          router.push(`/signin?lang=${userLang}`);
        }, 4000);
      } else {
        setTitle("Your account is not verified.");
        timer = setTimeout(() => {
          router.push(`/signup?lang=${userLang}`);
        }, 4000);
      }
    }
    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1 mb-4">{title}</h1>
            <p className="text-xl text-gray-400">
              We'll navigate you to related page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Verify;
