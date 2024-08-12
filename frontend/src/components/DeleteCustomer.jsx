// src/components/DeleteCustomer.js
import React, { useState } from "react";
import SideBar from "./extracomponents/SideBar";

const DeleteCustomer = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSearch = async () => {
    const apiUrl = `/api/customers/${accountNumber}`;

    try {
      const response = await fetch(apiUrl);
      if (!(response.status === 200)) {
        throw new Error("Customer not found");
      }
      const data = await response.json();
      setCustomer(data.data);
      setError("");
      setSuccess("");
    } catch (err) {
      setError(err.message);
      setCustomer(null);
      setSuccess("");
    }
  };

  const handleDelete = async () => {
    const apiUrl = `/api/delete/${accountNumber}`;

    try {
      const response = await fetch(apiUrl, { method: "DELETE" });
      if (!(response.status === 200)) {
        throw new Error("Failed to delete customer");
      }
      setCustomer(null);
      setSuccess("Customer deleted successfully");
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 min-h-[100vh] p-4">
      <SideBar />
      <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg shadow-lg flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          Delete Customer
        </h1>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <p className="text-lg text-gray-600 mb-4 text-center">
              Enter the account number to search for the customer you wish to
              delete. If the customer is found, you can confirm their deletion.
            </p>
            <div className="flex flex-col items-center space-y-4">
              <input
                type="text"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg shadow-sm w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Search
              </button>
            </div>

            {error && (
              <p className="text-red-600 text-center font-medium">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-center font-medium">
                {success}
              </p>
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
                  {customer.phone}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong className="font-medium">Employment:</strong>{" "}
                  {customer.employment}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong className="font-medium">Account Type:</strong>{" "}
                  {customer.accountType}
                </p>
                <button
                  onClick={handleDelete}
                  className="w-full px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Confirm Deletion
                </button>
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

export default DeleteCustomer;
