"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
    </>
  );
}

export default DefaultLayout;
