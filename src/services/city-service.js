const city = require('../models/city');
const { CityRepository }=require('../repository/index');

class CityService{
    constructor(){
        this.cityRepository= new CityRepository ();
    }

   async createCity(data){
         try {
            const city= await this.cityRepository.createCity(data);
            return city;
         } catch (error) {
            console.log("Something went wrong in Service layer");
         }
   }

   async createCities(datas){
      try {
         const cities=await this.cityRepository.createCities(datas);
         return cities;
      } catch (error) {
         console.log("Something went wrong in Service layer");
      }
   }

   async deleteCity(cityId){
    try {
            const response=await this.cityRepository.deleteCity(cityId);
            return response;
    } catch (error) {
       console.log("Something went wrong in Service layer")
    }
   }

   async updateCity(cityId,data){
    try {
            const city= await this.cityRepository.updateCity(cityId,data);
            return city;
    } catch (error) {
       console.log("Something went wrong in Service layer")
    }
   }

   async getCity(cityId){
    try {
            const city=await this.cityRepository.getCity(cityId);
            return city;
    } catch (error) {
       console.log("Something went wrong in Service layer")
    }
   }

   async getAllCities(filter){
      try {
          const cities=await this.cityRepository.getAllCities({name:filter.name});
          return cities;
      } catch (error) {
         console.log("Something went wrong in Service layer");
      }
   }

}


module.exports=CityService;

