import React, { useState } from "react";
import SideBar from "./extracomponents/SideBar";

const UpdateTransaction = () => {
  const [transactionId, setTransactionId] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate fetching transaction details
    // Replace this with actual API call to fetch transaction by ID
    setTimeout(() => {
      // Example transaction data
      const fetchedTransaction = {
        senderAccount: "1234567890",
        receiverAccount: "0987654321",
        amount: "5000",
      };
      setTransaction(fetchedTransaction);
      setLoading(false);
    }, 1000);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Handle the update logic here
    alert("Transaction updated successfully!");
  };

  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Update Transaction</h1>
        <p className="mb-6 text-gray-700">
          Enter the transaction ID to search for the transaction. If found, you
          can update the details below.
        </p>
        <form
          onSubmit={handleSearch}
          className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto mb-8"
        >
          <div className="mb-4">
            <label
              htmlFor="transaction-id"
              className="block text-gray-700 font-medium mb-2"
            >
              Transaction ID
            </label>
            <input
              type="text"
              id="transaction-id"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter transaction ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {transaction && (
          <form
            onSubmit={handleUpdate}
            className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto"
          >
            <div className="mb-4">
              <label
                htmlFor="sender-account"
                className="block text-gray-700 font-medium mb-2"
              >
                Sender Account Number
              </label>
              <input
                type="text"
                id="sender-account"
                value={transaction.senderAccount}
                disabled="true"
                onChange={(e) =>
                  setTransaction({
                    ...transaction,
                    senderAccount: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="receiver-account"
                className="block text-gray-700 font-medium mb-2"
              >
                Receiver Account Number
              </label>
              <input
                type="text"
                id="receiver-account"
                value={transaction.receiverAccount}
                disabled="true"
                onChange={(e) =>
                  setTransaction({
                    ...transaction,
                    receiverAccount: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-gray-700 font-medium mb-2"
              >
                Amount in Rupees
              </label>
              <input
                type="number"
                id="amount"
                value={transaction.amount}
                onChange={(e) =>
                  setTransaction({ ...transaction, amount: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Transaction
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default UpdateTransaction;
