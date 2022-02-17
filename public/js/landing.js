// [ ] TODO add comments to describe what's going on here
//
async function searchZipEvents() {
  // FIXME getZip is not used
  const getZip = document.querySelector("#zipCode").value;

  // FIXME ...zip=? `?` must be a template string input -> ${x}
  const response = await fetch(`/activities/${getZip}`, {
    method: "GET",
  });
  console.log(response);
  // FIXME Current Behavior: if we get a valid response, we'll reload the page.  Expected Behavior: if we get a valid response, render a page that displays all upcoming events in the user's zip code
  if (response.ok) {
    document.location.replace(`/activity/${getZip}`);
  }
}

// [ ] TODO  "button" could be ambiguous. Best practice: use a unique ID unless applying action to multiple elements (class)
document
  .querySelector("#zipCodeBtn")
  .addEventListener("submit", searchZipEvents);
