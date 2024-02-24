const User = require("../model/User");

module.exports.get_user = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await User.findById(id);
    res.send({ uid: data._id, name: data.name, email: data.email });
  } catch (err) {
    res.send(err);
  }
};

module.exports.delete_user = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await User.deleteOne({ _id: id });
    res.cookie("jwt", "", { maxAge: 1 });
    res.send({ message: data });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
