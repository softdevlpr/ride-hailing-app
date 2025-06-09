import mongoose from "mongoose";

const CabSchema = new mongoose.Schema({
  cabType:{
    type: String,
    required:true,
  },
  capacity:{
    type:Number,
    required:true,
  },
  baseFare:{
    type:Number,
    required:true,
  },
  rating:{
    type:Number,
    min:0,
    max:5,
    required:true,
  }
})

const Cab = mongoose.model('Cab',CabSchema);

export default Cab;