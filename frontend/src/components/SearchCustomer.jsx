// src/components/SearchCustomers.js
import React, { useState } from "react";
import SideBar from "./extracomponents/SideBar";

const SearchCustomer = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    // Replace this URL with your API endpoint
    const apiUrl = `/api/customers/${accountNumber}`;

    try {
      const response = await fetch(apiUrl);
      if (!(response.status === 200)) {
        throw new Error("Customer not found");
      }
      const data = await response.json();
      setCustomer(data.data);
      setError("");
    } catch (err) {
      setError(err.message);
      setCustomer(null);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 min-h-[100vh] p-4">
      <SideBar />
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          Customer Search
        </h1>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <p className="text-lg text-gray-600 mb-4 text-center">
              Enter the account number to search for customer details. If the
              customer is found, their details will be displayed below.
            </p>
            <div className="flex flex-col items-center space-y-4">
              <input
                type="text"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg shadow-sm w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>

            {error && (
              <p className="text-red-600 text-center font-medium">{error}</p>
            )}

            {customer && (
              <div className="w-full max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Customer Information
                </h2>
                <p className="text-gray-700 mb-2">
                  <strong className="font-medium">Full Name:</strong>{" "}
                  {customer.name}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong className="font-medium">Full Name:</strong>{" "}
                  {customer.firstName}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong className="font-medium">Full Name:</strong>{" "}
                  {customer.lastName}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong className="font-medium">Gender:</strong>{" "}
                  {customer.gender}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong className="font-medium">Amount:</strong> $
                  {customer.amount}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong className="font-medium">Email:</strong>{" "}
                  {customer.email}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong className="font-medium">Phone:</strong>{" "}
                  {customer.Phone}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong className="font-medium">Employment:</strong>{" "}
                  {customer.employment}
                </p>
                <p className="text-gray-700">
                  <strong className="font-medium">Account Type:</strong>{" "}
                  {customer.accountType}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="pt-4 text-center text-gray-600">
          <p>Powered by Your Company</p>
        </div>
      </div>
    </div>
  );
};

export default SearchCustomer;
