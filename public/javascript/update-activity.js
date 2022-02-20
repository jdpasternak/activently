document.addEventListener("DOMContentLoaded", () => {
  $interestSelect = document.querySelector("#interestSelect");
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
      // [ ] TODO make the activities's related interest the selected value
      const interestSelect = document.querySelector("select");
      const selectInst = M.FormSelect.init(interestSelect);
    });
});

const updateActivity = async (event) => {
  event.preventDefault();

  const title = document
    .querySelector('input[name="activity-title"]')
    .value.trim();
  const description = document.querySelector("#description").value;
  const interest_id = $interestSelect.value;
  const location = document.querySelector("#zipCode").value;
  const occurrence = `${document.querySelector("#dateOfEvent").value} ${
    document.querySelector(".timepicker").value
  }`;
  const seats = document.querySelector("#seats").value;
  const is_private = document.querySelector('input[name="is-private"]').checked;
  const req_dietary_pref = document.querySelector(
    "#dietaryPrefRequired"
  ).checked;
  const rules = document.querySelector("#rules").value;
  const price = document.querySelector("#pricePerSeat").value;

  const body = {
    title,
    description,
    interest_id,
    location,
    occurrence,
    seats,
    is_private,
    req_dietary_pref,
    rules,
    price,
  };

  const activityId = window.location.toString().split("/")[
    window.location.toString().split("/").length - 2
  ];

  const response = await fetch(`/api/activities/${activityId}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    window.location.replace(`/activity/${activityId}`);
  } else {
    response.json().then((data) => console.log(data));
    alert(response.statusText);
  }
};

document
  .querySelector("#edit-activity-form")
  .addEventListener("submit", updateActivity);

// const updateActivity = async (event) => {
//   event.preventDefault();
//   const title = document
//     .querySelector('input[name="activity-title"]')
//     .value.trim();
//   const description = document
//     .querySelector('input[name="activity-title"]')
//     .value.trim();
//   const location = document
//     .querySelector('input[name="activity-title"]')
//     .value.trim();
//   const occurrence = document
//     .querySelector('input[name="activity-title"]')
//     .value.trim();
//   const organizer_id = document
//     .querySelector('input[name="activity-title"]')
//     .value.trim();
//   const is_private = document
//     .querySelector('input[name="activity-title"]')
//     .value.trim();
//   const seats = document
//     .querySelector('input[name="activity-title"]')
//     .value.trim();

//   // COMMENT this can be made to get the ID from req.session.user_id since only logged in users should be able to make changes and only to their own profiles.
//   const id = window.sessionStorage.user_id;

//   const response = await fetch(`/api/activities/${id}`, {
//     method: "PUT",
//     body: JSON.stringify({
//       title,
//       description,
//       location,
//       occurrence,
//       organizer_id,
//       is_private,
//       seats,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) {
//     document.location.replace("/browsing/");
//   } else {
//     // [ ] TODO change browser alert to modal
//     alert(response.statusText);
//   }
// };

// document
//   .querySelector(".edit-activity-form")
//   .addEventListener("submit", updateActivities);
