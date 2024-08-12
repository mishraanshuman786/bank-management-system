import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCustomer from "./components/AddCustomer";
import ViewCustomers from "./components/ViewCustomers";

import Homepage from "./components/Homepage";
import UpdateCustomer from "./components/UpdateCustomer";
import SearchCustomer from "./components/SearchCustomer";
import DeleteCustomer from "./components/DeleteCustomer";
import AddTransaction from "./components/AddTransaction";
import UpdateTransaction from "./components/UpdateTransaction";
import DeleteTransaction from "./components/DeleteTransaction";
import ShowTransactions from "./components/ShowTransactions";

function App() {
  return (
    <Router>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/update-customer" element={<UpdateCustomer />} />
          <Route path="/search-customer" element={<SearchCustomer />} />
          <Route path="/delete-customer" element={<DeleteCustomer />} />
          <Route path="/view-customers" element={<ViewCustomers />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/transactions" element={<ShowTransactions />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/update-transaction" element={<UpdateTransaction />} />
          <Route path="/delete-transaction" element={<DeleteTransaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
