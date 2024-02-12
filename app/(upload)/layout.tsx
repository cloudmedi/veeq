"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import isAuth from "@/helper/isAuth";
import { Beforeunload } from "react-beforeunload";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  return (
    <>
      <main className="grow">{children}</main>
      <Beforeunload
        onBeforeunload={() => "You’ll lose your datas. Are you sure?"}
      />
    </>
  );
}

export default isAuth(DefaultLayout);
