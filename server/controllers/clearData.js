const Users = require("../models/users");
const Transaction = require("../models/transaction");

const clearData = async (req, res) => {
    try {
        const { id } = req.body;

        const user = await Users.findOne({ _id: id })
                                .populate('finance')
                                .populate("transaction");

        if (!user) {
            return res.status(400).send({
                message: "User Doesn't Exist",
                error: true
            });
        }

        // Clear finance data
        const finData = user.finance;
        finData.currentBalance = 0;
        finData.totalIncome = 0;
        finData.totalExpense = 0;
        await finData.save();

        // Clear transaction data
        const tranData = user.transaction;

        // Promise.all to handle async operations
        await Promise.all(
            tranData.map(async (tran) => {
                await Transaction.findByIdAndDelete(tran._id);
            })
        );

        // Create and save default transaction
        const defaultTransaction = new Transaction();
        await defaultTransaction.save();

        user.transaction = [defaultTransaction];
        await user.save();

        res.status(200).json({
            message: "Data Cleared",
            success: true
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

module.exports = clearData;
