




import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// const User = import('./models/UserModels.js');
import User from './models/UserModels.js'
// import User from './models/UserModels.js'


dotenv.config();

const app = express();
app.use(express.json());

const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URI);
    if (response) {
      console.log("MongoDB Connected");
    }
  } catch (e) {
    console.log(e.message);
  }
};

const comparePasswords = (password, hashedPassword) => {
  // Replace this with your actual password comparison logic
  return password === hashedPassword;
};

app.post("/api/auth/register", async (req, res, next) => {
  try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne( {username} );
        if (usernameCheck)
          return res.json({ msg: "Username already used", status: false });
        const emailCheck = await User.findOne( {email} );
        if (emailCheck)
          return res.json({ msg: "Email already used", status: false });

        const user = await User.create({
          email,
          username,
          password,
        });
        delete user.password;
        return res.json({ status: true, user });
      } catch (ex) {
        next(ex);
        console.log(ex.message)
      }
})

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "User not found", status: false });
    }

    const pass = await User.findOne({ password });
    if (!pass) {
      return res.json({ msg: "password incorrect", status: false });
    }

    

    if (pass) {
      return res.json({  status: true, user });
    } else {

      return res.json({ msg: "Invalid password", status: false });
    }
  } catch (ex) {
    next(ex);
  }
})

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  connectDB();
});
