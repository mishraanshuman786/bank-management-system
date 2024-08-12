import React, { useState } from "react";
import SideBar from "./extracomponents/SideBar";

function AddCustomer() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
    gender: "",
    Address: "",
    Phone: "",
    name: "",
    email: "",
    accountType: "",
    amount: "",
    employment: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [day, month, year] = form.DOB.split("-");

    // Rearrange the parts into 'yyyy-mm-dd' format
    const formattedDate = `${year}-${month}-${day}`;

    // Ensure date is in yyyy-mm-dd format
    const formattedForm = {
      ...form,
      DOB: formattedDate, // Formats the date as yyyy-mm-dd
      amount: parseFloat(form.amount), // Ensure amount is a number
    };

    try {
      console.log("form", formattedForm);
      const response = await fetch("http://localhost:5000/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedForm),
      });

      console.log(response);

      if (response.status == "201") {
        alert("Customer added successfully");
      } else {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Customer added:", result);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Add Customer</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                placeholder="First Name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                placeholder="Last Name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="DOB">
                Date of Birth
              </label>
              <input
                type="date"
                id="DOB"
                name="DOB"
                value={form.DOB}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="Address">
                Address
              </label>
              <input
                type="text"
                id="Address"
                name="Address"
                value={form.Address}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                placeholder="Address"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="Phone">
                Phone
              </label>
              <input
                type="tel"
                id="Phone"
                name="Phone"
                value={form.Phone}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                placeholder="Phone Number"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                placeholder="Enter Full Name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="accountType">
                Account Type
              </label>
              <input
                type="text"
                id="accountType"
                name="accountType"
                value={form.accountType}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                placeholder="Account Type"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="amount">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                placeholder="Amount"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="employment">
                Employment
              </label>
              <input
                type="text"
                id="employment"
                name="employment"
                value={form.employment}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                placeholder="Employment"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 w-full"
          >
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCustomer;
