// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import WaveSurfer from "wavesurfer.js";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

const Waveform = ({ audio, masteredAudio, isMastered }) => {
  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });
  const [isPlaying, toggleIsPlaying] = useState(false);
  const [waveSurfer, setWaveSurfer] = useState(null);

  useEffect(() => {
    let waveSurferStart = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      barWidth: 2,
      barHeight: 10,
      cursorWidth: 0,
      waveColor: "#FFF200",
    });
    waveSurferStart.load(audio);
    waveSurferStart.on("ready", () => {
      waveSurferRef.current = waveSurferStart;
      setWaveSurfer(waveSurferStart);
    });

    return () => {
      waveSurferStart.destroy();
    };
  }, [audio]);

  useEffect(() => {
    if (waveSurfer) {
      const currentTime = waveSurfer.getCurrentTime();

      if (isMastered) {
        const runMastered = async () => {
          await waveSurfer.load(masteredAudio);
          await waveSurfer.setTime(currentTime);
          await waveSurfer.playPause();
          waveSurfer.on("pause", (item) => {
            const video = document.createElement("audio");
            video.src = masteredAudio;
            const current = waveSurfer.getCurrentTime();

            video.addEventListener("loadedmetadata", async () => {
              setTimeout(async () => {
                if (
                  Number(current.toString().split(".").join("")) >=
                  Number(video.duration.toString().split(".").join("")) / 100
                ) {
                  await waveSurfer.play();
                }
              }, 1000);
            });
          });
          toggleIsPlaying(true);
        };
        runMastered();
      } else {
        const runBase = async () => {
          await waveSurfer.load(audio);
          await waveSurfer.setTime(currentTime);
          await waveSurfer.playPause();
          waveSurfer.on("pause", (item) => {
            const video = document.createElement("audio");
            video.src = audio;
            const current = waveSurfer.getCurrentTime();

            video.addEventListener("loadedmetadata", async () => {
              if (video.duration !== Infinity) {
                setTimeout(async () => {
                  if (
                    Number(current.toString().split(".").join("")) >=
                    Number(video.duration.toString().split(".").join("")) / 100
                  ) {
                    await waveSurfer.play();
                  }
                }, 1000);
              }
            });
          });
          toggleIsPlaying(true);
        };
        runBase();
      }
    }
  }, [isMastered, waveSurfer]);

  return (
    <WaveSurferWrap>
      <div
        onClick={() => {
          waveSurferRef.current.playPause();
          toggleIsPlaying((prevState) => !prevState);
        }}
        className="w-10 h-10 rounded-full cursor-pointer bg-slate-700 flex justify-center items-center"
      >
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          style={{ color: "#ffffff" }}
        />
      </div>
      <div className="ml-3" ref={containerRef} />
    </WaveSurferWrap>
  );
};

Waveform.propTypes = {
  audio: PropTypes.string.isRequired,
};

const WaveSurferWrap = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  align-items: center;

  button {
    width: 40px;
    height: 40px;
    border: none;
    padding: 0;
    background-color: white;
  }
`;

export default Waveform;
