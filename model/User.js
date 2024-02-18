const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    validate: [isEmail, "enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "minimum lenght of password is 6 characters"],
  },
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash( this.password, salt );
    next();
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if(user) {
        const authPassword = await bcrypt.compare(password, user.password)
        if(authPassword) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
}

const User = mongoose.model("users", userSchema);

module.exports = User;
