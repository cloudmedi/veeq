// @ts-nocheck
"use client";

import DetailModal from "@/components/ui/DetailModal";
import {
  faDownload,
  faEllipsisVertical,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Library = () => {
  const [modalToggle, setModalToggle] = useState(false);
  const [library, setLibrary] = useState(null);
  const [libraryDetail, setLibraryDetail] = useState(null);
  const [maxLength, setMaxLength] = useState(null);
  const [newArr, setNewArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogToggle, setDialogToggle] = useState(false);
  const { accessToken, login, userLang } = useSelector(
    (state) => state.loginReducer
  );
  const { t } = useTranslation("library");

  useEffect(() => {
    let data = [];
    let length = maxLength;

    for (let i = 0; i < length; i++) {
      data.push(i);
    }

    if (data.length !== 0) {
      setNewArr(data);
    }
  }, [maxLength]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/matchering/Library?limit=5&skip=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Accept-Language": `${
              localStorage.getItem("lang")
                ? localStorage.getItem("lang").toLowerCase()
                : login
                ? login.languageCode.toLowerCase()
                : navigator.language.toLowerCase().substring(0, 2)
            }`,
          },
        }
      )
      .then((response) => {
        setLibrary(response.data.libraryResult);
        if (!maxLength) {
          setMaxLength(response.data.maxPageLenght);
        }
      })
      .catch((error) => console.log("error"));
  }, [currentPage]);

  const fetchSpecificSong = (id) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/matchering/Library/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": `${
            localStorage.getItem("lang")
              ? localStorage.getItem("lang").toLowerCase()
              : login
              ? login.languageCode.toLowerCase()
              : navigator.language.toLowerCase().substring(0, 2)
          }`,
        },
      })
      .then((response) => {
        setLibraryDetail(response.data);
      })
      .catch((error) => console.log("error"));
  };

  return (
    <>
      <div
        className="max-w-6xl mx-auto px-2 sm:px-6 flex justify-center items-center flex-col"
        style={{ marginTop: 100 }}
      >
        {true && (
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white self-start pl-4">
            {t("library")}
          </h2>
        )}
        {!library ? (
          <div className="max-w-3xl flex justify-center items-center flex-col bg-gray-800 rounded-xl p-8">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-200 md:text-4xl lg:text-5xl dark:text-white">
              <span className="underline underline-offset-3 decoration-6 decoration-blue-600">
                There is no music here!
              </span>
            </h1>
            <div data-aos="fade-up" data-aos-delay="400" className="mt-6">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:shadow-lg">
                <Link href={`/upload?lang=${userLang}`}>Go Master!</Link>
              </button>
            </div>
          </div>
        ) : (
          <section className="container px-4 mx-auto">
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                          >
                            {t("name")}
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                          >
                            {t("actions")}
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                          >
                            {t("plan")}
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                          >
                            {t("status")}
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                          >
                            {t("date")}
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                          >
                            {t("details")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y  divide-gray-700 bg-gray-900">
                        {library.map((item) => (
                          <>
                            <tr>
                              <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                {item.targetFileName}.wav
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="flex gap-4">
                                  <div
                                    className="w-10 h-10 rounded-full cursor-pointer bg-slate-700 flex justify-center items-center cursor-pointer"
                                    onClick={() => {
                                      fetchSpecificSong(item.id);
                                      setModalToggle(true);
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={true ? faPlay : faPause}
                                      style={{ color: "#ffffff" }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                <div className="flex items-center gap-x-2">
                                  <div>Hot Mastering Pro</div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-gray-800">
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10 3L4.5 8.5L2 6"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>

                                  <h2 className="text-sm font-normal">
                                    Success
                                  </h2>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                {new Date(item.createdDate).toLocaleDateString(
                                  "en-GB"
                                )}
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <div
                                  onClick={() => {
                                    fetchSpecificSong(item.id);
                                    setModalToggle(true);
                                  }}
                                  className="w-10 h-10 rounded-full bg-slate-700 flex justify-center items-center hover:opacity-60 ease-out cursor-pointer"
                                >
                                  <FontAwesomeIcon
                                    icon={faEllipsisVertical}
                                    style={{ color: "#ffffff" }}
                                  />
                                </div>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              {currentPage !== 1 ? (
                <a
                  onClick={() => setCurrentPage((prevState) => --prevState)}
                  href="#"
                  className="flex items-center px-5 py-2 text-smcapitalize transition-colors duration-200 border rounded-md gap-x-2 bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:-scale-x-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>
                  <span>{t("previous")}</span>
                </a>
              ) : (
                <div></div>
              )}

              <div className="items-center md:flex gap-x-3 absolute left-2/4 right-2/4">
                {newArr.map((x, i) => (
                  <a
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className="px-2 cursor-pointer py-1 text-sm text-blue-500 rounded-md bg-gray-800"
                  >
                    {++i}
                  </a>
                ))}
              </div>
              {currentPage !== maxLength ? (
                <a
                  onClick={() => setCurrentPage((prevState) => ++prevState)}
                  href="#"
                  className="flex items-center px-5 py-2 text-sm capitalize transition-colors duration-200border rounded-md gap-x-2 bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800"
                >
                  <span>{t("next")}</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:-scale-x-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </a>
              ) : (
                <div></div>
              )}
            </div>
          </section>
        )}
      </div>
      {modalToggle && (
        <DetailModal
          setModalToggle={setModalToggle}
          libraryDetail={libraryDetail}
          dialogToggle={dialogToggle}
          setDialogToggle={setDialogToggle}
        />
      )}
    </>
  );
};

export default Library;
