const UserModel = require("../models").User;

const getAll = async (req, res) => {
  const { page, pageSize } = req.query;
  try {
    const users = await UserModel.findAll({
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
      limit: pageSize,
      offset: page,
    });
    return res.status(200).json({
      status: "success",
      message: "Users retrieved successfully",
      length: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOne = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findOne({
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
      where: {
        id: id,
      },
    });
    if (user === null)
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });

    return res.json({
      status: "success",
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserByEmail = async (req, res) => {
  let email = req.params.email;
  try {
    const user = await UserModel.findOne({
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
      where: {
        email: email,
      },
    });
    if (user === null)
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });

    return res.json({
      status: "success",
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getAll, getOne, getUserByEmail };
