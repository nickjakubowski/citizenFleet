var request = require("request");
var citizenFleet = require('../../server/routes/userController.js')
var base_url = "http://localhost:3000/index";

describe("CitizenFleet Server", function() {
  describe("POST /index", function() {
    
    it("returns status code 200", function(done) {
      request.post({url: base_url, form: 'water'}, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
    });

    });
  });
});