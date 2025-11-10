import React from "react";
import { useNavigate } from "react-router-dom";

const Failure: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-extrabold text-red-600 mb-4">
          Payment Failed!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          There was an issue with your payment. Please try again.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Failure;
