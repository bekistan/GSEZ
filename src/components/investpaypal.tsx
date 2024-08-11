'use client';
import React, { FunctionComponent, useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Loader from './loading';
import { useAuth } from '@/hooks/useAuth';

const InvestPaypal: FunctionComponent = () => {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState<number | null>(null);
  const [investorDocId, setInvestorDocId] = useState<string | null>(null);
  const [paid, setPaid] = useState<boolean>(false);

  useEffect(() => {
    const fetchInvestmentAmount = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "investors"),
          where("email", "==", user.email),
          where("status", "==", "approved")
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const investorDoc = querySnapshot.docs[0];
          const investorData = investorDoc.data();
          setAmount(investorData.investmentAmount);
          setInvestorDocId(investorDoc.id);
          setPaid(investorData.paid === "yes");
        }
      } catch (error) {
        console.error("Error fetching investment amount: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestmentAmount();
  }, [user]);

  if (authLoading || loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <div className="bg-gray-900 p-5 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-6">Access Restricted</h2>
          <p className="text-lg mb-6">You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="  gap-2 p-6 lg:px-24 md:grid-cols-2">
      <div className="grid place-items-center">
        <div className="bg-gray-900 pt-14 pb-14 flex flex-col items-center px-4 py-6 mx-auto space-y-4 rounded-md md:w-10/12 bg-gray-dark">
        {amount !== null ? (
            <>
          <h1 style={{ fontFamily: 'var(--font-merriweather)'}} className="text-5xl text-gray-300 textBlock-title">INVEST</h1>
          <p style={{ fontFamily: 'var(--font-poppins)'}} className="textBlock-subtitle text-gray-400">Thank you for your investment</p>
          
              <div style={{ fontFamily: 'var(--font-poppins)'}} className="text-lg text-gray-300 p-4 bg-gray-800 rounded">
                Investment Amount: ${amount}
              </div>
              {!paid ? (
                <PayPalScriptProvider options={{ "clientId": "AT7V5uarn6kcwipN9Qh7egJaZM9rzEPvBGhFjESat9TZo7qtwGJBhNEKS7aAeII2ljnr6vceOnZudWoc" }}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      if (actions && actions.order) {
                        return actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [{
                            amount: {
                              currency_code: "USD",
                              value: amount.toString()
                            },
                          }],
                        });
                      } else {
                        return Promise.reject(new Error("Order creation failed"));
                      }
                    }}
                    onApprove={async (data, actions) => {
                      if (actions && actions.order) {
                        const details = await actions.order.capture();
                        if (details && details.payer && details.payer.name && investorDocId) {
                          console.log('Transaction completed by ', details.payer.name.given_name);
                          // Update the Firestore document to set the paid status to "yes"
                          await updateDoc(doc(db, "investors", investorDocId), {
                            paid: "yes"
                          });
                          setPaid(true);
                        } else {
                          console.error('Payer details are missing or investorDocId is not set');
                        }
                      } else {
                        console.error('Order capture failed');
                      }
                    }}
                    onError={(err) => {
                      console.error('PayPal Checkout onError', err);
                    }}
                    onCancel={() => {
                      console.log('PayPal Checkout onCancel');
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <div className="text-lg text-white p-4 bg-gray-800 rounded">
                  Payment Status: Paid
                </div>
              )}
            </>
          ) : (
            <></>
            )}
        </div>
      </div>
    </div>
  );
};

export default InvestPaypal;
