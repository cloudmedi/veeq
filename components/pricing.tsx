"use client";
import React, { useEffect, useState } from "react";

const Pricing = () => {
  const [auth, setAuth] = useState(localStorage.getItem("auth"));

  return (
    <section className="bg-gray-900" id="pricing">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
            Pricing
          </h2>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {options.map((item) => (
            <div className="flex flex-col px-6 py-3 mx-auto max-w-md text-center rounded-lg border shadow border-gray-600 xl:px-8 xl:py-4 bg-gray-800 text-white">
              <h3 className="mb-4 text-2xl font-semibold">{item.title}</h3>
              <p className="font-light  sm:text-lg text-gray-400">
                {item.shortDesc}
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">
                  {item.price}
                </span>
                <span className=":text-gray-400">/month</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                {item.advantages.map((option) => (
                  <li className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
              <a
                href={auth ? "#" : "/signup"}
                className="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white focus:ring-primary-900"
              >
                Get started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

const options = [
  {
    title: "Starter",
    shortDesc: "Best option for personal use & for your next project.",
    price: "$29",
    advantages: [
      "Individual configuration",
      "No setup, or hidden fees",
      "Team size: 1 developer",
    ],
  },
  {
    title: "Starter",
    shortDesc: "Best option for personal use & for your next project.",
    price: "$29",
    advantages: [
      "Individual configuration",
      "No setup, or hidden fees",
      "Team size: 1 developer",
    ],
  },
  {
    title: "Starter",
    shortDesc: "Best option for personal use & for your next project.",
    price: "$29",
    advantages: [
      "Individual configuration",
      "No setup, or hidden fees",
      "Team size: 1 developer",
    ],
  },
];
