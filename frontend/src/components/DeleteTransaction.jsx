import React, { useState } from "react";
import SideBar from "./extracomponents/SideBar";

const DeleteTransaction = () => {
  const [transactionId, setTransactionId] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response = await fetch(`/api/get-transaction/${transactionId}`);
      if (response.status === 200) {
        response = await response.json();
        setTransaction(response.data);
      } else {
        throw new Error("Transaction not found");
      }
    } catch (error) {
      setError(error.message);
      setTransaction(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/delete-transaction/${transactionId}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        alert("Transaction deleted successfully!");
        setTransaction(null);
        setTransactionId("");
      } else {
        throw new Error("Failed to delete transaction");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 p-6 bg-red-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-red-700">
          Delete Transaction
        </h1>
        <p className="mb-6 text-gray-800">
          Enter the transaction ID to search for the transaction. If found, you
          can delete it below.
        </p>
        <form
          onSubmit={handleSearch}
          className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto mb-8 border border-red-300"
        >
          <div className="mb-4">
            <label
              htmlFor="transaction-id"
              className="block text-red-700 font-medium mb-2"
            >
              Transaction ID
            </label>
            <input
              type="text"
              id="transaction-id"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter transaction ID"
              className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-center text-red-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {transaction && (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto border border-red-300">
            <h2 className="text-2xl font-semibold mb-4 text-red-700">
              Transaction Details
            </h2>
            <p className="mb-2">
              <strong>Sender Account Number:</strong> {transaction.userOne}
            </p>
            <p className="mb-2">
              <strong>Receiver Account Number:</strong> {transaction.userTwo}
            </p>
            <p className="mb-4">
              <strong>Amount in Rupees:</strong> {transaction.amount}
            </p>
            <button
              onClick={handleDelete}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Transaction
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DeleteTransaction;
