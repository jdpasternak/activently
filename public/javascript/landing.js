// [ ] TODO add comments to describe what's going on here
//this function is seaching the events and getting the event by zip code
async function searchZipEvents() {
  const getZip = document.querySelector("#zipCode").value;

  const response = await fetch(`/${getZip}`, {
    method: "GET",
  });
  console.log(response);

  if (response.ok) {
    document.location.replace(`/${getZip}`);
  }
}
document.querySelector(".zipSearch").addEventListener("click", searchZipEvents);
