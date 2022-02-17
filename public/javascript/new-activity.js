document.addEventListener("DOMContentLoaded", () => {
  const $interestSelect = document.querySelector("#interestSelect");

  const elems = document.querySelectorAll(".datepicker");
  const instances = M.Datepicker.init(elems, {
    format: "mm/dd/yyyy",
    minDate: new Date(),
  });

  const timepickers = document.querySelectorAll(".timepicker");
  const timepickerInst = M.Timepicker.init(timepickers, {});

  fetch("/api/interests")
    .then((response) => response.json())
    .then((apiInterestData) => {
      console.log(apiInterestData);
      apiInterestData.forEach((interest) => {
        let $option = document.createElement("option");
        $option.value = interest.id;
        $option.textContent = interest.name;
        $interestSelect.appendChild($option);
      });
    })
    .then(() => {
      const interestSelect = document.querySelectorAll("select");
      const selectInst = M.FormSelect.init(interestSelect);
    });
});

async function newActivity(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="activity_title"]').value;
  const description = document.querySelector('input[name="description"]').value;
  const location = document.querySelector('input[name="zip"]').value;
  const occurrence = document.querySelector('input[name="date"]').value;
  // need to grab the id and I will look it up tomorrow
  const organizer_id = document.querySelector(
    'label[class="organizer-id"]'
  ).value;
  //how do I do a boolean
  const is_private = document.querySelector(
    'checkbox[name="is-private"]'
  ).value;

  const seats = document.querySelector('input[name="seats"]');

  const response = await fetch(`/api/activities`, {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      location,
      occurrence,
      organizer_id,
      is_private,
      seats,
      interest_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const getId = fetch("/api/activities", {
    method: "GET",
    where: { location: location },
  });
  if (response.ok) {
    // COMMENT do we want to redirect to /browsing or to the new Activity's page or to the user's profile?
    document.location.replace(`/activity/${req.params.id}`);
  } else {
    // [ ] TODO use modal instead of traditional browser alert
    alert(response.statusText);
  }
}

function interest() {
  const response = fetch(`/api/interest`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      const interestData = data.map();
    });
}
// interest();
document
  .querySelector(".new-activity-form")
  .addEventListener("submit", newActivity);
