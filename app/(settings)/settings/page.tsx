"use client";

import PaymentSettings from "@/components/ui/PaymentSettings";
import UserSettings from "@/components/ui/UserSettings";
import React, { useState } from "react";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";

const Settings = () => {
  const [userActive, setUserActive] = useState("user");
  const [paymentActive, setPaymentActive] = useState("payment");

  return (
    <div
      className="max-w-6xl mx-auto px-2 sm:px-6 grid grid-cols lg:grid-cols-2 gap-8"
      style={{ marginTop: 80 }}
    >
      <div>
        <TETabs>
          <TETabsItem
            color="dark"
            className="tabs-settings"
            active={userActive === "user"}
            style={{
              boxShadow: userActive ? "0 2px 0 0 rgb(217 227 234)" : "",
            }}
          >
            User Settings
          </TETabsItem>
        </TETabs>

        <TETabsContent className="mt-6">
          <TETabsPane show={userActive === "user"}>
            <UserSettings />
          </TETabsPane>
        </TETabsContent>
      </div>
      <div>
        <TETabs>
          <TETabsItem
            color="dark"
            className="tabs-settings"
            active={paymentActive === "payment"}
            style={{
              boxShadow: paymentActive ? "0 2px 0 0 rgb(217 227 234)" : "",
            }}
          >
            Payment Settings
          </TETabsItem>
        </TETabs>

        <TETabsContent className="mt-6">
          <TETabsPane show={paymentActive === "payment"}>
            <PaymentSettings />
          </TETabsPane>
        </TETabsContent>
      </div>
    </div>
  );
};

export default Settings;
