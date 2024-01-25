"use client";

import React, { useState } from "react";
import Dropzone from "react-dropzone";

const Library = () => {
  const [filePath, setFilePath] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [fileDuration, setFileDuration] = useState(null);
  const processFile = (file) => {
    setFilePath(file.path);
  };
  console.log(fileSize, fileDuration);

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-6" style={{ marginTop: 100 }}>
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
        <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
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
            Base File
          </span>
        </li>
        <li className="whitespace-nowrap flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span className="me-2">2</span>
            Target File
          </span>
        </li>
        <li className="whitespace-nowrap flex items-center">
          <span className="me-2">3</span>
          Download
        </li>
      </ol>
      <>
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 mx-auto mt-8">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-gray-900">
              Upload your base audio file
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
                value={filePath}
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
                    <span className="font-semibold text-blue-600">
                      Duration:
                    </span>{" "}
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
                    const millisToMinutesAndSeconds = (millis) => {
                      var minutes = Math.floor(millis / 60000);
                      var seconds = ((millis % 60000) / 1000).toFixed(0);
                      console.log(minutes, seconds);

                      return (
                        minutes + ":" + (seconds < 10 ? "0" : "") + seconds
                      );
                    };

                    setFileDuration(millisToMinutesAndSeconds(video.duration));
                  });

                  const humanFileSize = (size) => {
                    var i =
                      size == 0
                        ? 0
                        : Math.floor(Math.log(size) / Math.log(1024));
                    return (
                      (size / Math.pow(1024, i)).toFixed(2) * 1 +
                      " " +
                      ["B", "kB", "MB", "GB", "TB"][i]
                    );
                  };

                  setFileSize(humanFileSize(file[0].size));
                }}
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
              <button
                type="submit"
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                              font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default Library;
