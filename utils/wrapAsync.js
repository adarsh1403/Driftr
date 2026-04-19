// a wrapper function which wraps a async function into a try catch block for cathing error, it reduces the need to write try catch block in every async function.

// It is a highrt order function.

// wrap async is evaluted at the server startup time before route is called and returns a arrow function which acts as a callback function . 

// wrap async function is evaluated at startup because Before a function is called, JavaScript must evaluate all its arguments.
// so app.get("/listings", wrapAsync(async (req, res) => { ... }));

// here JavaScript does this:

// Evaluate the first argument: "/listings" → the string /listings
// Evaluate the second argument: wrapAsync(async (req, res) => { ... })
// This means call wrapAsync immediately as it is a function call
// Pass it the async function
// Get back the returned function
// Now call app.get() with both evaluated arguments

module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

