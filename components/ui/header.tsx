// @ts-nocheck
"use client";

import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_USER, UPDATE_LANG } from "@/store/actionsName";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useTranslation from "next-translate/useTranslation";
import { useQueryState } from "nuqs";
import VeeqLogo from "@/public/images/veeq_logo.png";
import Image from "next/image";

export default function Header() {
  const [headerId, setHeaderId] = useState("");
  const [open, setOpen] = useState(false);
  const { login, userLang } = useSelector((state) => state.loginReducer);
  let ref = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation("header");
  const [namegGlobal, setNameGlobal] = useQueryState("lang");
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (!searchParams.get("lang")) {
      setNameGlobal(
        `${
          localStorage.getItem("lang")
            ? localStorage.getItem("lang").toLowerCase()
            : login
            ? login.languageCode.toLowerCase()
            : navigator.language.toLowerCase().substring(0, 2)
        }`
      );
      dispatch({
        type: UPDATE_LANG,
        payload: `${
          localStorage.getItem("lang")
            ? localStorage.getItem("lang")
            : login
            ? login.languageCode.toLowerCase()
            : navigator.language.toLowerCase().substring(0, 2)
        }`,
      });
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const listenScrollEvent = () => {
    if (window.scrollY < 73) {
      return setHeaderId("");
    } else if (window.scrollY > 70) {
      return setHeaderId("header-blur");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  if (!isClient) return;

  return (
    <header
      className="fixed top-0 w-full z-30 header-top"
      id={headerId}
      ref={(e) => {
        if (e && pathname === "/verify") {
          e.className = "hidden";
        }
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link
              href={`/?lang=${userLang.toLowerCase()}`}
              className="block"
              aria-label="Cruip"
            >
              <Image src={VeeqLogo} width={100} height={50} alt={"Logo"} />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center gap-4">
              {login ? (
                <>
                  <li>
                    <Link
                      href={`/pricing?lang=${userLang.toLowerCase()}`}
                      className="nav-links font-medium text-gray-200 py-2 flex items-center transition duration-150 ease-in-out"
                    >
                      {t("pricing")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/library?lang=${userLang}`}
                      className="font-medium text-purple-600 border border-purple-600 hover:border-gray-200 btn-sm rounded-md hover:text-gray-200 flex items-center transition duration-150 ease-in-out"
                    >
                      {t("library")}
                    </Link>
                  </li>
                  <li ref={ref}>
                    <div
                      className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
                      onClick={() => setOpen((prevState) => !prevState)}
                    >
                      <svg
                        className="absolute w-12 h-12 text-gray-400 -left-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>

                    <div
                      id="dropdownInformation"
                      className={`z-10 absolute -translate-x-14 mt-2 ${
                        open ? "" : "hidden"
                      }  divide-y  rounded-lg shadow w-44 bg-gray-700 divide-gray-600`}
                    >
                      <div className="px-4 py-3 text-sm text-white">
                        <div className="font-medium truncate">
                          {login.eMail}
                        </div>
                      </div>
                      <ul
                        className="py-2 text-sm text-gray-200"
                        aria-labelledby="dropdownInformationButton"
                      >
                        <li>
                          <Link
                            href={`/settings?lang=${userLang}`}
                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                          >
                            <FontAwesomeIcon
                              icon={faGear}
                              style={{ color: "#ffffff", marginRight: 4 }}
                            />
                            {t("settings")}
                          </Link>
                        </li>
                      </ul>
                      <div
                        className="py-2 cursor-pointer"
                        onClick={() => {
                          dispatch({ type: LOGOUT_USER });
                          router.push(`/?lang=${userLang.toLowerCase()}`);
                        }}
                      >
                        <a className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">
                          {t("signout")}
                        </a>
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href={`/pricing?lang=${userLang.toLowerCase()}`}
                      className="nav-links font-medium text-gray-200 py-2 flex items-center transition duration-150 ease-in-out"
                    >
                      {t("pricing")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/signin?lang=${userLang}`}
                      className="font-medium text-purple-600 border border-purple-600 hover:border-gray-200 btn-sm rounded-md hover:text-gray-200 flex items-center transition duration-150 ease-in-out"
                    >
                      {t("signin")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/signup?lang=${userLang}`}
                      className="btn-sm text-gray-900 bg-purple-600 hover:bg-purple-700 rounded-md"
                    >
                      {t("signup")}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
