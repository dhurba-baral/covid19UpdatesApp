var http = require("https");
const worldData = (callback) => {
   var options = {
      "method": "GET",
      "hostname": "covid-19-coronavirus-statistics.p.rapidapi.com",
      "port": null,
      "path": "/v1/total",
      "headers": {
         "x-rapidapi-host": process.env.WORLD_API_HOST,
         "x-rapidapi-key": process.env.WORLD_API
      }
   };

   const req = http.request(options, (res) => {
      let data = ''

      res.on("data", (chunk) => {
         data = data + chunk.toString()
      });

      res.on("end", function () {
         const body = JSON.parse(data)
         //console.log(body.data.confirmed)

         callback(undefined, {
            worldCases: body.data.confirmed,
            worldDeaths: body.data.deaths,
            worldRecovered: body.data.recovered,
         })
      });
   });
   req.on('error', (e) => {
      callback('Unable to connect to the server!' + e, undefined)
      //console.log('No response!')
   })
   req.end();
}
//worldData()
module.exports = worldData