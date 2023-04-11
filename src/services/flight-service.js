const { FlightRepository,AirplaneRepository }=require("../repository/index");
const { compareTime } = require('../utils/helper');


class FlightService{

     constructor(){
        this.airplaneRepository=new AirplaneRepository();
        this.flightRepository= new FlightRepository();
     }

      async createFlight(data){
        try {

            if(!compareTime(data.arrivalTime,data.departureTime)){
                throw {error:"Arrival time cannot be less than departure time"}
            }

            const airplane= await this.airplaneRepository.getAirplane(data.airplaneId); // This line to get airplane data so that we can add the capacity of the flight depending upon the airplane id 
            const flight = await this.flightRepository.createFlight({
                ...data,
                totalSeats:airplane.capacity
            }); // here we add < user input data(of flight) > + < totalSeats of flight from airplane id > 
            return flight;
        } catch (error) {
            console.log("Something went wrong in Service layer");
            throw {error}
        }
      }

      async getAllFlightsData(data){
        try {
          const flights= await this.flightRepository.getAllFlights(data);
          return flights;
        } catch (error) {
          console.log("Something went wrong in Service layer");
          throw {error};
        }
      }

      async getFlight(flightId){
        try {
           const flight = await this.flightRepository.getFlight(flightId);
           return flight;
        } catch (error) {
          console.log("Something went wrong in Service layer");
          throw {error};
        }
      }

      async updateFlight(flightId, data) {
        try {
            const response = await this.flightRepository.updateFlights(flightId, data); // removed the extra 's' from 'flightRepository'
            return response;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
     }
}



module.exports=FlightService;