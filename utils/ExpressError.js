// Creating custom Error class so that we can add error-statusCode inside Error object.
// message is passed to super constructor because Error already has message defined in its constrctor 
class ExpressError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// exporting ExpressError as a class
module.exports = ExpressError;
