import Cab from "../models/cab.js";
import Order from "../models/order.js";    //to create, read, or modify order data in MongoDB.

export const createOrder = async(req,res)=>{
  try{
    const{ pickupLocation, dropLocation, cabType} = req.body

      if(!pickupLocation || !dropLocation || !cabType)
      {
        return res.status(400).json({message: 'All fields must be filled'});
      }

  /*    const cab= await Cab.findById(cabId);
      if(!cab){
        return res.status(404).json({message:'Cab not found'});
      } */

      const newOrder = new Order({    //creating new instance of Order Model
        //userId,
        pickupLocation,
        dropLocation,
        cabType,
        status:"Booked"
      });

      const savedOrder = await newOrder.save(); // saving new order to MongoDB

      res.status(201).json({message:'Ride booked successfully',order:savedOrder,
      });
    } catch(error){
      console.error('Error booking ride:',error.message);
        res.status(500).json({message:'Server error'});
    }
};