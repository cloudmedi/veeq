// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { countries } from "@/utils/Countries";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./alert";
import { useRouter } from "next/navigation";
import { LOGOUT_USER } from "@/store/actionsName";
import useTranslation from "next-translate/useTranslation";

const UserSettings = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const { login, accessToken } = useSelector((state) => state.loginReducer);
  const [userInfos, setUserInfos] = useState({
    userName: login.userName,
    country: "",
    languageCode: login.languageCode,
  });
  const [passwordInfos, setPasswordInfos] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [alert, setAlert] = useState({
    isOpen: false,
    alertText: "",
    role: "error",
  });
  const [disabled, setDisabled] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const { t } = useTranslation("settings");

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

  const handleInformationInputs = (key, element) => {
    const value = element.target.value;
    setUserInfos((prevState) => ({
      ...userInfos,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (
      (userInfos.userName && userInfos.userName.trim() !== login.userName) ||
      (userInfos.country && userInfos.country.trim() !== login.country) ||
      (userInfos.languageCode &&
        userInfos.languageCode.trim() !== login.languageCode)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [userInfos]);

  const handlePasswordInputs = (key, element) => {
    const value = element.target.value.trim();
    setPasswordInfos((prevState) => ({
      ...prevState,
      [key]: value.trim(),
    }));
  };

  useEffect(() => {
    if (
      passwordInfos.newPassword &&
      passwordInfos.newPassword.length >= 5 &&
      passwordInfos.oldPassword &&
      passwordInfos.oldPassword.length >= 5
    ) {
      setPasswordDisabled(false);
    } else {
      setPasswordDisabled(true);
    }
  }, [passwordInfos]);

  const updatePassword = (e) => {
    e.preventDefault();
    if (!passwordDisabled) {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/User/ResetPassword`,
          JSON.stringify(passwordInfos),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          alertHandler(
            "You have successfully changed your password.",
            "success"
          );
        })
        .catch((err) =>
          alertHandler(
            "You cannot changed your password. Check your old password again.",
            "error"
          )
        );
    }
  };

  const updateUserInformations = (e) => {
    e.preventDefault();
    if (!disabled) {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/User`,
          JSON.stringify(userInfos),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          alertHandler(
            "You have successfully changed your information.",
            "success"
          );
        })
        .catch((err) =>
          alertHandler(
            "You cannot changed your informations. Try again later.",
            "error"
          )
        );
    }
  };

  const deleteAccountHandler = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/User`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        alertHandler("You account deleted.", "error");
        dispatch({ type: LOGOUT_USER });
        route.push("/");
      })
      .catch((err) =>
        alertHandler("There is a problem. Please try again later.", "error")
      );
  };

  return (
    <>
      <form>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-9/12 sm:w-full px-3">
            <label
              className="block text-gray-300 text-sm font-medium mb-1"
              htmlFor="full-name"
            >
              {t("fullName")}
            </label>
            <input
              autoComplete="new-password"
              id="full-name"
              type="text"
              className="rounded-lg form-input w-full text-gray-300"
              placeholder={t("firstLastName")}
              required
              value={userInfos.userName}
              onChange={(e) =>
                handleInformationInputs(Object.keys(userInfos)[0], e)
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-9/12 sm:w-full px-3">
            <label
              htmlFor="countries"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              {t("selectCountry")}
            </label>
            <select
              id="countries"
              className="form-input text-sm rounded-lg block w-full p-2.5 bg-transparent text-gray-300"
              onChange={(e) =>
                handleInformationInputs(Object.keys(userInfos)[1], e)
              }
            >
              {countries.map((country) => (
                <option
                  key={country.code}
                  className="bg-white text-gray-900"
                  value={country.code}
                  defaultValue={login.country === country.code}
                >
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-9/12 sm:w-full px-3">
            <label
              htmlFor="countries"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              {t("selectLanguage")}
            </label>
            <select
              id="countries"
              className="form-input text-sm rounded-lg block w-full p-2.5 bg-transparent text-gray-300"
              onChange={(e) =>
                handleInformationInputs(Object.keys(userInfos)[2], e)
              }
            >
              {[
                { name: "Turkish", code: "tr" },
                { name: "English", code: "en" },
              ].map((language) => (
                <option
                  key={language.code}
                  className="bg-white text-gray-900"
                  value={language.code}
                  defaultValue={login.languageCode === language.code}
                >
                  {language.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mt-6">
          <div className="w-9/12 sm:w-full px-3">
            <button
              className={`btn rounded-lg text-white bg-purple-600 hover:opacity-90 w-full ${
                disabled ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={updateUserInformations}
            >
              {t("updateInformations")}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4 mt-4">
          <div className="w-9/12 sm:w-full px-3">
            <label
              className="block text-gray-300 text-sm font-medium mb-1"
              htmlFor="password"
            >
              {t("password")}
            </label>
            <input
              autoComplete="new-password"
              id="password"
              type="password"
              className="rounded-lg form-input w-full text-gray-300"
              placeholder={t("newPassword")}
              required
              defaultValue={passwordInfos.newPassword}
              onChange={(e) =>
                handlePasswordInputs(Object.keys(passwordInfos)[1], e)
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-9/12 sm:w-full px-3">
            <label
              className="block text-gray-300 text-sm font-medium mb-1"
              htmlFor="password"
            >
              {t("oldPassword")}
            </label>
            <input
              autoComplete="new-password"
              id="password"
              type="password"
              className="rounded-lg form-input w-full text-gray-300"
              placeholder={t("oldPassword")}
              required
              defaultValue={passwordInfos.oldPassword}
              onChange={(e) =>
                handlePasswordInputs(Object.keys(passwordInfos)[0], e)
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mt-6">
          <div className="w-9/12 sm:w-full px-3">
            <button
              className={`btn rounded-lg text-white bg-purple-600 hover:bg-purple-700 hover:opacity-90 w-full ${
                passwordDisabled ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={updatePassword}
            >
              {t("updatePassword")}
            </button>
          </div>
        </div>
      </form>
      <div
        className={"mt-6 cursor-pointer inline-block"}
        onClick={() => setDialog(true)}
      >
        {t("deleteAccount")}
      </div>
      {dialog && (
        <div className="modalSong" style={{ zIndex: 99 }}>
          <div className="flex first-letter:overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative rounded-lg shadowbg-gray-700 bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                  data-modal-hide="popup-modal"
                  onClick={() => setDialog(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      stroke-width="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-400">
                    {t("question")}
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                    onClick={deleteAccountHandler}
                  >
                    {t("sure")}
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 dark:hover:text-white hover:bg-gray-600 focus:ring-gray-600"
                    onClick={() => setDialog(false)}
                  >
                    {t("cancel")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {alert.isOpen && (
        <Alert alert={alert} setAlert={setAlert} role={alert.role} />
      )}
    </>
  );
};

export default UserSettings;
