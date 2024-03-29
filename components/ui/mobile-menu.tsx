// @ts-nocheck
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { LOGOUT_USER } from "@/store/actionsName";
import useTranslation from "next-translate/useTranslation";

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const { login, userLang } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("header");

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen && "active"}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" rx="1" />
          <rect y="11" width="24" height="2" rx="1" />
          <rect y="18" width="24" height="2" rx="1" />
        </svg>
      </button>

      {/*Mobile navigation */}
      <nav
        id="mobile-nav"
        ref={mobileNav}
        className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"
        style={
          mobileNavOpen
            ? { maxHeight: mobileNav.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0.8 }
        }
      >
        <ul className="bg-gray-800 rounded-lg px-4 py-2">
          {login ? (
            <>
              <li>
                <p className={"text-gray-200 my-2"}>
                  {t("welcome")}, {login.userName}
                </p>
                <Link
                  href={`/settings?lang=${userLang}`}
                  className="font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {t("settings")}
                </Link>
                <div
                  className="flex cursor-pointer font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center"
                  onClick={() => {
                    setMobileNavOpen(false);
                    dispatch({ type: LOGOUT_USER });
                    router.push(`/?lang=${userLang.toLowerCase()}`);
                  }}
                >
                  {t("signout")}
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href={`/signin?lang=${userLang}`}
                  className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {t("signin")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/signup?lang=${userLang}`}
                  className="font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-gray-900 hover:opacity-90 bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {t("signup")}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
