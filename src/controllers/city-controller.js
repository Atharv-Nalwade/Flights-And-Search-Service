const { CityService }=require('../services/index');

const cityService=new CityService();
 

// Method is generally POST
//data for creation will be inside req.body
// We call this controller method from a route
const create=async (req,res) => {
    try {
        const city= await cityService.createCity(req.body);
        return res.status(201).json({
            data:city,
            success:true,
            message:"Succesfully created a city",
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to create a city",
            err:error
        });
    }
}


//Delete Method -> /city/:id
//.id is in req.params
const destroy=async (req,res)=>{
    try {
        const response= await cityService.deleteCity(req.params.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:"Succesfully deleted a city",
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to delete a city",
            err:error
        });
    }
}


//Get Method -> /city/:id
const get=async (req,res)=>{
    try {
        const response= await cityService.getCity(req.params.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:"Succesfully fetched a city",
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to get the city",
            err:error
        });
    }
}


//Patch Method -> /city/:id
// Now :id will be in req.params.id
// The info with which the updation is to be done is present in req.body
const update=async (req,res)=>{
    try {
        const city= await cityService.updateCity(req.params.id,req.body);
        return res.status(200).json({
            data:city,
            success:true,
            message:"Succesfully upadted the city",
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to update the city",
            err:error
        });
    }
}