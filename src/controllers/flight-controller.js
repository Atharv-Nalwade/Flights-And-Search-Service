const { FlightService } = require('../services/index');

const { SuccessCodes } = require('../utils/error-codes');

const flightService= new FlightService();

const create=async (req,res)=>{
    try {
        // we use this approach to make sure we are dealing only with right data
        // User can send any un-necessary data and can bloat up the req object 
        // So we extract necessary info from the body into a var and then we pass that var info to create of sequelize
        const flightRequestData = {
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price
        }
        const flight = await flightService.createFlight(flightRequestData);
        // const flight=await flightService.createFlight(req.body);
        return res.status(SuccessCodes.CREATED).json({
            data: flight,
            success: true,
            message: 'Successfully created a flight',
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to create a flight',
            err: error
        });
    }
}

const getAll = async (req, res) => {
    try {
        console.log(req.query);
        const response = await flightService.getAllFlightsData(req.query);
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            err: {},
            message: 'Successfully fetched the flights'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to fetch the flights',
            err: error
        });
    }
}

module.exports = {
    create,
    getAll
}