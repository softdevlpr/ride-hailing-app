//handling user registration logic

import User from "../models/user.js";
import bcrypt from 'bcryptjs';

export const registerUser = async(req,res) =>{
  try{
    const{name,email,password,phone} = req.body;

    if(!name || !email || !password || !phone){                          //checking if any field missing 
      return res.status(400).json({message: 'Please enter all fields'});  //bad request
    } 

    const existingUser = await User.findOne({email});                 //searches database with email entity
    if(existingUser)
    {
      return res.status(400).json({message : 'User already exists'});   //checking if a user already exists with the same email 
    }

    const salt = await bcrypt.genSalt(10);   //generating random salt here
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new User({     //creating a new user
      name,
      email,
      password: hashedPassword,
      phone
    });
    const savedUser = await newUser.save();    //saving the new user

    res.status(201).json({
      message: 'User registered successfully',
      user :{
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone
      }
    });
  } catch(error)
  {
    console.error('Error registering user:',error.message);
    res.status(500).json({message: 'Server error'});      //if anything goes wrong send 500
  }
};

//500- internal server error