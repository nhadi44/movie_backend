const bcrypt = require("bcrypt");
const UserModel = require("../models").User;

const register = async (req, res) => {
  const payload = req.body;

  payload.password = await bcrypt.hashSync(payload.password, 10);

  try {
    await UserModel.create(payload);
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: payload,
    });
  } catch (error) {
    console.log(error);
  }
  res.sendStatus(payload);
};

module.exports = { register };
