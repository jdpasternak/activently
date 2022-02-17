// // [ ] TODO add comments to describe what's going on here
// //this function is seaching the events and getting the event by zip code
// async function searchZipEvents() {
//   // [x] FIXME getZip is not used
//   const getZip = document.querySelector("#zipCode").value;

//   // [x] FIXME ...zip=? `?` must be a template string input -> ${x}
//   const response = await fetch(`/activities/${getZip}`, {
//     method: "GET",
//   });
//   console.log(response);
//   // FIXME Current Behavior: if we get a valid response, we'll reload the page.  Expected Behavior: if we get a valid response, render a page that displays all upcoming events in the user's zip code
//   // COMMENT we don't current have a route for /activity/<zip-code>. Should this be a different route?
//   // comment response, I put in the route but I wouldnt know how to search in a different manner
//   //
//   if (response.ok) {
//     document.location.replace(`/activity`);
//   }
// }

// // [x] TODO  "button" could be ambiguous. Best practice: use a unique ID unless applying action to multiple elements (class)
// // FIXME "getZipBtn" is being used as a tag selector, but here is no such tag.
// document
//   .querySelector("#getZipBtn")
//   .addEventListener("submit", searchZipEvents);
