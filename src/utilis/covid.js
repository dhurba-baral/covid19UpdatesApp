
const https = require('https')
const covid = (country, callback) => {
   const options = {
      "method": "GET",
      "hostname": "coronavirus-monitor.p.rapidapi.com",
      "port": null,
      "path": "/coronavirus/latest_stat_by_country.php?country=" + country,
      "headers": {
         "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
         "x-rapidapi-key": "bbe5356ed3msh7e0c3cff3539c30p113b4ajsn3e8bd1e7fe7b"
      }
   }
   const req = https.request(options, (response) => {
      let data = ''

      response.on('data', (chunk) => {
         data = data + chunk.toString()

         response.on('end', () => {
            const body = JSON.parse(data)
            if (!body.country) {
               callback('Unable to find the location.', undefined)
            } else {
               callback(undefined, {
                  totalCases: body.latest_stat_by_country[0].total_cases,
                  totalDeaths: body.latest_stat_by_country[0].total_deaths,
                  activeCases: body.latest_stat_by_country[0].active_cases,
                  totalRecovered: body.latest_stat_by_country[0].total_recovered,
                  //aper1m=body.latest_stat_by_country[0].total_cases_per1m
               })
            }
         })
         //console.log(body.latest_stat_by_country[0].total_cases)

      })
   })
   req.on('error', (e) => {
      // console.log(e)
      callback('Unable to connect to the server.' + e, undefined)
   })

   req.end()
}

module.exports = covid
//covid('nepal')