var http = require("https");
const getCountry = (lat, long, callback) => {
   var options = {
      "method": "GET",
      "hostname": "trueway-geocoding.p.rapidapi.com",
      "port": null,
      "path": "/ReverseGeocode?language=en&location=" + lat + "%252C" + long,
      "headers": {
         "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
         "x-rapidapi-key": process.env.LOCATION_API,
         "useQueryString": true
      }
   };

   const req = http.request(options, (response) => {
      let data = ''
      response.on('data', (chunk) => {
         data = data + chunk.toString()
      })
      response.on('end', () => {
         const body = JSON.parse(data)  //json data to object
         const country = body.results[0].country
         callback(undefined, {
            yourLocation: country
         })
      })
   })
   req.on('error', (error) => {
      callback('Unable to connect!' + error, undefined)
   })
   req.end();
}
module.exports = getCountry