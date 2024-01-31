import React, { useState } from "react";
import Waveform from "./WaveForm";
import pianoClip from "@/public/audios/piano.mp3";
import masteredPianoClip from "@/public/audios/piano-mastered.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import DownloadDialog from "./DownloadDialog";

interface ContentProps {
  setModalToggle: React.Dispatch<React.SetStateAction<any>>;
}

const DetailModal = ({ setModalToggle }: ContentProps) => {
  const [isMastered, setIsMastered] = useState(false);
  const [dialogToggle, setDialogToggle] = useState(false);
  const [dialogOptions, setDialogOptions] = useState([]);

  return (
    <>
      <div className="modalSong" style={{ zIndex: 99 }}>
        <div className="fixed top-0 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center">
          <div className="relative w-full max-w-4xl max-h-full">
            <div className="relative  rounded-lg shadow bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                <h3 className="text-xl font-medium text-white">Song preview</h3>
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
                <Waveform
                  audio={pianoClip}
                  masteredAudio={masteredPianoClip}
                  isMastered={isMastered}
                />
                <div className="inline-flex">
                  <label htmlFor="toggle" className="cursor-pointer">
                    Original
                  </label>
                  <div className="mx-4">
                    <input
                      type="checkbox"
                      className="peer sr-only opacity-0"
                      id="toggle"
                      onChange={(e) => setIsMastered(e.target.checked)}
                    />
                    <label
                      htmlFor="toggle"
                      className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:bg-blue-600 peer-checked:peer-focus-visible:outline-blue-600"
                    >
                      <span className="sr-only">Enable</span>
                    </label>
                  </div>
                  <label htmlFor="toggle" className="cursor-pointer">
                    Mastered
                  </label>
                </div>
                <div className="inline-flex float-right gap-4 !my-0 items-center">
                  <div>
                    <FontAwesomeIcon
                      icon={faDownload}
                      size={"lg"}
                      style={{ color: "#9BA9B4", marginRight: "10px" }}
                    />
                    <span>Download</span>
                  </div>
                  {[
                    {
                      title: "wav",
                      formats: [
                        { title: "16bit", id: 16 },
                        { title: "24bit", id: 24 },
                      ],
                    },
                    {
                      title: "mp3",
                      formats: [{ title: "320kbps", id: 320 }],
                    },
                    {
                      title: "flac",
                      formats: [{ title: "32bit", id: 32 }],
                    },
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDialogToggle(true);
                        setDialogOptions(item.formats);
                      }}
                      className="uppercase bg-blue-600 hover:bg-blue-700 text-gray-900 py-2 px-4 rounded-full"
                    >
                      {item.title}
                    </button>
                  ))}
                  <button className="border border-blue-600 hover:bg-blue-700 text-gray-200 hover:text-gray-900 py-2 px-4 rounded-full">
                    ORIGINAL
                  </button>
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
