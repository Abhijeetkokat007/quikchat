




import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// const User = import('./models/UserModels.js');
import User from './models/userModel.js'
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

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  connectDB();
});
