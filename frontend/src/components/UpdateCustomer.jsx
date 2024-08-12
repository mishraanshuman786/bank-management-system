import React, { useState, useEffect } from "react";
import SideBar from "./extracomponents/SideBar";

const UpdateCustomer = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    Phone: "",
    DOB: "",
    gender: "",
    Address: "",
    name: "",
    email: "",
    employment: "",
    accountType: "",
    amount: "",
  });
  const [accountNumber, setAccountNumber] = useState("");
  const [searchError, setSearchError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: accountNumber, ...form }), // Spread form directly
      });

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/customers/${accountNumber}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      const dobFormatted = result.data.DOB
        ? new Date(result.data.DOB).toISOString().split("T")[0]
        : "";

      setForm({
        ...result.data,
        DOB: dobFormatted,
      });
      setSearchError("");
    } catch (error) {
      setSearchError("Error fetching user. Please check the account number.");
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-10">
      <SideBar />
      <div className="flex-1 p-6 pt-0 overflow-auto">
        <div className=" flex flex-col lg:flex-row h-screen bg-gray-100 p-4">
          <div className="flex-1 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Update User</h1>
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Account Number"
                className="border p-2 rounded mr-2"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>
            {searchError && <p className="text-red-500">{searchError}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border p-2 rounded"
                />
                <input
                  type="tel"
                  name="Phone"
                  value={form.Phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="border p-2 rounded"
                />
                <input
                  type="date"
                  name="DOB"
                  value={form.DOB}
                  onChange={handleChange}
                  placeholder="Date of Birth"
                  className="border p-2 rounded"
                />
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="text"
                  name="Address"
                  value={form.Address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Username"
                  className="border p-2 rounded"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  name="employment"
                  value={form.employment}
                  onChange={handleChange}
                  placeholder="Employment"
                  className="border p-2 rounded"
                />
                <select
                  name="accountType"
                  value={form.accountType}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Account Type</option>
                  <option value="savings">Savings</option>
                  <option value="checking">Checking</option>
                </select>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Amount"
                  className="border p-2 rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;
