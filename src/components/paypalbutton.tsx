'use client'
import React, { FunctionComponent, useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // Import PayPalButtons instead of PayPalButton
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";

export const DonationAmount: FunctionComponent<{
  amount: number;
  value: number;
  setAmount: Function;
}> = ({ amount, setAmount, value }) => {
  return (
    <span
      className={`px-4 py-2 text-lg cursor-pointer bg-gray-light ${
        amount === value ? "border-2 border-yellow" : ""
      } `}
      onClick={() => setAmount(value)}
    >
      {value}$
    </span>
  );
};

const Donate: FunctionComponent = () => {
  const [amount, setAmount] = useState(10);

  const addDonationInDB = async (name: string, amount: number) => {
    try {
      const donationRef = await addDoc(collection(db, "donations"), {
        name,
        amount,
        timestamp: new Date().toISOString(),
      });
      console.log("Donation added with ID: ", donationRef.id);
    } catch (error) {
      console.error("Error adding donation: ", error);
    }
  };

  return (
    <div className="grid h-full gap-2 p-6 lg:px-24 md:grid-cols-2">
      
      <div className="grid place-items-center">
        <div className="flex flex-col items-center px-4 py-6 mx-auto space-y-4 rounded-md md:w-10/12 bg-gray-dark">
          <h1 className="text-5xl textBlock-title">Donate Box</h1>
          <p className="textBlock-subtitle">Any amount will be appreciated</p>
          <div className="flex space-x-10">
            <DonationAmount value={1} setAmount={setAmount} amount={amount} />
            <DonationAmount value={5} setAmount={setAmount} amount={amount} />
            <DonationAmount value={10} setAmount={setAmount} amount={amount} />
          </div>
          <PayPalScriptProvider options={{ "clientId": "AT7V5uarn6kcwipN9Qh7egJaZM9rzEPvBGhFjESat9TZo7qtwGJBhNEKS7aAeII2ljnr6vceOnZudWoc" }}>

          <PayPalButtons
  createOrder={(data, actions) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: amount.toString()
        },
      }],
    });
  }}
  
  onClick={(data, actions) => {
    // Add any logic you need for the onClick event
  }}
  onError={(err) => {
    // Handle error if necessary
  }}
  onCancel={(data) => {
    // Handle cancellation if necessary
  }}
>
 </PayPalButtons>


          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default Donate;
