async function searchZipEvents() {
  const getZip = document.querySelector("#zipCode").value;
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

}
document.querySelector("button").addEventListener('submit', searchZipEvents)
