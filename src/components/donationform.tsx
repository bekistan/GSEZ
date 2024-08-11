'use client';
import React, { FunctionComponent, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";

export const DonationAmount: FunctionComponent<{
  amount: number;
  value: number;
  setAmount: Function;
}> = ({ amount, setAmount, value }) => {
  return (
    <button
      className={`px-4 py-2 text-lg cursor-pointer bg-gray-light rounded-lg focus:outline-none ${
        amount === value ? "border-2 border-yellow" : ""
      } `}
      onClick={() => setAmount(value)}
    >
      {value}$
    </button>
  );
};

const DonationForm: FunctionComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(10);
  
  const addDonationInDB = async () => {
    try {
      const donationRef = await addDoc(collection(db, "donations"), {
        name,
        email,
        message,
        amount,
        timestamp: new Date().toISOString(),
      });
      console.log("Donation added with ID: ", donationRef.id);
    } catch (error) {
      console.error("Error adding donation: ", error);
    }
  };

  const handleApprove = (data: any, actions: any) => {
    return new Promise<void>((resolve, reject) => {
      addDonationInDB().then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return (
    <div className="bg-gray-800 pt-8 gap-2 p-6 lg:px-24 md:grid-cols-2">
      <div className="mt-10 grid place-items-center">
        <div className="flex flex-col items-center px-4 py-6 mx-auto space-y-4 rounded-md md:w-10/12 bg-gray-dark">
          <h1 className="text-5xl textBlock-title">Donate</h1>
          <p className="textBlock-subtitle">Any amount will be appreciated</p>
          <div className="flex space-x-10">
            <DonationAmount value={1} setAmount={setAmount} amount={amount} />
            <DonationAmount value={5} setAmount={setAmount} amount={amount} />
            <DonationAmount value={10} setAmount={setAmount} amount={amount} />
          </div>
          <form className="w-full max-w-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-800 text-sm font-bold mb-2">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-800 text-sm font-bold mb-2">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-800 text-sm font-bold mb-2">Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                required
              ></textarea>
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
                onApprove={handleApprove}
                onError={(err) => {
                  // Handle error if necessary
                }}
                onCancel={(data) => {
                  // Handle cancellation if necessary
                }}
              />
            </PayPalScriptProvider>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
