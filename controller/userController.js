const User = require("../model/User");


module.exports.delete_user = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await User.deleteOne({ _id: id });
    res.cookie("jwt", "", { maxAge: 1, httpOnly: true });
    res.send({ message: "user delted" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
