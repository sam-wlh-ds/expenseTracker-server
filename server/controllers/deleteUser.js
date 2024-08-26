const Users = require("../models/users");
const Finance = require("../models/finance");
const Transaction = require("../models/transaction");

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;

        // Find the user and populate finance and transaction
        const user = await Users.findOne({ _id: id })
                                .populate('finance')
                                .populate('transaction');

        if (!user) {
            return res.status(400).send({
                message: "User Doesn't Exist",
                error: true
            });
        }

        // Delete finance data if it exists
        if (user.finance) {
            await Finance.findByIdAndDelete(user.finance._id);
        }

        // Delete transaction data if transactions exist
        if (user.transaction && Array.isArray(user.transaction)) {
            await Promise.all(
                user.transaction.map(async (tran) => {
                    await Transaction.findByIdAndDelete(tran._id);
                })
            );
        }

        // Delete User
        await Users.findByIdAndDelete(user._id);

        res.status(200).json({
            message: "User Deleted",
            success: true
        });
        
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            message: error.message || "An error occurred while deleting the user",
            error: true
        });
    }
};

module.exports = deleteUser;
