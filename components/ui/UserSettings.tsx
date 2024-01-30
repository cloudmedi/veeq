import { countries } from "@/utils/Countries";
import Link from "next/link";
import React from "react";

const UserSettings = () => {
  return (
    <form>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-9/12 sm:w-full px-3">
          <label
            className="block text-gray-300 text-sm font-medium mb-1"
            htmlFor="full-name"
          >
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            id="full-name"
            type="text"
            className="rounded-lg form-input w-full text-gray-300"
            placeholder="First and last name"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-9/12 sm:w-full px-3">
          <label
            className="block text-gray-300 text-sm font-medium mb-1"
            htmlFor="email"
          >
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="form-input rounded-lg w-full text-gray-300"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-9/12 sm:w-full px-3">
          <label
            htmlFor="countries"
            className="block text-gray-300 text-sm font-medium mb-1"
          >
            Select your country <span className="text-red-600">*</span>
          </label>
          <select
            id="countries"
            className="form-input text-sm rounded-lg block w-full p-2.5 bg-transparent text-gray-300"
          >
            <option className="bg-white text-gray-900" selected>
              Choose a country
            </option>
            {countries.map((country) => (
              <option
                key={country.code}
                className="bg-white text-gray-900"
                value={country.code}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-9/12 sm:w-full px-3">
          <label
            htmlFor="countries"
            className="block text-gray-300 text-sm font-medium mb-1"
          >
            Select your language <span className="text-red-600">*</span>
          </label>
          <select
            id="countries"
            className="form-input text-sm rounded-lg block w-full p-2.5 bg-transparent text-gray-300"
          >
            <option className="bg-white text-gray-900" selected>
              Choose a language
            </option>
            {[
              { name: "Turkish", code: "tr" },
              { name: "English", code: "en" },
            ].map((language) => (
              <option
                key={language.code}
                className="bg-white text-gray-900"
                value={language.code}
              >
                {language.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-9/12 sm:w-full px-3">
          <label
            className="block text-gray-300 text-sm font-medium mb-1"
            htmlFor="password"
          >
            Password <span className="text-red-600">*</span>
          </label>
          <input
            id="password"
            type="password"
            className="rounded-lg form-input w-full text-gray-300"
            placeholder="Password (at least 6 characters)"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-9/12 sm:w-full px-3">
          <button className="btn rounded-lg text-white bg-purple-600 hover:bg-purple-700 w-full">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserSettings;
