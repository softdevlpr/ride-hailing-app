import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
 /* userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true,
  },*/
  /*cabId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Cab',
    required:true,
  },*/
  pickupLocation:{
    type: String,
    required: true,
  },
  dropLocation:{
    type:String,
    required:true,
  },
  cabType:{     //like SUV, Sedan, etc
    type:String,
    required: true,
  },
   status: { 
    type: String, 
    enum: ["Booked", "OnTheWay", "Completed", "Cancelled"], 
    default: "Booked" 
  },
  assignedCab :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Cab"
  }
},
  {timestamps:true});    //definition of schema finishes here

const Order = mongoose.model('Order',orderSchema);    //created model Order from schema

export default Order;