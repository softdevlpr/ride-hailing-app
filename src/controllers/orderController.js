import Cab from "../models/cabModel.js";
import Order from "../models/order.js";    //to create, read, or modify order data in MongoDB.

export const createOrder = async(req,res)=>{
  try{
    const{ pickupLocation, dropLocation, cabType, lat,lng} = req.body

      if(!pickupLocation || !dropLocation || !cabType || lat==undefined|| lng == undefined)
      {
        return res.status(400).json({message: 'All fields must be filled'});
      }

  const nearestCab = await Cab.findOne({
      type: cabType,
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 5000, // meters
        },
      },
    });

    if (!nearestCab) {
      return res.status(404).json({ message: 'No available cab found nearby' });
    }    


      const newOrder = new Order({    //creating new instance of Order Model
        //userId,
        pickupLocation,
        dropLocation,
        cabType,
        status:"Booked",
        assignedCab: nearestCab._id
      });

      const savedOrder = await newOrder.save(); // saving new order to MongoDB

      res.status(201).json({message:'Ride booked successfully',order:savedOrder,
        assignedCab: nearestCab
      });
    } catch(error){
      console.error('Error booking ride:',error.message);
        res.status(500).json({message:'Server error'});
    }
};


// Order tracking controller
export const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("assignedCab");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order fetched successfully",
      order: order,
      cabLocation: order.assignedCab
      ?{
        type: order.assignedCab.location.type,
        coordinates: order.assignedCab.coordinates
      }
      :null
    });

  } catch (error) {
    console.error("Error tracking order:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
