import React, { useEffect, useState } from "react";
import SideBar from "./extracomponents/SideBar";

function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/customers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setCustomers(result.data); // Adjust according to actual response structure
      } catch (error) {
        setError(error.message);
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Customer Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {customers.length > 0 ? (
            customers.map((customer, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border"
              >
                <h2 className="text-xl font-semibold mb-2">{customer.name}</h2>
                <p className="text-gray-600 mb-1">
                  <strong>Account Number:</strong>{" "}
                  <span className="text-[13px]">{customer._id}</span>
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Email:</strong> {customer.email}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>DOB:</strong> {customer.DOB}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Amount:</strong> ₹{customer.amount.toFixed(2)}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Account Type:</strong> {customer.accountType}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No customers found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCustomers;
