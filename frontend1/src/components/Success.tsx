import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "esewajs";
import axios from "axios";

interface DecodedData {
  transaction_uuid: string;
  [key: string]: any;
}

const Success: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");

  let decoded: DecodedData | null = null;
  try {
    decoded = token ? (base64Decode(token) as DecodedData) : null;
  } catch (err) {
    console.error("Error decoding token:", err);
  }

  const verifyPaymentAndUpdateStatus = async () => {
    if (!decoded?.transaction_uuid) {
      console.error("No transaction UUID found in token");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/payment-status`,

        {
          product_id: decoded.transaction_uuid,
        }
      );

      if (response.status === 200) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyPaymentAndUpdateStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div className="text-center p-6">Loading...</div>;

  if (!isSuccess)
    return (
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold text-red-600">
          Oops!.. Error confirming payment
        </h1>
        <h2 className="text-lg text-gray-600 mt-2">We will resolve it soon.</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Homepage
        </button>
      </div>
    );

  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mt-2">
        Thank you for your payment. Your transaction was successful.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
