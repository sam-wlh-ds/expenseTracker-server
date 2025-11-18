const Users = require("../models/users");
const Joi = require("joi");

const updateUsername = async (req, res) => {
    
    const schema = Joi.object({
        username: Joi.string().min(1).max(50).required(),
    });

    const validation = schema.validate(req.body);
    const { error } = validation;
    
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    try {
        const userId = req.user._id; 
        const { username: newUsername } = req.body;

        const user = await Users.findByIdAndUpdate(
            userId,
            { username: newUsername },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
            });
        }

        return res.status(200).json({
            message: "Username updated successfully!",
            username: user.username,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "An unexpected error occurred",
            error: true,
        });
    }
};

module.exports = updateUsername;
