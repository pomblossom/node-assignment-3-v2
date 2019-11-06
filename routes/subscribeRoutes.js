const express = require("express");
const subscribeRoutes = express.Router();
const Subscriber = require('../models/subscriber');

/**
 * Serve the /subscribe page
 */
subscribeRoutes.get('/', function(request, response) {
  response.render('subscribe');
});

/**
 * Post request for newsletter form submission.
 * For error handling: where can errors occur in this code? 
 */
subscribeRoutes.post('/', function(request, response) {

  // If subscriber has checked the adult checkbox, then the 'adult' attribute will exist in request.body with a value of 'on'. Otherwise, the attribute will not exist at all. We need to explicitly set this value to true or false in request.body to make it consistent with the Subscriber model. We can then use the request.body object to create a new document and save it to the database with Mongoose.
  if (request.body.adult) {
    request.body.adult = true;
  } else {
    request.body.adult = false;
  }

  // Create a new subscriber document with the request.body object and save it to the database.
  const subscriber = new Subscriber(request.body);

  subscriber.save(err => {
    if (err) {
      throw err;
    }

    // On success, render the home page. I'm using render() instead of redirect() to pass this 'success' variable in order to display the success message on the home page. To avoid EJS errors, this variable will have to be inserted into every GET handler that serves the home page.
    response.render("index", {success: true});
  });
});

module.exports = subscribeRoutes;