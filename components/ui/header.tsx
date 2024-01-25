"use client";

import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { useEffect, useRef, useState } from "react";
import { isAuthenticated } from "@/utils/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [headerId, setHeaderId] = useState("");
  const [open, setOpen] = useState(false);
  let ref = useRef(null);
  // const [auth] = useState(localStorage.getItem("auth"));

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

  return (
    <header className="fixed top-0 w-full z-30 header-top" id={headerId}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Cruip">
              <svg
                className="w-8 h-8 fill-current text-purple-600"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M31.952 14.751a260.51 260.51 0 00-4.359-4.407C23.932 6.734 20.16 3.182 16.171 0c1.634.017 3.21.28 4.692.751 3.487 3.114 6.846 6.398 10.163 9.737.493 1.346.811 2.776.926 4.262zm-1.388 7.883c-2.496-2.597-5.051-5.12-7.737-7.471-3.706-3.246-10.693-9.81-15.736-7.418-4.552 2.158-4.717 10.543-4.96 16.238A15.926 15.926 0 010 16C0 9.799 3.528 4.421 8.686 1.766c1.82.593 3.593 1.675 5.038 2.587 6.569 4.14 12.29 9.71 17.792 15.57-.237.94-.557 1.846-.952 2.711zm-4.505 5.81a56.161 56.161 0 00-1.007-.823c-2.574-2.054-6.087-4.805-9.394-4.044-3.022.695-4.264 4.267-4.97 7.52a15.945 15.945 0 01-3.665-1.85c.366-3.242.89-6.675 2.405-9.364 2.315-4.107 6.287-3.072 9.613-1.132 3.36 1.96 6.417 4.572 9.313 7.417a16.097 16.097 0 01-2.295 2.275z" />
              </svg>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center gap-4">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      href="#"
                      className="nav-links font-medium text-gray-200 py-2 flex items-center transition duration-150 ease-in-out"
                    >
                      Master
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#pricing"
                      className="nav-links font-medium text-gray-200 py-2 flex items-center transition duration-150 ease-in-out"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/library"
                      className="font-medium text-purple-600 border border-purple-600 hover:border-gray-200 btn-sm rounded-md hover:text-gray-200 flex items-center transition duration-150 ease-in-out"
                    >
                      Library
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
                          name@flowbite.com
                        </div>
                      </div>
                      <ul
                        className="py-2 text-sm text-gray-200"
                        aria-labelledby="dropdownInformationButton"
                      >
                        <li>
                          <a
                            href="/settings"
                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                          >
                            <FontAwesomeIcon
                              icon={faGear}
                              style={{ color: "#ffffff", marginRight: 4 }}
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                      <div className="py-2">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                        >
                          Sign out
                        </a>
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="#"
                      className="nav-links font-medium text-gray-200 py-2 flex items-center transition duration-150 ease-in-out"
                    >
                      Master
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#pricing"
                      className="nav-links font-medium text-gray-200 py-2 flex items-center transition duration-150 ease-in-out"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signin"
                      className="font-medium text-purple-600 border border-purple-600 hover:border-gray-200 btn-sm rounded-md hover:text-gray-200 flex items-center transition duration-150 ease-in-out"
                    >
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="btn-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md"
                    >
                      Sign up
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
