import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { TECollapse } from "tw-elements-react";

const FQA = () => {
  const { t } = useTranslation("common");
  const [activeElement, setActiveElement] = useState("");

  const handleClick = (value: string) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };
  return (
    <>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:px-6">
        <div
          className={"max-w-6xl mx-auto px-4 sm:px-6 space-y-8 lg:space-y-0"}
        >
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
              {t("fqa")}
            </h2>
          </div>
          {[
            {
              title: t("fqaQuestion"),
              desc: t("fqaAnswer"),
              elementName: "element1",
            },
            {
              title: t("fqaQuestion2"),
              desc: t("fqaAnswer2"),
              elementName: "element2",
            },
            {
              title: t("fqaQuestion3"),
              desc: t("fqaAnswer3"),
              elementName: "element3",
            },
            {
              title: t("fqaQuestion4"),
              desc: t("fqaAnswer4"),
              elementName: "element4",
            },
            {
              title: t("fqaQuestion5"),
              desc: t("fqaAnswer5"),
              elementName: "element5",
            },
            {
              title: t("fqaQuestion6"),
              desc: t("fqaAnswer6"),
              elementName: "element6",
            },
            {
              title: t("fqaQuestion7"),
              desc: t("fqaAnswer7"),
              elementName: "element7",
            },
          ].map((item) => (
            <div className=" border border-neutral-600 bg-neutral-800">
              <h2 className="mb-0" id="headingOne">
                <button
                  className={`${
                    activeElement === item.elementName &&
                    `!text-primary-400 [box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                  } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base  transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none bg-neutral-800 text-white`}
                  type="button"
                  onClick={() => handleClick(item.elementName)}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  {item.title}
                  <span
                    className={`${
                      activeElement === item.elementName
                        ? `rotate-[-180deg] -mr-1`
                        : `rotate-0 fill-white`
                    } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none fill-blue-300`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>
              </h2>
              <TECollapse
                show={activeElement === item.elementName}
                className="!mt-0 !shadow-none"
              >
                <div className="px-5 py-4">{item.desc}</div>
              </TECollapse>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FQA;
