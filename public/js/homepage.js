const zipCodeInputEl =document.querySelector(zip-code)
function getLocation(){
    zipCodeInputEl.innerHTML = "";
    const requestUrl = `https://service.zipapi.us/zipcode/${}/?X-API-KEY=978c0688a92271d0820408efd9d332be`
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
const zipCodeSearch = document.querySelector()
zipCodeSearch.addEventListener("submit", getLocation);
