<<<<<<< HEAD
const zipCodeInputEl =document.querySelector("#zipcode").value
function getLocation(){
    zipCodeInputEl.innerHTML = "";
    const requestUrl = `https://service.zipapi.us/zipcode/${zipCodeInputEl}/?X-API-KEY=978c0688a92271d0820408efd9d332be`
    fetch(requestUrl)
        .then((response)=>{
            return response.json
=======
// TODO add some comments to describe what's going on here
const zipCodeInputEl = document.querySelector(input).value;
>>>>>>> 7bcb3b4a6e682f28311f2d8a5aa3ec5375ccef73

function getLocation() {
  zipCodeInputEl.innerHTML = "";
  const requestUrl = `https://service.zipapi.us/zipcode/${zipCodeInputEl}/?X-API-KEY=978c0688a92271d0820408efd9d332be`;
  fetch(requestUrl)
    .then((response) => response.json)
    .then((zipcodeData) => getCityFromZip(zipcodeData));
}

// FIXME zipCodeData is not used within the function
function getCityFromZip(zipCodeData) {
  const cityEl = document.querySelector("#city-name");
  cityEl.innerHTML = `${data.name}`;
}
<<<<<<< HEAD
const zipCodeSearch = document.querySelector("#zipCodeBtn")
=======

const zipCodeSearch = document.querySelector("#zipCodeBtn");
>>>>>>> 7bcb3b4a6e682f28311f2d8a5aa3ec5375ccef73
zipCodeSearch.addEventListener("submit", getLocation);
