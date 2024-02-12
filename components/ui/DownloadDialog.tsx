// @ts-nocheck
"use client";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useSelector } from "react-redux";
interface downloadType {
  title: string;
  id: number;
}

interface ContentProps {
  setModalToggle: React.Dispatch<React.SetStateAction<any>>;
  dialogOptions: downloadType[];
}

const DownloadDialog = ({ setModalToggle, dialogOptions }: ContentProps) => {
  const { t } = useTranslation("library");

  return (
    <div className="modalSong" style={{ zIndex: 99 }}>
      <div className="fixed top-0 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center">
        <div className="relative w-full max-w-4xl max-h-full">
          <div className="relative  rounded-lg shadow bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
              <h3 className="text-xl font-medium text-white">
                {t("chooseFormat")}
              </h3>
              <button
                onClick={() => setModalToggle(false)}
                type="button"
                className="text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                data-modal-hide="medium-modal"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <div className="flex gap-4 items-center p-4 md:p-5 rounded-b dark:border-gray-600">
                {dialogOptions.map((item, index) => (
                  <a href={item.url} download>
                    <button
                      key={index}
                      data-modal-hide="default-modal"
                      type="button"
                      className="text-gray-900 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    >
                      {t("download")} {item.title}
                    </button>
                  </a>
                ))}
                {dialogOptions.length > 1 && (
                  <a href={dialogOptions[0].zipUrl} download>
                    <button
                      data-modal-hide="default-modal"
                      type="button"
                      className="text-gray-900 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    >
                      {t("downloadAll")}
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadDialog;
