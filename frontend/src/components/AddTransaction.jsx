import React, { useState, useEffect } from "react";
import SideBar from "./extracomponents/SideBar";

const AddTransaction = () => {
  const [accounts, setAccounts] = useState([]);
  const [id, setId] = useState("");
  const [id2, setId2] = useState("");
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Fetch account list on component mount
    const fetchAccounts = async () => {
      try {
        let response = await fetch("/api/customers");
        if (!response.ok) throw new Error("Failed to fetch accounts");
        response = await response.json();
        setAccounts(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id === id2) {
      alert("Sender and Receiver accounts cannot be the same.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          id2,
          count,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess("Transaction added successfully!");
        // Clear form fields after successful submission
        setId("");
        setId2("");
        setCount("");
      } else {
        throw new Error("Error in Adding Transaction!");
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
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Add New Transaction</h1>
        <p className="mb-6 text-gray-700">
          Please fill out the form below to add a new transaction. Ensure that
          all details are correct before submitting.
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto"
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <div className="mb-4">
            <label
              htmlFor="sender-account"
              className="block text-gray-700 font-medium mb-2"
            >
              Sender Account Number
            </label>
            <select
              id="sender-account"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Select sender account
              </option>
              {accounts.map((account) => (
                <option key={account._id} value={account._id}>
                  {account._id} - {account.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="receiver-account"
              className="block text-gray-700 font-medium mb-2"
            >
              Receiver Account Number
            </label>
            <select
              id="receiver-account"
              value={id2}
              onChange={(e) => setId2(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Select receiver account
              </option>
              {accounts.map((account) => (
                <option key={account._id} value={account._id}>
                  {account._id} - {account.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="count"
              className="block text-gray-700 font-medium mb-2"
            >
              Amount in Rupees
            </label>
            <input
              type="number"
              id="count"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="Enter amount in Rupees"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg focus:outline-none ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            } text-white`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddTransaction;
