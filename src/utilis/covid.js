
const http = require('https')
// const covid = (country, callback) => {
//    const options = {
//       "method": "GET",
//       "hostname": "coronavirus-monitor.p.rapidapi.com",
//       "port": null,
//       "path": "/coronavirus/response.php?country=" + country,
//       "headers": {
//          "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
//          "x-rapidapi-key": "bbe5356ed3msh7e0c3cff3539c30p113b4ajsn3e8bd1e7fe7b"
//       }
//    }
//    const req = https.request(options, (response) => {
//       let data = ''

//       response.on('data', (chunk) => {
//          data = data + chunk.toString()
//       })
//       response.on('end', () => {
//          const body = JSON.parse(data)
//          try {
//             if (!body.country) {
//                callback('Unable to find the location.', undefined)
//             } else {
//                callback(undefined, {
//                   totalCases: body.response[0].total_cases,
//                   totalDeaths: body.response[0].total_deaths,
//                   activeCases: body.response[0].active_cases,
//                   totalRecovered: body.response[0].total_recovered,
//                   //aper1m=body.response[0].total_cases_per1m
//                })
//             }
//          } catch (e) {
//             callback('No response!' + e, undefined)
//          }

//       })
//       //console.log(body.response[0].total_cases)

//    })
//    req.on('error', (e) => {
//       // console.log(e)
//       callback('Unable to connect to the server.' + e, undefined)
//    })

//    req.end()
// }

// module.exports = covid
// //covid('nepal')


const covid = (country, callback) => {
   var options = {
      "method": "GET",
      "hostname": "covid-193.p.rapidapi.com",
      "port": null,
      "path": "/statistics?country=" + country,
      "headers": {
         "x-rapidapi-host": "covid-193.p.rapidapi.com",
         "x-rapidapi-key": "bbe5356ed3msh7e0c3cff3539c30p113b4ajsn3e8bd1e7fe7b"
      }
   };

   const req = http.request(options, (res) => {
      var data = '';

      res.on("data", (chunk) => {
         data = data + chunk.toString()
      });

      res.on("end", function () {
         const body = JSON.parse(data)
         try {
            if (body.results === 0) {
               callback('Unable to find the location!', undefined)
            } else {
               callback(undefined, {
                  totalCases: body.response[0].cases.total,
                  totalDeaths: body.response[0].deaths.total,
                  activeCases: body.response[0].cases.active,
                  totalRecovered: body.response[0].cases.recovered,
                  totalTests: body.response[0].tests.total
               })
            }
         } catch (e) {
            callback('No response!', undefined)
         }

      });
   });
   req.on('error', (e) => {
      console.log('Unable to connect to the server!' + e, undefined)
   })

   req.end();
}
module.exports = covid
//covid('dbsjhj')