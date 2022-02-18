// [ ] TODO add comments to describe what's going on here
//this function is seaching the events and getting the event by zip code
const re = /^\d{5}(?:[- ]?\d{4})?$/;

async function searchZipEvents() {
  const zipCode = document.querySelector("#zipCode").value;
  const zipCodeMatch = zipCode.match(re);
  if (zipCodeMatch) {
    location.replace(`/activity/zip/${zipCode}`);
  } else {
    // alert or set warning on the field
  }
}
document.querySelector(".zipSearch").addEventListener("click", searchZipEvents);
