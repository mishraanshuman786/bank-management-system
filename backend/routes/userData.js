const express = require("express");
const transactions = require("../models/transactionSchema");
const router = express.Router();
const user = require("../models/userSchema");

router.post("/add", async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      Phone,
      DOB,
      gender,
      Address,
      name,
      email,
      employment,
      accountType,
      amount,
    } = req.body;

    // Check for required fields
    if (
      !firstName ||
      !lastName ||
      !Phone ||
      !DOB ||
      !gender ||
      !Address ||
      !name ||
      !email ||
      !employment ||
      !accountType ||
      !amount
    ) {
      return res.status(400).json({ msg: "Please fill all the details" });
    }

    // Validate and parse DOB
    const parsedDOB = new Date(DOB);

    // Create a new user instance
    const newUser = new user({
      firstName,
      lastName,
      Phone,
      DOB: parsedDOB, // Use the validated and parsed date
      gender,
      Address,
      name,
      email,
      employment,
      accountType,
      amount,
    });
    console.log(newUser);

    // Save the user
    let addedUser = await newUser.save();
    if (addedUser) {
      res.status(201).json({
        msg: "User Registration Success",
      });
    } else {
      throw new Error("User Registration Failed!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `${error}`,
    });
  }
});

router.get("/customers", async (req, res) => {
  try {
    const User = await user.find();
    if (User) {
      res.status(200).json({
        data: User,
      });
    } else {
      throw new Error("Users Not Found");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: `${error}`,
    });
  }
});

router.get("/customers/:id", async (req, res) => {
  try {
    // const { id} = req.body;
    // console.log(req.params.id);
    const data = await user.findById(req.params.id);
    // console.log(data);
    if (data) {
      res.status(200).json({
        data,
      });
      // console.log(data);
    } else {
      throw new Error("Couldn't find the Customer!");
    }
  } catch (error) {
    res.status(404).json({
      msg: `${error}`,
    });
  }
});

router.put("/update", async (req, res) => {
  // console.log(req.body)
  try {
    let {
      id,
      firstName,
      lastName,
      Phone,
      DOB,
      gender,
      Address,
      name,
      email,
      employment,
      accountType,
      amount,
    } = await req.body;

    // Validate and parse DOB
    const parsedDOB = new Date(DOB);
    const data = await user.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        Phone,
        DOB: parsedDOB,
        gender,
        Address,
        email,
        name,
        employment,
        accountType,
        amount,
      },
      {
        new: true,
      }
    );

    if (data) {
      res.status(200).json({
        msg: "Customer Updated successfully",
        data,
      });
    } else {
      throw new Error("Updation Failed!");
    }
  } catch (error) {
    res.status(500).json({
      msg: `${error}`,
    });
  }
});

router.delete("/delete/:id", async function (req, res) {
  try {
    let response = await user.findByIdAndDelete(req.params.id);
    if (response) {
      res.status(200).json({
        msg: "Customer Account deleted successfully",
      });
    } else {
      throw new Error("Couldn't delete customer account!");
    }
  } catch (error) {
    res.status(500).json({
      msg: `${error}`,
    });
  }
});

router.put("/customer/money", async (req, res) => {
  // console.log(req.body)
  try {
    const { id, count, id2 } = req.body;
    const data = await user.findById(id);
    const data2 = await user.findById(id2);
    data2.amount = count + data2.amount;
    data.amount = data.amount - count;
    data.save();
    data2.save();
    res.send("updated successfull");
  } catch (e) {
    console.log(e.message);
  }
  // data.update({amount:amount1})

  // res.send("The amount is debited rupees from _ and creidet to rupess _ ")
});

router.post("/transactions", async (req, res) => {
  try {
    const { id, count, id2 } = req.body;
    const data = await user.findById(id);
    const data2 = await user.findById(id2);
    // console.log(req.body);
    const newTrans = new transactions({
      userOne: data.name,
      userTwo: data2.name,
      amount: count,
    });

    let savedTransaction = await newTrans.save();
    if (savedTransaction) {
      res.status(201).send({
        msg: "Successfully saved transaction.",
      });
    } else {
      throw new Error("Couldn't save transaction!");
    }
  } catch (error) {
    res.status(500).json({
      msg: `${error}`,
    });
  }
});

router.get("/get-transactions", async (req, res) => {
  try {
    const data = await transactions.find();
    res.status(200).json({ data });
    console.log(data);
  } catch (e) {
    console.log(e);
    res.status(500).json();
  }
});

router.get("/get-transaction/:id", async (req, res) => {
  try {
    const data = await transactions.findOne({ _id: req.params.id });
    res.status(200).json({ data });
    console.log(data);
  } catch (e) {
    console.log(e);
    res.status(500).json();
  }
});

router.delete("/delete-transaction/:id", async function (req, res) {
  try {
    let response = await transactions.findByIdAndDelete(req.params.id);
    if (response) {
      res.status(200).json({
        msg: "Transaction deleted successfully",
      });
    } else {
      throw new Error("Couldn't delete Transaction!");
    }
  } catch (error) {
    res.status(500).json({
      msg: `${error}`,
    });
  }
});

module.exports = router;
