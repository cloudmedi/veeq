import React from "react";
import useTranslation from "next-translate/useTranslation";

const PaymentSettings = () => {
  const { t } = useTranslation("settings");

  return (
    <div className={"mr-9 sm:mr-0"}>
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("orderNo")}
              </th>
              <th scope="col" className="px-6 py-3">
                Plan
              </th>
              <th scope="col" className="px-6 py-3">
                {t("amount")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("status")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("date")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-gray-800 border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white"
              >
                243423
              </th>
              <td className="px-6 py-4">Pro</td>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">{t("success")}</td>
              <td className="px-6 py-4">02/12/2023</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentSettings;
