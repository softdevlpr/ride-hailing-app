import Cab from "../models/cab.js";

export const listCabs = async(req,res) =>{
  try{
   const {pickupLocation, dropLocation} = req.body;

   if(!pickupLocation || !dropLocation)
   {
    return res.status(400).json({message:'Pick up and Drop Location are required'})
   }
   
   const cabs = await Cab.find();

   res.status(200).json({message:'Available Cabs fetched successfully',
      pickupLocation,
      dropLocation,
      cabs
    });
  }catch(error){
    console.error('Error fetching cabs:',error.message);
    res.status(500).json({message:'Server error'});
  }
};