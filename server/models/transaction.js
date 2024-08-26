const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    name:{
        type: String,
        // required: true,
        minlength: 1,
        maxlength: 255,
        trim: true,
    },
    description:{
        type: String,
        minlength: 0,
        maxlength: 1024,
        trim: true,
    },
    type: {
        type: String,
        // required: true,
        enum: ['Credit', 'Debit']
    },
    For:{
        type: String,
        // required: true,
        enum : ['Current Balance', 'Total Income', 'Total Expense']
    },
    amount: {
        type: Number,
        // required: true,
        min: 0,
    },

})

const Transaction = mongoose.model("transaction", transactionSchema)

module.exports = Transaction;