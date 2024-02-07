import { useEffect, useState } from "react";

const FADE_INTERVAL_MS = 1750;

type FadeProp = { fade: "fade-in" | "fade-out" };

export const AnimatedText = ({ text }) => {
  const [fadeProp, setFadeProp] = useState<FadeProp>({ fade: "fade-in" });

  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      fadeProp.fade === "fade-in"
        ? setFadeProp({ fade: "fade-out" })
        : setFadeProp({ fade: "fade-in" });
    }, FADE_INTERVAL_MS);

    return () => clearInterval(fadeTimeout);
  }, [fadeProp]);

  return (
    <h2 className={"text-center mb-6 text-lg font-bold"}>
      <span className={fadeProp.fade}>{text}</span>
    </h2>
  );
};
