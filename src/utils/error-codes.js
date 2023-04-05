//Object.freeze is a built-in method in JavaScript that prevents modification of an object by making it immutable. 
//Once an object is frozen using Object.freeze, its properties cannot be added, deleted, or modified.

const ClientErrorCodes = Object.freeze({
    BAD_REQUEST: 400,
    UNAUTHORISED: 401,
    NOT_FOUND: 404
});

const ServerErrorCodes = Object.freeze({
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
});

const SuccessCodes = Object.freeze({
    OK: 200,
    CREATED: 201
});

module.exports = {
    ClientErrorCodes,
    ServerErrorCodes,
    SuccessCodes
}