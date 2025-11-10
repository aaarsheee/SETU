import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

interface LocationState {
  causeId: number;
  causeTitle: string;
  amount: number;
}

const PaymentForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const [formData, setFormData] = useState({
    amount: state?.amount?.toString() || "100",
    tax_amount: "0",
    total_amount: state?.amount?.toString() || "100",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:5173/payment-success",
    failure_url: "http://localhost:5173/payment-failure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  const generateSignature = (
    total_amount: string,
    transaction_uuid: string,
    product_code: string,
    secret: string
  ): string => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const hashedSignature = generateSignature(
      total_amount,
      transaction_uuid,
      product_code,
      secret
    );
    setFormData((prev) => ({ ...prev, signature: hashedSignature }));
  }, [formData.amount]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        {/* eSewa Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://esewa.com.np/common/images/esewa_logo.png"
            alt="eSewa Logo"
            className="h-12"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
          Complete Your Donation
        </h1>
        <p className="text-center text-gray-500 mb-6">
          {state?.causeTitle
            ? `You are supporting: ${state.causeTitle}`
            : "Proceed with your payment below."}
        </p>

        <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
          className="space-y-6"
        >
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Donation Amount (NPR)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: e.target.value,
                  total_amount: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Name fields */}
          

          {/* Hidden fields */}
          {[
            "tax_amount",
            "total_amount",
            "transaction_uuid",
            "product_code",
            "product_service_charge",
            "product_delivery_charge",
            "success_url",
            "failure_url",
            "signed_field_names",
            "signature",
          ].map((field) => (
            <input
              key={field}
              type="hidden"
              name={field}
              value={(formData as any)[field]}
            />
          ))}

          {/* Buttons */}
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
            >
              Pay via eSewa
            </button>

            <button
              type="button"
              onClick={() => navigate("/donate")}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-medium transition"
            >
              Cancel & Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
