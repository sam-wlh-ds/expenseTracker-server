const Users = require("../models/users");
const Transaction = require("../models/transaction");

const addData = async (req, res) => {
    try {
        const { id, name, description, type, For, amount } = req.body;
        // Find the user and populate finance and transaction fields
        const user = await Users.findById(id)
            .populate("finance")
            .populate("transaction");

        if (!user) {
            return res.status(400).json({
                message: "User Doesn't Exist",
                error: true,
            });
        }
        
        // recheck: user exploited the frontend checks
        if (!name || !type || !For || !amount){
            return res.status(400).json({
                message: "Invalid Input",
                error: true,
            });
        }
        // Update finance data
        const finData = user.finance;
        if (For === "Current Balance") {
            finData.currentBalance = (finData.currentBalance) + (type==="Debit"?-1:1)*amount;
        } else if (For === "Total Income") {
            finData.totalIncome = (finData.totalIncome) + (type==="Debit"?-1:1)*amount;
        } else if (For === "Total Expense") {
            finData.totalExpense = (finData.totalExpense) + (type==="Debit"?-1:1)*amount;
        }

        // Save the updated finance data
        await finData.save();

        // Remove the first transaction if it has no name
        const tranData = user.transaction;
        if (tranData.length > 0 && !tranData[0].name) {
            await Transaction.findByIdAndDelete(tranData[0]._id);
            tranData.shift(); // Use shift() to remove the first element
        }

        // Create and save the new transaction
        const newTransaction = new Transaction({
            name: name,
            description: description,
            type: type,
            For: For,
            amount: amount,
        });

        await newTransaction.save();

        // Add new transaction to the user's transactions
        tranData.push(newTransaction);

        // Save the updated user with the new transaction
        user.transaction = tranData;
        const userSave = await user.save();

        return res.status(200).json({
            message: "Transaction added successfully!",
            data: userSave,
            success: true,
        });
    } catch (error) {
        console.error('Error in addData:', error); // Logging error for debugging
        return res.status(500).json({
            message: error.message || "An unexpected error occurred",
            error: true,
        });
    }
};

module.exports = addData;
