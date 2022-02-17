const { get } = require("../../controllers/homepage-routes");

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
  console.log(data);
}
interest()
document.querySelector(".new-Activity").addEventListener("submit", newActivity);
