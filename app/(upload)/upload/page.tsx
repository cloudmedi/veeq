// @ts-nocheck
"use client";

import Content from "@/app/(settings)/settings/content";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";

const Upload = () => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [activeTab, setActiveTab] = useState("base");
  const [isThereFile, setIsThereFile] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [alert, setAlert] = useState({ isOpen: false, alertText: "" });
  const { t } = useTranslation("upload");

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

  useEffect(() => {
    forceUpdate();
  }, [activeTabIndex]);

  const submitHandler = () => {
    if (isThereFile) {
    } else {
      setAlert({ isOpen: true, alertText: "Please select a base audio." });
    }
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
          ].map((item) =>
            item.id <= activeTabIndex && item.id !== 1 ? (
              <li
                key={item.id}
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
            ) : item.id === 1 ? (
              <li
                key={item.id}
                className="whitespace-nowrap flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
              >
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  <span className="me-2">{++item.id}</span>
                  {item.title}
                </span>
              </li>
            ) : (
              <li key={item.id} className="whitespace-nowrap flex items-center">
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
            />
          </TETabsPane>
          <TETabsPane
            show={activeTab === "upload"}
            setActiveTabIndex={setActiveTabIndex}
          >
            {/* <div className="modalSong" style={{ zIndex: 99 }}>
              <div className="fixed top-0 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center">
                <div className="py-20 px-10 shadow bg-gray-700 w-6/12 mx-auto rounded-lg">
                  <div className="grid grid-cols-1 gap-20 lg:gap-10">
                    <div className="flex items-center flex-wrap max-w-md px-10 bg-white shadow-xl rounded-2xl h-20">
                      <div className="flex items-center justify-center -m-6 overflow-hidden bg-white rounded-full">
                        <div style={{ width: 110, height: 110 }}>
                          <CircularProgressbar value={66} text={`${66}%`} />
                        </div>
                        <span
                          className="absolute text-2xl text-blue-700"
                          x-text="66%"
                        />
                      </div>
                      <p className="ml-10 font-medium text-gray-600 sm:text-xl">
                        Performance
                      </p>
                      <span className="ml-auto text-xl font-medium text-blue-600 hidden sm:block">
                        +25%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </TETabsPane>
        </TETabsContent>
      </div>
    </>
  );
};

export default Upload;
