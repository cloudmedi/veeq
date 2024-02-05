// @ts-nocheck
"use client";

import Content from "@/app/(settings)/settings/content";
import { AnimatedText } from "@/components/ui/animatedText";
const axios = require("axios");
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";

const Upload = () => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [activeTab, setActiveTab] = useState("base");
  const [isThereFile, setIsThereFile] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [sessionToken, setSessionToken] = useState(null);
  const [alert, setAlert] = useState({
    isOpen: false,
    alertText: "",
    role: "error",
  });
  const { t } = useTranslation("upload");
  const { accessToken } = useSelector((state) => state.loginReducer);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (alert.isOpen) {
        setAlert({ isOpen: false, alertText: "" });
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  const getMatcheringToken = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/matchering`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (!sessionToken) {
          setSessionToken(response.data.token);
        }
      })
      .catch((error) => {
        alertHandler("There is error occured. Please try again.", "error");
      });
  };

  const alertHandler = (alertText, role = "error") => {
    setAlert({
      isOpen: true,
      alertText,
      role,
    });
  };

  useEffect(() => {
    forceUpdate();
  }, [activeTabIndex]);

  useEffect(() => {
    getMatcheringToken();
  }, []);

  const submitHandler = () => {
    if (isThereFile) {
      setWaiting(true);
      const FormData = require("form-data");
      let data = new FormData();

      data.append("File", isThereFile);
      data.append("Token", sessionToken);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/matchering/upload/${
          activeTab === "base" ? "target" : "reference"
        }`,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          let nextTab = activeTab === "base" ? "target" : "upload";
          setActiveTab(nextTab);
          setActiveTabIndex((prevState) => ++prevState);
          setIsThereFile(false);
          setWaiting(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setAlert({ isOpen: true, alertText: "Please select a base audio." });
    }
  };

  useEffect(() => {
    if (activeTab === "upload") {
      getResults();
    }
  }, [activeTab]);

  const getResults = () => {
    let interval = setInterval(() => {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/matchering/GetData?token=${sessionToken}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          if (response.data.result16FilePath) {
            clearInterval(interval);
            router.push("/library");
          }
        })
        .catch((error) => {
          console.log("ERROR");

          alertHandler("There is a problem. Please try again.", "error");
        });
    }, 1500);
  };

  return (
    <>
      <div
        className="max-w-6xl mx-auto px-2 sm:px-6"
        style={{ marginTop: 100 }}
      >
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          {[
            { title: t("baseFile"), id: 0 },
            { title: t("targetFile"), id: 1 },
            { title: t("upload"), id: 2 },
          ].map((item, index) =>
            item.id <= activeTabIndex && item.id !== 2 ? (
              <li
                key={index}
                className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
              >
                <span className="whitespace-nowrap flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  {item.title}
                </span>
              </li>
            ) : item.id === 1 && item.id >= activeTabIndex ? (
              <li
                key={index}
                className="whitespace-nowrap flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
              >
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  <span className="me-2">{++item.id}</span>
                  {item.title}
                </span>
              </li>
            ) : (
              <li key={index} className="whitespace-nowrap flex items-center">
                <span className="me-2">3</span>
                {item.title}
              </li>
            )
          )}
        </ol>
        <TETabs className="hidden">
          <TETabsItem active={activeTab === "base"}></TETabsItem>
          <TETabsItem active={activeTab === "target"}></TETabsItem>
          <TETabsItem active={activeTab === "upload"}></TETabsItem>
        </TETabs>

        <TETabsContent className="mt-6">
          <TETabsPane show={activeTab === "base"}>
            <Content
              title={t("uploadBase")}
              setActiveTab={setActiveTab}
              afterTab={"target"}
              setActiveTabIndex={setActiveTabIndex}
              isThereFile={isThereFile}
              setIsThereFile={setIsThereFile}
              submitHandler={submitHandler}
              waiting={waiting}
            />
          </TETabsPane>
          <TETabsPane show={activeTab === "target"}>
            <Content
              title={t("uploadTarget")}
              setActiveTab={setActiveTab}
              afterTab={"upload"}
              beforeTab={"base"}
              setActiveTabIndex={setActiveTabIndex}
              isThereFile={isThereFile}
              setIsThereFile={setIsThereFile}
              submitHandler={submitHandler}
              waiting={waiting}
            />
          </TETabsPane>
          <TETabsPane
            show={activeTab === "upload"}
            setActiveTabIndex={setActiveTabIndex}
          >
            <div className="modalSong" style={{ zIndex: 99 }}>
              <div className="fixed top-0 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center">
                <div className="relative w-full max-w-4xl h-96">
                  <div className="relative  rounded-lg shadow h-full bg-gray-700">
                    <div
                      className={
                        "w-full h-full mx-4 flex justify-center items-center relative"
                      }
                    >
                      <AnimatedText />
                      <div class="absolute top-0 right-0 h-full w-full z-50 flex justify-center items-center">
                        <div class="animate-spin rounded-full h-80 w-80 border-t-2 border-b-2 border-purple-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TETabsPane>
        </TETabsContent>
      </div>
    </>
  );
};

export default Upload;
