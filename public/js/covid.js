
const msg1 = document.querySelector('#field1')
const msg2 = document.querySelector('#field2')
const msg3 = document.querySelector('#field3')
const msg4 = document.querySelector('#field4')
const msg5 = document.querySelector('#field5')

document.querySelector('form').addEventListener('submit', (e) => {
   e.preventDefault()
   const country = document.querySelector('input').value
   msg1.textContent = ''
   msg2.textContent = ''
   msg3.textContent = ''
   msg4.textContent = ''
   msg5.textContent = ''

   fetch('/home?country=' + country).then((response) => {
      response.json().then((data) => {
         if (data.error) {
            msg1.textContent = data.error
         } else {
            msg1.textContent = 'Total Cases       :' + data.totalCases
            msg2.textContent = 'Total Deaths      :' + data.totalDeaths
            msg3.textContent = 'Total Active Cases:' + data.activeCases
            msg4.textContent = 'Total Recovered   :' + data.totalRecovered
            msg5.textContent = 'Total Tests       :' + data.totalTests
         }
      })

   })
})
