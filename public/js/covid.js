const socket = io()

const msg1 = document.querySelector('#field1')
const msg2 = document.querySelector('#field2')
const msg3 = document.querySelector('#field3')
const msg4 = document.querySelector('#field4')
const msg5 = document.querySelector('#field5')

const form = document.querySelector('form')
const locationButton = document.getElementById('locationButton')

form.addEventListener('submit', (e) => {
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
const msg6 = document.querySelector('#field6')
const msg7 = document.querySelector('#field7')
const msg8 = document.querySelector('#field8')
fetch('/world').then((response) => {
   response.json().then((data) => {
      msg6.textContent = 'Total Cases       :' + data.worldCases
      msg7.textContent = 'Total Deaths      :' + data.worldDeaths
      msg8.textContent = 'Total Recovered   :' + data.worldRecovered
   })
})

locationButton.addEventListener('click', () => {
   if (!navigator.geolocation) {
      return alert('Your browser doesnot support!')
   }
   navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude)
      socket.emit('sendLocation', {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
      })

   })

   fetch('/location').then((response) => {
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

