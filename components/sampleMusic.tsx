// @ts-nocheck
"use client";
import { faCircle, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useRef, useState } from "react";
import Mastering1 from "@/public/audios/mastering_1.mp3";
import Mastering2 from "@/public/audios/mastering_2.mp3";
import Mastering3 from "@/public/audios/mastering_3.mp3";
import Mastering4 from "@/public/audios/mastering_4.mp3";
import NoMastered1 from "@/public/audios/no_mastering_1.mp3";
import NoMastered2 from "@/public/audios/no_mastering_2.mp3";
import NoMastered3 from "@/public/audios/no_mastering_3.mp3";
import NoMastered4 from "@/public/audios/no_mastering_4.mp3";

const initialState = {
  song0Play: false,
  song1Play: false,
  song2Play: false,
  song3Play: false,
};

const SampleMusic = () => {
  const [isPlaying, setIsPlaying] = useState({
    song0Play: false,
    song1Play: false,
    song2Play: false,
    song3Play: false,
  });
  const [isMastered, setIsMastered] = useState({
    song0Play: false,
    song1Play: false,
    song2Play: false,
    song3Play: false,
  });
  const [audioCurrent, setAudioCurrent] = useState(0);
  const [otherAudios, setOtherAudios] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const musicRef = useRef(null);
  const { t } = useTranslation("library");

  const handlePlayPause = (index) => {
    let songIds = [0, 1, 2, 3];
    songIds = songIds.filter((item) => item !== index);

    setIsPlaying((prevState) => ({
      ...prevState,
      [`song${index}Play`]: !isPlaying[`song${index}Play`],
    }));

    setOtherAudios(songIds);
    songIds.forEach((item) =>
      setIsPlaying((prevState) => ({
        ...prevState,
        [`song${item}Play`]: false,
      }))
    );
  };

  useEffect(() => {
    if (currentIndex !== null) {
      const audio = document.querySelector(`#myAudio-${currentIndex}`);
      const audio2 = document.querySelector(
        `#mastered-myAudio-${currentIndex}`
      );

      audio.addEventListener("ended", () => {
        setIsPlaying(initialState);
      });
      audio2.addEventListener("ended", () => {
        setIsPlaying(initialState);
      });

      setAudioCurrent(audio.currentTime);
      if (isPlaying[`song${currentIndex}Play`]) {
        audio.play();
      } else {
        audio.pause();
        audio2.pause();
      }
      otherAudios.forEach((item) => {
        const audio = document.querySelector(`#myAudio-${item}`);
        const audio2 = document.querySelector(`#mastered-myAudio-${item}`);
        audio.pause();
        audio2.pause();
      });
    }
  }, [isPlaying]);

  const masterToggle = (index) => {
    setIsMastered((prevState) => ({
      ...prevState,
      [`song${index}Play`]: !isMastered[`song${index}Play`],
    }));
  };

  useEffect(() => {
    if (currentIndex !== null) {
      const audio = document.querySelector(`#mastered-myAudio-${currentIndex}`);
      const audio2 = document.querySelector(`#myAudio-${currentIndex}`);
      audio2.currentTime = audioCurrent;

      if (isMastered[`song${currentIndex}Play`]) {
        audio.play();
        audio2.pause();
      } else {
        setAudioCurrent(audio2.currentTime);
        audio.pause();
        audio2.play();
      }
      otherAudios.forEach((item) => {
        const audio = document.querySelector(`#myAudio-${item}`);
        const audio2 = document.querySelector(`#mastered-myAudio-${item}`);
        audio.pause();
        audio2.pause();
      });
    }
  }, [isMastered]);

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-8">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Feel music, feel the differences.</h1>
          </div>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 lg:justify-items-stretch justify-items-center">
            {[
              {
                image: "https://i.ibb.co/N79ZMhd/k-pop-png.jpg",
                for: "mastering1",
                original: NoMastered1,
                mastered: Mastering1,
              },
              {
                image: "https://i.ibb.co/N79ZMhd/k-pop-png.jpg",
                for: "mastering2",
                original: NoMastered2,
                mastered: Mastering2,
              },
              {
                image: "https://i.ibb.co/N79ZMhd/k-pop-png.jpg",
                for: "mastering3",
                original: NoMastered3,
                mastered: Mastering3,
              },
              {
                image: "https://i.ibb.co/N79ZMhd/k-pop-png.jpg",
                for: "mastering4",
                original: NoMastered4,
                mastered: Mastering4,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={"rounded-t-lg overflow-hidden relative"}
              >
                <audio
                  id={`myAudio-${index}`}
                  ref={musicRef}
                  className={"absolute opacity-0"}
                >
                  <source
                    src={item.original}
                    id={`mySource-${index}`}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
                <audio
                  id={`mastered-myAudio-${index}`}
                  ref={musicRef}
                  className={"absolute opacity-0"}
                >
                  <source src={item.mastered} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <img src={item.image} alt={"Background of type"} />
                <div
                  className={
                    "absolute left-2/4 top-2/4 translate-y-2/4 cursor-pointer"
                  }
                  onClick={() => {
                    handlePlayPause(index);
                    setCurrentIndex(index);
                  }}
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={{
                      color: "#ffffff",
                      opacity: 0.3,
                      width: 64,
                      height: 64,
                    }}
                  />
                  <FontAwesomeIcon
                    icon={isPlaying[`song${index}Play`] ? faPause : faPlay}
                    className={"absolute left-2/4 top-2/4 translate-y-2/4"}
                    style={{
                      color: "#ffffff",
                      width: 32,
                      height: 32,
                      transform: "translate(-50%,-50%)",
                    }}
                  />
                </div>
                <div
                  className={
                    "absolute flex justify-center items-center bottom-0 rounded-t-3xl w-full h-14"
                  }
                  style={{ border: "2px solid rgba(255,255,255, .75)" }}
                >
                  <div className="inline-flex">
                    <label htmlFor={item.for} className="cursor-pointer">
                      {t("original")}
                    </label>
                    <div className="mx-4">
                      <input
                        type="checkbox"
                        className="peer sr-only opacity-0"
                        id={item.for}
                        onChange={() => masterToggle(index)}
                      />
                      <label
                        htmlFor={item.for}
                        className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:bg-blue-600 peer-checked:peer-focus-visible:outline-blue-600"
                      >
                        <span className="sr-only">Enable</span>
                      </label>
                    </div>
                    <label htmlFor={item.for} className="cursor-pointer">
                      Mastered
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SampleMusic;
