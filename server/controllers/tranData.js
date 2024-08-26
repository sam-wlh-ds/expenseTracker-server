const Users = require("../models/users");

const getTranData = async(req, res)=>{
    try{
        const { id } = req.body;

        const user = await 
            Users.findOne({ _id:id })
                 .populate("transaction")

        if (!user) {
            return res.status(400).send(
              {
                  message:"User Doesn't Exists",
                  error: true
              });
          }
        const tranData = user.transaction;
        res.status(200).json({
            transactions: tranData,
            success: true
        })
            
    } catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
          });
    }
}

module.exports = getTranData;