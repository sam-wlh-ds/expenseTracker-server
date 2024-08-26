const Users = require("../models/users");

const getFinData = async(req, res)=>{
    try{
        const { id } = req.body;
        
        const user = await 
            Users.findOne({ _id:id })
                 .populate("finance");

        if (!user) {
            return res.status(400).send(
              {
                  message:"User Doesn't Exists",
                  error: true
              });
          }
        const finData = user.finance;
        const {currentBalance, totalIncome, totalExpense} = finData;
        res.status(200).json({
            currBal: currentBalance? currentBalance: 0,
            totInc: totalIncome? totalIncome:0,
            totExp: totalExpense? totalExpense:0,
            success: true
        })
            
    } catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
          });
    }
}

module.exports = getFinData;