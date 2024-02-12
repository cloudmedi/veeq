// @ts-nocheck
"use client";

import Alert from "@/components/ui/alert";
import { countries } from "@/utils/Countries";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function SignUp() {
  const [userInfos, setUserInfos] = useState({
    userName: "",
    eMail: "",
    password: "",
    countryCode2: "",
    languageCode: "",
  });
  const [alert, setAlert] = useState({
    isOpen: false,
    alertText: "",
    role: "error",
  });
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();
  const { userLang } = useSelector((state) => state.loginReducer);

  const alertHandler = (alertText, role = "error") => {
    setAlert({
      isOpen: true,
      alertText,
      role,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (alert.isOpen) {
        setAlert({ isOpen: false, alertText: "", role: "error" });
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  const handleInputs = (key, value) => {
    if (
      userInfos.countryCode2 &&
      userInfos.eMail &&
      userInfos.languageCode &&
      userInfos.password &&
      userInfos.password.length >= 5 &&
      userInfos.userName
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setUserInfos((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!disabled) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/Auth/Register`,
          JSON.stringify(userInfos),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          alertHandler(
            "You have successfully registered. Please check your E-Mail to confirm account.",
            "success"
          );
          router.push(`/signin?lang=${userLang.toLowerCase()}`);
        })
        .catch((err) =>
          alertHandler(
            "You cannot successfully registered. Check your informations.",
            "error"
          )
        );
    }
  };

  return (
    <>
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="h1">Welcome</h1>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full px-3">
                    <button className="btn px-0 rounded-lg text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                      <svg
                        className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                      </svg>
                      <span
                        className="h-6 flex items-center border-r border-white border-opacity-25 mr-4"
                        aria-hidden="true"
                      ></span>
                      <span className="flex-auto pl-16 pr-8 -ml-16">
                        Sign up with Google
                      </span>
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex items-center my-6">
                <div
                  className="border-t border-gray-700 border-dotted grow mr-3"
                  aria-hidden="true"
                ></div>
                <div className="text-gray-400">
                  Or, register with your email
                </div>
                <div
                  className="border-t border-gray-700 border-dotted grow ml-3"
                  aria-hidden="true"
                ></div>
              </div>
              <form>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="full-name"
                    >
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      className="rounded-lg form-input w-full text-gray-300"
                      placeholder="First and last name"
                      required
                      value={userInfos.userName}
                      onChange={(e) =>
                        handleInputs(Object.keys(userInfos)[0], e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input rounded-lg w-full text-gray-300"
                      placeholder="you@example.com"
                      required
                      value={userInfos.eMail}
                      onChange={(e) =>
                        handleInputs(Object.keys(userInfos)[1], e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="rounded-lg form-input w-full text-gray-300"
                      placeholder="Password (at least 6 characters)"
                      required
                      value={userInfos.password}
                      onChange={(e) =>
                        handleInputs(Object.keys(userInfos)[2], e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      htmlFor="countries"
                      className="block text-gray-300 text-sm font-medium mb-1"
                    >
                      Select your country{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="countries"
                      className="form-input text-sm rounded-lg block w-full p-2.5 bg-transparent text-gray-300"
                      onChange={(e) =>
                        handleInputs(Object.keys(userInfos)[3], e.target.value)
                      }
                    >
                      <option className="bg-white text-gray-900" selected>
                        Choose a country
                      </option>
                      {countries.map((country) => (
                        <option
                          className="bg-white text-gray-900"
                          value={country.code}
                          key={country.code}
                        >
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      htmlFor="countries"
                      className="block text-gray-300 text-sm font-medium mb-1"
                    >
                      Select your language{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="countries"
                      className="form-input text-sm rounded-lg block w-full p-2.5 bg-transparent text-gray-300"
                      onChange={(e) =>
                        handleInputs(Object.keys(userInfos)[4], e.target.value)
                      }
                    >
                      <option className="bg-white text-gray-900" selected>
                        Choose a language
                      </option>
                      {[
                        { name: "Turkish", code: "tr" },
                        { name: "English", code: "en" },
                      ].map((language) => (
                        <option
                          className="bg-white text-gray-900"
                          value={language.code}
                          key={language.code}
                        >
                          {language.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-center">
                  I agree to be contacted by Hot Mastering about this offer as
                  per the Hot Mastering{" "}
                  <Link
                    href="#"
                    className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out"
                  >
                    Privacy Policy
                  </Link>
                  .
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button
                      className={`btn rounded-lg text-gray-900 bg-purple-600 hover:bg-purple-700 hover:opacity-90 w-full ${
                        disabled ? "pointer-events-none opacity-50" : ""
                      }`}
                      onClick={submitHandler}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-gray-400 text-center mt-6">
                Already using Hot Mastering?{" "}
                <Link
                  href={`/signin?lang=${userLang}`}
                  className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {alert.isOpen && (
        <Alert alert={alert} setAlert={setAlert} role={alert.role} />
      )}
    </>
  );
}
