import mongoose from "mongoose";

const CabSchema = new mongoose.Schema({
  cabNumber:{
    type:String,
    required:true,
    unique:true
  },
  type:{
    type: String,
    enum:['SUV','Sedan','Hatchback'],
    required:true
  },
  location:{
    type:{
      type:String,
      enum:['Point'],
      required:true,
      default:'Point'
    
  },
  coordinates:{
    type:[Number],
    required:true
  }
},
  capacity:{
    type: Number,
    required:true
  },
  baseFare:{
    type:Number,
    required:true,
  }
});

CabSchema.index({location: '2dsphere'});

const Cab = mongoose.model('Cab',CabSchema);

export default Cab;