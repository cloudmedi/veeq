// @ts-nocheck
"use client";
import Alert from "@/components/ui/alert";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";

interface ContentProps {
  title: string;
  setIsThereFile: React.Dispatch<React.SetStateAction<any>>;
  q;
  isThereFile?: boolean;
  waiting: boolean;
}

const Content = ({
  title,
  setIsThereFile,
  isThereFile,
  submitHandler,
  waiting,
}: ContentProps) => {
  const [filePath, setFilePath] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [fileDuration, setFileDuration] = useState(null);
  const [alert, setAlert] = useState({ isOpen: false, alertText: "" });
  const { t } = useTranslation("upload");

  const processFile = (file) => {
    setIsThereFile(file);
    setFilePath(file.path);
  };

  const alertHandler = () => {
    setAlert({
      isOpen: true,
      alertText: t("limitError"),
    });
  };

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

  return (
    <>
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 mx-auto mt-8">
        <div className="text-center">
          <h2 className="mt-5 whitespace-nowrap text-2xl sm:text-3xl font-bold text-gray-900">
            {title}
          </h2>
        </div>
        <form className="mt-8 space-y-3" action="#" method="POST">
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              {t("title")}
            </label>
            <input
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type=""
              readOnly
              placeholder={t("uploadFile")}
              value={filePath ? filePath : ""}
            />
          </div>
          {fileSize && (
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                {t("details")}
              </label>
              <ul className="max-w-md space-y-1 list-inside text-gray-500 list-none">
                <li>
                  <span className="font-semibold text-blue-600">
                    {t("fileSİze")}:
                  </span>{" "}
                  {fileSize}
                </li>
                <li>
                  <span className="font-semibold text-blue-600">Duration:</span>{" "}
                  {fileDuration}
                </li>
              </ul>
            </div>
          )}
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              {t("attach")}
            </label>
            <Dropzone
              accept={{
                "audio/*": [],
                "audio/mp3": [],
                "audio/mp4": [],
                "audio/wav": [],
                "audio/flac": [],
              }}
              onDrop={async (file) => {
                processFile(file[0]);
                Object.assign(file[0], {
                  preview: URL.createObjectURL(file[0]),
                });

                const video = document.createElement("video");
                video.src = file[0].preview;

                video.addEventListener("loadedmetadata", () => {
                  const fmtMSS = (s) => {
                    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
                  };

                  setFileDuration(fmtMSS(Math.trunc(video.duration)));
                });

                const humanFileSize = (size) => {
                  var i =
                    size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
                  return (
                    (size / Math.pow(1024, i)).toFixed(2) * 1 +
                    " " +
                    ["B", "kB", "MB", "GB", "TB"][i]
                  );
                };

                setFileSize(humanFileSize(file[0].size));
              }}
              onDropRejected={alertHandler}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  className="flex items-center justify-center w-full"
                  // {...getRootProps()}
                >
                  <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                    <div className="h-full w-full text-center flex flex-col items-center justify-center">
                      <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                        <img
                          className="has-mask h-36 object-center"
                          src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                          alt="freepik image"
                        />
                      </div>
                      <p className="pointer-none text-gray-500 ">
                        {t("dragAndDrop")}
                        <br /> {t("or")} <br />
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          {t("selectFile")}
                        </span>{" "}
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="audio/*"
                      {...getInputProps()}
                    />
                  </label>
                </div>
              )}
            </Dropzone>
          </div>
          <p className="text-sm text-gray-300 uppercase">
            <span>{t("fileType")}: Wav, MP3, flac and mp4</span>
          </p>
          <div>
            <p
              onClick={() => {
                submitHandler();
              }}
              style={{
                opacity: isThereFile ? (waiting ? 0.6 : 1) : 0.6,
                pointerEvents: isThereFile
                  ? waiting
                    ? "none"
                    : "auto"
                  : "none",
              }}
              className="my-5 w-full flex justify-center bg-purple-600 text-gray-900 p-4  rounded-full tracking-wide
                              font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
              {!waiting ? (
                t("upload")
              ) : (
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 animate-spin text-gray-600 fill-gray-900"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
            </p>
          </div>
        </form>
      </div>
      {alert.isOpen && <Alert alert={alert} setAlert={setAlert} />}
    </>
  );
};

export default Content;
