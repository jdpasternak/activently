// [ ] TODO add comments to describe what's going on here
//this function is seaching the events and getting the event by zip code
const re = /^\d{5}(?:[- ]?\d{4})?$/;
const $zipCodeInput = document.querySelector("#zipCode");
const $zipCodeInputHelperText = document.querySelector(".helper-text");

async function searchZipEvents() {
  const zipCode = $zipCodeInput.value;
  const zipCodeMatch = zipCode.match(re);
  if (zipCodeMatch) {
    location.replace(`/activity/zip/${zipCode}`);
  } else {
    $zipCodeInputHelperText.textContent = `Invalid input. Must be "00000" or "00000-0000"`;
    $zipCodeInputHelperText.classList = ["helper-text red-text"];
    $zipCodeInput.classList = ["invalid"];
  }
}
document.querySelector(".zipSearch").addEventListener("click", searchZipEvents);
