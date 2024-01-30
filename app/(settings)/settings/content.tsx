// @ts-nocheck
"use client";
import Alert from "@/components/ui/alert";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";

interface ContentProps {
  title: string;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<any>>;
  setIsThereFile: React.Dispatch<React.SetStateAction<any>>;
  setActiveTab: React.Dispatch<React.SetStateAction<any>>;
  afterTab?: string;
  isThereFile?: boolean;
  beforeTab?: string;
}

const Content = ({
  title,
  setActiveTab,
  afterTab,
  beforeTab,
  setIsThereFile,
  isThereFile,
  setActiveTabIndex,
}: ContentProps) => {
  const [filePath, setFilePath] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [fileDuration, setFileDuration] = useState(null);
  const [alert, setAlert] = useState({ isOpen: false, alertText: "" });
  const processFile = (file) => {
    setFilePath(file.path);
  };

  const alertHandler = () => {
    setAlert({
      isOpen: true,
      alertText:
        "Please only upload files under 100mb and in mp3, mp4, wav and flac format.",
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
          <h2 className="mt-5 whitespace-nowrap text-3xl font-bold text-gray-900">
            {title}
          </h2>
        </div>
        <form className="mt-8 space-y-3" action="#" method="POST">
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Title
            </label>
            <input
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type=""
              readOnly
              placeholder="Upload your file"
              value={filePath ? filePath : ""}
            />
          </div>
          {fileSize && (
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Details
              </label>
              <ul className="max-w-md space-y-1 list-inside text-gray-500 list-none">
                <li>
                  <span className="font-semibold text-blue-600">
                    File size:
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
              Attach Document
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

                setIsThereFile(true);

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
                  {...getRootProps()}
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
                        <span className="text-sm">Drag and drop</span> files
                        here <br /> or{" "}
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          select a file
                        </span>{" "}
                        from your computer
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
            <span>File type: Wav, MP3, flac and mp4</span>
          </p>
          <div>
            <p
              onClick={() => {
                setActiveTab(afterTab);
                setActiveTabIndex((prevState) => ++prevState);
                setIsThereFile(false);
              }}
              style={{
                opacity: isThereFile ? 1 : 0.5,
                pointerEvents: isThereFile ? "auto" : "none",
              }}
              className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                              font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
              Upload
            </p>
          </div>
        </form>
      </div>
      {alert.isOpen && <Alert alert={alert} setAlert={setAlert} />}
    </>
  );
};

export default Content;
