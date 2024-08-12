import React, { useState, useEffect } from "react";
import SideBar from "./extracomponents/SideBar";

const ShowTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let response = await fetch("/api/get-transactions");
        if (!(response.status === 200))
          throw new Error("Failed to fetch transactions");
        const data = await response.json();
        setTransactions(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">All Transactions</h1>
        {loading && <p>Loading transactions...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 border-b">
                  <th className="py-2 px-4 text-left">Transaction ID</th>
                  <th className="py-2 px-4 text-left">Sender Account Number</th>
                  <th className="py-2 px-4 text-left">
                    Receiver Account Number
                  </th>
                  <th className="py-2 px-4 text-left">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-4 px-4 text-center">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction) => (
                    <tr key={transaction.transactionId} className="border-b">
                      <td className="py-2 px-4">{transaction._id}</td>
                      <td className="py-2 px-4">{transaction.userOne}</td>
                      <td className="py-2 px-4">{transaction.userTwo}</td>
                      <td className="py-2 px-4">₹{transaction.amount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShowTransactions;
