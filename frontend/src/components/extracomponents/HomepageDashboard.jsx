import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { NavLink } from "react-router-dom";

const HomepageDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/get-transactions");
        if (response.status === 200) {
          const data = await response.json();
          setTransactions(data.data);
        } else {
          throw new Error("Failed to fetch transactions");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Welcome to the Manager Dashboard
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* User Management Section */}
          <section className="bg-white p-4 rounded-lg shadow-md flex-1">
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <NavLink
                to="/add-customer"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add User
              </NavLink>
              <NavLink
                to="/update-customer"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Update User
              </NavLink>
              <NavLink
                to="/delete-customer"
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete User
              </NavLink>
            </div>
          </section>

          {/* Manage Transactions Section */}
          <section className="bg-white p-4 rounded-lg shadow-md flex-1">
            <h2 className="text-2xl font-semibold mb-4">Manage Transactions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <NavLink
                to="/add-transaction"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add Transaction
              </NavLink>
              <NavLink
                to="/update-transaction"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Update Transaction
              </NavLink>
              <NavLink
                to="/delete-transaction"
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete Transaction
              </NavLink>
            </div>
          </section>
        </div>

        {/* Transaction Details Section */}
        <section className="bg-white p-4 rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>
          {loading && <p>Loading transaction details...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && transactions.length === 0 && (
            <p>No transaction details available.</p>
          )}
          {!loading && !error && transactions.length > 0 && (
            <div className="overflow-auto max-h-[300px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 border-b">
                    <th className="py-2 px-4 text-left">Transaction ID</th>
                    <th className="py-2 px-4 text-left">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.transactionId} className="border-b">
                      <td className="py-2 px-4">{transaction._id}</td>
                      <td className="py-2 px-4">₹{transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomepageDashboard;
