const secret_api = "at_n6c4G1RdJyl8HHqi40lhZOrup0L1u"
const bypass_cors_url = 'https://mybypassproxy.herokuapp.com/'
const api_url = 'https://geo.ipify.org/api/'
const current_version = 'v1'

let currentIp = document.getElementById('current-ip-address')
let currentLocation = document.getElementById('currentLocation') 
let currentTimeZone = document.getElementById('current-time-zone')
let currentIsp = document.getElementById('current-isp')

const entered_ip = document.getElementById('search-bar')
const search_btn = document.getElementById('search-btn')



const headers_option ={
 headers: {
  'Access-Control-Allow-Origin': '*',
 }
}

const map = L.map('mapid', {
 'center': [0, 0],
 'zoom': 0,
 'layers': [
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  })
 ]
})

upDateMarker = (update_marker = [-23.982, 40.545]) => {
  map.setView(update_marker, 13)
  L.marker(update_marker).addTo(map)
}

getIpDetails = (default_ip) =>{
  if(default_ip === undefined){
   var ip_url = `${bypass_cors_url} ${api_url} ${current_version}?apiKey=${secret_api}`
  }
  else{
   var ip_url = `${bypass_cors_url} ${api_url} ${current_version}?apiKey=${secret_api} &ipAddress=${default_ip}`
  }

  fetch(ip_url, headers_option)
  .then(results => results.json())
  .then(data => {
   currentIp.innerHTML = data.ip
   currentLocation.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
   currentTimeZone.innerHTML = data.location.timezone
   currentIsp.innerHTML = data.isp

   upDateMarker([data.location.lat, data.location.lng])
  })
  .catch(error => alert(error))
}
getIpDetails()

document.addEventListener('load', upDateMarker())

search_btn.addEventListener('click', e => {
 e.preventDefault()
 if(entered_ip.value !== '' && entered_ip.value !== null){
  getIpDetails(entered_ip.value)
  return
 }
 else{
  alert('Please enter a valid IP Address')
 }
})



