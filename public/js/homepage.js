const zipCodeInputEl =document.querySelector(input).value
function getLocation(){
    zipCodeInputEl.innerHTML = "";
    const requestUrl = `https://service.zipapi.us/zipcode/${zipCodeInputEl}/?X-API-KEY=978c0688a92271d0820408efd9d332be`
    fetch(requestUrl)
        .then((response)=>{
            return response.json

        })
        .then((zipcodeData)=>{
            getCityFromZip(zipcodeData)

        }) 
}
function getCityFromZip(zipCodeData){
    const cityEl = document.querySelector("#city-name");
    cityEl.innerHTML = `${data.name}`

}
const zipCodeSearch = document.querySelector(#zipCodeBtn)
zipCodeSearch.addEventListener("submit", getLocation);
