// TODO add some comments to describe what's going on here
const zipCodeInputEl = document.querySelector(input).value;

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
  cityEl.innerHTML = `${zipCodeData.name}`;

}

const zipCodeSearch = document.querySelector("#zipCodeBtn");
zipCodeSearch.addEventListener("submit", getLocation);
