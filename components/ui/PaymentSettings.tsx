import React from "react";

const PaymentSettings = () => {
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order No.
              </th>
              <th scope="col" className="px-6 py-3">
                Plan
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Date
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
              <td className="px-6 py-4">Success</td>
              <td className="px-6 py-4">02/12/2023</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentSettings;
