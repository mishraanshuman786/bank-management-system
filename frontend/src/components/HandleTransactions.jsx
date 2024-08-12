import React, { useState } from "react";
import axios from "axios";

function HandleTransactions() {
  const [transaction, setTransaction] = useState({
    userOne: "",
    userTwo: "",
    amount: "",
  });

  const handleChange = (e) =>
    setTransaction({ ...transaction, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/transactions", transaction);
    // Handle response
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="userOne"
        value={transaction.userOne}
        onChange={handleChange}
        className="border p-2"
        placeholder="User One ID"
      />
      <input
        name="userTwo"
        value={transaction.userTwo}
        onChange={handleChange}
        className="border p-2"
        placeholder="User Two ID"
      />
      <input
        name="amount"
        value={transaction.amount}
        onChange={handleChange}
        className="border p-2"
        placeholder="Amount"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Submit Transaction
      </button>
    </form>
  );
}

export default HandleTransactions;
