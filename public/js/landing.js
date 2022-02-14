async function searchZipEvents() {
  const getZip = document.querySelector("input['zipCode']").value;
  const response = await fetch(`/api/activities/zip=?`, {
    method: "GET",
    body: JSON.stringify({
      title,
      description,
      location,
    }),
  });
  if (response.ok) {
    document.location.reload();
  }
  //i think I should be doing a .push to push the data to the page 
}
document.querySelector("button").addEventListener('submit', searchZipEvents)
