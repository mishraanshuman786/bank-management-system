import React from "react";
import {
  FaUser,
  FaSearch,
  FaEdit,
  FaTrash,
  FaHistory,
  FaPlusCircle,
} from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="lg:w-64 bg-gray-800 text-white lg:min-h-[80%] flex-shrink-0 lg:flex lg:flex-col lg:justify-start">
      <div className="p-4 text-2xl font-bold">Manager Dashboard</div>
      <nav>
        <ul>
          <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
            <NavLink to="/">
              <MdDashboardCustomize
                style={{ fontSize: "25px" }}
                className="mr-2 inline"
              />{" "}
              Dashboard
            </NavLink>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
            <NavLink to="/view-customers">
              <FaUser className="inline mr-2" /> User Accounts
            </NavLink>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
            <NavLink to="/add-customer">
              <TiUserAdd style={{ fontSize: "25px" }} className="inline mr-2" />{" "}
              Add User
            </NavLink>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
            <NavLink to="/search-customer">
              <FaSearch className="inline mr-2" /> Search
            </NavLink>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
            <NavLink to="/update-customer">
              <FaEdit className="inline mr-2" /> Update
            </NavLink>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
            <NavLink to="/delete-customer">
              <FaTrash className="inline mr-2" /> Delete
            </NavLink>
          </li>
          <hr style={{ marginInline: "10px", height: "6px" }} />
          <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
            <NavLink to="/transactions">
              <FaHistory className="inline mr-2" /> Transactions
            </NavLink>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
            <NavLink to="/add-transaction">
              <FaPlusCircle className="inline mr-2" /> Add Transactions
            </NavLink>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
            <NavLink to="/update-transaction">
              <FaEdit className="inline mr-2" /> Update Transaction
            </NavLink>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
            <NavLink to="/delete-transaction">
              <FaTrash className="inline mr-2" /> Delete Transaction
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
