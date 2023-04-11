const {Flights}=require('../models/index');
const { Op, where }=require('sequelize');

class FlightRepository{

    #createFIlter(data){
         let filter={};
         if(data.arrivalAirportId){
            filter.arrivalAirportId=data.arrivalAirportId;
         }
         if(data.departureAirportId){
            filter.departureAirportId=data.departureAirportId;
         }

        // Alternate approach for array approach of priceFilter but causes nesting query which can cause error
        // if(data.minPrice && data.maxPrice) {
        //     Object.assign(filter, {
        //         [Op.and]: [                                 // and is to price<=maxPrice and price>=minPrice
        //             { price: {[Op.lte]: data.maxPrice} }, 
        //             { price: {[Op.gte]: data.minPrice} }
        //         ]
        //     })
        // }
        
        let priceFilter = [];
        
        // Two filters are made sprately so that if any one is not passed we do not add it to the priceFilter array 
        if(data.minPrice) {
            // Object.assign(filter, {price: {[Op.gte]: data.minPrice}});
            priceFilter.push({price: {[Op.gte]: data.minPrice}});
        }
        if(data.maxPrice) {
            // Object.assign(filter, {price: {[Op.lte]: data.maxPrice}});
            priceFilter.push({price: {[Op.lte]: data.maxPrice}});
        }
        Object.assign(filter, {[Op.and]: priceFilter});
        // Object.assign(filter, {[Op.and]: [{ price: {[Op.lte]: 7000} }, { price: {[Op.gte]: 4000} }]})
        // console.log(filter);
        // return filter;
    }

    async createFlight(data){
        try {
            const flight= await Flights.create(data);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getFlight(flightId){
        try {
            const flight = await Flights.findByPk(flightId);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getAllFlights(filter){
        try {
            const filterObject = this.#createFIlter(filter);
            const flight = await Flights.findAll({
                where:filterObject
            });
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async updateFlights(flightId, data) {
        try {
           await Flights.update(data, {
               where: {
                   id: flightId
               }
           });
           return true;
       } catch (error) {
           console.log("Something went wrong in the repository layer");
           throw {error};
       }
   }

}

module.exports=FlightRepository;