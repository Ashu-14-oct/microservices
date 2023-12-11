require('dotenv').config();
const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//sing up
module.exports.createUser = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    const user = await User.findOne({email: email});
    if(user){
      return res.status(422).json({message: "User already exist, please use a different email!"});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = User.create({
      name,
      email,
      password: hashedPassword,
    });

    const selectedUser = await User.find({email: email}).select("-password");

    return res
      .status(200)
      .json({ message: "User account created successfully!", info: selectedUser});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


//sign in
module.exports.signIn = async (req, res) => {
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
      return res.status(404).json({message: "User with this email does not exist"});
    }

    const verifyPassword = await bcrypt.compare(password ,user.password);
    if(!verifyPassword){
      return res.status(401).json({message: "Invalid password"});
    }

    const token = await jwt.sign({_id: user._id}, process.env.TOKEN);
    return res.status(200).json({message: "Signed in successfully", token});
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
