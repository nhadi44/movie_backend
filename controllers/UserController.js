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

module.exports = { getAll };
