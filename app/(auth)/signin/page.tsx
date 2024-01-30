"use client";

import Alert from "@/components/ui/alert";
import { ACCESS_TOKEN_UPDATE, LOGIN_INFO_UPDATE } from "@/store/actionsName";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [userInfos, setUserInfos] = useState({
    eMail: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    isOpen: false,
    alertText: "",
    role: "error",
  });
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

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
      userInfos.eMail &&
      userInfos.password &&
      userInfos.password.length >= 5
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
          "https://abdullahtonka42.bsite.net/api/Auth/Login",
          JSON.stringify(userInfos),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          dispatch({
            type: ACCESS_TOKEN_UPDATE,
            payload: response.data.accessToken,
          });
          if (response.data.accessToken) {
            alertHandler("You have successfully logged in.", "success");
            axios
              .get("https://abdullahtonka42.bsite.net/api/User", {
                headers: {
                  Authorization: `Bearer ${response.data.accessToken}`,
                },
              })
              .then((response) => {
                if (response.data) {
                  dispatch({ type: LOGIN_INFO_UPDATE, payload: response.data });
                  router.push("/");
                }
              })
              .catch((error) => {
                alertHandler(
                  "You cannot successfully logged in. Check your informations.",
                  "error"
                );
              });
          }
        })
        .catch((err) =>
          alertHandler(
            "You cannot successfully logged in. Check your informations.",
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
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="h1">
                Welcome back. We exist to make entrepreneurship easier.
              </h1>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full px-3">
                    <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
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
                        Sign in with Google
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
                <div className="text-gray-400">Or, sign in with your email</div>
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
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input w-full text-gray-300"
                      placeholder="you@yourcompany.com"
                      required
                      value={userInfos.eMail}
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
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-input w-full text-gray-300"
                      placeholder="Password (at least 10 characters)"
                      required
                      value={userInfos.password}
                      onChange={(e) =>
                        handleInputs(Object.keys(userInfos)[1], e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <div className="flex justify-between">
                      <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox" />
                        <span className="text-gray-400 ml-2">
                          Keep me signed in
                        </span>
                      </label>
                      <Link
                        href="/reset-password"
                        className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button
                      className={`btn rounded-lg text-white bg-purple-600 hover:bg-purple-700 w-full ${
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
                Don’t you have an account?{" "}
                <Link
                  href="/signup"
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
