import Cab from "../models/cabModel.js";

export const createCab = async(req,res) =>{
  try{
   const {cabNumber,type,lat, lng, capacity, baseFare}= req.body;

const newCab = new Cab({
  cabNumber,
  type,
  location:{
    type:'Point',
    coordinates:[parseFloat(lng),parseFloat(lat)],
  },
  capacity,
  baseFare,
});

await newCab.save();

res.status(201).json({message: 'Cab created successfully',cab:newCab});
  }catch(err)
  {
    res.status(500).json({message:'Error creating cab',error:err.message});
  }
};

export const searchCabs = async (req, res) => {
  try {
    const { lat, lng, type, radius = 5000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and Longitude required' });
    }

    const baseQuery = {
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(radius),
        },
      },
    };

     if (!type) {
      const cabs = await Cab.find(baseQuery);
      const availableTypes = [...new Set(cabs.map(cab => cab.type))];
      return res.status(200).json({ availableCabTypes: availableTypes });
    }

    baseQuery.type = type;
    const nearestCabs = await Cab.find(baseQuery).limit(5);
    return res.status(200).json({ nearestCabs });
  } catch (err) {
    res.status(500).json({ message: 'Error searching cabs', error: err.message });
  }
};