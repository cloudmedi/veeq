import React, { useEffect, useState } from "react";
import Waveform from "./WaveForm";
import DownloadDialog from "./DownloadDialog";
import useTranslation from "next-translate/useTranslation";

const DetailModal = ({
  setModalToggle,
  libraryDetail,
  dialogToggle,
  setDialogToggle,
}) => {
  const [isMastered, setIsMastered] = useState(false);
  const [dialogOptions, setDialogOptions] = useState([]);
  const [firstLoad, setFirstLoad] = useState(false);
  const [waveSurfer, setWaveSurfer] = useState(null);

  const { t } = useTranslation("library");

  useEffect(() => {
    if (libraryDetail) {
      setDialogOptions([
        {
          title: "16bit",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/matchering/download?filepath=${libraryDetail.result16FilePath}`,
          zipUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/matchering/zip?folderPath=${libraryDetail.zipPath}`,
          id: 16,
        },
        {
          title: "24bit",
          zipUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/matchering/zip?folderPath=${libraryDetail.zipPath}`,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/matchering/download?filepath=${libraryDetail.result24FilePath}`,
          id: 24,
        },
      ]);
    }
  }, [libraryDetail]);

  return (
    <>
      <div className="modalSong" style={{ zIndex: 99 }}>
        <div className="fixed top-0 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center">
          <div className="relative w-full max-w-4xl h-96 sm:h-80 md:h-72">
            <div
              style={{
                pointerEvents: firstLoad ? "none" : "auto",
              }}
              className="relative  rounded-lg shadow h-full bg-gray-700"
            >
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                <h3 className="text-xl font-medium text-white">
                  {t("songPrewiev")}
                </h3>
                <button
                  onClick={() => {
                    setModalToggle(false);
                    if (waveSurfer) {
                      waveSurfer.pause();
                    }
                  }}
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
                {libraryDetail ? (
                  <Waveform
                    audio={`${process.env.NEXT_PUBLIC_BASE_URL}${libraryDetail.result24FilePath}`}
                    masteredAudio={`${process.env.NEXT_PUBLIC_BASE_URL}${libraryDetail.orginalFilePath}`}
                    isMastered={isMastered}
                    setFirstLoad={setFirstLoad}
                    firstLoad={firstLoad}
                    waveSurfer={waveSurfer}
                    setWaveSurfer={setWaveSurfer}
                  />
                ) : null}
                <div
                  className={
                    "flex md:flex-row flex-col md:justify-between justify-normal !mt-1"
                  }
                >
                  <div className="inline-flex translate-y-2.5">
                    <label htmlFor="toggle" className="cursor-pointer">
                      Mastered
                    </label>
                    <div className="mx-4">
                      <input
                        type="checkbox"
                        className="peer sr-only opacity-0"
                        id="toggle"
                        onChange={(e) =>
                          setIsMastered((prevState) => !prevState)
                        }
                      />
                      <label
                        htmlFor="toggle"
                        className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:bg-blue-600 peer-checked:peer-focus-visible:outline-blue-600"
                      >
                        <span className="sr-only">Enable</span>
                      </label>
                    </div>
                    <label htmlFor="toggle" className="cursor-pointer">
                      {t("original")}
                    </label>
                  </div>
                  <div className="flex float-left sm:float-right gap-4 sm:items-center sm:flex-row flex-col md:mt-0 mt-6">
                    <div className={"flex gap-4"}>
                      {libraryDetail
                        ? [
                            {
                              title: t("download"),
                            },
                          ].map((item, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setDialogToggle(true);
                              }}
                              className="uppercase bg-blue-600 hover:bg-blue-700 text-gray-900 py-2 px-4 rounded-full"
                            >
                              {item.title}
                            </button>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {dialogToggle && (
        <DownloadDialog
          dialogOptions={dialogOptions}
          setModalToggle={setDialogToggle}
        />
      )}
    </>
  );
};

export default DetailModal;
